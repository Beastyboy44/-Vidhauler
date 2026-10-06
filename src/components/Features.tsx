import React from 'react';
import { 
  Radio, 
  GraduationCap, 
  Headphones, 
  FolderSync, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  SlidersHorizontal 
} from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: <Radio className="w-6 h-6 text-blue-400" />,
      title: 'Realtime Stream Sniffer',
      tag: 'Krachtige Detectie',
      desc: 'Herken automatisch HLS (.m3u8), DASH en embedded MP4 videostreams zodra ze afspelen in je browser. Geen externe links plakken nodig.',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      title: 'Speciaal voor Onderwijs & Colleges',
      tag: 'Voor Studenten',
      desc: 'Bypasst ontbrekende downloadknoppen op Canvas, Blackboard, Brightspace, Panopto en Kaltura. Sla lessen in 1080p op voor offline tentamenstudie.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-400" />,
      title: 'Directe MP3 Audio Extractie',
      tag: 'Luistercolleges',
      desc: 'Extraheer met één klik de zuivere audiotrack van elk college of interview. Luister onderweg in de trein op 1.5x of 2x snelheid.',
    },
    {
      icon: <FolderSync className="w-6 h-6 text-purple-400" />,
      title: 'Smart Naming & Automatische Mappen',
      tag: 'Structuur',
      desc: 'Stel slimme regels in zoals {vak-titel}_{datum}_{kwaliteit}.mp4. Houd je studiemappen en projecten automatisch strak georganiseerd.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-400" />,
      title: '100% Privacy & Lokale Verwerking',
      tag: 'Geen Tracking',
      desc: 'Zero telemetry, geen reclames en geen gegevensverkoop. Alle video-onderschepping en bestandsconversie vindt uitsluitend lokaal op je computer plaats.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-rose-400" />,
      title: 'FFmpeg Companion App (CoApp)',
      tag: 'Geavanceerd',
      desc: 'Voor complexe gefragmenteerde streams voegt de gratis Companion App audio- en videosporen naadloos samen via krachtige FFmpeg-technologie.',
    },
  ];

  return (
    <section id="functies" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Waarom Vidhauler?
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          Alles Wat Je Nodig Hebt in Eén Extensie
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          Ontwikkeld om betrouwbaar te werken op duizenden verschillende videosites zonder ingewikkelde configuratie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all hover:bg-slate-900 group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {f.tag}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {f.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
