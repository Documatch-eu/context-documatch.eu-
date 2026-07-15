import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, Check, X, Settings, ArrowRight } from 'lucide-react';
import { Language } from '../translations';

interface CookieBannerProps {
  currentLang: Language;
}

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}

const LOCAL_STORAGE_KEY = 'documatch_cookie_consent';

export default function CookieBanner({ currentLang }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsAccepted, setAnalyticsAccepted] = useState(true);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!savedConsent) {
      // Show the banner with a slight delay for a premium entry effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (essential: boolean, analytics: boolean) => {
    const consent: CookieConsent = {
      essential,
      analytics,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleDecline = () => {
    saveConsent(true, false);
  };

  const handleSaveCustom = () => {
    saveConsent(true, analyticsAccepted);
  };

  // Localized texts
  const t = {
    FR: {
      title: "Respect de votre vie privée",
      description: "Documatch utilise des cookies essentiels au bon fonctionnement du simulateur, ainsi que des traceurs de performance anonymes pour analyser et optimiser votre expérience de comparaison GED. Aucune donnée n'est revendue.",
      acceptAll: "Accepter tout",
      decline: "Refuser",
      customize: "Personnaliser",
      save: "Enregistrer mes choix",
      back: "Retour",
      essentialTitle: "Cookies Essentiels (Obligatoire)",
      essentialDesc: "Nécessaires au fonctionnement du simulateur GED, à la sauvegarde de vos filtres et à la sélection de la langue.",
      analyticsTitle: "Mesure d'audience (Optionnel)",
      analyticsDesc: "Nous permet d'analyser anonymement l'usage du comparateur afin d'affiner continuellement l'algorithme de calcul d'affinité."
    },
    ES: {
      title: "Respeto a tu privacidad",
      description: "Documatch utiliza cookies esenciales para el correcto funcionamiento del simulador, así como rastreadores de rendimiento anónimos para analizar y optimizar tu experiencia de comparación. No vendemos tus datos.",
      acceptAll: "Aceptar todo",
      decline: "Rechazar",
      customize: "Personalizar",
      save: "Guardar preferencias",
      back: "Atrás",
      essentialTitle: "Cookies Esenciales (Obligatorio)",
      essentialDesc: "Necesarias para el funcionamiento del simulador de GED, guardar tus filtros y recordar tu idioma preferido.",
      analyticsTitle: "Medición de audiencia (Opcional)",
      analyticsDesc: "Nos permite analizar de forma anónima el uso del comparador para perfeccionar continuamente el algoritmo de afinidad."
    },
    EN: {
      title: "Respecting your privacy",
      description: "Documatch uses essential cookies for the simulator to function correctly, as well as anonymous performance trackers to analyze and optimize your DMS matchmaking experience. No data is ever sold.",
      acceptAll: "Accept All",
      decline: "Decline",
      customize: "Customize",
      save: "Save choices",
      back: "Back",
      essentialTitle: "Essential Cookies (Required)",
      essentialDesc: "Required for the DMS simulator to function, saving your current filters, and remembering language preferences.",
      analyticsTitle: "Performance & Analytics (Optional)",
      analyticsDesc: "Allows us to anonymously analyze tool usage to continually refine and improve our matching algorithms."
    }
  }[currentLang];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="cookie-banner-root"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        >
          <div 
            id="cookie-banner-container"
            className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-5 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden"
          >
            {/* Ambient decorative gradient background */}
            <div className="absolute top-0 left-1/4 h-48 w-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 h-48 w-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col gap-5">
              {!isCustomizing ? (
                /* MAIN BANNER VIEW */
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4 max-w-2xl">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950 border border-blue-800/30 text-blue-400 shadow-md">
                      <Cookie className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 id="cookie-banner-title" className="text-sm font-black text-white flex items-center gap-2">
                        <span>{t.title}</span>
                        <span className="flex h-2 w-2 rounded-full bg-blue-400" />
                      </h4>
                      <p id="cookie-banner-description" className="text-xs text-slate-300 leading-relaxed font-normal">
                        {t.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                    <button
                      id="cookie-customize-btn"
                      type="button"
                      onClick={() => setIsCustomizing(true)}
                      className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <Settings className="h-3.5 w-3.5 text-slate-400" />
                      <span>{t.customize}</span>
                    </button>
                    <button
                      id="cookie-decline-btn"
                      type="button"
                      onClick={handleDecline}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-850 transition-all cursor-pointer active:scale-95"
                    >
                      {t.decline}
                    </button>
                    <button
                      id="cookie-accept-all-btn"
                      type="button"
                      onClick={handleAcceptAll}
                      className="px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-900/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>{t.acceptAll}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* CUSTOMIZATION PREFERENCES VIEW */
                <motion.div 
                  id="cookie-custom-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <h4 id="cookie-preferences-title" className="text-sm font-black text-white">
                        {t.customize}
                      </h4>
                    </div>
                    <button
                      id="cookie-back-btn"
                      type="button"
                      onClick={() => setIsCustomizing(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      <span>{t.back}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Essential Cookies Card */}
                    <div 
                      id="cookie-essential-card"
                      className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between gap-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-100">{t.essentialTitle}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-900/30 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {t.essentialDesc}
                        </p>
                      </div>
                    </div>

                    {/* Analytics Cookies Card */}
                    <div 
                      id="cookie-analytics-card"
                      className="p-4 rounded-xl border border-slate-850 bg-slate-950/60 flex flex-col justify-between gap-3 hover:border-slate-800 transition-colors"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-100">{t.analyticsTitle}</span>
                          <button
                            id="cookie-analytics-toggle"
                            type="button"
                            onClick={() => setAnalyticsAccepted(!analyticsAccepted)}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                              analyticsAccepted ? 'bg-blue-600' : 'bg-slate-800'
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                analyticsAccepted ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {t.analyticsDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t border-slate-800 pt-3">
                    <button
                      id="cookie-custom-decline-btn"
                      type="button"
                      onClick={handleDecline}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-850 transition-all cursor-pointer active:scale-95"
                    >
                      {t.decline}
                    </button>
                    <button
                      id="cookie-save-preferences-btn"
                      type="button"
                      onClick={handleSaveCustom}
                      className="px-5 py-2 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-900/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>{t.save}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
