import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Settings, 
  Trash2, 
  Music, 
  Film, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Sliders, 
  Play, 
  Check, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { TriBallLogo } from './TriBallLogo';
import { DetectedStream } from '../data/downloadhelperData';

interface ExtensionMockupProps {
  streams: DetectedStream[];
  activeSiteTitle?: string;
  isPremium?: boolean;
  onOpenSettings?: () => void;
  onOpenPremium?: () => void;
}

interface ActiveDownload {
  streamId: string;
  progress: number;
  speed: string;
  status: 'connecting' | 'downloading' | 'muxing' | 'finished';
}

export const ExtensionMockup: React.FC<ExtensionMockupProps> = ({
  streams,
  activeSiteTitle = 'Tech World Keynote 2026',
  isPremium = false,
  onOpenSettings,
  onOpenPremium,
}) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio'>('all');
  const [downloads, setDownloads] = useState<Record<string, ActiveDownload>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [smartNamingTemplate, setSmartNamingTemplate] = useState('{title} - [{quality}]');

  const filteredStreams = streams.filter((s) => {
    if (filter === 'video') return !s.isAudioOnly;
    if (filter === 'audio') return s.isAudioOnly;
    return true;
  });

  // Handle simulated download progress
  const startDownload = (stream: DetectedStream) => {
    if (downloads[stream.id]?.status === 'downloading') return;

    setDownloads((prev) => ({
      ...prev,
      [stream.id]: {
        streamId: stream.id,
        progress: 10,
        speed: '12.8 MB/s',
        status: 'connecting',
      },
    }));

    // Simulate progress ticks
    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 18) + 12;
      if (currentProgress >= 90 && stream.format === 'hls' && !isPremium) {
        // Muxing step
        setDownloads((prev) => ({
          ...prev,
          [stream.id]: {
            streamId: stream.id,
            progress: 92,
            speed: 'Stitching chunks & FFmpeg muxing...',
            status: 'muxing',
          },
        }));
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setDownloads((prev) => ({
          ...prev,
          [stream.id]: {
            streamId: stream.id,
            progress: 100,
            speed: 'Gereed',
            status: 'finished',
          },
        }));

        // Trigger real file download in browser
        try {
          const a = document.createElement('a');
          a.href = stream.url;
          a.download = stream.title;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (e) {
          console.log('Download trigger error:', e);
        }
      } else {
        setDownloads((prev) => ({
          ...prev,
          [stream.id]: {
            streamId: stream.id,
            progress: Math.min(95, currentProgress),
            speed: `${(Math.random() * 10 + 12).toFixed(1)} MB/s`,
            status: 'downloading',
          },
        }));
      }
    }, 450);
  };

  const copyUrl = (stream: DetectedStream) => {
    navigator.clipboard.writeText(stream.url);
    setCopiedId(stream.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-black/80 overflow-hidden font-sans text-slate-100 flex flex-col">
      {/* Top extension bar header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TriBallLogo size="sm" animated={streams.length > 0} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs tracking-tight text-white">Vidhauler</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                v1.0 MV3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
              {streams.length} media stream{streams.length !== 1 ? 's' : ''} gedetecteerd
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isPremium ? (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Premium
            </span>
          ) : (
            <button
              onClick={onOpenPremium}
              className="px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/40 text-[10px] font-semibold flex items-center gap-1 transition-colors"
            >
              Go Premium
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Settings & Preferences"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Quick Action Bar */}
      <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({streams.length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'video'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Video ({streams.filter((s) => !s.isAudioOnly).length})
          </button>
          <button
            onClick={() => setFilter('audio')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === 'audio'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Audio ({streams.filter((s) => s.isAudioOnly).length})
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Sniffer active</span>
        </div>
      </div>

      {/* Detected Streams List */}
      <div className="p-3 space-y-2.5 max-h-[360px] overflow-y-auto">
        {filteredStreams.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            <Film className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p>No streams match the filter.</p>
            <p className="text-[10px] text-slate-500 mt-1">Play the video to trigger network detection.</p>
          </div>
        ) : (
          filteredStreams.map((stream) => {
            const dl = downloads[stream.id];
            const isDownloading = dl && dl.status !== 'finished';
            const isFinished = dl && dl.status === 'finished';

            return (
              <div
                key={stream.id}
                className="group relative p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-blue-500/40 transition-all hover:bg-slate-800/90"
              >
                {/* Title & Metadata */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          stream.isAudioOnly
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : stream.format === 'hls'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {stream.qualityBadge}
                      </span>
                      <span className="font-semibold text-xs text-white truncate max-w-[210px] group-hover:text-blue-300 transition-colors">
                        {stream.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{stream.resolution}</span>
                      <span>•</span>
                      <span>{stream.size}</span>
                      <span>•</span>
                      <span>{stream.bitrate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => copyUrl(stream)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors"
                      title="Copy stream direct link"
                    >
                      {copiedId === stream.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => startDownload(stream)}
                      disabled={isDownloading || isFinished}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        isFinished
                          ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                          : isDownloading
                          ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 cursor-wait'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 active:scale-95'
                      }`}
                    >
                      {isFinished ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Saved</span>
                        </>
                      ) : isDownloading ? (
                        <>
                          <span className="w-3 h-3 border-2 border-blue-300 border-t-transparent rounded-full animate-spin" />
                          <span>{dl?.progress}%</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Download Progress Indicator */}
                {dl && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/50">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-medium text-blue-300">{dl.speed}</span>
                      <span className="font-mono text-slate-300">{dl.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          dl.status === 'finished'
                            ? 'bg-emerald-500'
                            : dl.status === 'muxing'
                            ? 'bg-amber-500'
                            : 'bg-gradient-to-r from-blue-500 to-sky-400'
                        }`}
                        style={{ width: `${dl.progress}%` }}
                      />
                    </div>

                    {!isPremium && stream.format === 'hls' && dl.status === 'finished' && (
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400/90">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>Free version embeds QR watermark on stitched HLS streams. Upgrade to remove.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom status bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-slate-500">Naamgeving:</span>
          <span className="font-mono text-blue-400 text-[10px]">{smartNamingTemplate}</span>
        </div>

        <span className="text-[10px] text-slate-500">Vidhauler CoApp: Actief</span>
      </div>
    </div>
  );
};
