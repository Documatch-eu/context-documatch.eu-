import { Language, TranslationSet } from '../translations';
import { Sparkles, Globe, Menu, X, FileText, Settings, BookOpen, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import DocumatchLogo from './DocumatchLogo';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationSet;
  onOpenWizard: () => void;
}

export default function Header({ currentLang, onLanguageChange, t, onOpenWizard }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <DocumatchLogo className="h-8 w-8 sm:h-10 sm:w-10" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
              Documatch
            </span>
            <span className="text-[9px] sm:text-[10px] text-blue-400 font-bold tracking-wide uppercase leading-none">CONTEXT</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full p-1 shadow-inner">
          <button 
            onClick={() => scrollToSection('why-us')} 
            className="flex items-center gap-1.5 text-xs lg:text-sm font-bold text-slate-300 hover:text-blue-400 hover:bg-slate-950/60 px-3.5 py-1.5 rounded-full transition-all cursor-pointer duration-200"
          >
            <FileText className="h-4 w-4 text-blue-500/80" />
            <span>{t.header.solutions}</span>
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="flex items-center gap-1.5 text-xs lg:text-sm font-bold text-slate-300 hover:text-indigo-400 hover:bg-slate-950/60 px-3.5 py-1.5 rounded-full transition-all cursor-pointer duration-200"
          >
            <BookOpen className="h-4 w-4 text-indigo-500/80" />
            <span>{t.header.howItWorks}</span>
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="flex items-center gap-1.5 text-xs lg:text-sm font-bold text-slate-300 hover:text-purple-400 hover:bg-slate-950/60 px-3.5 py-1.5 rounded-full transition-all cursor-pointer duration-200"
          >
            <Settings className="h-4 w-4 text-purple-500/80" />
            <span>{t.header.features}</span>
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="flex items-center gap-1.5 text-xs lg:text-sm font-bold text-slate-300 hover:text-emerald-400 hover:bg-slate-950/60 px-3.5 py-1.5 rounded-full transition-all cursor-pointer duration-200"
          >
            <HelpCircle className="h-4 w-4 text-emerald-500/80" />
            <span>{t.header.contact}</span>
          </button>
        </nav>

        {/* Actions & Language selectors */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1 rounded-full border border-slate-800 p-0.5 bg-slate-900/60">
            {(['FR', 'ES', 'EN'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenWizard}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/50 hover:bg-blue-700 transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-blue-100" />
            {t.header.getStarted}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Quick Language switcher on mobile */}
          <div className="flex items-center gap-0.5 rounded-full border border-slate-800 p-0.5 bg-slate-900/60">
            {(['FR', 'ES', 'EN'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                  currentLang === lang
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-slate-300 hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-900 bg-slate-950/95 backdrop-blur-lg py-5 px-6 md:hidden flex flex-col gap-4 animate-fadeIn shadow-2xl relative z-50">
          <button
            onClick={() => scrollToSection('why-us')}
            className="flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-blue-400 hover:bg-slate-900/50 transition-all text-left"
          >
            <FileText className="h-4.5 w-4.5 text-blue-400" />
            <span>{t.header.solutions}</span>
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-indigo-400 hover:bg-slate-900/50 transition-all text-left"
          >
            <BookOpen className="h-4.5 w-4.5 text-indigo-400" />
            <span>{t.header.howItWorks}</span>
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-purple-400 hover:bg-slate-900/50 transition-all text-left"
          >
            <Settings className="h-4.5 w-4.5 text-purple-400" />
            <span>{t.header.features}</span>
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="flex items-center gap-3 w-full py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-emerald-400 hover:bg-slate-900/50 transition-all text-left"
          >
            <HelpCircle className="h-4.5 w-4.5 text-emerald-400" />
            <span>{t.header.contact}</span>
          </button>
          
          <div className="h-px bg-slate-900 my-1" />
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWizard();
            }}
            className="w-full justify-center inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-900/30 hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            {t.header.getStarted}
          </button>
        </div>
      )}
    </header>
  );
}
