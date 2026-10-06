import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Puzzle, 
  FolderArchive, 
  ToggleRight, 
  Sparkles, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { exportExtensionZip } from '../utils/zipGenerator';
import { EXTENSION_TEMPLATES } from '../data/templates';
import { TriBallLogo } from './TriBallLogo';

interface InstallExtensionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBrowser?: string;
}

export const InstallExtensionModal: React.FC<InstallExtensionModalProps> = ({
  isOpen,
  onClose,
  defaultBrowser = 'chrome',
}) => {
  const [selectedBrowser, setSelectedBrowser] = useState(defaultBrowser);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      // Use the first template or create downloadhelper extension manifest project
      const template = EXTENSION_TEMPLATES[0];
      const blob = await exportExtensionZip(template);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vidhauler-chrome-extension-mv3.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const copyExtensionsUrl = () => {
    navigator.clipboard.writeText('chrome://extensions/');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <TriBallLogo size="sm" />
            <div>
              <h3 className="text-base font-bold text-white">
                Installeer Vidhauler Extensie
              </h3>
              <p className="text-xs text-slate-400">
                Kies je browser of download direct het complete Manifest V3 extensiepakket (.zip)
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Browser Selector Tabs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'chrome', label: 'Google Chrome', icon: '🌐', store: 'Chrome Web Store' },
              { id: 'firefox', label: 'Mozilla Firefox', icon: '🦊', store: 'Firefox Add-ons' },
              { id: 'edge', label: 'Microsoft Edge', icon: '🌀', store: 'Edge Add-ons' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrowser(b.id)}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  selectedBrowser === b.id
                    ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/30'
                    : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-lg">{b.icon}</span>
                <span className="font-bold text-xs text-white">{b.label}</span>
                <span className="text-[10px] text-slate-400">{b.store}</span>
              </button>
            ))}
          </div>

          {/* Quick ZIP Export Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                <FolderArchive className="w-4 h-4 text-blue-400" />
                Download Vidhauler Extensie (.ZIP)
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Download direct het volledige Manifest V3 pakket met manifest.json, popup, service worker en iconen.
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 flex-shrink-0 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Inpakken...' : 'Download Vidhauler (.zip)'}</span>
            </button>
          </div>

          {/* 4-Step Installation Walkthrough */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Hoe installeer je het gedownloade pakket in Chrome / Edge / Brave:
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </span>
                <div>
                  <strong className="text-white">Pak het .zip bestand uit</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Klik met de rechtermuisknop op het gedownloade bestand en kies "Alles uitpakken..."
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </span>
                <div className="flex-1">
                  <strong className="text-white">Open de extensiepagina in je browser</strong>
                  <div className="mt-1 flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-[11px] text-blue-300">
                    <span className="flex-1">chrome://extensions</span>
                    <button
                      onClick={copyExtensionsUrl}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1"
                    >
                      {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUrl ? 'Gekopieerd' : 'Kopieer'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </span>
                <div>
                  <strong className="text-white">Zet "Ontwikkelaarsmodus" (Developer mode) AAN</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Rechtsboven op de extensiepagina vind je de schakelaar Ontwikkelaarsmodus.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  4
                </span>
                <div>
                  <strong className="text-white">Klik op "Uitgepakte extensie laden"</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Selecteer de uitgepakte map waarin <code className="text-blue-300">manifest.json</code> staat. De extensie verschijnt direct in je werkbalk!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
