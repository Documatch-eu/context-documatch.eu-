import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Language, 
  TranslationSet, 
  ERP_OPTIONS, 
  INDUSTRY_OPTIONS, 
  CONSTRAINT_OPTIONS, 
  CONSTRAINT_MAPPINGS,
  VOLUME_OPTIONS, 
  getGedRecommendations, 
  GedResult,
  PROCESS_OPTIONS
} from '../translations';
import { 
  X, 
  Building2, 
  Users, 
  Check, 
  FileText, 
  Cpu, 
  Layers, 
  Sparkles, 
  Printer, 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Server,
  FileCheck2,
  Lock,
  Coins,
  Phone,
  Globe,
  AlertCircle,
  Star
} from 'lucide-react';
import AnimatedScore from './AnimatedScore';
import DocumatchLogo from './DocumatchLogo';
import { ErpLogo, GedLogo } from './BrandLogo';

const COUNTRY_OPTIONS: Record<Language, { value: string; label: string }[]> = {
  FR: [
    { value: 'FR', label: 'France' },
    { value: 'ES', label: 'Espagne' },
    { value: 'BE', label: 'Belgique' },
    { value: 'DE', label: 'Allemagne' },
    { value: 'NL', label: 'Pays-Bas' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'CH', label: 'Suisse' },
  ],
  ES: [
    { value: 'FR', label: 'Francia' },
    { value: 'ES', label: 'España' },
    { value: 'BE', label: 'Bélgica' },
    { value: 'DE', label: 'Alemania' },
    { value: 'NL', label: 'Países Bajos' },
    { value: 'LU', label: 'Luxemburgo' },
    { value: 'CH', label: 'Suiza' },
  ],
  EN: [
    { value: 'FR', label: 'France' },
    { value: 'ES', label: 'Spain' },
    { value: 'BE', label: 'Belgium' },
    { value: 'DE', label: 'Germany' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'CH', label: 'Switzerland' },
  ]
};

function getStepTitle(stepNum: number, lang: Language): string {
  const steps: Record<Language, string[]> = {
    FR: ["Profil d'entreprise", "Intégration ERP", "Flux & Processus", "Normes & Lois"],
    ES: ["Perfil de empresa", "Integración ERP", "Flujos y Procesos", "Cumplimiento"],
    EN: ["Company Profile", "ERP Integration", "Workflow & Process", "Compliance"]
  };
  return steps[lang][stepNum - 1] || '';
}

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  t: TranslationSet;
}

