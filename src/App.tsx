import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  Sparkles, 
  Server, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { translations, Language, INDUSTRY_OPTIONS, CONSTRAINT_OPTIONS } from './translations';
import Header from './components/Header';
import HeroDemo from './components/HeroDemo';
import WizardModal from './components/WizardModal';
import CookieBanner from './components/CookieBanner';
import CtaPopup from './components/CtaPopup';
import FaqAccordion from './components/FaqAccordion';
import DocumatchLogo from './components/DocumatchLogo';
import LegalModal, { LegalDocType } from './components/LegalModal';
import { GedLogo } from './components/BrandLogo';

const ALL_GED_SOLUTIONS = [
  'Doxis',
  'Yooz',
  'DocuWare',
  'Microsoft 365',
  'OpenText',
  'ELO',
  'Alfresco',
  'OnBase',
  'Efalia',
  'Therefore',
  'Maarch',
  'Nuxeo',
  'M-Files',
  'Zeendoc',
  'Neoledge',
  'OpenKM'
];

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('FR');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  useEffect(() => {
    // Force scroll to the top of the page on mount to ensure the landing page opens at header level
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Scroll Progress Bar */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 z-[100] origin-left transition-all duration-75 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Header component */}
      <Header 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        t={t} 
        onOpenWizard={() => setIsWizardOpen(true)} 
      />

      {/* Main Content */}
      <main>
        
        {/* SECTION 1: HERO */}
        <motion.section 
          id="hero" 
          className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40 py-16 lg:py-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 h-96 w-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-10 right-0 h-96 w-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-5 flex flex-col gap-6 text-center items-center">
                <div className="inline-flex self-center items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-900/30 px-3.5 py-1 text-xs font-black text-blue-400 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                  <span>{currentLang === 'FR' ? 'Audit gratuit de votre contexte GED' : currentLang === 'ES' ? 'Auditoría gratuita de tu contexto GED' : 'Free DMS Context Audit'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  <span 
                    className="inline-block"
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, #60a5fa, #818cf8, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: '#60a5fa' // Ensure text has solid fallback and is never white/invisible
                    }}
                  >
                    {t.hero.titleHighlight}
                  </span>{' '}
                  {t.hero.titleRest}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
                  {t.hero.subtitle}
                </p>

                {/* Bullets with high-contrast checkmarks */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-md mx-auto w-full text-left">
                  {[t.hero.bullet1, t.hero.bullet2, t.hero.bullet3, t.hero.bullet4].map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/30 shadow-md">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-200">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-4 flex justify-center w-full">
                  <button
                    onClick={() => setIsWizardOpen(true)}
                    className="relative group inline-flex items-center justify-center gap-2.5 rounded-full p-0.5 text-base sm:text-lg font-black text-white shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_45px_rgba(99,102,241,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
                  >
                    {/* Glowing outer animation */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-full animate-pulse blur-[2px]" />
                    
                    {/* Real button face */}
                    <span className="relative block px-8 py-4 bg-slate-950 rounded-full transition-colors duration-300 group-hover:bg-transparent overflow-hidden">
                      {/* Gradient background overlay on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Sweep shine effect on hover */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      
                      <span className="relative flex items-center gap-2.5 font-extrabold tracking-wide">
                        <Sparkles className="h-5 w-5 text-amber-300 animate-pulse shrink-0" />
                        <span>{t.hero.getStarted}</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
                      </span>
                    </span>
                  </button>
                </div>

              </div>

              {/* Right Column: Interactive Sandbox Simulator */}
              <div className="lg:col-span-7">
                <HeroDemo currentLang={currentLang} t={t} />
              </div>

            </div>

            {/* Infinite scrolling carousel with all GED solution logos */}
            <div className="mt-16 sm:mt-20 border-t border-slate-900/40 pt-10 overflow-hidden w-full relative">
              <p className="text-center text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-6 select-none">
                {currentLang === 'FR' 
                  ? 'Solutions GED analysées & compatibles' 
                  : currentLang === 'ES' 
                  ? 'Soluciones GED analizadas y compatibles' 
                  : 'Analyzed & Compatible DMS Solutions'}
              </p>
              
              {/* Infinite marquee wrapper */}
              <div className="relative w-full overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
                <div className="animate-marquee flex items-center gap-6 py-2">
                  {/* Duplicated list to ensure continuous scrolling loop */}
                  {[...ALL_GED_SOLUTIONS, ...ALL_GED_SOLUTIONS, ...ALL_GED_SOLUTIONS, ...ALL_GED_SOLUTIONS].map((gedName, index) => (
                    <div 
                      key={`${gedName}-${index}`} 
                      className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300"
                    >
                      <GedLogo 
                        name={gedName} 
                        size="md" 
                        className="shadow-lg shadow-slate-950/40" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* SECTION 2: WHY CHOOSE GED AT RANDOM */}
        <motion.section 
          id="why-us" 
          className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'Le constat' : currentLang === 'ES' ? 'El problema' : 'The Challenge'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                {t.section2.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal">
                {t.section2.intro}
              </p>
            </div>

            {/* Inefficient workflow grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { text: t.section2.point1, desc: currentLang === 'FR' ? "Passer des heures à décrypter les sites" : "Spending hours reading websites" },
                { text: t.section2.point2, desc: currentLang === 'FR' ? "Des grilles Excel de 200 cases inutiles" : "Complex checklists of 200 items" },
                { text: t.section2.point3, desc: currentLang === 'FR' ? "Écouter des discours commerciaux" : "Listening to sales pitches" },
                { text: t.section2.point4, desc: currentLang === 'FR' ? "Retarder le début de la transformation" : "Delaying project launch" }
              ].map((point, idx) => (
                <div key={idx} className="rounded-2xl border border-rose-950/40 bg-slate-900/40 p-5 shadow-md hover:border-rose-800/60 transition-all duration-300 relative">
                  <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-rose-950/60 border border-rose-800/30 text-rose-400 shadow-xs">
                    <X className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span className="text-xs font-extrabold font-mono text-rose-500 block mb-2">0{idx + 1}</span>
                  <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                    {point.text}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 font-normal">{point.desc}</p>
                </div>
              ))}
            </div>

            {/* Comparison takeaway bar */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white relative overflow-hidden text-center shadow-xl border border-slate-800 flex flex-col items-center justify-center gap-6">
              <div className="absolute right-0 bottom-0 h-32 w-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-3">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  {t.section2.body1}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-semibold max-w-xl">
                  {t.section2.body2}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-4 py-2 text-xs font-extrabold text-blue-300 border border-blue-500/30 shadow-xs animate-pulse">
                  <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                  {t.section2.outro}
                </span>
              </div>
            </div>

          </div>
        </motion.section>

        {/* SECTION 3: HOW IT WORKS */}
        <motion.section 
          id="how-it-works" 
          className="border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'La méthodologie' : currentLang === 'ES' ? 'La metodología' : 'Methodology'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section3.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal">
                {t.section3.subtitle}
              </p>
            </div>

            {/* Chronological Steps */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 relative text-center">
              {t.section3.steps.map((step, idx) => (
                <div key={idx} className="group flex flex-col gap-4 relative items-center">
                  
                  {/* Step bubble marker */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-lg shadow-md shadow-blue-900/30 group-hover:scale-110 transition-all duration-300 relative z-10 mx-auto">
                    {step.number}
                  </div>

                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors text-base sm:text-lg text-center">
                    {step.title}
                  </h3>

                  {/* Criteria subpoints */}
                  <div className="flex flex-col gap-2 bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 shadow-sm group-hover:border-blue-500/40 transition-all duration-300 items-center justify-center w-full">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center justify-center gap-1.5 text-xs text-slate-300 leading-normal text-center">
                        <span className="text-blue-400 font-bold">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal joining link on large screens */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-6 left-[50%] w-full h-0.5 border-t border-dashed border-slate-800 pointer-events-none -z-0" />
                  )}
                </div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* SECTION 5: WHY DOCUMATCH IS DIFFERENT */}
        <motion.section 
          id="features" 
          className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'Notre philosophie' : currentLang === 'ES' ? 'Nuestra filosofía' : 'Our Philosophy'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section5.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal">
                {t.section5.subtitle}
              </p>
            </div>
 
            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {t.section5.cards.map((card, idx) => {
                const cardStyles = [
                  "border-blue-950 bg-blue-950/20 hover:border-blue-500/40 shadow-blue-950/50",
                  "border-purple-950 bg-purple-950/20 hover:border-purple-500/40 shadow-purple-950/50",
                  "border-emerald-950 bg-emerald-950/20 hover:border-emerald-500/40 shadow-emerald-950/50"
                ][idx] || "border-slate-800 bg-slate-900/40";

                const badgeStyles = [
                  "bg-blue-950 text-blue-300 border border-blue-500/30",
                  "bg-purple-950 text-purple-300 border border-purple-500/30",
                  "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                ][idx] || "bg-slate-800 text-slate-300";

                return (
                  <div key={idx} className={`rounded-2xl border p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${cardStyles}`}>
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 font-bold ${badgeStyles}`}>
                      {idx === 0 ? <Layers className="h-5 w-5" /> : idx === 1 ? <Sparkles className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                    </div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg mb-3 text-center">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: GRID CRITERIA (Bento block style) */}
        <motion.section 
          className="border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'La couverture' : currentLang === 'ES' ? 'La cobertura' : 'Coverage'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section6.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal">
                {t.section6.subtitle}
              </p>
            </div>

            {/* Bento-style grid with categorised items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {t.section6.categories.map((category, idx) => (
                <div key={idx} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-blue-500/40 hover:bg-slate-900/60 transition-all duration-300">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-xs font-extrabold font-mono text-slate-500 uppercase tracking-wider block">CATEGORY 0{idx + 1}</span>
                    <h3 className="font-extrabold text-white text-sm sm:text-base mt-1 group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {category.items.map((item, itemIdx) => (
                      <span 
                        key={itemIdx}
                        className="bg-slate-950 border border-slate-800/80 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-slate-300 flex items-center gap-1 shadow-xs"
                      >
                        <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                    <span className="bg-slate-800 text-slate-400 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                      + more
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* SECTION 7: BENEFITS COMPARISON TABLE */}
        <motion.section 
          className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'Comparaison des méthodes' : currentLang === 'ES' ? 'Comparación de métodos' : 'Methods comparison'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section7.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal">
                {t.section7.subtitle}
              </p>
            </div>

            {/* Side-by-Side Comparison Container */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 overflow-hidden shadow-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-center">
                
                {/* WITHOUT DOCUMATCH */}
                <div className="p-6 sm:p-8 bg-rose-950/10 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 border-b border-rose-950/50 pb-4 mb-6 text-rose-400 w-full">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-950/60 border border-rose-900/30 shadow-xs">
                      <X className="h-4.5 w-4.5 stroke-[2.5]" />
                    </div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">{t.section7.headers.without}</h3>
                  </div>

                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {t.section7.rows.map((row, index) => (
                      <li key={index} className="flex flex-col sm:flex-row items-center justify-center text-center gap-1.5 text-xs sm:text-sm text-slate-300 font-normal max-w-xs sm:max-w-md">
                        <X className="h-4 w-4 text-rose-500 shrink-0" />
                        <span>{row.without}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WITH DOCUMATCH */}
                <div className="p-6 sm:p-8 bg-emerald-950/10 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2 border-b border-emerald-950/50 pb-4 mb-6 text-emerald-400 w-full">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-900/30 shadow-xs">
                      <Check className="h-4.5 w-4.5 text-emerald-400 stroke-[3]" />
                    </div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wider">{t.section7.headers.with}</h3>
                  </div>

                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {t.section7.rows.map((row, index) => (
                      <li key={index} className="flex flex-col sm:flex-row items-center justify-center text-center gap-1.5 text-xs sm:text-sm text-slate-200 font-extrabold max-w-xs sm:max-w-md">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{row.with}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </motion.section>

        {/* SECTION 8: NUMBERS / KEY STATS */}
        <motion.section 
          className="border-t border-slate-900 bg-gradient-to-b from-slate-950 to-slate-900 py-16 sm:py-24 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-2xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                {currentLang === 'FR' ? 'En chiffres' : currentLang === 'ES' ? 'En cifras' : 'Key Numbers'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section8.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
              {t.section8.stats.map((stat, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-900/60 p-6 border border-indigo-500/10 shadow-lg relative overflow-hidden flex flex-col items-center justify-center text-center">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono tracking-tight block animate-pulse">
                    {stat.value}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base mt-2 text-center">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal text-center max-w-xs">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* SECTION 9: FAQ */}
        <motion.section 
          id="faq" 
          className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t.section9.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal">
                {t.section9.subtitle}
              </p>
            </div>

            {/* Accordion List */}
            <FaqAccordion faqs={t.section9.faqs} />

          </div>
        </motion.section>

        {/* FINAL CTA SECTION */}
        <motion.section 
          className="border-t border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/45 py-16 sm:py-24 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 h-96 w-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 right-0 h-96 w-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
              {t.finalCta.title}
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              {t.finalCta.subtitle1} <br className="hidden sm:inline" />
              {t.finalCta.subtitle2}
            </p>

            <div className="mt-8">
              <button
                onClick={() => setIsWizardOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-blue-900/30 hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-102 cursor-pointer active:scale-98"
              >
                <Sparkles className="h-4 w-4 text-blue-100" />
                {t.finalCta.button}
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Logo Description */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <DocumatchLogo className="h-9 w-9" isDarkBg={true} />
                <div className="flex flex-col">
                  <span className="text-base font-extrabold tracking-tight text-white leading-none">
                    Documatch
                  </span>
                  <span className="text-[10px] text-blue-400 font-extrabold font-mono tracking-wider uppercase mt-1">CONTEXT</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            {/* Menu Links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px] mb-1">Navigation</span>
                <a href="#why-us" className="hover:text-white transition-colors">{t.header.solutions}</a>
                <a href="#features" className="hover:text-white transition-colors">{t.header.features}</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">{t.header.howItWorks}</a>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <span className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px] mb-1">Legal</span>
                <button 
                  onClick={() => setActiveLegalDoc('mentions')} 
                  className="text-left cursor-pointer hover:text-white transition-colors"
                >
                  {t.footer.legal}
                </button>
                <button 
                  onClick={() => setActiveLegalDoc('cgu')} 
                  className="text-left cursor-pointer hover:text-white transition-colors"
                >
                  {t.footer.terms}
                </button>
                <button 
                  onClick={() => setActiveLegalDoc('confidentialite')} 
                  className="text-left cursor-pointer hover:text-white transition-colors"
                >
                  {t.footer.privacy}
                </button>
                <button 
                  onClick={() => setActiveLegalDoc('cookies')} 
                  className="text-left cursor-pointer hover:text-white transition-colors"
                >
                  {t.footer.cookies}
                </button>
                <a 
                  href="mailto:info@documatch.eu" 
                  className="text-left cursor-pointer hover:text-white transition-colors"
                >
                  {t.footer.contact}
                </a>
              </div>
            </div>

            {/* LinkedIn social column */}
            <div className="md:col-span-3 flex flex-col gap-3 text-xs md:items-end">
              <span className="font-extrabold text-slate-200 uppercase tracking-wider text-[10px] mb-1">Socials</span>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-bold text-blue-400"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>

          <div className="mt-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-1">
              <span>Made with absolute precision</span>
              <span className="text-rose-500">•</span>
              <span>100% independent recommendations</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FULL MATCHING WIZARD MODAL POPUP */}
      <WizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
        currentLang={currentLang} 
        t={t} 
      />

      {/* PERSISTENT COOKIE BANNER */}
      <CookieBanner currentLang={currentLang} />

      {/* PROACTIVE 30-SECOND CTA AUDIT POPUP */}
      <CtaPopup 
        currentLang={currentLang} 
        onOpenWizard={() => setIsWizardOpen(true)} 
      />

      {/* DETAILED LEGAL DOCUMENTS MODAL */}
      <LegalModal 
        docType={activeLegalDoc} 
        onClose={() => setActiveLegalDoc(null)} 
      />

    </div>
  );
}
