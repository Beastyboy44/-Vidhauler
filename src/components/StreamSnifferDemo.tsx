import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  Globe, 
  Terminal
} from 'lucide-react';
import { DEMO_VIDEO_SOURCES, VideoSourceDemo } from '../data/downloadhelperData';
import { TriBallLogo } from './TriBallLogo';
import { ExtensionMockup } from './ExtensionMockup';

interface StreamSnifferDemoProps {
  isPremium: boolean;
  onOpenPremium: () => void;
}

export const StreamSnifferDemo: React.FC<StreamSnifferDemoProps> = ({
  isPremium,
  onOpenPremium,
}) => {
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(14);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [networkLogs, setNetworkLogs] = useState<string[]>([]);

  const activeSource: VideoSourceDemo = DEMO_VIDEO_SOURCES[activeSourceIndex];

  useEffect(() => {
    const initialLogs = [
      `[HTTP GET] ${activeSource.pageUrl}`,
      `[VIDHAULER] Injected content-script`,
      `[INTERCEPT] ${activeSource.streams[0].url} (${activeSource.streams[0].qualityBadge})`,
    ];
    setNetworkLogs(initialLogs);

    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((t) => (t + 1) % 240);
        const chunkIndex = Math.floor(Math.random() * 80) + 1;
        const newLog = `[STREAM] chunk_${chunkIndex}.ts • 1.8 MB`;
        setNetworkLogs((prev) => [newLog, ...prev.slice(0, 5)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSource, isPlaying]);

  return (
    <section id="demo" className="py-12 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactieve Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Test hoe Vidhauler online lessen detecteert en opslaat.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {DEMO_VIDEO_SOURCES.map((source, idx) => (
            <button
              key={source.id}
              onClick={() => {
                setActiveSourceIndex(idx);
                setCurrentTime(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeSourceIndex === idx
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {source.id === 'canvas-lecture' ? 'Canvas College' : source.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Browser Canvas */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {/* Browser URL Bar */}
        <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
          </div>

          <div className="flex-1 max-w-md mx-2">
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-400">
              <Globe className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">{activeSource.pageUrl}</span>
            </div>
          </div>

          {/* Vidhauler Pinned Icon */}
          <button
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className={`p-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isPopupOpen
                ? 'bg-slate-800 border-slate-700 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
            title="Klik om Vidhauler popup te openen"
          >
            <TriBallLogo size="sm" animated={isPlaying} activeCount={activeSource.streams.length} />
          </button>
        </div>

        {/* Content Split: Left Video & Right Vidhauler Popup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Video Player */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80">
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800/80 group">
                <img
                  src={activeSource.thumbnail}
                  alt={activeSource.videoTitle}
                  className="w-full h-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 text-slate-950 flex items-center justify-center hover:bg-white transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div className="absolute bottom-0 inset-x-0 p-3 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-[11px]">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>0:{currentTime < 10 ? `0${currentTime}` : currentTime} / {activeSource.duration}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-black/50 px-1.5 py-0.5 rounded">
                    1080p
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">{activeSource.platform}</span>
                <h3 className="text-sm font-semibold text-white mt-0.5">{activeSource.videoTitle}</h3>
              </div>
            </div>

            {/* Quiet Sniffer Log */}
            <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800/60 text-[10px] font-mono text-slate-400">
              <div className="flex items-center justify-between mb-1 text-slate-500">
                <span className="flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-blue-400" />
                  Netwerk Sniffer
                </span>
                <span className="text-emerald-400">Actief</span>
              </div>
              <div className="space-y-0.5 max-h-16 overflow-y-auto">
                {networkLogs.map((log, i) => (
                  <div key={i} className="truncate text-slate-400">
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extension Mockup */}
          <div className="lg:col-span-5 p-6 flex items-center justify-center bg-slate-950/40">
            <div className="w-full">
              <ExtensionMockup
                streams={activeSource.streams}
                activeSiteTitle={activeSource.videoTitle}
                isPremium={isPremium}
                onOpenPremium={onOpenPremium}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
