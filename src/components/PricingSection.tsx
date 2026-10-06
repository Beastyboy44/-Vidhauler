import React, { useState } from 'react';
import { Check, X, KeyRound } from 'lucide-react';

interface PricingSectionProps {
  isPremium: boolean;
  onActivateLicense: (key: string) => void;
  onOpenInstall: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  isPremium,
  onActivateLicense,
  onOpenInstall,
}) => {
  const [licenseInput, setLicenseInput] = useState('');
  const [activationMessage, setActivationMessage] = useState<string | null>(null);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseInput.trim()) return;

    onActivateLicense(licenseInput.trim());
    setActivationMessage('Licentie actief! Vidhauler is nu ontgrendeld.');
    setTimeout(() => setActivationMessage(null), 4000);
  };

  return (
    <section id="tarieven" className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-800/60">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Eenvoudige tarieven
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Kies voor een flexibel jaarabonnement of koop de extensie levenslang in één keer.
        </p>
      </div>

      {/* 3 Minimal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {/* Tier 1: Gratis */}
        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Standaard</h3>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Gratis</span>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-white">€0</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Voor basisdownloads van standaard MP4 webvideo's.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Standaard MP4 downloads</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>Canvas &amp; Blackboard detectie</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <span>QR-watermerk bij HLS</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onOpenInstall}
            className="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Gratis downloaden
          </button>
        </div>

        {/* Tier 2: €10 per jaar */}
        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Jaarabonnement</h3>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-medium">Per jaar</span>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-white">€10</span>
              <span className="text-xs text-slate-400 ml-1">/ jr</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Ideaal voor gebruik tijdens één specifiek studiejaar.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>100% Watermerkvrij</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Onbeperkte HLS &amp; DASH lessen</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>MP3 audio-extractie</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onActivateLicense('VIDHAULER-YEAR-2026')}
            className="w-full mt-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors border border-slate-700"
          >
            {isPremium ? 'Actief' : 'Kies €10 / jaar'}
          </button>
        </div>

        {/* Tier 3: €24 om te kopen */}
        <div className="rounded-xl bg-slate-900/90 border border-blue-500/60 p-5 flex flex-col justify-between relative shadow-lg">
          <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase rounded-full">
            Beste Keuze
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Om te Kopen</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-medium">Levenslang</span>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-white">€24</span>
              <span className="text-xs text-slate-400 ml-1">eenmalig</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Eenmalig betalen voor je gehele bachelor, master en daarna.
            </p>

            <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Geen abonnement of terugkerende kosten</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>100% Watermerkvrij</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Hifi 320k MP3 &amp; 1080p stream capture</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onActivateLicense('VIDHAULER-LIFETIME-2026')}
            className="w-full mt-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
          >
            {isPremium ? 'Actief' : 'Koop voor €24 (Levenslang)'}
          </button>
        </div>
      </div>

      {/* Minimal Activation Form */}
      <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 mb-2 text-slate-300 font-medium">
          <KeyRound className="w-3.5 h-3.5 text-slate-400" />
          <span>Heb je al een sleutel? Activeer direct</span>
        </div>
        <form onSubmit={handleActivate} className="flex gap-2">
          <input
            type="text"
            value={licenseInput}
            onChange={(e) => setLicenseInput(e.target.value)}
            placeholder="bijv. VIDHAULER-STUDENT-XXXX"
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Activeer
          </button>
        </form>
        {activationMessage && (
          <p className="mt-2 text-emerald-400 text-[11px]">{activationMessage}</p>
        )}
      </div>
    </section>
  );
};
