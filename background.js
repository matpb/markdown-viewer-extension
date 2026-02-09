// Service worker for Markdown Viewer extension
// Handles rendering selected text as markdown in a new tab

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'render-selection-as-markdown',
    title: 'Render selection as Markdown',
    contexts: ['selection']
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  await renderSelectedMarkdown(tab);
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'render-selection-as-markdown') {
    await renderSelectedMarkdown(tab);
  }
});

async function renderSelectedMarkdown(tab) {
  let results;
  try {
    results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    });
  } catch (err) {
    // Cannot access restricted pages (chrome://, chrome-extension://, Web Store)
    await showBadgeTemporarily('ERR', '#d32f2f');
    return;
  }

  const selectedText = results?.[0]?.result;
  if (!selectedText || selectedText.trim().length === 0) {
    chrome.tabs.create({
      url: chrome.runtime.getURL('viewer.html?source=empty')
    });
    return;
  }

  const storage = chrome.storage.session || chrome.storage.local;
  await storage.set({ pendingMarkdown: selectedText });

  chrome.tabs.create({
    url: chrome.runtime.getURL('viewer.html?source=selection')
  });
}

async function showBadgeTemporarily(text, color) {
  await chrome.action.setBadgeText({ text });
  await chrome.action.setBadgeBackgroundColor({ color });
  setTimeout(() => {
    chrome.action.setBadgeText({ text: '' });
  }, 2000);
}
