import { motion } from 'motion/react';
import { GedLogo } from './BrandLogo';
import { 
  Language, 
  TranslationSet 
} from '../translations';
import { 
  Building2, 
  Database, 
  Users, 
  FileCheck, 
  MapPin, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';

interface HeroDemoProps {
  currentLang: Language;
  t: TranslationSet;
}

export default function HeroDemo({ currentLang, t }: HeroDemoProps) {
  // Matched solutions list based on language
  const matchedSolutions = [
    { 
      name: 'Doxis', 
      score: 91, 
      bg: 'bg-gradient-to-br from-blue-600 to-indigo-600', 
      text: 'bg-blue-950/80 text-blue-300 border-blue-900/30', 
      level: currentLang === 'FR' ? 'Très forte compatibilité' : currentLang === 'ES' ? 'Compatibilidad muy alta' : 'Very high compatibility',
      desc: currentLang === 'FR' ? 'Connecteur natif SAP S/4HANA & certification archivage' : currentLang === 'ES' ? 'Conector nativo SAP S/4HANA y certificación de archivo' : 'Native SAP S/4HANA connector & certified archiving'
    },
    { 
      name: 'Yooz', 
      score: 84, 
      bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', 
      text: 'bg-emerald-950/80 text-emerald-300 border-emerald-900/30', 
      level: currentLang === 'FR' ? 'Compatible' : currentLang === 'ES' ? 'Compatible' : 'Compatible',
      desc: currentLang === 'FR' ? 'Excellence sur la validation de factures fournisseurs' : currentLang === 'ES' ? 'Excelente para validación de facturas de proveedores' : 'Excellent for accounts payable invoice validation'
    },
    { 
      name: 'DocuWare', 
      score: 81, 
      bg: 'bg-gradient-to-br from-amber-500 to-orange-600', 
      text: 'bg-amber-950/80 text-amber-300 border-amber-900/30', 
      level: currentLang === 'FR' ? 'Compatible' : currentLang === 'ES' ? 'Compatible' : 'Compatible',
      desc: currentLang === 'FR' ? 'Parfait pour 15 utilisateurs, intégration ERP flexible' : currentLang === 'ES' ? 'Perfecto para 15 usuarios, integración flexible de ERP' : 'Perfect for 15 users, flexible ERP integration'
    },
    { 
      name: 'M-Files', 
      score: 74, 
      bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', 
      text: 'bg-indigo-950/80 text-indigo-300 border-indigo-900/30', 
      level: currentLang === 'FR' ? 'Compatible' : currentLang === 'ES' ? 'Compatible' : 'Compatible',
      desc: currentLang === 'FR' ? 'GED orientée métadonnées, idéale secteur industriel' : currentLang === 'ES' ? 'GED orientada a metadatos, ideal para sector industrial' : 'Metadata-driven DMS, ideal for industrial sector'
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-blue-950/80 p-2 shadow-2xl shadow-blue-900/20 lg:p-3 backdrop-blur-md">
      
      {/* Mockup Top Window bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 rounded-t-xl text-white border-b border-slate-900">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-500 shadow-xs" />
          <div className="h-3 w-3 rounded-full bg-amber-400 shadow-xs" />
          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-xs" />
          <span className="text-xs text-slate-400 font-mono ml-2 font-bold">{currentLang === 'FR' ? 'DÉMONSTRATION DU SYSTÈME' : currentLang === 'ES' ? 'DEMOSTRACIÓN DEL SISTEMA' : 'SYSTEM DEMONSTRATION'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-blue-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-400 flex items-center gap-1 border border-blue-500/30 animate-pulse">
            <Cpu className="h-3 w-3 text-blue-400" />
            <span>AI ENGINE ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="bg-slate-900/95 rounded-b-xl p-5 sm:p-6 text-left">
        
        {/* Mockup Title Block */}
        <div className="border-b border-slate-800 pb-5 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-950/60 px-2.5 py-0.5 text-[10px] font-black text-blue-400 border border-blue-900/30 uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span>{currentLang === 'FR' ? 'Démonstration' : currentLang === 'ES' ? 'Demostración' : 'Demonstration'}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {t.section4.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            {t.section4.subtitle}
          </p>
        </div>

        {/* Structural visual flow grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Side: Your Company Profile Box */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-5 border border-slate-800 shadow-xs relative hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-4 right-4 h-5 w-5 bg-blue-950 text-blue-400 border border-blue-900/30 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs">
              i
            </div>
            <h5 className="font-black text-xs text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {t.section4.profileLabel}
            </h5>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">{t.section4.industryLabel}</span>
                <strong className="text-white font-bold text-sm">{t.section4.exampleProfile.industry}</strong>
              </div>
              
              <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">{t.section4.erpLabel}</span>
                <strong className="text-white font-bold text-sm">{t.section4.exampleProfile.erp}</strong>
              </div>
              
              <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">{t.section4.usersLabel}</span>
                <strong className="text-white font-bold text-sm">{t.section4.exampleProfile.users}</strong>
              </div>
              
              <div className="flex flex-col gap-0.5 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">{t.section4.processLabel}</span>
                <strong className="text-white font-bold text-sm">{t.section4.exampleProfile.process}</strong>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">{t.section4.countryLabel}</span>
                <strong className="text-white font-bold text-sm flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  {t.section4.exampleProfile.country}
                </strong>
              </div>
            </div>
          </div>

          {/* Central Down-chevron matching logic representation */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-2 lg:py-0">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-base shadow-lg shadow-blue-900/30"
            >
              ↓
            </motion.div>
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2.5 bg-blue-950 px-3 py-1 rounded-full border border-blue-900/30">
              AI MATCH
            </span>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-5 space-y-3">
            <h5 className="font-black text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {t.section4.compatLabel}
            </h5>

            {matchedSolutions.map((ged, idx) => (
              <div 
                key={ged.name} 
                className={`group flex flex-col p-3.5 rounded-xl border transition-all duration-300 ${
                  idx < 3 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-950/50 to-slate-900 shadow-md shadow-blue-950/50 scale-[1.02]' 
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950/90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GedLogo 
                      name={ged.name} 
                      size="sm" 
                      className="shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-white text-sm">{ged.name}</span>
                        {idx === 0 && (
                          <span className="text-[8px] font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded-xs uppercase tracking-wide">
                            BEST MATCH
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-400 block font-bold mt-0.5">{ged.level}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md font-mono font-black text-xs border ${ged.text}`}>
                    {ged.score}%
                  </span>
                </div>
                
                {/* Micro description explaining matching reasoning */}
                <div className="mt-2 text-[10px] text-slate-300 leading-relaxed pl-1 border-l-2 border-slate-800 font-medium">
                  {ged.desc}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
