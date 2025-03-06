# Page Summarizer Chrome Extension

A Chrome extension that summarizes webpages on click using the xAI Grok API, with optional Jina API support for fetching page content. Users can configure their API keys through an options page for a seamless experience.

Demo: https://cln.sh/GbLJfN1j

## Features
- Summarizes the active webpage with a single click.
- Integrates with xAI's Grok API for concise, plain-text summaries (max 100 words).
- Supports Jina API for fetching webpage content (optional).
- Configurable API keys via an options page, stored securely with Chrome's `storage.sync`.
- Detailed error handling and feedback in the popup UI.

## Installation

### Prerequisites

- Google Chrome browser.
- An xAI API key (required) from [xAI](https://x.ai/).
- A Jina API key (optional) from [Jina](https://jina.ai/) for enhanced content fetching.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Gan-Tu/PageSummarizerChromeExtension
   cd PageSummarizerChromeExtension
   ```

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (toggle in the top right).
   - Click "Load unpacked" and select the `PageSummarizerChromeExtension` folder.

3. **Configure API Keys**:
   - Right-click the extension icon in Chrome and select "Options".
   - Enter your xAI API key (required) and Jina API key (optional).
   - Click "Save" to store the keys.

## Usage

1. **Open a Webpage**:
   - Navigate to any webpage you want to summarize.

2. **Click the Extension Icon**:
   - Click the Page Summarizer icon in the Chrome toolbar.
   - The popup will display "Fetching and summarizing..." followed by the summary.

3. **View the Summary**:
   - A concise summary (plain text, broken into short paragraphs) will appear.
   - If an error occurs (e.g., invalid API key), it will display an error message with a link to the options page.

## Files

- **`popup.html`**: The UI for the extension popup.
- **`popup.js`**: Handles fetching content and summarizing it with xAI.
- **`options.html`**: Options page for configuring API keys.
- **`options.js`**: Saves and loads API keys using Chrome storage.
- **`manifest.json`**: Extension manifest defining permissions and structure.

## Configuration

- **xAI API Key**: Required for summarization. Set in the options page.
- **Jina API Key**: Optional for fetching page content. If omitted, the extension attempts a public Jina request (may fail if authentication is required).
