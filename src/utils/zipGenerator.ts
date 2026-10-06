import JSZip from 'jszip';
import { ExtensionProject } from '../types/extension';

/**
 * Creates a simple colored icon as a PNG ArrayBuffer using HTML Canvas
 */
async function generateIconPng(size: number, color = '#38bdf8', letter = 'E'): Promise<ArrayBuffer> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Background rounded box or gradient circle
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#0284c7');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    const radius = size * 0.22;
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, size * 0.05);
    ctx.stroke();

    // Text letter or icon
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.floor(size * 0.58)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, size / 2, size / 2 + size * 0.04);
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        blob.arrayBuffer().then(resolve);
      } else {
        resolve(new ArrayBuffer(0));
      }
    }, 'image/png');
  });
}

export async function exportExtensionZip(project: ExtensionProject): Promise<Blob> {
  const zip = new JSZip();

  // Add all user-defined files
  Object.values(project.files).forEach((file) => {
    zip.file(file.path, file.content);
  });

  // Generate PNG icons if not already provided
  const iconInitial = (project.shortName || project.name || 'E').charAt(0).toUpperCase();
  const icon16 = await generateIconPng(16, '#0284c7', iconInitial);
  const icon48 = await generateIconPng(48, '#0284c7', iconInitial);
  const icon128 = await generateIconPng(128, '#0284c7', iconInitial);

  zip.file('icons/icon16.png', icon16);
  zip.file('icons/icon48.png', icon48);
  zip.file('icons/icon128.png', icon128);

  // Add helpful installation guide README
  const readmeContent = `# ${project.name} (Manifest V3)

This is a fully compliant Google Chrome Extension built with Manifest V3.

## How to Install in Google Chrome, Brave, or Microsoft Edge:

1. **Unzip this file**: Extract all contents into a regular folder on your computer (e.g. \`Downloads/${project.id}\`).
2. **Open Extensions page**:
   - In Google Chrome, go to: \`chrome://extensions/\`
   - In Brave, go to: \`brave://extensions/\`
   - In Microsoft Edge, go to: \`edge://extensions/\`
3. **Turn ON Developer Mode**:
   - Look for the toggle switch labeled **Developer mode** in the top-right corner and turn it **ON**.
4. **Load Unpacked**:
   - Click the button **Load unpacked** (top-left).
   - Select the unzipped folder containing \`manifest.json\`.
5. **Pin & Test**:
   - Click the puzzle icon in your Chrome toolbar.
   - Click the Pin button next to **${project.name}**.
   - Click your extension icon to test it out!

## Extension Architecture:
- \`manifest.json\`: Extension manifest and permissions.
- \`popup/\`: Dropdown UI when clicking the toolbar icon.
- \`scripts/background.js\`: Manifest V3 Service Worker.
- \`scripts/content.js\`: In-page scripts interacting with web page DOM.
- \`icons/\`: Extension icons (16x16, 48x48, 128x128).

Exported from Vidhauler.
`;

  zip.file('README.md', readmeContent);

  // Generate and return zip blob
  return await zip.generateAsync({ type: 'blob' });
}
