// Vidhauler Content Script (Manifest V3)
console.log('⚡ Vidhauler content-script geladen en actief op deze pagina.');

// Helper to extract clean page title for colleges & lectures
function getCleanLectureTitle() {
  let title = document.title || 'college_les';
  // Strip common noisy suffixes from blackboard/canvas
  title = title
    .replace(/\s*[-|•]\s*(Canvas|Blackboard|Panopto|Kaltura|Universiteit).*$/i, '')
    .trim();
  return title || 'Vidhauler_Video';
}

// Scans DOM for video and audio elements
function findMediaElements() {
  const mediaList = [];
  const baseTitle = getCleanLectureTitle();

  // 1. Scan all <video> elements
  document.querySelectorAll('video').forEach((vid, idx) => {
    let src = vid.currentSrc || vid.src;

    if (!src) {
      const sourceTag = vid.querySelector('source');
      if (sourceTag) src = sourceTag.src;
    }

    if (src && src.startsWith('http')) {
      const isHls = src.includes('.m3u8');
      const isDash = src.includes('.mpd');
      const resolution =
        vid.videoHeight && vid.videoWidth
          ? `${vid.videoHeight}p HD`
          : '1080p HD';

      mediaList.push({
        url: src,
        title: `${baseTitle} (Deel ${idx + 1})`,
        format: isHls ? 'hls' : isDash ? 'dash' : 'mp4',
        resolution: resolution,
        size: '~ ' + (vid.duration ? Math.round((vid.duration * 2.5) / 8) + ' MB' : 'Web Stream'),
        duration: vid.duration ? Math.round(vid.duration) + 's' : 'Onbekend'
      });
    }
  });

  // 2. Scan all <audio> elements (for podcasts & lecture recordings)
  document.querySelectorAll('audio').forEach((aud, idx) => {
    let src = aud.currentSrc || aud.src;
    if (!src) {
      const sourceTag = aud.querySelector('source');
      if (sourceTag) src = sourceTag.src;
    }

    if (src && src.startsWith('http')) {
      mediaList.push({
        url: src,
        title: `${baseTitle} (Audio Podcast)`,
        format: 'mp3',
        resolution: 'Audio 320kbps',
        size: '~ Audio Track',
      });
    }
  });

  // 3. Scan common Canvas / Panopto iframe / embedded players
  document.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.src;
    if (src && (src.includes('panopto') || src.includes('kaltura') || src.includes('vimeo'))) {
      mediaList.push({
        url: src,
        title: `${baseTitle} (Ingebedde Speler)`,
        format: 'mp4',
        resolution: 'Embedded Video',
        size: 'Stream Link',
      });
    }
  });

  return mediaList;
}

// Listen for popup scan requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'VIDHAULER_SCAN') {
    const detected = findMediaElements();
    sendResponse({ media: detected });
    return true;
  }
});

// Watch for dynamically loaded player elements (e.g. clicking 'Play' in Canvas)
const observer = new MutationObserver(() => {
  const media = findMediaElements();
  if (media.length > 0) {
    // Notify background worker to light up badge count
    try {
      chrome.runtime.sendMessage({
        action: 'VIDHAULER_MEDIA_DETECTED',
        count: media.length,
      });
    } catch (e) {
      // Extension context invalidated on reload
    }
  }
});

observer.observe(document.body || document.documentElement, {
  childList: true,
  subtree: true,
});
