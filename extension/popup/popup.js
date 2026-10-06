// Vidhauler Chrome Extension - Popup Logic (Manifest V3)
document.addEventListener('DOMContentLoaded', async () => {
  const streamsList = document.getElementById('streams-list');
  const countBadge = document.getElementById('streams-count');
  const refreshBtn = document.getElementById('btn-refresh');

  const filterAllBtn = document.getElementById('filter-all');
  const filterVideoBtn = document.getElementById('filter-video');
  const filterAudioBtn = document.getElementById('filter-audio');

  let activeFilter = 'all';
  let cachedStreams = [];

  // Query the current active browser tab
  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
  }

  // Sanitize file names for saving
  function sanitizeFilename(name) {
    return (name || 'vidhauler_video')
      .replace(/[/\\?%*:|"<>]/g, '_')
      .trim()
      .substring(0, 80);
  }

  // Scan current tab for video streams
  async function scanMedia() {
    streamsList.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Pagina analyseren op Canvas, Blackboard &amp; webvideo's...</p>
      </div>
    `;
    countBadge.textContent = 'Scannen...';

    const tab = await getActiveTab();
    if (!tab || !tab.id) {
      showEmpty('Kan tabblad niet scannen.');
      return;
    }

    // First, check storage for background network captured streams for this tab
    chrome.storage.local.get(['captured_streams'], (storedData) => {
      const stored = (storedData.captured_streams && storedData.captured_streams[tab.id]) || [];

      // Send message to content script to inspect the DOM
      chrome.tabs.sendMessage(tab.id, { action: 'VIDHAULER_SCAN' }, (response) => {
        let domStreams = [];
        if (!chrome.runtime.lastError && response && Array.isArray(response.media)) {
          domStreams = response.media;
        }

        // Merge DOM discovered streams and network captured streams
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
    streamsList.innerHTML = `
      <div class="empty-state">
        <p>Geen videostream gedetecteerd.</p>
        <small>${msg || 'Speel het college of de video even af (1 sec) en klik opnieuw op het Vidhauler-icoon.'}</small>
      </div>
    `;
    countBadge.textContent = "0 video's gedetecteerd";
  }

  function renderStreams() {
    const filtered = cachedStreams.filter((s) => {
      if (activeFilter === 'video') return s.format !== 'mp3';
      if (activeFilter === 'audio') return s.format === 'mp3';
      return true;
    });

    countBadge.textContent = `${cachedStreams.length} stream${cachedStreams.length !== 1 ? 's' : ''} gevonden`;

    if (filtered.length === 0) {
      showEmpty('Geen streams gevonden voor het geselecteerde filter.');
      return;
    }

    streamsList.innerHTML = '';
    filtered.forEach((stream, idx) => {
      const card = document.createElement('div');
      card.className = 'stream-card';

      const badgeClass =
        stream.format === 'mp3'
          ? 'badge-mp3'
          : stream.format === 'hls'
          ? 'badge-hls'
          : 'badge-mp4';

      const badgeText = stream.format.toUpperCase();

      card.innerHTML = `
        <div class="stream-header">
          <div class="stream-title" title="${stream.title}">${stream.title}</div>
          <span class="stream-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="stream-meta">
          <span>${stream.resolution || 'HD Video'}</span>
          <span>•</span>
          <span>${stream.size || 'Stream'}</span>
        </div>
        <div class="stream-actions">
          <button class="btn-dl" data-idx="${idx}">
            ⬇️ Download ${stream.format === 'mp3' ? 'Audio (MP3)' : 'Video'}
          </button>
          <button class="btn-copy" data-url="${stream.url}" title="Kopieer stream-link">
            🔗
          </button>
        </div>
      `;

      streamsList.appendChild(card);
    });

    // Attach Download handlers
    streamsList.querySelectorAll('.btn-dl').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-idx');
        const stream = filtered[idx];
        if (!stream) return;

        btn.textContent = '⏳ Downloaden gestart...';
        btn.style.background = '#059669';

        const ext = stream.format === 'mp3' ? '.mp3' : '.mp4';
        const filename = sanitizeFilename(stream.title) + ext;

        // Trigger real Chrome download API
        chrome.downloads.download(
          {
            url: stream.url,
            filename: filename,
            saveAs: true,
          },
          (downloadId) => {
            if (chrome.runtime.lastError) {
              btn.textContent = '⚠️ Fout bij opslaan';
              btn.style.background = '#dc2626';
            } else {
              btn.textContent = '✅ Opgeslagen!';
            }
          }
        );
      });
    });

    // Attach Copy link handlers
    streamsList.querySelectorAll('.btn-copy').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const url = e.currentTarget.getAttribute('data-url');
        navigator.clipboard.writeText(url);
        btn.textContent = '✓';
        setTimeout(() => {
          btn.textContent = '🔗';
        }, 1500);
      });
    });
  }

  // Filter handlers
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

  // Scan immediately upon popup open
  scanMedia();
});
