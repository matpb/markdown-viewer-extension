// Viewer logic for rendering markdown

(function() {
  'use strict';

  const contentDiv = document.getElementById('content');
  const editorTextarea = document.getElementById('editor');
  const filenameSpan = document.getElementById('filename');
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const toggleRawBtn = document.getElementById('toggle-raw');

  let currentMarkdown = '';
  let isDarkTheme = false;
  let isRawView = false;

  // Configure marked with GFM options and custom renderer
  marked.use({
    gfm: true,
    breaks: true,
    pedantic: false,
    renderer: {
      code(code, infostring) {
        const lang = (infostring || '').match(/\S*/)[0];
        if (lang && Prism.languages[lang]) {
          try {
            const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
            return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
          } catch (e) {
            console.error('Prism highlighting error:', e);
          }
        }
        // Fallback to default - escape HTML
        const escapedCode = code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        return `<pre><code>${escapedCode}</code></pre>`;
      }
    }
  });

  // Check if opened as a standalone page
  const params = new URLSearchParams(window.location.search);
  const source = params.get('source');

  if (source === 'selection') {
    initFromStorage();
  } else if (source === 'restricted') {
    showRestrictedState();
  } else if (source === 'empty') {
    showEmptyState();
  }

  function showRestrictedState() {
    filenameSpan.textContent = 'Markdown Viewer';
    contentDiv.innerHTML =
      '<div class="restricted-state">' +
        '<h2>Cannot access this page</h2>' +
        '<p>Markdown Viewer cannot run on this type of page. This includes:</p>' +
        '<ul>' +
          '<li><code>chrome://</code> pages (browser settings, extensions, etc.)</li>' +
          '<li>The Chrome Web Store</li>' +
          '<li>Other extension pages</li>' +
        '</ul>' +
        '<hr>' +
        '<h3>Viewing local markdown files?</h3>' +
        '<p>If you\'re trying to view a local <code>.md</code> file, make sure file access is enabled:</p>' +
        '<ol>' +
          '<li>Go to <code>chrome://extensions/</code></li>' +
          '<li>Find <strong>Markdown Viewer</strong> and click <strong>Details</strong></li>' +
          '<li>Enable <strong>"Allow access to file URLs"</strong></li>' +
        '</ol>' +
        '<hr>' +
        '<p>You can still <strong>paste or type markdown directly</strong>:</p>' +
        '<p>Click the <code>{ }</code> button in the top-right to open the editor,<br>then click <code>📄</code> to render it.</p>' +
      '</div>';
  }

  function showEmptyState() {
    filenameSpan.textContent = 'Markdown Viewer';
    contentDiv.innerHTML =
      '<div class="empty-state">' +
        '<h2>Markdown Viewer</h2>' +
        '<p>Select text on any webpage and render it as markdown:</p>' +
        '<ul>' +
          '<li>Click the Markdown Viewer icon in the toolbar, or</li>' +
          '<li>Right-click and choose <strong>"Render selection as Markdown"</strong></li>' +
        '</ul>' +
        '<hr>' +
        '<p>You can also <strong>paste or type markdown directly</strong>:</p>' +
        '<p>Click the <code>{ }</code> button in the top-right to open the editor,<br>then click <code>📄</code> to render it.</p>' +
      '</div>';
  }

  async function initFromStorage() {
    const storage = chrome.storage.session || chrome.storage.local;
    try {
      const data = await storage.get('pendingMarkdown');
      if (data.pendingMarkdown) {
        currentMarkdown = data.pendingMarkdown;
        filenameSpan.textContent = 'Selected Markdown';
        renderMarkdown();
        await storage.remove('pendingMarkdown');
      } else {
        showEmptyState();
      }
    } catch (err) {
      console.error('Failed to read from storage:', err);
    }
  }

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
      editorTextarea.value = currentMarkdown;
      editorTextarea.style.display = 'block';
      contentDiv.style.display = 'none';
      toggleRawBtn.textContent = '📄';
      toggleRawBtn.title = 'Render markdown';
      editorTextarea.focus();
    } else {
      currentMarkdown = editorTextarea.value;
      editorTextarea.style.display = 'none';
      contentDiv.style.display = 'block';
      toggleRawBtn.textContent = '{ }';
      toggleRawBtn.title = 'Edit markdown';

      if (currentMarkdown.trim()) {
        renderMarkdown();
      } else {
        showEmptyState();
      }
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

  // Ctrl/Cmd+Enter to render from editor
  editorTextarea.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      toggleRaw();
    }
  });
})();
