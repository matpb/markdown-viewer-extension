// Content script that intercepts markdown file loads
// This runs before the page content loads (document_start)

(function() {
  'use strict';

  // Check if this is a markdown file by URL extension
  const url = window.location.href;
  const isMarkdown = /\.(md|markdown)$/i.test(url);

  if (!isMarkdown) {
    return;
  }

  // Stop the default plain text rendering
  document.addEventListener('DOMContentLoaded', function() {
    // Get the markdown content from the page
    const body = document.body;
    const pre = body.querySelector('pre');

    if (pre) {
      // Chrome renders .md files as plain text in a <pre> tag
      const markdownContent = pre.textContent || pre.innerText;

      // Clear the body
      body.innerHTML = '';

      // Create iframe to load our viewer
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.margin = '0';
      iframe.style.padding = '0';

      // Load the viewer HTML
      iframe.src = chrome.runtime.getURL('viewer.html');

      // Pass the markdown content to the iframe once it loads
      iframe.onload = function() {
        iframe.contentWindow.postMessage({
          type: 'RENDER_MARKDOWN',
          content: markdownContent,
          filename: url.split('/').pop()
        }, '*');
      };

      body.appendChild(iframe);
    }
  });
})();
