import React, { useState } from 'react';
import { 
  Cpu, 
  Download, 
  CheckCircle2, 
  Terminal, 
  RefreshCw, 
  Laptop, 
  HardDrive, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { COMPANION_APP_DOWNLOADS } from '../data/downloadhelperData';

export const CompanionAppSection: React.FC = () => {
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const simulateDownload = (filename: string) => {
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const checkConnection = () => {
    setCheckingStatus(true);
    setTimeout(() => {
      setCheckingStatus(false);
    }, 800);
  };

  return (
    <section id="coapp" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Information */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Vidhauler Companion Application (CoApp v2.0.19)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Waarom een Companion App?
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Moderne browsers zoals Chrome en Firefox draaien extensies in een beveiligde sandbox. Om complexe HLS-videobrokjes samen te voegen, losse audiosporen te muxen met FFmpeg en bestanden direct naar gewenste mappen te schrijven, werkt Vidhauler naadloos samen met onze open-source <strong>Companion App</strong>.
          </p>

          <div className="space-y-3 pt-2 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Voor 90% van MP4 video's</strong>: Direct downloaden zonder CoApp!</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>Voor gefragmenteerde HLS &amp; DASH streams</strong>: Bliksemsnelle FFmpeg samenvoeging.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span><strong>100% Veilig &amp; Open Source</strong>: Geen achtergronddiensten die je PC vertragen.</span>
            </div>
          </div>

          {/* Connection Test Badge */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-xs font-bold text-white">Vidhauler CoApp Status: Actief</div>
                <div className="text-[10px] text-slate-400 font-mono">Native Messaging Bridge v2.0.19</div>
              </div>
            </div>

            <button
              onClick={checkConnection}
              disabled={checkingStatus}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingStatus ? 'animate-spin text-blue-400' : ''}`} />
              <span>{checkingStatus ? 'Testen...' : 'Test Verbinding'}</span>
            </button>
          </div>
        </div>

        {/* Right Download Cards */}
        <div className="lg:col-span-6 space-y-3.5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
            Download VDH CoApp voor jouw besturingssysteem
          </h3>

          {COMPANION_APP_DOWNLOADS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400 font-bold group-hover:scale-105 transition-transform">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{item.os}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>
                  <span className="text-[10px] text-slate-500 font-mono">{item.fileSize}</span>
                </div>
              </div>

              <button
                onClick={() => simulateDownload(item.filename)}
                className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadSuccess === item.filename ? 'Gedownload!' : 'Download'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
