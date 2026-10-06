import { ExtensionProject } from '../types/extension';

export const VIDHAULER_EXTENSION_PROJECT: ExtensionProject = {
  id: 'vidhauler-mv3',
  name: 'Vidhauler - Video & College Downloader',
  shortName: 'Vidhauler',
  version: '1.0.0',
  description: 'Download elke video en college van Canvas, Blackboard, Panopto en duizenden websites. Sla lessen offline op in 1080p of als MP3.',
  category: 'Video & Media',
  permissions: ['activeTab', 'storage', 'downloads', 'scripting'],
  hostPermissions: ['<all_urls>'],
  activeFile: 'manifest.json',
  files: {
    'manifest.json': {
      name: 'manifest.json',
      path: 'manifest.json',
      language: 'json',
      description: 'Manifest V3 configuration for Vidhauler.',
      content: JSON.stringify(
        {
          manifest_version: 3,
          name: "Vidhauler - Video & College Downloader",
          version: "1.0.0",
          description: "Download elke video en college van Canvas, Blackboard, Panopto en duizenden websites. Sla lessen offline op in 1080p of als MP3.",
          action: {
            default_popup: "popup/popup.html",
            default_title: "Vidhauler",
            default_icon: {
              "16": "icons/icon16.png",
              "48": "icons/icon48.png",
              "128": "icons/icon128.png"
            }
          },
          background: {
            service_worker: "scripts/background.js",
            type: "module"
          },
          content_scripts: [
            {
              matches: ["<all_urls>"],
              js: ["scripts/content.js"],
              run_at: "document_idle",
              all_frames: true
            }
          ],
          permissions: [
            "activeTab",
            "storage",
            "downloads",
            "scripting"
          ],
          host_permissions: [
            "<all_urls>"
          ],
          icons: {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png"
          }
        },
        null,
        2
      )
    },
    'popup/popup.html': {
      name: 'popup.html',
      path: 'popup/popup.html',
      language: 'html',
      description: 'Popup UI with tri-balls logo, scan filters, and download buttons.',
      content: `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>Vidhauler</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="vidhauler-popup">
    <header class="header">
      <div class="brand">
        <div class="tri-balls">
          <div class="ball red"></div>
          <div class="ball yellow"></div>
          <div class="ball blue"></div>
        </div>
        <div>
          <h1 class="logo-title">Vidhauler</h1>
          <span class="sub-badge">v1.0 • Manifest V3</span>
        </div>
      </div>
      <button id="btn-refresh" class="icon-btn" title="Opnieuw scannen">🔄</button>
    </header>

    <div class="status-bar">
      <span id="streams-count" class="streams-count">Scannen naar video's...</span>
      <div class="filters">
        <button id="filter-all" class="filter-btn active">Alles</button>
        <button id="filter-video" class="filter-btn">Video</button>
        <button id="filter-audio" class="filter-btn">MP3</button>
      </div>
    </div>

    <div id="streams-list" class="streams-list">
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Pagina analyseren op colleges &amp; videostreams...</p>
      </div>
    </div>

    <footer class="footer">
      <div class="tip-box">
        <span>💡 <strong>Tip voor studenten:</strong> Speel de les 1 sec af als de stream nog niet direct getoond wordt.</span>
      </div>
      <div class="footer-links">
        <span>Vidhauler 2026</span>
        <a href="https://vidhauler.net" target="_blank" class="link">Help &amp; Opties</a>
      </div>
    </footer>
  </div>
  <script src="popup.js"></script>
</body>
</html>`
    },
    'popup/popup.css': {
      name: 'popup.css',
      path: 'popup/popup.css',
      language: 'css',
      description: 'Popup styling for Vidhauler.',
      content: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
body { width: 380px; background: #090d16; color: #f1f5f9; font-size: 13px; }
.vidhauler-popup { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px; }
.brand { display: flex; align-items: center; gap: 10px; }
.tri-balls { position: relative; width: 24px; height: 24px; }
.ball { position: absolute; width: 10px; height: 10px; border-radius: 50%; }
.ball.red { top: 0; left: 7px; background: #ef4444; }
.ball.yellow { bottom: 0; left: 0; background: #f59e0b; }
.ball.blue { bottom: 0; right: 0; background: #3b82f6; }
.logo-title { font-size: 15px; font-weight: 800; color: #fff; }
.sub-badge { font-size: 10px; color: #94a3b8; font-family: monospace; }
.icon-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; border-radius: 8px; width: 30px; height: 30px; cursor: pointer; }
.status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
.streams-count { font-weight: 600; color: #38bdf8; }
.filters { display: flex; background: #0f172a; border: 1px solid #1e293b; border-radius: 6px; padding: 2px; gap: 2px; }
.filter-btn { background: transparent; border: none; color: #94a3b8; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; cursor: pointer; }
.filter-btn.active { background: #2563eb; color: #fff; }
.streams-list { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; }
.loading-state, .empty-state { text-align: center; padding: 24px 12px; color: #94a3b8; font-size: 12px; }
.spinner { width: 20px; height: 20px; border: 2px solid #334155; border-top-color: #38bdf8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 10px; }
@keyframes spin { to { transform: rotate(360deg); } }
.stream-card { background: #131b2e; border: 1px solid #1e293b; border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
.stream-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.stream-title { font-weight: 600; font-size: 12px; color: #f8fafc; word-break: break-all; }
.stream-badge { font-size: 9px; font-weight: 800; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; }
.badge-mp4 { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.4); }
.badge-hls { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }
.badge-mp3 { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
.stream-meta { display: flex; gap: 8px; font-size: 11px; color: #94a3b8; }
.stream-actions { display: flex; gap: 6px; }
.btn-dl { flex: 1; background: #2563eb; color: #fff; border: none; padding: 7px 10px; border-radius: 6px; font-weight: 700; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
.btn-dl:hover { background: #1d4ed8; }
.btn-copy { background: #1e293b; border: 1px solid #334155; color: #94a3b8; padding: 7px 10px; border-radius: 6px; cursor: pointer; }
.footer { border-top: 1px solid #1e293b; padding-top: 10px; display: flex; flex-direction: column; gap: 8px; }
.tip-box { background: rgba(37, 99, 235, 0.1); border: 1px solid rgba(37, 99, 235, 0.25); border-radius: 6px; padding: 6px 10px; font-size: 10px; color: #93c5fd; }
.footer-links { display: flex; justify-content: space-between; font-size: 10px; color: #64748b; }
.footer-links .link { color: #38bdf8; text-decoration: none; }
`
    },
    'popup/popup.js': {
      name: 'popup.js',
      path: 'popup/popup.js',
      language: 'javascript',
      description: 'Popup script that communicates with the active tab to detect and download video files.',
      content: `// Vidhauler Chrome Extension - Popup Logic (Manifest V3)
document.addEventListener('DOMContentLoaded', async () => {
  const streamsList = document.getElementById('streams-list');
  const countBadge = document.getElementById('streams-count');
  const refreshBtn = document.getElementById('btn-refresh');

  const filterAllBtn = document.getElementById('filter-all');
  const filterVideoBtn = document.getElementById('filter-video');
  const filterAudioBtn = document.getElementById('filter-audio');

  let activeFilter = 'all';
  let cachedStreams = [];

  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }

  function sanitizeFilename(name) {
    return (name || 'vidhauler_video').replace(/[/\\\\?%*:|"<>]/g, '_').trim().substring(0, 80);
  }

  async function scanMedia() {
    streamsList.innerHTML = \`
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Pagina analyseren op Canvas, Blackboard &amp; webvideo's...</p>
      </div>
    \`;
    countBadge.textContent = 'Scannen...';

    const tab = await getActiveTab();
    if (!tab || !tab.id) {
      showEmpty('Kan tabblad niet scannen.');
      return;
    }

    chrome.storage.local.get(['captured_streams'], (storedData) => {
      const stored = (storedData.captured_streams && storedData.captured_streams[tab.id]) || [];

      chrome.tabs.sendMessage(tab.id, { action: 'VIDHAULER_SCAN' }, (response) => {
        let domStreams = [];
        if (!chrome.runtime.lastError && response && Array.isArray(response.media)) {
          domStreams = response.media;
        }

        const allStreams = [...stored];
        domStreams.forEach((d) => {
          if (!allStreams.some((s) => s.url === d.url)) {
            allStreams.push(d);
          }
        });

        cachedStreams = allStreams;
        renderStreams();
      });
    });
  }

  function showEmpty(msg) {
    streamsList.innerHTML = \`
      <div class="empty-state">
        <p>Geen videostream gedetecteerd.</p>
        <small>\${msg || 'Speel het college of de video even af (1 sec) en klik opnieuw op het Vidhauler-icoon.'}</small>
      </div>
    \`;
    countBadge.textContent = '0 video\\'s gedetecteerd';
  }

  function renderStreams() {
    const filtered = cachedStreams.filter((s) => {
      if (activeFilter === 'video') return s.format !== 'mp3';
      if (activeFilter === 'audio') return s.format === 'mp3';
      return true;
    });

    countBadge.textContent = \`\${cachedStreams.length} stream\${cachedStreams.length !== 1 ? 's' : ''} gevonden\`;

    if (filtered.length === 0) {
      showEmpty('Geen streams gevonden voor het geselecteerde filter.');
      return;
    }

    streamsList.innerHTML = '';
    filtered.forEach((stream, idx) => {
      const card = document.createElement('div');
      card.className = 'stream-card';

      const badgeClass = stream.format === 'mp3' ? 'badge-mp3' : stream.format === 'hls' ? 'badge-hls' : 'badge-mp4';
      const badgeText = stream.format.toUpperCase();

      card.innerHTML = \`
        <div class="stream-header">
          <div class="stream-title" title="\${stream.title}">\${stream.title}</div>
          <span class="stream-badge \${badgeClass}">\${badgeText}</span>
        </div>
        <div class="stream-meta">
          <span>\${stream.resolution || 'HD Video'}</span>
          <span>•</span>
          <span>\${stream.size || 'Stream'}</span>
        </div>
        <div class="stream-actions">
          <button class="btn-dl" data-idx="\${idx}">
            ⬇️ Download \${stream.format === 'mp3' ? 'Audio (MP3)' : 'Video'}
          </button>
          <button class="btn-copy" data-url="\${stream.url}" title="Kopieer stream-link">🔗</button>
        </div>
      \`;

      streamsList.appendChild(card);
    });

    streamsList.querySelectorAll('.btn-dl').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-idx');
        const stream = filtered[idx];
        if (!stream) return;

        btn.textContent = '⏳ Downloaden gestart...';
        btn.style.background = '#059669';

        const ext = stream.format === 'mp3' ? '.mp3' : '.mp4';
        const filename = sanitizeFilename(stream.title) + ext;

        chrome.downloads.download({
          url: stream.url,
          filename: filename,
          saveAs: true,
        });
      });
    });

    streamsList.querySelectorAll('.btn-copy').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.getAttribute('data-url');
        navigator.clipboard.writeText(url);
        btn.textContent = '✓';
        setTimeout(() => { btn.textContent = '🔗'; }, 1500);
      });
    });
  }

  function setFilter(filter, activeBtn) {
    activeFilter = filter;
    [filterAllBtn, filterVideoBtn, filterAudioBtn].forEach((b) => b.classList.remove('active'));
    activeBtn.classList.add('active');
    renderStreams();
  }

  filterAllBtn.addEventListener('click', () => setFilter('all', filterAllBtn));
  filterVideoBtn.addEventListener('click', () => setFilter('video', filterVideoBtn));
  filterAudioBtn.addEventListener('click', () => setFilter('audio', filterAudioBtn));

  refreshBtn.addEventListener('click', scanMedia);
  scanMedia();
});
`
    },
    'scripts/content.js': {
      name: 'content.js',
      path: 'scripts/content.js',
      language: 'javascript',
      description: 'Scans Canvas, Blackboard, and web pages for video elements.',
      content: `// Vidhauler Content Script
console.log('⚡ Vidhauler content-script geladen.');

function findMediaElements() {
  const mediaList = [];
  const baseTitle = document.title || 'college_video';

  document.querySelectorAll('video').forEach((vid, idx) => {
    let src = vid.currentSrc || vid.src;
    if (!src) {
      const sourceTag = vid.querySelector('source');
      if (sourceTag) src = sourceTag.src;
    }
    if (src && src.startsWith('http')) {
      mediaList.push({
        url: src,
        title: \`\${baseTitle} (Deel \${idx + 1})\`,
        format: src.includes('.m3u8') ? 'hls' : 'mp4',
        resolution: vid.videoHeight ? \`\${vid.videoHeight}p HD\` : '1080p HD',
        size: 'Online College Stream'
      });
    }
  });

  document.querySelectorAll('audio').forEach((aud) => {
    const src = aud.currentSrc || aud.src;
    if (src && src.startsWith('http')) {
      mediaList.push({
        url: src,
        title: \`\${baseTitle} (Audio Podcast)\`,
        format: 'mp3',
        resolution: 'Audio 320kbps',
        size: 'Audio Track'
      });
    }
  });

  return mediaList;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'VIDHAULER_SCAN') {
    sendResponse({ media: findMediaElements() });
    return true;
  }
});
`
    },
    'scripts/background.js': {
      name: 'background.js',
      path: 'scripts/background.js',
      language: 'javascript',
      description: 'Service worker for Vidhauler.',
      content: `// Vidhauler Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('⚡ Vidhauler extensie actief geïnstalleerd!');
  chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
});
`
    }
  }
};

export const EXTENSION_TEMPLATES: ExtensionProject[] = [
  VIDHAULER_EXTENSION_PROJECT
];
