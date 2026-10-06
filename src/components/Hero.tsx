import React from 'react';
import { Download, ArrowDown, GraduationCap } from 'lucide-react';

interface HeroProps {
  onOpenInstall: (browser: string) => void;
  onOpenPremium: () => void;
  onScrollToDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInstall,
  onScrollToDemo,
}) => {
  return (
    <section className="pt-16 pb-16 px-6 max-w-4xl mx-auto text-center">
      {/* Category Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs mb-6 font-medium">
        <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
        <span>Gemaakt voor studenten &amp; online onderwijs</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
        Download colleges en video's.{' '}
        <span className="text-slate-400 font-normal">
          Zonder gedoe.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
        Geen downloadknop op Canvas, Blackboard of Panopto? Vidhauler herkent de onderliggende videostroom automatisch zodra de les afspeelt. Sla op in 1080p of als MP3 om offline te studeren.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onOpenInstall('chrome')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Download Extensie (Gratis)</span>
        </button>

        <button
          onClick={onScrollToDemo}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span>Bekijk Live Simulator</span>
          <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Minimal Trust Indicator */}
      <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-slate-500">
        <span>Manifest V3</span>
        <span>•</span>
        <span>100% Lokaal op je PC</span>
        <span>•</span>
        <span>Geen tracking</span>
      </div>
    </section>
  );
};
