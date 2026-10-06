import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StreamSnifferDemo } from './components/StreamSnifferDemo';
import { StudentFocusBanner } from './components/StudentFocusBanner';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { InstallExtensionModal } from './components/InstallExtensionModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [selectedBrowserForInstall, setSelectedBrowserForInstall] = useState('chrome');
  const [isPremium, setIsPremium] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenInstall = (browser = 'chrome') => {
    setSelectedBrowserForInstall(browser);
    setIsInstallModalOpen(true);
  };

  const handleOpenPremium = () => {
    const el = document.getElementById('tarieven');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleActivateLicense = (key: string) => {
    setIsPremium(true);
    setToastMessage(`Licentie actief (${key})! Alle streams zijn ontgrendeld.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenInstall={handleOpenInstall}
        onOpenPremium={handleOpenPremium}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenInstall={handleOpenInstall}
          onOpenPremium={handleOpenPremium}
          onScrollToDemo={handleScrollToDemo}
        />

        {/* Live Simulator & Extension Mockup */}
        <StreamSnifferDemo
          isPremium={isPremium}
          onOpenPremium={handleOpenPremium}
        />

        {/* Student Focus & Supported Platforms */}
        <StudentFocusBanner
          onScrollToDemo={handleScrollToDemo}
          onOpenInstall={() => handleOpenInstall('chrome')}
        />

        {/* Minimalist Pricing: €10/jaar en €24 om te kopen */}
        <PricingSection
          isPremium={isPremium}
          onActivateLicense={handleActivateLicense}
          onOpenInstall={() => handleOpenInstall('chrome')}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Installation & ZIP Download Modal */}
      <InstallExtensionModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        defaultBrowser={selectedBrowserForInstall}
      />
    </div>
  );
}
