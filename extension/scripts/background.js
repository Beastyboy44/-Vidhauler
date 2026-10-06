// Vidhauler Background Service Worker (Manifest V3)
console.log('⚡ Vidhauler Service Worker gestart.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Vidhauler extensie geïnstalleerd!');
  chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
});

// Listen for detected media counts from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'VIDHAULER_MEDIA_DETECTED' && sender.tab) {
    const count = request.count || 0;
    if (count > 0) {
      chrome.action.setBadgeText({
        tabId: sender.tab.id,
        text: count.toString(),
      });
      chrome.action.setBadgeBackgroundColor({
        tabId: sender.tab.id,
        color: '#2563eb',
      });
    } else {
      chrome.action.setBadgeText({
        tabId: sender.tab.id,
        text: '',
      });
    }
  }
});

// Clean up stored tab streams when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.get(['captured_streams'], (res) => {
    if (res.captured_streams && res.captured_streams[tabId]) {
      const updated = { ...res.captured_streams };
      delete updated[tabId];
      chrome.storage.local.set({ captured_streams: updated });
    }
  });
});
