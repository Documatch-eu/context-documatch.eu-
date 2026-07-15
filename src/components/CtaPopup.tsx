import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface CtaPopupProps {
  currentLang: Language;
  onOpenWizard: () => void;
}

const LOCAL_STORAGE_KEY = 'documatch_cta_closed';

export default function CtaPopup({ currentLang, onOpenWizard }: CtaPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or interacted with this CTA for the specific language version
    const isDismissed = sessionStorage.getItem(`${LOCAL_STORAGE_KEY}_${currentLang}`);
    if (isDismissed) {
      setIsOpen(false);
      return;
    }

    // Set a timeout of 20 seconds (20000ms) as requested
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, [currentLang]);

  const handleClose = () => {
    sessionStorage.setItem(`${LOCAL_STORAGE_KEY}_${currentLang}`, 'true');
    setIsOpen(false);
  };

  const handleStartAudit = () => {
    sessionStorage.setItem(`${LOCAL_STORAGE_KEY}_${currentLang}`, 'true');
    setIsOpen(false);
    onOpenWizard();
  };

  // Translations
  const t = {
    FR: {
      tag: "Audit GED Personnalisé",
      title: "Trouvez le logiciel GED idéal en 2 minutes",
      subtitle: "Répondez à quelques questions simples sur votre ERP, votre secteur d'activité et vos volumes pour obtenir un comparatif sur-mesure et indépendant.",
      cta: "Lancer le comparateur gratuit",
      secondary: "Plus tard",
      benefits: [
        "Recommandation 100% neutre et indépendante",
        "Analyse de compatibilité avec votre ERP existant",
        "Prise en compte de vos contraintes de stockage"
      ]
    },
    ES: {
      tag: "Auditoría GED Personalizada",
      title: "Encuentra el software GED ideal en 2 minutos",
      subtitle: "Responde a unas preguntas sencillas sobre tu ERP, sector y volúmenes de almacenamiento para obtener una comparación personalizada e independiente.",
      cta: "Iniciar comparador gratuito",
      secondary: "Más tarde",
      benefits: [
        "Recomendaciones 100% neutrales e independientes",
        "Análisis de compatibilidad con tu ERP actual",
        "Cumplimiento de normativas de almacenamiento"
      ]
    },
    EN: {
      tag: "Custom DMS Audit",
      title: "Find your ideal DMS software in 2 minutes",
      subtitle: "Answer a few simple questions about your ERP, industry sector, and storage volumes to get a customized, 100% independent match.",
      cta: "Start Free Matchmaker",
      secondary: "Maybe later",
      benefits: [
        "100% neutral and independent recommendations",
        "Compatibility analysis with your existing ERP",
        "Compliance alignment with storage requirements"
      ]
    }
  }[currentLang];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="cta-popup-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
          onClick={handleClose}
        >
          <motion.div
            id="cta-popup-card"
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_rgba(59,130,246,0.15)]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Ambient decorative gradient */}
            <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              id="cta-popup-close-btn"
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-750 transition-all cursor-pointer active:scale-95"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col gap-5 mt-2">
              {/* Tag / Badge */}
              <div className="inline-flex self-start items-center gap-1.5 rounded-full bg-blue-950/60 border border-blue-900/30 px-3 py-1 text-xs font-black text-blue-400 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>{t.tag}</span>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-2">
                <h3 id="cta-popup-title" className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                  {t.title}
                </h3>
                <p id="cta-popup-subtitle" className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                  {t.subtitle}
                </p>
              </div>

              {/* Benefits list */}
              <div id="cta-popup-benefits" className="flex flex-col gap-3 py-2 border-y border-slate-800/60 my-1">
                {t.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-950/80 border border-blue-900/40 text-blue-400">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  id="cta-popup-primary-btn"
                  type="button"
                  onClick={handleStartAudit}
                  className="w-full sm:flex-1 px-6 py-3.5 text-xs md:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl shadow-lg shadow-blue-900/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  id="cta-popup-secondary-btn"
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3.5 text-xs md:text-sm font-bold text-slate-400 hover:text-slate-200 bg-transparent hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer text-center"
                >
                  {t.secondary}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
