import React from 'react';
import { TriBallLogo } from './TriBallLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 text-slate-500 text-xs py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <TriBallLogo size="sm" />
          <span className="font-semibold text-white text-sm">Vidhauler</span>
          <span className="text-[11px] text-slate-500">• Manifest V3 College Downloader</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#studenten" className="hover:text-white transition-colors">Voor Studenten</a>
          <a href="#tarieven" className="hover:text-white transition-colors">Tarieven (€10/jr • €24 koop)</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="text-[11px] text-slate-500">
          &copy; 2026 Vidhauler. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
};
