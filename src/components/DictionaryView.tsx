import React, { useState, useMemo } from 'react';
import { METAPHYSICAL_DICTIONARY, CHAKRA_LIST } from '../data/metaphysicalData.ts';
import { Ailment } from '../types/index.ts';
import { filterDictionary } from '../utils/symptomDecoder.ts';
import { Search, BookOpen, Sparkles, Copy, Check, ArrowRight, X, Heart, Shield, Eye, Flame, Droplets, Wind, Mountain, Sun } from 'lucide-react';

interface DictionaryViewProps {
  initialSearchQuery?: string;
  onSelectAilmentForDecode?: (ailmentName: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'head', label: 'Head & Brain' },
  { id: 'eyes_ears', label: 'Eyes & Ears' },
  { id: 'throat', label: 'Throat & Voice' },
  { id: 'chest', label: 'Chest & Heart' },
  { id: 'solar_plexus', label: 'Stomach & Solar Plexus' },
  { id: 'spine', label: 'Spine & Back' },
  { id: 'pelvis', label: 'Pelvis & Womb' },
  { id: 'arms_hands', label: 'Shoulders & Limbs' },
  { id: 'legs_feet', label: 'Knees & Feet' },
  { id: 'skin', label: 'Skin & Boundaries' },
  { id: 'immune_system', label: 'Immune & Systemic' },
  { id: 'emotional_state', label: 'Emotional & Mental Causes' },
];

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  initialSearchQuery = '',
  onSelectAilmentForDecode,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChakra, setSelectedChakra] = useState('all');
  const [selectedAilmentModal, setSelectedAilmentModal] = useState<Ailment | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return filterDictionary(METAPHYSICAL_DICTIONARY, searchQuery, selectedCategory, selectedChakra);
  }, [searchQuery, selectedCategory, selectedChakra]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleConceptClick = (conceptName: string) => {
    // Search for this concept or open it directly
    const found = METAPHYSICAL_DICTIONARY.find(
      (a) => a.name.toLowerCase() === conceptName.toLowerCase() || a.name.toLowerCase().includes(conceptName.toLowerCase())
    );
    if (found) {
      setSelectedAilmentModal(found);
    } else {
      setSearchQuery(conceptName);
      setSelectedAilmentModal(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          Metaphysical Anatomy & Psychosomatic Index
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Comprehensive Metaphysical Meaning Dictionary
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore the symbolic lessons, emotional roots, chakra correspondences, and healing affirmations for every physical condition.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ailments, organs, emotions (e.g. headache, thyroid, anger, sciatica, eczema)..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Filter by Body Region / Dimension:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 border-purple-400 text-white font-medium shadow-sm'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chakra Filters */}
        <div className="space-y-2 pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
            Filter by Energy Center (Chakra):
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedChakra('all')}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                selectedChakra === 'all'
                  ? 'bg-slate-700 border-slate-500 text-white font-medium'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Chakras
            </button>
            {CHAKRA_LIST.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedChakra(c.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                  selectedChakra === c.id
                    ? 'bg-slate-800 font-semibold text-white shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
                style={{
                  borderColor: selectedChakra === c.id ? c.colorHex : '#1e293b',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.colorHex }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredItems.length} entries in metaphysical dictionary</span>
        {(searchQuery || selectedCategory !== 'all' || selectedChakra !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedChakra('all');
            }}
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Grid of Ailments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const chakra = CHAKRA_LIST.find((c) => c.id === item.chakra);
          return (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800/90 hover:border-purple-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group hover:bg-slate-900"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {item.organ} {item.meridian ? `• ${item.meridian}` : ''}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                    style={{
                      borderColor: chakra?.colorHex,
                      color: chakra?.colorHex,
                      backgroundColor: `${chakra?.colorHex}15`,
                    }}
                  >
                    {chakra?.name}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.coreMeaning}
                </p>

                {/* Affirmation preview */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs italic text-emerald-300/90 line-clamp-2">
                  &ldquo;{item.healingAffirmation}&rdquo;
                </div>

                {/* RELATED CONCEPTS (Explicitly displayed on each card) */}
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300/90 block mb-1.5">
                    Related Concepts:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.relatedConcepts.slice(0, 4).map((rc) => (
                      <button
                        key={rc}
                        type="button"
                        onClick={() => handleConceptClick(rc)}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40 transition-colors"
                      >
                        {rc}
                      </button>
                    ))}
                    {item.relatedConcepts.length > 4 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{item.relatedConcepts.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-4 mt-3 border-t border-slate-800/70 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedAilmentModal(item)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                >
                  View Complete Reading & Affirmations
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onSelectAilmentForDecode && (
                  <button
                    type="button"
                    onClick={() => onSelectAilmentForDecode(item.name)}
                    className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-800/60"
                  >
                    Decode My Symptoms
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-300">No matching entries found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Try a different search term or reset your category and chakra filters.
          </p>
        </div>
      )}

      {/* Complete Ailment Modal */}
      {selectedAilmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                    {selectedAilmentModal.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Organ Sphere: {selectedAilmentModal.organ}{' '}
                  {selectedAilmentModal.meridian ? `• ${selectedAilmentModal.meridian}` : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAilmentModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Meaning */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
                Metaphysical Significance & Core Meaning
              </span>
              <p className="text-slate-200 text-sm leading-relaxed">
                {selectedAilmentModal.coreMeaning}
              </p>
            </div>

            {/* Emotional Root & Mental Pattern */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Emotional Root Cause
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedAilmentModal.emotionalRoot}
                </p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Subconscious Pattern
                </span>
                <p className="text-slate-300 text-xs italic leading-relaxed">
                  &ldquo;{selectedAilmentModal.mentalPattern}&rdquo;
                </p>
              </div>
            </div>

            {/* Affirmation */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Healing Affirmation
                </span>
                <p className="text-emerald-100 text-sm italic font-medium">
                  &ldquo;{selectedAilmentModal.healingAffirmation}&rdquo;
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(selectedAilmentModal.healingAffirmation)}
                className="px-3 py-1.5 text-xs rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shrink-0"
              >
                {copiedText === selectedAilmentModal.healingAffirmation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Lateral Polarity */}
            {(selectedAilmentModal.leftSideNuance || selectedAilmentModal.rightSideNuance) && (
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs space-y-2">
                <span className="font-semibold text-purple-300 block">
                  Lateral Side Differences:
                </span>
                {selectedAilmentModal.leftSideNuance && (
                  <p className="text-slate-300">
                    <strong className="text-purple-300">Left Side (Yin / Mother):</strong>{' '}
                    {selectedAilmentModal.leftSideNuance}
                  </p>
                )}
                {selectedAilmentModal.rightSideNuance && (
                  <p className="text-slate-300">
                    <strong className="text-purple-300">Right Side (Yang / Career / Father):</strong>{' '}
                    {selectedAilmentModal.rightSideNuance}
                  </p>
                )}
              </div>
            )}

            {/* Reflection Questions */}
            {selectedAilmentModal.reflectionQuestions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Self-Inquiry Prompts:
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedAilmentModal.reflectionQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Somatic Tip */}
            {selectedAilmentModal.somaticTip && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <strong className="text-indigo-300 block mb-0.5">Somatic Release:</strong>
                {selectedAilmentModal.somaticTip}
              </div>
            )}

            {/* RELATED CONCEPTS SECTION (Explicitly clickable inside modal) */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">
                Metaphysically Linked & Related Concepts:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedAilmentModal.relatedConcepts.map((rc) => (
                  <button
                    key={rc}
                    type="button"
                    onClick={() => handleConceptClick(rc)}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{rc}</span>
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedAilmentModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                Close Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
