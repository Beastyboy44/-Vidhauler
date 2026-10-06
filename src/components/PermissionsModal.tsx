import React from 'react';
import { X, Shield, Check, Info } from 'lucide-react';
import { ExtensionProject } from '../types/extension';

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ExtensionProject;
  onUpdatePermissions: (newPermissions: string[], newHostPermissions: string[]) => void;
}

const AVAILABLE_PERMISSIONS = [
  {
    id: 'activeTab',
    name: 'activeTab',
    desc: 'Temporary access to the active tab when the user invokes the extension (Recommended by Google).',
    category: 'Essential',
  },
  {
    id: 'storage',
    name: 'storage',
    desc: 'Access chrome.storage.local and chrome.storage.sync for persistent user preferences and data.',
    category: 'Essential',
  },
  {
    id: 'scripting',
    name: 'scripting',
    desc: 'Dynamically inject JavaScript and CSS into web pages via chrome.scripting.executeScript.',
    category: 'DOM & Scripting',
  },
  {
    id: 'tabs',
    name: 'tabs',
    desc: 'Query, mutate, and observe tab URLs, titles, and lifecycle state across windows.',
    category: 'Tabs & Windows',
  },
  {
    id: 'contextMenus',
    name: 'contextMenus',
    desc: 'Add custom options to the browser right-click context menu.',
    category: 'UI & Integration',
  },
  {
    id: 'alarms',
    name: 'alarms',
    desc: 'Schedule code to run periodically in the background service worker without keeping it awake.',
    category: 'Background',
  },
  {
    id: 'notifications',
    name: 'notifications',
    desc: 'Display rich desktop notifications to the user.',
    category: 'UI & Integration',
  },
  {
    id: 'clipboardWrite',
    name: 'clipboardWrite',
    desc: 'Allow the extension to copy text and rich data to the system clipboard.',
    category: 'Productivity',
  },
  {
    id: 'sidePanel',
    name: 'sidePanel',
    desc: 'Enable persistent side panel views in Chrome 114+ Manifest V3.',
    category: 'UI & Integration',
  },
  {
    id: 'bookmarks',
    name: 'bookmarks',
    desc: 'Create, organize, and search the user bookmarks hierarchy.',
    category: 'Browser Data',
  },
];

export const PermissionsModal: React.FC<PermissionsModalProps> = ({
  isOpen,
  onClose,
  project,
  onUpdatePermissions,
}) => {
  if (!isOpen) return null;

  const currentPerms = new Set(project.permissions || []);
  const hasAllUrls = project.hostPermissions?.includes('<all_urls>');

  const togglePermission = (id: string) => {
    const updated = new Set(currentPerms);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    onUpdatePermissions(Array.from(updated), project.hostPermissions || []);
  };

  const toggleHostPermission = () => {
    const newHosts = hasAllUrls ? [] : ['<all_urls>'];
    onUpdatePermissions(project.permissions || [], newHosts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Manifest V3 Permissions Manager
              </h2>
              <p className="text-xs text-slate-400">
                Grant or revoke browser capabilities. Automatically synchronizes with <code className="text-sky-300">manifest.json</code>.
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
        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Host permissions section */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2 text-xs">
                  Host Permission: <code className="text-amber-400 font-mono">&lt;all_urls&gt;</code>
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Allows content scripts and background fetch to interact with any HTTP/HTTPS website. If unchecked, the extension only interacts with pages via explicit user click (<code className="text-sky-300">activeTab</code>).
                </p>
              </div>
              <button
                onClick={toggleHostPermission}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  hasAllUrls
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {hasAllUrls && <Check className="w-3.5 h-3.5" />}
                {hasAllUrls ? 'Granted' : 'Grant All URLs'}
              </button>
            </div>
          </div>

          {/* Regular permissions list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              API Permissions
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_PERMISSIONS.map((perm) => {
                const isSelected = currentPerms.has(perm.id);
                return (
                  <div
                    key={perm.id}
                    onClick={() => togglePermission(perm.id)}
                    className={`flex items-start justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/20 border-purple-500/40 hover:border-purple-500/60'
                        : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">
                          "{perm.id}"
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {perm.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {perm.desc}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all mt-0.5 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'border-slate-700 bg-slate-900/60 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-sky-950/40 border border-sky-500/20 text-xs text-sky-300">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Chrome Web Store enforces the "principle of least privilege". Only request permissions your extension actively uses!</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
