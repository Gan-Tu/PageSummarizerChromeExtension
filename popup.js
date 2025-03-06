document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const summaryDiv = document.getElementById("summary");
  summaryDiv.textContent = "Fetching and summarizing...";

  try {
    // Retrieve both API keys from storage
    const { xaiApiKey, jinaApiKey } = await new Promise((resolve) => {
      chrome.storage.sync.get(["xaiApiKey", "jinaApiKey"], (data) => {
        resolve(data);
      });
    });

    if (!xaiApiKey) {
      summaryDiv.innerHTML =
        'No xAI API key found. Please set it in the <a href="#" id="optionsLink">options</a>.';
      document.getElementById("optionsLink").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
      });
      return;
    }

    // Fetch page content using Jina API with optional API key
    const fetchOptions = {
      method: "GET",
      headers: jinaApiKey ? { Authorization: `Bearer ${jinaApiKey}` } : {}
    };
    const response = await fetch(`http://r.jina.ai/${url}`, fetchOptions);
    if (!response.ok) {
      throw new Error("Failed to fetch page content from Jina API");
    }
    const content = await response.text();

    // Get summary from xAI
    const summary = await getSummaryFromOpenAI(content, xaiApiKey);
    summaryDiv.textContent = summary || "No summary available.";
  } catch (error) {
    summaryDiv.textContent = `Error: ${error.message}`;
  }
});

// Auto-click the button when popup loads
document.getElementById("summarizeBtn").click();

async function getSummaryFromOpenAI(text, apiKey) {
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
            "Summarize the following website content concisely. Do not use markdown, only plain text. Break summaries into short paragraphs for ease of reading. Do not use more than 100 words. Include important conclusions or numeric facts only when applicable."
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