export default function WizardModal({ isOpen, onClose, currentLang, t }: WizardModalProps) {
  const [step, setStep] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to top when changing steps to prevent having to scroll up on desktop
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);
  
  // Form fields
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyCountry, setCompanyCountry] = useState('FR');
  const [showStep1Error, setShowStep1Error] = useState(false);
  const [usersCount, setUsersCount] = useState('10');
  const [allocatedBudget, setAllocatedBudget] = useState('5000-10000');
  const [selectedErp, setSelectedErp] = useState(ERP_OPTIONS[0]);
  const [selectedIndustryIdx, setSelectedIndustryIdx] = useState(0);
  const [selectedVolumeIdx, setSelectedVolumeIdx] = useState(1);
  const [selectedConstraintIdxs, setSelectedConstraintIdxs] = useState<number[]>([0]);
  const [selectedProcessIds, setSelectedProcessIds] = useState<string[]>([]);

  const validatePhoneIndicator = (phone: string, countryCode: string): { isValid: boolean; expectedIndicator: string } => {
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    let expectedIndicator = '';
    let prefixes: string[] = [];

    switch (countryCode) {
      case 'FR':
        expectedIndicator = '+33';
        prefixes = ['+33', '0033', '33'];
        break;
      case 'ES':
        expectedIndicator = '+34';
        prefixes = ['+34', '0034', '34'];
        break;
      case 'BE':
        expectedIndicator = '+32';
        prefixes = ['+32', '0032', '32'];
        break;
      case 'DE':
        expectedIndicator = '+49';
        prefixes = ['+49', '0049', '49'];
        break;
      case 'NL':
        expectedIndicator = '+31';
        prefixes = ['+31', '0031', '31'];
        break;
      case 'LU':
        expectedIndicator = '+352';
        prefixes = ['+352', '00352', '352'];
        break;
      case 'CH':
        expectedIndicator = '+41';
        prefixes = ['+41', '0041', '41'];
        break;
      default:
        return { isValid: true, expectedIndicator: '' };
    }

    const isValid = prefixes.some(pref => cleanPhone.startsWith(pref));
    return { isValid, expectedIndicator };
  };

  const validateCompanyEmail = (email: string): boolean => {
    const cleanEmail = email.toLowerCase().trim();
    // Always accept the test email frquwii@gmail.com
    if (cleanEmail === 'frquwii@gmail.com') {
      return true;
    }
    
    // Extract domain
    const parts = cleanEmail.split('@');
    if (parts.length < 2) return false;
    const domain = parts[1];

    // List of typical non-business (public/free) email domains
    const genericDomains = [
      'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com', 
      'aol.com', 'icloud.com', 'wanadoo.fr', 'orange.fr', 'free.fr', 
      'sfr.fr', 'yahoo.fr', 'laposte.net', 'hotmail.fr', 'gmx.fr', 
      'yandex.com', 'mail.ru', 'proton.me', 'protonmail.com', 'gmx.com',
      'mail.com', 'zoho.com', 'outlook.fr', 'live.fr'
    ];

    return !genericDomains.includes(domain);
  };

  const toggleConstraint = (index: number) => {
    setSelectedConstraintIdxs((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        if (prev.length >= 7) return prev;
        return [...prev, index];
      }
    });
  };
  
  // Loading & Results state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recommendedGeds, setRecommendedGeds] = useState<GedResult[]>([]);
  
  // Lead Generation state
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastTitle, setToastTitle] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Auto-dismiss toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Submit to Formspree
  const submitToFormspree = async (calculatedResults: GedResult[]) => {
    try {
      const payload = {
        companyName: companyName || 'Documatch Guest',
        email: companyEmail,
        phone: companyPhone,
        country: COUNTRY_OPTIONS[currentLang].find(c => c.value === companyCountry)?.label || companyCountry,
        usersCount: usersCount,
        allocatedBudget: allocatedBudget,
        erp: selectedErp,
        industry: INDUSTRY_OPTIONS[currentLang][selectedIndustryIdx],
        volume: currentLang === 'FR' 
          ? VOLUME_OPTIONS[selectedVolumeIdx] 
          : currentLang === 'ES' 
          ? VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documentos / mes') 
          : VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documents / month'),
        processes: selectedProcessIds.map(id => {
          const proc = PROCESS_OPTIONS[currentLang].find(p => p.id === id);
          return proc ? proc.title : id;
        }).join(', '),
        complianceConstraint: selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
        recommendations: calculatedResults.map(g => `${g.name} (${g.score}%)`).join(', ')
      };

      await fetch('https://formspree.io/f/mzdlqkll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Error submitting to Formspree:', error);
    }
  };

  // Send HTML report with Gemini analysis via Resend API on the server
  const sendResendReport = async (calculatedResults: GedResult[]) => {
    try {
      const payload = {
        email: companyEmail,
        companyName: companyName || 'Documatch Guest',
        phone: companyPhone,
        country: COUNTRY_OPTIONS[currentLang].find(c => c.value === companyCountry)?.label || companyCountry,
        usersCount: usersCount,
        allocatedBudget: allocatedBudget,
        erp: selectedErp,
        industry: INDUSTRY_OPTIONS[currentLang][selectedIndustryIdx],
        volume: currentLang === 'FR' 
          ? VOLUME_OPTIONS[selectedVolumeIdx] 
          : currentLang === 'ES' 
          ? VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documentos / mes') 
          : VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documents / month'),
        processes: selectedProcessIds.map(id => {
          const proc = PROCESS_OPTIONS[currentLang].find(p => p.id === id);
          return proc ? proc.title : id;
        }).join(', '),
        complianceConstraint: selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
        recommendations: calculatedResults.map(g => `${g.name} (${g.score}%)`).join(', '),
        lang: currentLang
      };

      const res = await fetch('/api/analyze-and-send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('Error from Resend server API:', errData.error);
      } else {
        console.log('Resend email dispatched successfully with Gemini analysis!');
      }
    } catch (error) {
      console.error('Error dispatching Resend report:', error);
    }
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    // Validate corporate/business email
    if (!validateCompanyEmail(leadEmail)) {
      const emailErrMsg = currentLang === 'FR'
        ? "Veuillez utiliser un e-mail professionnel (ex : nom@entreprise.com) ou l'adresse de test."
        : currentLang === 'ES'
        ? "Por favor, utiliza un correo profesional (ej: nombre@empresa.com) o el correo de prueba."
        : "Please use a professional business email (e.g. name@company.com) or the test email.";
      setToastTitle(currentLang === 'FR' ? "E-mail professionnel requis" : currentLang === 'ES' ? "Email profesional requerido" : "Business Email Required");
      setToastMessage(emailErrMsg);
      setToastType('error');
      setShowToast(true);
      return;
    }

    setLeadSubmitted(true);
    try {
      const payload = {
        formType: 'Lead Pricing / Quote Request',
        leadEmail: leadEmail,
        companyName: companyName || 'Documatch Guest',
        originalCompanyEmail: companyEmail,
        phone: companyPhone,
        country: COUNTRY_OPTIONS[currentLang].find(c => c.value === companyCountry)?.label || companyCountry,
        usersCount: usersCount,
        allocatedBudget: allocatedBudget,
        erp: selectedErp,
        industry: INDUSTRY_OPTIONS[currentLang][selectedIndustryIdx],
        volume: currentLang === 'FR' 
          ? VOLUME_OPTIONS[selectedVolumeIdx] 
          : currentLang === 'ES' 
          ? VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documentos / mes') 
          : VOLUME_OPTIONS[selectedVolumeIdx].replace('documents / mois', 'documents / month'),
        processes: selectedProcessIds.map(id => {
          const proc = PROCESS_OPTIONS[currentLang].find(p => p.id === id);
          return proc ? proc.title : id;
        }).join(', '),
        complianceConstraint: selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
        recommendations: recommendedGeds.map(g => `${g.name} (${g.score}%)`).join(', ')
      };

      await fetch('https://formspree.io/f/mzdlqkll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Error submitting lead to Formspree:', error);
    }
  };

  const renderStars = (rating: number, reviewsCount: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = (rating - fullStars) >= 0.4;
    return (
      <div className="flex flex-col gap-0.5 mt-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            const isFilled = starValue <= fullStars;
            const isHalf = !isFilled && starValue === fullStars + 1 && hasHalf;
            return (
              <svg 
                key={i} 
                className={`h-3.5 w-3.5 shrink-0 ${isFilled ? 'text-amber-400 fill-amber-400' : isHalf ? 'text-amber-400 fill-amber-400/50' : 'text-slate-600 fill-transparent'}`}
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  stroke={!isFilled && !isHalf ? '#475569' : 'none'}
                  strokeWidth={!isFilled && !isHalf ? '1.5' : '0'}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
                />
              </svg>
            );
          })}
          <span className="text-xs font-bold text-amber-400 ml-1.5">{rating.toFixed(1)}</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium font-sans leading-tight">
          {reviewsCount} {currentLang === 'FR' ? 'avis clients vérifiés' : currentLang === 'ES' ? 'reseñas de clientes' : 'verified client reviews'}
        </span>
      </div>
    );
  };

  const toggleProcess = (id: string) => {
    setSelectedProcessIds(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id) 
        : [...prev, id]
    );
  };

  // Trigger matching algorithm upon completing inputs
  const handleCalculate = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisLogs([]);
    
    const logs = currentLang === 'FR' ? [
      "Vérification des protocoles de connexion de l'ERP...",
      "Analyse des flux documentaires et du volume de stockage...",
      "Comparaison de la matrice de compatibilité des processus métiers (" + selectedProcessIds.length + " sélectionnés)...",
      "Vérification des conformités légales : " + selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
      "Calcul des pondérations de compatibilité..."
    ] : currentLang === 'ES' ? [
      "Verificando protocolos de conexión del ERP...",
      "Analizando flujos documentales y volumen de almacenamiento...",
      "Comparando matriz de compatibilidad de procesos de negocio (" + selectedProcessIds.length + " seleccionados)...",
      "Verificando cumplimiento normativo: " + selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
      "Calculando puntuaciones de compatibilidad..."
    ] : [
      "Verifying ERP communication protocols...",
      "Analyzing document workflows and storage volume...",
      "Comparing business process compatibility matrix (" + selectedProcessIds.length + " selected)...",
      "Verifying compliance standards: " + selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', '),
      "Calculating compatibility weights..."
    ];

    // Simulate step-by-step AI progress
    let logIndex = 0;
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const mappedConstraintIdxs = selectedConstraintIdxs.map(
              idx => CONSTRAINT_MAPPINGS[currentLang][idx]
            );
            const results = getGedRecommendations(
              selectedErp,
              selectedIndustryIdx,
              mappedConstraintIdxs,
              selectedVolumeIdx,
              selectedProcessIds,
              currentLang
            );
            setRecommendedGeds(results);
            setIsAnalyzing(false);
            setShowResults(true);

            // Send to Formspree
            submitToFormspree(results);

            // Send custom HTML analysis via Resend securely
            sendResendReport(results);

            // Set and trigger Toast
            const msg = currentLang === 'FR' 
              ? "Votre rapport de compatibilité a été généré et transmis avec succès."
              : currentLang === 'ES'
              ? "Tu informe de compatibilidad ha sido generado y enviado con éxito."
              : "Your compatibility report has been successfully generated and submitted.";
            setToastTitle(currentLang === 'FR' ? "Analyse Terminée !" : currentLang === 'ES' ? "¡Análisis Completado!" : "Analysis Complete!");
            setToastType('success');
            setToastMessage(msg);
            setShowToast(true);
          }, 400);
          return 100;
        }
        
        // Push a log every 20%
        if (prev % 20 === 0 && logIndex < logs.length) {
          setAnalysisLogs((prevLogs) => [...prevLogs, logs[logIndex]]);
          logIndex++;
        }

        return prev + 5;
      });
    }, 120);
  };

  const resetForm = () => {
    setStep(1);
    setCompanyName('');
    setCompanyEmail('');
    setCompanyPhone('');
    setCompanyCountry('FR');
    setShowStep1Error(false);
    setUsersCount('10');
    setAllocatedBudget('5000-10000');
    setSelectedErp(ERP_OPTIONS[0]);
    setSelectedIndustryIdx(0);
    setSelectedVolumeIdx(1);
    setSelectedConstraintIdxs([0]);
    setSelectedProcessIds([]);
    setIsAnalyzing(false);
    setShowResults(false);
    setLeadEmail('');
    setLeadSubmitted(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        ref={scrollContainerRef}
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
      >
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-slate-100 my-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/40 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <DocumatchLogo className="h-9 w-9" isDarkBg={true} />
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {showResults ? t.wizard.resultsTitle : t.wizard.title}
              </h3>
              {!showResults && !isAnalyzing && (
                <p className="text-xs text-slate-400 font-medium">
                  {t.wizard.stepOf} {step} / 4
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* ANALYZING LOADER STATE */}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center justify-center max-w-md mx-auto text-center">
              <div className="relative mb-8">
                <div className="h-20 w-20 rounded-full border-4 border-slate-900 border-t-blue-500 animate-spin flex items-center justify-center" />
                <Cpu className="absolute inset-5 h-10 w-10 text-blue-400 animate-pulse" />
              </div>
              
              <h4 className="text-lg font-bold text-white mb-2">
                {t.wizard.analyzing}
              </h4>
              
              <div className="w-full bg-slate-900 rounded-full h-2.5 mb-6 overflow-hidden">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-100" 
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>

              {/* Progress logs */}
              <div className="w-full bg-slate-950 rounded-lg p-4 text-left border border-slate-900 font-mono text-[11px] leading-relaxed text-slate-400 min-h-[140px] flex flex-col gap-1.5">
                {analysisLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <span className="text-slate-300 font-medium">{log}</span>
                  </div>
                ))}
                {analysisProgress < 100 && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="animate-ping">•</span>
                    <span className="italic font-semibold text-[10px]">Processing matrix...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUESTIONS WIZARD STATE */}
          {!isAnalyzing && !showResults && (
            <div className="space-y-6">
              
              {/* Step-by-Step Progress Indicator */}
              <div className="mb-6 select-none border-b border-slate-900/60 pb-6">
                <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
                  {/* Connecting background line */}
                  <div className="absolute top-4 left-8 right-8 h-0.5 bg-slate-900 z-0" />
                  
                  {/* Connecting active line */}
                  <div 
                    className="absolute top-4 left-8 h-0.5 bg-blue-500 transition-all duration-300 z-0" 
                    style={{ 
                      width: `${((step - 1) / 3) * 100}%`,
                      maxWidth: "calc(100% - 64px)"
                    }}
                  />
                  
                  {/* Step Circles */}
                  {[1, 2, 3, 4].map((s) => {
                    const isCompleted = step > s;
                    const isActive = step === s;
                    const stepTitle = getStepTitle(s, currentLang);
                    
                    return (
                      <div key={s} className="flex flex-col items-center relative z-10">
                        <button
                          type="button"
                          onClick={() => {
                            if (s < step) {
                              setStep(s);
                            }
                          }}
                          className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2 ${
                            isCompleted
                              ? 'bg-blue-600 border-blue-600 text-white hover:scale-105 cursor-pointer'
                              : isActive
                              ? 'bg-slate-950 border-blue-500 text-blue-400 ring-4 ring-blue-500/10 cursor-default'
                              : 'bg-slate-950 border-slate-800 text-slate-500 pointer-events-none'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          ) : (
                            s
                          )}
                        </button>
                        <span className={`text-[10px] font-bold mt-2 font-sans tracking-wide text-center transition-colors duration-300 ${
                          isActive ? 'text-blue-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {stepTitle}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Step 1: Corporate Profile */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-900 pb-3">
                    <h4 className="text-base font-bold text-white">
                      {currentLang === 'FR' ? 'Parlez-nous de votre structure' : currentLang === 'ES' ? 'Cuéntanos sobre tu estructura' : 'Tell us about your organization'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'FR' ? 'Ces données initiales permettent d\'évaluer la dimension de votre projet.' : currentLang === 'ES' ? 'Estos datos iniciales permiten evaluar la escala de tu proyecto.' : 'This initial data helps evaluate the scale of your project.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Company name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        {t.wizard.fields.companyName}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email (mandatory) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span>{currentLang === 'FR' ? 'E-mail professionnel' : currentLang === 'ES' ? 'Correo electrónico' : 'Professional Email'} <span className="text-red-500">*</span></span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. contact@company.com"
                        value={companyEmail}
                        onChange={(e) => {
                          setCompanyEmail(e.target.value);
                          if (showStep1Error && e.target.value.trim()) {
                            setShowStep1Error(false);
                          }
                        }}
                        className={`rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          showStep1Error && !companyEmail.trim()
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>

                    {/* Phone (mandatory) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span>{currentLang === 'FR' ? 'Téléphone' : currentLang === 'ES' ? 'Teléfono' : 'Phone Number'} <span className="text-red-500">*</span></span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +33 6 12 34 56 78"
                        value={companyPhone}
                        onChange={(e) => {
                          setCompanyPhone(e.target.value);
                          if (showStep1Error && e.target.value.trim()) {
                            setShowStep1Error(false);
                          }
                        }}
                        className={`rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-1 ${
                          showStep1Error && !companyPhone.trim()
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                        }`}
                      />
                    </div>

                    {/* Country Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Globe className="h-4 w-4 text-slate-500" />
                        {currentLang === 'FR' ? 'Pays' : currentLang === 'ES' ? 'País' : 'Country'}
                      </label>
                      <select
                        value={companyCountry}
                        onChange={(e) => setCompanyCountry(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        {COUNTRY_OPTIONS[currentLang].map((country) => (
                          <option key={country.value} value={country.value} className="bg-slate-950">
                            {country.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Users Count */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-slate-500" />
                        {t.wizard.fields.usersCount}
                      </label>
                      <select
                        value={usersCount}
                        onChange={(e) => setUsersCount(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="5" className="bg-slate-950">1 - 5 {currentLang === 'FR' ? 'utilisateurs' : currentLang === 'ES' ? 'usuarios' : 'users'}</option>
                        <option value="15" className="bg-slate-950">6 - 20 {currentLang === 'FR' ? 'utilisateurs' : currentLang === 'ES' ? 'usuarios' : 'users'}</option>
                        <option value="50" className="bg-slate-950">21 - 100 {currentLang === 'FR' ? 'utilisateurs' : currentLang === 'ES' ? 'usuarios' : 'users'}</option>
                        <option value="250" className="bg-slate-950">100 - 500 {currentLang === 'FR' ? 'utilisateurs' : currentLang === 'ES' ? 'usuarios' : 'users'}</option>
                        <option value="1000" className="bg-slate-950">500+ {currentLang === 'FR' ? 'utilisateurs' : currentLang === 'ES' ? 'usuarios' : 'users'}</option>
                      </select>
                    </div>

                    {/* Allocated Budget */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Coins className="h-4 w-4 text-slate-500" />
                        {t.wizard.fields.allocatedBudget}
                      </label>
                      <select
                        value={allocatedBudget}
                        onChange={(e) => setAllocatedBudget(e.target.value)}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="under5k" className="bg-slate-950">&lt; 5,000 €</option>
                        <option value="5k-15k" className="bg-slate-950">5,000 € - 15,000 €</option>
                        <option value="15k-30k" className="bg-slate-950">15,000 € - 30,000 €</option>
                        <option value="30k-60k" className="bg-slate-950">30,000 € - 60,000 €</option>
                        <option value="60k-100k" className="bg-slate-950">60,000 € - 100,000 €</option>
                        <option value="over100k" className="bg-slate-950">&gt; 100,000 €</option>
                      </select>
                    </div>
                  </div>

                  {/* Industry Sector selector */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-slate-500" />
                      {t.hero.labels.industry}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {INDUSTRY_OPTIONS[currentLang].map((industry, index) => {
                        const isSelected = selectedIndustryIdx === index;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedIndustryIdx(index)}
                            className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all ${
                              isSelected 
                                ? 'bg-blue-950/60 border-blue-500 text-blue-300 shadow-xs' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className="block">{industry}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: System Integration */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-900 pb-3">
                    <h4 className="text-base font-bold text-white">
                      {currentLang === 'FR' ? 'Intégration de vos outils' : currentLang === 'ES' ? 'Integración con tus sistemas' : 'ERP and System Integration'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'FR' ? 'La GED idéale doit se connecter nativement à votre ERP.' : currentLang === 'ES' ? 'La GED ideal debe conectarse de forma nativa a tu ERP.' : 'Your ideal DMS must connect natively with your core systems.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Server className="h-4 w-4 text-slate-500" />
                      {t.hero.labels.erp}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {ERP_OPTIONS.map((erp) => {
                        const isSelected = selectedErp === erp;
                        return (
                          <button
                            key={erp}
                            type="button"
                            onClick={() => setSelectedErp(erp)}
                            className={`p-4 text-xs font-bold rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[85px] gap-2 ${
                              isSelected 
                                ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300 shadow-xs' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-400 block">SYSTEM</span>
                            <span className="block font-semibold">{erp}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Volume & Process */}
              {step === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-900 pb-3">
                    <h4 className="text-base font-bold text-white">
                      {currentLang === 'FR' ? 'Volume & Processus prioritaires' : currentLang === 'ES' ? 'Volumen y Procesos clave' : 'Volume & Key Processes'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'FR' ? 'Estimez les flux de dossiers et sélectionnez les processus cibles.' : currentLang === 'ES' ? 'Estima el flujo de archivos y selecciona los procesos objetivos.' : 'Estimate document traffic and select target processes.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    {/* Document Volume */}
                    <div className="flex flex-col gap-2 max-w-sm">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-slate-500" />
                        {t.hero.labels.volume}
                      </label>
                      <select
                        value={selectedVolumeIdx}
                        onChange={(e) => setSelectedVolumeIdx(Number(e.target.value))}
                        className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm font-medium text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                      >
                        {VOLUME_OPTIONS.map((vol, index) => (
                          <option key={index} value={index} className="bg-slate-950">
                            {currentLang === 'FR' ? vol : currentLang === 'ES' ? vol.replace('documents / mois', 'documentos / mes') : vol.replace('documents / mois', 'documents / month')}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Processus / Besoins prioritaires (Multi-sélection) */}
                    <div className="flex flex-col gap-2.5">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <FileCheck2 className="h-4 w-4 text-slate-500" />
                          {currentLang === 'FR' ? 'Processus & Besoins prioritaires (Sélectionnez plusieurs options)' : currentLang === 'ES' ? 'Procesos y Necesidades prioritarias (Selecciona varias opciones)' : 'Key Processes & Requirements (Select multiple options)'}
                        </span>
                        <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase">
                          {selectedProcessIds.length} {currentLang === 'FR' ? 'Sélectionnés' : currentLang === 'ES' ? 'Seleccionados' : 'Selected'}
                        </span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                        {PROCESS_OPTIONS[currentLang].map((proc) => {
                          const isSelected = selectedProcessIds.includes(proc.id);
                          return (
                            <button
                              key={proc.id}
                              type="button"
                              onClick={() => toggleProcess(proc.id)}
                              className={`text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 select-none cursor-pointer ${
                                isSelected
                                  ? 'bg-blue-950/40 border-blue-500 text-white shadow-md shadow-blue-950/20'
                                  : 'bg-slate-900 border-slate-850 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                              }`}
                            >
                              <div className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center mt-0.5 transition-all ${
                                isSelected ? 'bg-blue-500 border-blue-500 text-white scale-105' : 'border-slate-700 bg-slate-950'
                              }`}>
                                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className={`block font-extrabold text-xs leading-tight ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                                  {proc.title}
                                </span>
                                <span className="block text-[10.5px] text-slate-400 font-medium mt-1 leading-relaxed">
                                  {proc.description}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Compliance Constraints */}
              {step === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="border-b border-slate-900 pb-3">
                    <h4 className="text-base font-bold text-white">
                      {currentLang === 'FR' ? 'Normes & Conformité réglementaire' : currentLang === 'ES' ? 'Normativas y Cumplimiento legal' : 'Standards & Compliance'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'FR' ? 'Sélectionnez les obligations de conformité applicables à votre entreprise.' : currentLang === 'ES' ? 'Selecciona las obligaciones legales aplicables a tu negocio.' : 'Select regulatory standards applicable to your corporate workflow.'}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="h-4 w-4 text-slate-500" />
                        <span>
                          {t.hero.labels.constraints}
                          <span className="text-slate-400 font-medium ml-1.5">
                            {currentLang === 'FR' ? '(Sélectionnez jusqu\'à 7 options)' : currentLang === 'ES' ? '(Selecciona hasta 7 opciones)' : '(Select up to 7 options)'}
                          </span>
                        </span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                        {selectedConstraintIdxs.length} / 7
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CONSTRAINT_OPTIONS[currentLang].map((constraint, index) => {
                        const isSelected = selectedConstraintIdxs.includes(index);
                        const isMaxed = selectedConstraintIdxs.length >= 7;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => toggleConstraint(index)}
                            className={`p-4 text-xs font-bold rounded-xl border text-left transition-all flex items-center gap-3 select-none ${
                              isSelected 
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-xs' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            } ${!isSelected && isMaxed ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.01]'}`}
                          >
                            <div className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-all ${
                              isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-700 bg-slate-950'
                            }`}>
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                            <span className="block font-semibold">{constraint}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Navigation Footer */}
              <div className="flex items-center justify-between border-t border-slate-900 pt-5 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-bold text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.wizard.prev}
                </button>

                {step < 4 ? (
                  <div className="flex flex-col items-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 1) {
                          if (!companyEmail.trim() || !companyPhone.trim()) {
                            setShowStep1Error(true);
                            return;
                          }
                          
                          // Validate corporate/business email
                          if (!validateCompanyEmail(companyEmail)) {
                            const emailErrMsg = currentLang === 'FR'
                              ? "Veuillez utiliser un e-mail professionnel (ex : nom@entreprise.com) ou l'adresse de test."
                              : currentLang === 'ES'
                              ? "Por favor, utiliza un correo profesional (ej: nombre@empresa.com) o el correo de prueba."
                              : "Please use a professional business email (e.g. name@company.com) or the test email.";
                            setToastTitle(currentLang === 'FR' ? "E-mail professionnel requis" : currentLang === 'ES' ? "Email profesional requerido" : "Business Email Required");
                            setToastMessage(emailErrMsg);
                            setToastType('error');
                            setShowToast(true);
                            return;
                          }

                          // Validate country phone indicator
                          const phoneCheck = validatePhoneIndicator(companyPhone, companyCountry);
                          if (!phoneCheck.isValid) {
                            const phoneErrMsg = currentLang === 'FR'
                              ? `Le numéro de téléphone doit commencer par l'indicatif du pays sélectionné (${phoneCheck.expectedIndicator}).`
                              : currentLang === 'ES'
                              ? `El número de teléfono debe comenzar con el indicativo del país seleccionado (${phoneCheck.expectedIndicator}).`
                              : `The phone number must start with the selected country's calling code (${phoneCheck.expectedIndicator}).`;
                            setToastTitle(currentLang === 'FR' ? "Téléphone invalide" : currentLang === 'ES' ? "Teléfono inválido" : "Invalid Phone");
                            setToastMessage(phoneErrMsg);
                            setToastType('error');
                            setShowToast(true);
                            return;
                          }
                          
                          setShowStep1Error(false);
                        }
                        setStep(step + 1);
                      }}
                      className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-md hover:scale-102 transition-all cursor-pointer"
                    >
                      {t.wizard.next}
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    {step === 1 && showStep1Error && (
                      <p className="text-xs font-semibold text-red-400">
                        {currentLang === 'FR' 
                          ? '* L\'adresse e-mail et le téléphone sont obligatoires.' 
                          : currentLang === 'ES' 
                          ? '* El correo electrónico y el teléfono son obligatorios.' 
                          : '* Email and phone are mandatory.'}
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCalculate}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-lg hover:scale-102 transition-all cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4 text-blue-100" />
                    {t.wizard.calculate}
                  </button>
                )}
              </div>

            </div>
          )}

          {/* CUSTOM REPORT VIEW STATE */}
          {showResults && !isAnalyzing && (
            <div id="print-area" className="space-y-6 sm:space-y-8 animate-fadeIn">
              
              {/* Header Box Report */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-extrabold font-mono text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      CONFIDENTIAL REPORT
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
                      {companyName || 'Acme'} — {currentLang === 'FR' ? 'Audit de compatibilité GED' : currentLang === 'ES' ? 'Auditoría de compatibilidad GED' : 'DMS Compatibility Audit'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentLang === 'FR' ? 'Généré par Documatch Context AI le ' : currentLang === 'ES' ? 'Generado por Documatch Context AI el ' : 'Generated by Documatch Context AI on '}
                      {new Date().toLocaleDateString(currentLang === 'FR' ? 'fr-FR' : currentLang === 'ES' ? 'es-ES' : 'en-US')}
                    </p>
                  </div>
                  
                  <button
                    onClick={handlePrint}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-bold transition-all cursor-pointer text-slate-100 print:hidden"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    {currentLang === 'FR' ? 'Imprimer le rapport' : currentLang === 'ES' ? 'Imprimir informe' : 'Print Report'}
                  </button>
                </div>

                 {/* Audit input summary pills */}
                <div className="mt-6 pt-4 border-t border-slate-850 flex flex-wrap gap-2.5 text-xs text-slate-300">
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">Email:</strong> {companyEmail}
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">{currentLang === 'FR' ? 'Tél:' : currentLang === 'ES' ? 'Tel:' : 'Tel:'}</strong> {companyPhone}
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">{currentLang === 'FR' ? 'Pays:' : currentLang === 'ES' ? 'País:' : 'Country:'}</strong> {COUNTRY_OPTIONS[currentLang].find(c => c.value === companyCountry)?.label || companyCountry}
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-slate-850">
                    <strong className="text-slate-400">ERP:</strong> 
                    <ErpLogo name={selectedErp} size="sm" className="scale-85 origin-left" />
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">{currentLang === 'FR' ? 'Secteur:' : currentLang === 'ES' ? 'Sector:' : 'Sector:'}</strong> {INDUSTRY_OPTIONS[currentLang][selectedIndustryIdx]}
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">{currentLang === 'FR' ? 'Volume:' : currentLang === 'ES' ? 'Volumen:' : 'Volume:'}</strong>{' '}
                    {currentLang === 'FR' 
                      ? VOLUME_OPTIONS[selectedVolumeIdx].split(' (')[0] 
                      : currentLang === 'ES' 
                      ? VOLUME_OPTIONS[selectedVolumeIdx].split(' (')[0].replace('documents / mois', 'documentos / mes') 
                      : VOLUME_OPTIONS[selectedVolumeIdx].split(' (')[0].replace('documents / mois', 'documents / month')}
                  </span>
                  <span className="bg-slate-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-850">
                    <strong className="text-slate-400">
                      {selectedConstraintIdxs.length > 1 
                        ? (currentLang === 'FR' ? 'Normes :' : currentLang === 'ES' ? 'Normas:' : 'Standards:') 
                        : (currentLang === 'FR' ? 'Norme :' : currentLang === 'ES' ? 'Norma:' : 'Standard:')}
                    </strong>{' '}
                    {selectedConstraintIdxs.length > 0 
                      ? selectedConstraintIdxs.map(idx => CONSTRAINT_OPTIONS[currentLang][idx]).join(', ')
                      : (currentLang === 'FR' ? 'Aucune' : currentLang === 'ES' ? 'Ninguna' : 'None')}
                  </span>
                </div>

                {/* Selected target processes list */}
                {selectedProcessIds.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-850">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                      {currentLang === 'FR' ? 'PROCESSUS & BESOINS PRIORITAIRES AUDITÉS :' : currentLang === 'ES' ? 'PROCESOS Y NECESIDADES PRIORITARIAS AUDITADAS:' : 'AUDITED KEY PROCESSES & REQUIREMENTS:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProcessIds.map(id => {
                        const proc = PROCESS_OPTIONS[currentLang].find(p => p.id === id);
                        return proc ? (
                          <span key={id} className="text-[11px] font-extrabold bg-slate-950 border border-slate-800 text-blue-400 px-3 py-1 rounded-lg flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            {proc.title.split(' : ')[0]}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Analysis Match Results */}
              <div className="space-y-4">
                <h5 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">
                  {currentLang === 'FR' ? 'CLASSEMENT SUR MESURE DES SOLUTIONS (TOP 3 COMPATIBLES)' : currentLang === 'ES' ? 'CLASIFICACIÓN DE SOLUCIONES A MEDIDA (TOP 3 COMPATIBLES)' : 'BESPOKE SOLUTIONS RANKING (TOP 3 MATCHES)'}
                </h5>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Top Match Card */}
                  {recommendedGeds.slice(0, 3).map((ged, index) => {
                    const isFirst = index === 0;
                    return (
                      <motion.div 
                        key={ged.name} 
                        initial={isFirst ? { scale: 1.01 } : undefined}
                        animate={isFirst ? {
                          scale: [1.01, 1.03, 1.01],
                          boxShadow: [
                            "0 10px 25px -5px rgba(245, 158, 11, 0.15), 0 0 0 2px rgba(245, 158, 11, 0.2)",
                            "0 15px 35px -5px rgba(245, 158, 11, 0.35), 0 0 15px 4px rgba(245, 158, 11, 0.4)",
                            "0 10px 25px -5px rgba(245, 158, 11, 0.15), 0 0 0 2px rgba(245, 158, 11, 0.2)"
                          ]
                        } : undefined}
                        transition={isFirst ? {
                          scale: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                          },
                          boxShadow: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                          }
                        } : undefined}
                        className={`relative overflow-hidden rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                          isFirst 
                            ? 'border-amber-400 bg-gradient-to-br from-amber-950/35 via-slate-900 to-slate-900 ring-2 ring-amber-500/30 shadow-lg' 
                            : index === 1
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-950/20 to-slate-900 shadow-md shadow-indigo-950/20'
                            : 'border-sky-500/60 bg-gradient-to-br from-sky-950/20 to-slate-900 shadow-md shadow-sky-950/10'
                        }`}
                      >
                        {isFirst && (
                          <div className="absolute top-0 left-0 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-slate-950 font-extrabold text-[10px] px-3.5 py-1.5 rounded-br-2xl uppercase tracking-widest shadow-md flex items-center gap-1.5 z-10 border-r border-b border-amber-300/30">
                            <Star className="h-3 w-3 fill-slate-950 stroke-slate-950 shrink-0 animate-pulse" />
                            <span>BEST MATCH</span>
                          </div>
                        )}

                        <div className={`absolute top-0 right-0 font-extrabold text-[9px] px-3.5 py-1 rounded-bl-xl uppercase tracking-wider ${
                          isFirst 
                            ? 'bg-amber-950/60 text-amber-400 border-l border-b border-amber-500/30' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {currentLang === 'FR' ? `Rang #${index + 1}` : currentLang === 'ES' ? `Puesto #${index + 1}` : `Rank #${index + 1}`}
                        </div>

                        <div>
                          <div className="flex items-start gap-3 mb-4 mt-2">
                            <GedLogo name={ged.name} size="md" className="shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                                DMS / GED VENDOR
                              </span>
                              <h6 className="font-extrabold text-white text-base truncate">{ged.name}</h6>
                              {renderStars(ged.rating || 4.7, ged.reviewsCount || 120)}
                            </div>
                          </div>

                          {/* Match Bar & Score */}
                          <div className={`flex items-center justify-between mb-3 p-2.5 rounded-lg border ${
                            isFirst 
                              ? 'bg-amber-950/30 border-amber-500/20' 
                              : 'bg-slate-950 border-slate-900'
                          }`}>
                            <span className="text-[11px] font-bold text-slate-300">
                              {currentLang === 'FR' ? 'Concordance' : currentLang === 'ES' ? 'Coincidencia' : 'Match Score'}
                            </span>
                            <span className={`${isFirst ? 'text-amber-400 font-black' : index === 1 ? 'text-indigo-400' : 'text-sky-400'} font-extrabold text-lg`}>
                              {ged.score}%
                            </span>
                          </div>

                          <p className={`text-xs text-slate-300 leading-relaxed p-3 rounded-lg min-h-[90px] border ${
                            isFirst 
                              ? 'bg-amber-950/10 border-amber-500/10' 
                              : 'bg-slate-950/50 border-slate-800'
                          }`}>
                            <strong className="text-white block mb-1">
                              {currentLang === 'FR' ? 'Justificatif de l\'IA :' : currentLang === 'ES' ? 'Justificación de la IA:' : 'AI Rationale:'}
                            </strong>
                            {ged.reasons[currentLang]}
                          </p>
                        </div>

                        <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] font-semibold text-slate-400 ${
                          isFirst ? 'border-amber-500/20' : 'border-slate-800'
                        }`}>
                          <span className="flex items-center gap-1 text-emerald-400 font-bold truncate max-w-[140px]">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{selectedErp}</span>
                          </span>
                          <span className="shrink-0 text-[10px]">
                            {ged.badge === 'high' ? t.hero.labels.compatibilityHigh : t.hero.labels.compatibilityMedium}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}

                </div>
              </div>

              {/* Other analyzed solutions */}
              <div className="border-t border-slate-900 pt-6">
                <h5 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-3">
                  {currentLang === 'FR' ? 'AUTRES ALTERNATIVES ANALYSÉES (BASE DE DONNÉES COMPLÈTE)' : currentLang === 'ES' ? 'OTRAS ALTERNATIVAS ANALIZADAS (BASE DE DATOS COMPLETA)' : 'OTHER ANALYZED ALTERNATIVES (FULL DATABASE)'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedGeds.slice(3).map((ged, idx) => (
                    <div key={ged.name} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900/40 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all gap-3 min-w-0 overflow-hidden">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <GedLogo name={ged.name} size="sm" className="shrink-0 mt-0.5 scale-90 origin-left" />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-white text-xs whitespace-normal break-words">{ged.name}</span>
                            <span className="text-[9px] text-slate-400">#{idx + 4}</span>
                            <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                              ★ {ged.rating?.toFixed(1) || '4.5'}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 whitespace-normal break-words mt-1 leading-relaxed">{ged.reasons[currentLang]}</p>
                        </div>
                      </div>
                      <span className="bg-slate-950 px-2.5 py-1 border border-slate-800 rounded-md font-mono text-xs text-slate-300 font-bold shrink-0 self-end sm:self-auto">
                        {ged.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead Generation Form section inside report */}
              <div className="rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-700 p-6 text-white relative overflow-hidden print:hidden shadow-lg border border-indigo-500/20 flex flex-col items-center justify-center text-center">
                <div className="absolute bottom-0 right-0 h-32 w-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
                  <h6 className="font-black text-lg sm:text-xl tracking-tight mb-2 text-center">
                    {currentLang === 'FR' ? 'Besoin d\'un devis ou d\'une étude d\'intégration ?' : currentLang === 'ES' ? '¿Necesitas presupuestos o estudio de integración?' : 'Need pricing or an integration study?'}
                  </h6>
                  <p className="text-xs text-indigo-100 leading-relaxed mb-5 text-center">
                    {currentLang === 'FR' ? 'Saisissez votre email. Un expert indépendant vous contactera sous 24h avec les grilles tarifaires négociées et le cahier des charges pré-rempli.' : currentLang === 'ES' ? 'Introduce tu correo. Un consultor independiente te contactará en 24h con tarifas negociadas y el pliego de condiciones ya completado.' : 'Enter your email. An independent consultant will contact you within 24h with negotiated rates and a pre-filled specification booklet.'}
                  </p>

                  {!leadSubmitted ? (
                    <form 
                      onSubmit={handleLeadFormSubmit}
                      className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md justify-center items-stretch sm:items-center"
                    >
                      <div className="relative flex-1">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                           required
                          type="email"
                          placeholder="e.g. name@company.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full rounded-xl bg-white px-3.5 py-2.5 pl-11 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1 bg-white hover:bg-slate-50 text-blue-700 font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
                      >
                        {currentLang === 'FR' ? 'Recevoir par mail' : currentLang === 'ES' ? 'Recibir por mail' : 'Send to mail'}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex flex-col sm:flex-row items-center justify-center text-center gap-3 animate-fadeIn w-full max-w-md">
                      <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="font-bold text-sm text-white block">
                           {currentLang === 'FR' ? 'Dossier transmis avec succès !' : currentLang === 'ES' ? '¡Informe enviado con éxito!' : 'Report sent successfully!'}
                        </span>
                        <span className="text-[11px] text-indigo-100">
                          {currentLang === 'FR' ? 'Vérifiez votre boîte mail ' : currentLang === 'ES' ? 'Revisa tu bandeja de entrada ' : 'Check your inbox '}({leadEmail})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer Report */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-900 pt-5 mt-6 print:hidden">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-400 hover:text-white underline transition-colors cursor-pointer text-left sm:text-auto"
                >
                  {t.wizard.reset}
                </button>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    id="print-summary-btn"
                    type="button"
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] active:scale-95"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>
                      {currentLang === 'FR' ? 'Imprimer le résumé' : currentLang === 'ES' ? 'Imprimir resumen' : 'Print Summary'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {currentLang === 'FR' ? 'Fermer l\'assistant' : currentLang === 'ES' ? 'Cerrar asistente' : 'Close wizard'}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </motion.div>
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md min-w-[320px] max-w-md pointer-events-auto transition-colors duration-200 ${
              toastType === 'error' 
                ? 'border-red-500/40 bg-slate-950/95 shadow-red-950/20' 
                : 'border-blue-500/30 bg-slate-900/95 shadow-blue-950/20'
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              toastType === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {toastType === 'error' ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-extrabold text-white">
                {toastTitle || (currentLang === 'FR' ? 'Analyse Terminée !' : currentLang === 'ES' ? '¡Análisis Completado!' : 'Analysis Complete!')}
              </span>
              <span className="block text-[11px] text-slate-300 mt-0.5 leading-normal font-medium">
                {toastMessage}
              </span>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-slate-500 hover:text-slate-300 transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
