import React from 'react';
import { 
  GraduationCap, 
  Laptop, 
  Headphones, 
  WifiOff, 
  Clock, 
  ArrowRight
} from 'lucide-react';

interface StudentFocusBannerProps {
  onScrollToDemo: () => void;
  onOpenInstall: () => void;
}

export const StudentFocusBanner: React.FC<StudentFocusBannerProps> = ({
  onScrollToDemo,
  onOpenInstall,
}) => {
  const benefits = [
    {
      icon: <Laptop className="w-5 h-5 text-blue-400" />,
      title: 'Canvas, Blackboard & Panopto',
      desc: 'Veel leeromgevingen schakelen de downloadknop uit. Vidhauler herkent de verborgen videostroom in je netwerkverkeer.',
    },
    {
      icon: <WifiOff className="w-5 h-5 text-emerald-400" />,
      title: '100% Offline Studeren',
      desc: 'Sla colleges op in 1080p om te leren in de trein, bus of plekken met trage Wi-Fi zonder databundels te verspillen.',
    },
    {
      icon: <Headphones className="w-5 h-5 text-amber-400" />,
      title: 'Luistercollege als MP3',
      desc: 'Extraheer met 1 klik de audiotrack om colleges onderweg op 1.5x of 2x snelheid als podcast te beluisteren.',
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      title: 'Blijvend Studiearchief',
      desc: 'Als modules na de tentamens sluiten, heb je al je videomateriaal en slides veilig lokaal op je laptop bewaard.',
    },
  ];

  return (
    <section id="studenten" className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-800/60">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Waarom studenten Vidhauler gebruiken
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
          Ontwikkeld om studeren flexibeler te maken zonder afhankelijk te zijn van constante internetverbindingen.
        </p>
      </div>

      {/* 4 Clean Minimal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center mb-3">
              {b.icon}
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{b.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Clean Platform Support List */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
        <span className="font-medium text-slate-300 mr-1">Ondersteunt o.a.:</span>
        {['Canvas LMS', 'Blackboard', 'Panopto', 'Kaltura', 'Brightspace', 'Moodle', 'Zoom & Teams'].map((p) => (
          <span key={p} className="px-2 py-0.5 rounded bg-slate-800/80 text-[11px] text-slate-300">
            {p}
          </span>
        ))}
      </div>
    </section>
  );
};
