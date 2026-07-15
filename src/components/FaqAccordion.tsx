import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all ${
              isOpen 
                ? 'border-blue-500/30 bg-blue-950/20 shadow-lg' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-white focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="text-sm sm:text-base">{faq.question}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-800/60 p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
