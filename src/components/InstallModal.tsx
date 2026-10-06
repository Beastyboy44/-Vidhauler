import React, { useState } from 'react';
import { X, Check, Copy, Download, FolderArchive, ToggleRight, Puzzle, Sparkles } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose, projectName }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const copyChromeUrl = () => {
    navigator.clipboard.writeText('chrome://extensions/');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                How to Install Your Extension in Chrome
              </h2>
              <p className="text-xs text-slate-400">
                4 simple steps to run <span className="text-sky-300 font-semibold">{projectName}</span> in your actual browser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Step 1 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
              1
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <FolderArchive className="w-4 h-4 text-sky-400" /> Download & Unzip the Folder
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click <strong className="text-sky-300">"Export (.ZIP)"</strong> in this studio. Once downloaded, right-click the file and choose <em>"Extract All..."</em> (Windows) or double-click to unzip (macOS/Linux).
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Puzzle className="w-4 h-4 text-emerald-400" /> Open Chrome's Extensions Management Page
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open a new tab in Google Chrome, Brave, or Edge, and navigate to the extensions manager:
              </p>
              <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs text-sky-300">
                <span className="flex-1 select-all">chrome://extensions</span>
                <button
                  onClick={copyChromeUrl}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-[11px] transition-colors"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedUrl ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
              3
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <ToggleRight className="w-4 h-4 text-amber-400" /> Enable "Developer mode"
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                In the top right corner of the Extensions page, toggle the switch labeled <strong className="text-amber-300">Developer mode</strong> to ON. This will reveal the developer action buttons.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
              4
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Click "Load unpacked" and Select Folder
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click the <strong className="text-white">"Load unpacked"</strong> button in the top left corner, then pick your unzipped folder containing <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">manifest.json</code>. Your extension is now installed and active!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-lg shadow-emerald-600/20"
          >
            I'm Ready to Test
          </button>
        </div>
      </div>
    </div>
  );
};
