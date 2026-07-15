import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Cookie, Scale, Mail, Phone, MapPin, Building2, Landmark, CheckCircle } from 'lucide-react';

export type LegalDocType = 'mentions' | 'confidentialite' | 'cookies' | 'cgu' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
}

export default function LegalModal({ docType, onClose }: LegalModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (docType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [docType]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!docType) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                {docType === 'mentions' && <Building2 className="h-5 w-5" />}
                {docType === 'confidentialite' && <Shield className="h-5 w-5" />}
                {docType === 'cookies' && <Cookie className="h-5 w-5" />}
                {docType === 'cgu' && <Scale className="h-5 w-5" />}
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                  {docType === 'mentions' && "Mentions légales"}
                  {docType === 'confidentialite' && "Politique de confidentialité"}
                  {docType === 'cookies' && "Politique des cookies"}
                  {docType === 'cgu' && "Conditions d'utilisation"}
                </h3>
                <span className="text-[10px] text-blue-400 font-bold font-mono uppercase tracking-wider">
                  Documatch Legal Context
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-400 transition-all cursor-pointer active:scale-95 border border-slate-700/50"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-slate-300 leading-relaxed font-normal">
            {docType === 'mentions' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Building2 className="h-4.5 w-4.5 text-blue-400" />
                    <span>Éditeur du site</span>
                  </h4>
                  <p className="pl-6 text-slate-300">
                    Documatch est un service de comparaison de solutions de gestion électronique de documents destiné aux entreprises.
                  </p>
                  <div className="mt-3 pl-6 space-y-1 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-blue-500" />
                      <span>Email de contact : <a href="mailto:info@documatch.eu" className="text-blue-400 hover:underline">info@documatch.eu</a></span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Landmark className="h-4.5 w-4.5 text-blue-400" />
                    <span>Directeur de publication</span>
                  </h4>
                  <ul className="pl-6 list-disc space-y-1">
                    <li>Directeur de publication : <strong>Documatch</strong></li>
                    <li>SIREN : <strong>992 752 980</strong>, société immatriculée en France</li>
                    <li>TVA non applicable conformément à l'article 293 B du Code Général des Impôts.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <MapPin className="h-4.5 w-4.5 text-blue-400" />
                    <span>Hébergement</span>
                  </h4>
                  <p className="pl-6">
                    Le site Documatch.eu est hébergé par <strong>OVH</strong>.
                  </p>
                  <div className="mt-2 pl-6 space-y-1 text-slate-400 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      <span>Adresse : 2 rue Kellermann, 59100 Roubaix, France.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-500" />
                      <span>Téléphone : +33 9 72 10 10 07.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-blue-400" />
                    <span>Propriété intellectuelle</span>
                  </h4>
                  <p className="pl-6">
                    L'ensemble des contenus du site Documatch.eu (textes, visuels, logos, éléments graphiques) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Documatch ou de ses partenaires. Toute reproduction ou exploitation non autorisée est interdite.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="h-4.5 w-4.5 text-blue-400" />
                    <span>Responsabilité</span>
                  </h4>
                  <p className="pl-6">
                    Documatch s'efforce de fournir des informations fiables et régulièrement mises à jour. Toutefois, aucune garantie n'est apportée quant à l'exactitude ou l'exhaustivité des informations présentées. L'utilisateur reconnaît utiliser ces informations sous sa seule responsabilité.
                  </p>
                </div>
              </div>
            )}

            {docType === 'confidentialite' && (
              <div className="space-y-6">
                <div>
                  <p className="text-slate-300">
                    Documatch collecte uniquement les données personnelles nécessaires à l'utilisation de son service de comparaison de solutions GED, notamment lors de l'utilisation de l'analyste IA ou d'une prise de contact.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-400" />
                    <span>Utilisation des données</span>
                  </h4>
                  <p className="pl-6">
                    Les données sont utilisées exclusivement pour fournir des recommandations personnalisées, améliorer le service et répondre aux demandes des utilisateurs. <strong>Aucune donnée n'est vendue ou transmise à des tiers.</strong>
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="h-4.5 w-4.5 text-blue-400" />
                    <span>Sécurité</span>
                  </h4>
                  <p className="pl-6">
                    Des mesures de sécurité conformes au RGPD sont mises en œuvre afin de garantir la confidentialité et la protection des données.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-blue-400" />
                    <span>Vos Droits</span>
                  </h4>
                  <p className="pl-6">
                    Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données, exerçable à l'adresse <a href="mailto:info@documatch.eu" className="text-blue-400 hover:underline">info@documatch.eu</a>.
                  </p>
                </div>
              </div>
            )}

            {docType === 'cookies' && (
              <div className="space-y-6">
                <div>
                  <p className="text-slate-300">
                    Un cookie est un fichier texte déposé sur votre terminal lors de la consultation du site afin d'assurer son bon fonctionnement, améliorer l'expérience utilisateur et analyser la performance.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Cookie className="h-4.5 w-4.5 text-blue-400" />
                    <span>Cookies utilisés</span>
                  </h4>
                  <p className="pl-6">
                    Documatch utilise des cookies essentiels, des cookies de préférences et des cookies analytiques. Vous pouvez à tout moment configurer ou supprimer les cookies via les paramètres de votre navigateur.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-400" />
                    <span>Durée de conservation</span>
                  </h4>
                  <p className="pl-6">
                    Les cookies sont conservés pour une durée maximale de treize mois, conformément à la réglementation en vigueur.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Mail className="h-4.5 w-4.5 text-blue-400" />
                    <span>Contact</span>
                  </h4>
                  <p className="pl-6">
                    Pour toute question relative aux cookies, contactez-nous à : <a href="mailto:info@documatch.eu" className="text-blue-400 hover:underline">info@documatch.eu</a>
                  </p>
                </div>
              </div>
            )}

            {docType === 'cgu' && (
              <div className="space-y-6">
                <div>
                  <p className="text-slate-300">
                    Les présentes conditions définissent les modalités d'accès et d'utilisation du service Documatch, comparateur de solutions GED basé sur l'intelligence artificielle.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-400" />
                    <span>Accès au service</span>
                  </h4>
                  <p className="pl-6">
                    Le service est accessible gratuitement à tout utilisateur disposant d'un accès Internet. L'utilisateur s'engage à utiliser le service de manière loyale et conforme à sa finalité.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Scale className="h-4.5 w-4.5 text-blue-400" />
                    <span>Limitation de responsabilité</span>
                  </h4>
                  <p className="pl-6">
                    Documatch ne saurait être tenu responsable des décisions prises sur la base des recommandations fournies, celles-ci étant données à titre informatif et comparatif.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="h-4.5 w-4.5 text-blue-400" />
                    <span>Modification des conditions</span>
                  </h4>
                  <p className="pl-6">
                    Documatch se réserve le droit de modifier les présentes conditions à tout moment. Les modifications entrent en vigueur dès leur mise en ligne.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/40 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono">
              Dernière mise à jour : Juillet 2026
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white cursor-pointer transition-all active:scale-95 shadow-md shadow-blue-900/20"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
