import React from 'react';
import { X, Layers, Cpu, Globe, Layout, ShieldCheck, ArrowRight, Zap, Code2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Can I build a Google Chrome Extension?
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Yes, Absolutely!
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Understanding Google Chrome's Manifest V3 Architecture & Communication Flow
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Quick Answer Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 to-indigo-950/60 border border-sky-500/30">
            <h3 className="font-semibold text-sky-300 mb-1 flex items-center gap-2 text-base">
              <Zap className="w-4 h-4 text-amber-400" /> Yes! Chrome Extensions are just HTML, CSS & JavaScript!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google Chrome extensions do not require special binary compilers. They are simply regular web files (HTML, CSS, JavaScript, JSON) that run with elevated browser permissions inside Google Chrome. You can design, edit, test, and export a ready-to-use extension right in this studio!
            </p>
          </div>

          {/* Architecture Anatomy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              The 4 Core Pillars of Chrome Extensions (Manifest V3)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Manifest */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-sky-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-sky-400 font-semibold mb-2">
                  <div className="p-1.5 rounded-lg bg-sky-500/10"><Code2 className="w-4 h-4" /></div>
                  1. manifest.json (The Blueprint)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every extension must have a <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">manifest.json</code> file. It defines your extension's name, version, icons, requested permissions (e.g. <code className="text-sky-300">activeTab</code>, <code className="text-sky-300">storage</code>), and which scripts run where.
                </p>
              </div>

              {/* Popup UI */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10"><Layout className="w-4 h-4" /></div>
                  2. Popup UI (Action Dropdown)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When a user clicks your extension icon in the toolbar, Chrome opens a small dropdown window rendered with standard <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">popup.html</code> and <code className="text-emerald-300">popup.js</code>. Perfect for quick settings, buttons, and summaries.
                </p>
              </div>

              {/* Content Scripts */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-amber-400 font-semibold mb-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10"><Globe className="w-4 h-4" /></div>
                  3. Content Scripts (In-Page DOM Access)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Runs directly inside visited web pages (e.g. google.com, wikipedia.org). Content scripts can read article text, modify CSS styling, inject floating overlays, or highlight selected sentences.
                </p>
              </div>

              {/* Service Worker */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-purple-400 font-semibold mb-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/10"><Cpu className="w-4 h-4" /></div>
                  4. Background Service Worker
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In Manifest V3, background tasks run in a lightweight event-driven Service Worker (<code className="text-purple-300 bg-slate-900 px-1 py-0.5 rounded">background.js</code>). It listens to alarms, right-click context menus, and browser lifecycle events without wasting RAM.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Message Passing Flow */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> How They Talk To Each Other: Message Passing
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/80 rounded-lg text-xs font-mono">
              <div className="text-center p-2 rounded bg-slate-800 border border-slate-700 w-full sm:w-auto">
                <div className="text-emerald-400 font-bold">Popup UI</div>
                <div className="text-[10px] text-slate-400">popup.js</div>
              </div>
              <div className="flex items-center gap-1 text-sky-400 text-[11px]">
                <span>chrome.tabs.sendMessage()</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-center p-2 rounded bg-slate-800 border border-slate-700 w-full sm:w-auto">
                <div className="text-amber-400 font-bold">Content Script</div>
                <div className="text-[10px] text-slate-400">content.js (In Webpage)</div>
              </div>
              <div className="flex items-center gap-1 text-purple-400 text-[11px]">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>chrome.runtime.sendMessage()</span>
              </div>
              <div className="text-center p-2 rounded bg-slate-800 border border-slate-700 w-full sm:w-auto">
                <div className="text-purple-400 font-bold">Service Worker</div>
                <div className="text-[10px] text-slate-400">background.js</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              All components can also share persistent state using <code className="text-sky-300">chrome.storage.local.get()</code> and <code className="text-sky-300">set()</code>!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors shadow-lg shadow-sky-600/20"
          >
            Got it, Let's Build!
          </button>
        </div>
      </div>
    </div>
  );
};
