document.getElementById("summarizeBtn").addEventListener("click", async () => {
  // Get the current tab's URL
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;

  // Display a loading message
  const summaryDiv = document.getElementById("summary");
  summaryDiv.textContent = "Fetching and summarizing...";

  try {
    // Fetch the page content (simplified; you may need a content script for full text)
    const response = await fetch(`http://r.jina.ai/${url}`);
    const content = await response.text();

    // Call OpenAI API
    const summary = await getSummaryFromOpenAI(content);
    summaryDiv.textContent = summary || "No summary available.";
  } catch (error) {
    summaryDiv.textContent = `Error: ${error.message}`;
  }
});

document.getElementById("summarizeBtn").click();

async function getSummaryFromOpenAI(text) {
  const apiKey = "you api key";
  const apiUrl = "https://api.x.ai/v1/chat/completions";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "grok-2-latest",
      messages: [
        {
          role: "system",
          content:
            "Summarize the following website content concisely. Do not use markdown, only plain text. Break summaries into short paragraphs for ease of reading. Do not use more than 100 words. Include important conclusinos, or numeric facts, only when applicable."
        },
        { role: "user", content: text }
      ],
      stream: false
    })
  });

  const data = await response.json();
  if (data.choices && data.choices[0]) {
    return data.choices[0].message.content.trim();
  }
  throw new Error("Failed to get summary from Grok");
}
