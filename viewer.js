// Viewer logic for rendering markdown

(function() {
  'use strict';

  const contentDiv = document.getElementById('content');
  const rawContentPre = document.getElementById('raw-content');
  const filenameSpan = document.getElementById('filename');
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const toggleRawBtn = document.getElementById('toggle-raw');

  let currentMarkdown = '';
  let isDarkTheme = false;
  let isRawView = false;

  // Configure marked with GFM options
  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: true,
    mangle: false,
    pedantic: false,
    smartLists: true,
    smartypants: true,
    xhtml: false
  });

  // Custom renderer for code blocks with Prism
  const renderer = new marked.Renderer();
  const originalCodeRenderer = renderer.code;

  renderer.code = function(code, language) {
    if (language && Prism.languages[language]) {
      try {
        const highlighted = Prism.highlight(code, Prism.languages[language], language);
        return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
      } catch (e) {
        console.error('Prism highlighting error:', e);
      }
    }
    // Fallback to default renderer
    return originalCodeRenderer.call(this, code, language);
  };

  marked.use({ renderer });

  // Listen for markdown content from content script
  window.addEventListener('message', function(event) {
    if (event.data.type === 'RENDER_MARKDOWN') {
      currentMarkdown = event.data.content;
      const filename = event.data.filename || 'document.md';

      filenameSpan.textContent = filename;
      renderMarkdown();
    }
  });

  function renderMarkdown() {
    try {
      const html = marked.parse(currentMarkdown);
      contentDiv.innerHTML = html;

      // Run Prism on any code blocks that weren't caught by the renderer
      Prism.highlightAllUnder(contentDiv);

      // Process any checkboxes for task lists
      processTaskLists();

      // Add copy buttons to code blocks
      addCopyButtons();
    } catch (e) {
      contentDiv.innerHTML = `<div class="error">
        <h2>Error rendering markdown</h2>
        <pre>${escapeHtml(e.message)}</pre>
      </div>`;
    }
  }

  function processTaskLists() {
    // GitHub-style task lists: - [ ] and - [x]
    const listItems = contentDiv.querySelectorAll('li');
    listItems.forEach(li => {
      const text = li.textContent.trim();
      if (text.startsWith('[ ]') || text.startsWith('[x]')) {
        const isChecked = text.startsWith('[x]');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isChecked;
        checkbox.disabled = true;
        checkbox.className = 'task-list-item-checkbox';

        // Remove the [ ] or [x] from the text
        const textNode = li.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.textContent = textNode.textContent.replace(/^\[[ x]\]\s*/, '');
        }

        li.insertBefore(checkbox, li.firstChild);
        li.className = 'task-list-item';
      }
    });
  }

  function addCopyButtons() {
    const codeBlocks = contentDiv.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.onclick = function() {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;
        navigator.clipboard.writeText(text).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        });
      };

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme', isDarkTheme);
    toggleThemeBtn.textContent = isDarkTheme ? '☀️' : '🌙';
    localStorage.setItem('markdown-viewer-theme', isDarkTheme ? 'dark' : 'light');
  }

  function toggleRaw() {
    isRawView = !isRawView;
    if (isRawView) {
      rawContentPre.textContent = currentMarkdown;
      rawContentPre.style.display = 'block';
      contentDiv.style.display = 'none';
      toggleRawBtn.textContent = '📄';
    } else {
      rawContentPre.style.display = 'none';
      contentDiv.style.display = 'block';
      toggleRawBtn.textContent = '{ }';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Load saved theme preference
  const savedTheme = localStorage.getItem('markdown-viewer-theme');
  if (savedTheme === 'dark') {
    toggleTheme();
  }

  // Event listeners
  toggleThemeBtn.addEventListener('click', toggleTheme);
  toggleRawBtn.addEventListener('click', toggleRaw);
})();
