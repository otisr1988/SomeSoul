import React, { useState } from 'react';
import { METAPHYSICAL_DICTIONARY, CHAKRA_LIST } from '../data/metaphysicalData.ts';
import { Ailment } from '../types/index.ts';
import { Sparkles, X, RefreshCw, Copy, Check, Heart } from 'lucide-react';

interface DailyOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyOracleModal: React.FC<DailyOracleModalProps> = ({ isOpen, onClose }) => {
  const [currentCard, setCurrentCard] = useState<Ailment>(() => {
    // Pick based on day of year
    const day = Math.floor(Date.now() / 86400000);
    return METAPHYSICAL_DICTIONARY[day % METAPHYSICAL_DICTIONARY.length];
  });
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const chakra = CHAKRA_LIST.find((c) => c.id === currentCard.chakra);

  const drawRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * METAPHYSICAL_DICTIONARY.length);
    setCurrentCard(METAPHYSICAL_DICTIONARY[randomIndex]);
  };

  const copyAffirmation = () => {
    navigator.clipboard.writeText(currentCard.healingAffirmation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-purple-500/40 rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative text-center space-y-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-500/20">
          <Sparkles className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300">
            Daily Somatic Oracle
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {currentCard.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Focus: {currentCard.organ} • {chakra?.name}
          </p>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-2xl border border-purple-900/40 text-left space-y-3">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            &ldquo;{currentCard.coreMeaning}&rdquo;
          </p>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
            <strong className="text-purple-300 block mb-0.5">Mindful Inquiry for Today:</strong>
            {currentCard.reflectionQuestions[0] || 'What is your body inviting you to let go of today?'}
          </div>
        </div>

        {/* Daily Affirmation Card */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100 text-xs sm:text-sm font-medium italic">
          &ldquo;{currentCard.healingAffirmation}&rdquo;
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={copyAffirmation}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Affirmation Copied' : 'Copy Affirmation'}
          </button>
          <button
            type="button"
            onClick={drawRandomCard}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            Draw Another Card
          </button>
        </div>
      </div>
    </div>
  );
};
