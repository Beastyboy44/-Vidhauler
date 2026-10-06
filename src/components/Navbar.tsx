import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { TriBallLogo } from './TriBallLogo';

interface NavbarProps {
  onOpenInstall: (browser?: string) => void;
  onOpenPremium: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenInstall, 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <TriBallLogo size="sm" animated={false} />
          <span className="font-bold text-base tracking-tight text-white">
            Vidhauler
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#demo" className="hover:text-white transition-colors">
            Live Demo
          </a>
          <a href="#studenten" className="hover:text-white transition-colors">
            Voor Studenten
          </a>
          <a href="#tarieven" className="hover:text-white transition-colors">
            Tarieven
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenInstall('chrome')}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Extensie</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800/80 px-6 py-4 space-y-3 text-xs text-slate-300">
          <a
            href="#demo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            Live Demo
          </a>
          <a
            href="#studenten"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            Voor Studenten
          </a>
          <a
            href="#tarieven"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            Tarieven
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1 hover:text-white"
          >
            Veelgestelde Vragen
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInstall('chrome');
              }}
              className="w-full py-2 rounded-lg bg-white text-slate-950 font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Extensie</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
