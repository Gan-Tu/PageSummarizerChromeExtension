document.getElementById("saveBtn").addEventListener("click", () => {
  const xaiApiKey = document.getElementById("xaiApiKey").value.trim();
  const jinaApiKey = document.getElementById("jinaApiKey").value.trim();
  
  if (xaiApiKey || jinaApiKey) {
    chrome.storage.sync.set({ 
      xaiApiKey: xaiApiKey, 
      jinaApiKey: jinaApiKey 
    }, () => {
      const status = document.getElementById("status");
      status.textContent = "API Keys saved!";
      setTimeout(() => (status.textContent = ""), 2000);
    });
  } else {
    alert("Please enter at least one valid API key.");
  }
});

// Load saved API keys when the options page opens
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["xaiApiKey", "jinaApiKey"], (data) => {
    if (data.xaiApiKey) {
      document.getElementById("xaiApiKey").value = data.xaiApiKey;
    }
    if (data.jinaApiKey) {
      document.getElementById("jinaApiKey").value = data.jinaApiKey;
    }
  });
});