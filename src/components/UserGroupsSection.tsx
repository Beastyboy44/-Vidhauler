import React, { useState } from 'react';
import { 
  GraduationCap, 
  Film, 
  Plane, 
  Archive, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Quote, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { USER_GROUPS, UserGroup } from '../data/downloadhelperData';

interface UserGroupsSectionProps {
  onSelectStudentDemo?: () => void;
}

export const UserGroupsSection: React.FC<UserGroupsSectionProps> = ({ onSelectStudentDemo }) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('students');

  const selectedGroup: UserGroup =
    USER_GROUPS.find((g) => g.id === selectedGroupId) || USER_GROUPS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Film':
        return <Film className="w-5 h-5" />;
      case 'Plane':
        return <Plane className="w-5 h-5" />;
      case 'Archive':
        return <Archive className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="gebruikers" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Voor Wie Is Vidhauler?
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
          De Belangrijkste Gebruikersgroepen
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          Of je nu als student offline colleges wilt leren, als video-editor B-roll nodig hebt, of onderweg in de trein wilt kijken — ontdek hoe Vidhauler jouw workflow versnelt.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {USER_GROUPS.map((group) => {
          const isSelected = group.id === selectedGroupId;
          return (
            <button
              key={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 border relative ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-blue-400'}>
                {getIcon(group.icon)}
              </span>
              <span>{group.title.split(',')[0]}</span>
              {group.isPrimary && (
                <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Focus
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Group Detail Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {selectedGroup.isPrimary && (
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-bl-xl shadow-md">
            ★ Belangrijkste Toepassing
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Description & Problems (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-xs font-bold mb-3 border border-slate-700">
                {selectedGroup.tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {selectedGroup.title}
              </h3>
              <p className="text-base text-slate-300 mt-2 font-medium">
                {selectedGroup.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                {selectedGroup.description}
              </p>
            </div>

            {/* Problems vs Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Bottlenecks */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Veelvoorkomende Problemen
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedGroup.keyProblems.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Hoe Vidhauler Helpt
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedGroup.vdhSolutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ideal platforms chips */}
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-2">
                Vaak gebruikt op o.a.:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedGroup.idealPlatforms.map((plat) => (
                  <span
                    key={plat}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700/80 font-mono"
                  >
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quote & Interactive Spotlight (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            {/* User Quote Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 relative shadow-xl">
              <Quote className="w-8 h-8 text-blue-500/30 mb-3" />
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                "{selectedGroup.quote.text}"
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">
                    {selectedGroup.quote.author}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {selectedGroup.quote.role}
                  </div>
                </div>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>

            {/* Interactive Callout for this group */}
            {selectedGroup.isPrimary ? (
              <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/40 text-xs text-blue-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                  Speciaal voor Studenten & Opleidingen
                </div>
                <p className="leading-relaxed">
                  In onze interactieve demonstratie hierboven staat standaard een echt Canvas-college geladen. 
                  Bekijk hoe Vidhauler zowel het 1080p hoorcollege als de MP3 podcast-versie direct detecteert!
                </p>
                {onSelectStudentDemo && (
                  <button
                    onClick={onSelectStudentDemo}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all text-center block shadow-lg shadow-blue-600/30"
                  >
                    Bekijk Canvas College Demo ↑
                  </button>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="font-semibold text-white">Geen ingewikkelde instellingen nodig</div>
                <p>
                  Vidhauler werkt direct na installatie. Open simpelweg de gewenste webpagina en klik op de 3 gekleurde balletjes in je werkbalk.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
