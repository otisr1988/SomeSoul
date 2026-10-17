import React, { useState } from 'react';
import { BodyZoneType, DecodeResult, SideType, Ailment } from '../types/index.ts';
import { queryMetaphysicalDictionary } from '../utils/symptomDecoder.ts';
import { CHAKRA_LIST } from '../data/metaphysicalData.ts';
import { BodyMapSelector } from './BodyMapSelector.tsx';
import { DailyAffirmation } from './DailyAffirmation.tsx';
import { saveSymptomReading } from '../services/historyService.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { Sparkles, Bookmark, Check, Copy, ArrowRight, BookOpen, Compass, RefreshCw } from 'lucide-react';

interface SymptomDecoderViewProps {
  onSelectConceptFromDictionary?: (conceptName: string) => void;
  onNavigateToHistory?: () => void;
}

const QUICK_TAGS = [
  'Pounding Headache',
  'Throat Tightness',
  'Heart Palpitations',
  'Acid Reflux & GERD',
  'Lower Back Pain (Sciatica)',
  'Shoulder Burden',
  'Knee Stiffness',
  'Eczema Flare-Up',
  'Insomnia & Night Waking',
  'Chronic Fatigue & Burnout',
  'Jaw Clenching & TMJ',
  'Bloating & IBS',
];

export const SymptomDecoderView: React.FC<SymptomDecoderViewProps> = ({
  onSelectConceptFromDictionary,
  onNavigateToHistory,
}) => {
  const { user, signIn } = useAuth();
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedZone, setSelectedZone] = useState<BodyZoneType | null>(null);
  const [selectedSide, setSelectedSide] = useState<SideType>('both');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeResult, setDecodeResult] = useState<DecodeResult | null>(() => {
    // Initial rich state
    return queryMetaphysicalDictionary('headache, stress, neck tension', { side: 'left' });
  });

  const [personalNotes, setPersonalNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copiedAffirmation, setCopiedAffirmation] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const exists = prev.includes(tag);
      const next = exists ? prev.filter((t) => t !== tag) : [...prev, tag];
      return next;
    });
  };

  const handleDecode = () => {
    setIsDecoding(true);
    setIsSaved(false);

    // Combine input with selected tags and body zone
    let queryCombined = symptomInput.trim();
    if (selectedTags.length > 0) {
      queryCombined = queryCombined ? `${queryCombined}, ${selectedTags.join(', ')}` : selectedTags.join(', ');
    }

    setTimeout(() => {
      const res = queryMetaphysicalDictionary(queryCombined || 'general body stiffness and fatigue', {
        bodyZone: selectedZone || undefined,
        side: selectedSide,
        selectedTags,
      });
      setDecodeResult(res);
      setIsDecoding(false);
    }, 400);
  };

  const handleSaveToHistory = async () => {
    if (!decodeResult) return;
    try {
      await saveSymptomReading(decodeResult, personalNotes);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } catch (e) {
      console.error('Failed to save reading:', e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAffirmation(text);
    setTimeout(() => setCopiedAffirmation(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Somatic & Psychosomatic Diagnostic Decoder
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 tracking-tight">
          What is Your Body Whispering?
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Input your physical symptoms or select regions on the body map. Discover the emotional root causes,
          chakra blockages, and metaphysical meanings behind your ailments.
        </p>
      </div>

      {/* Daily Affirmation Component */}
      <DailyAffirmation />

      {/* Input Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
        <div>
          <label htmlFor="symptom-input" className="block text-sm font-semibold text-slate-200 mb-2">
            Describe Your Physical Symptoms in Your Own Words
          </label>
          <div className="relative">
            <textarea
              id="symptom-input"
              rows={3}
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="e.g. Throbbing pain in the left side of my temple, tightness in throat, or sharp lower back ache..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-y"
            />
            {symptomInput && (
              <button
                type="button"
                onClick={() => setSymptomInput('')}
                className="absolute top-3 right-3 text-xs text-slate-500 hover:text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Symptom Chips */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Or Tap Common Ailment Markers:
          </span>
          <div className="flex flex-wrap gap-2">
            {QUICK_TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                    active
                      ? 'bg-purple-600 border-purple-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  {tag} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body Map Anatomical Explorer */}
        <div>
          <BodyMapSelector
            selectedZone={selectedZone}
            onSelectZone={(zone) => setSelectedZone(zone === selectedZone ? null : zone)}
            selectedSide={selectedSide}
            onSelectSide={setSelectedSide}
          />
        </div>

        {/* Decode Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleDecode}
            disabled={isDecoding}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/30 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isDecoding ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Consulting Somatic Knowledge...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-purple-200" />
                Decode Metaphysical Meaning
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results View */}
      {decodeResult && (
        <div className="space-y-6">
          {/* Overarching Synthesis Card */}
          <div className="bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-purple-500/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-400" />
                  Metaphysical Diagnosis Synthesis
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">
                  The Energetic Message of Your Symptoms
                </h2>
              </div>

              {/* Side Polarity Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-xs font-semibold text-purple-200">
                {decodeResult.sideAnalysis?.side === 'left' && 'Left Side (Yin / Receptive)'}
                {decodeResult.sideAnalysis?.side === 'right' && 'Right Side (Yang / Active)'}
                {decodeResult.sideAnalysis?.side === 'both' && 'Bilateral / Center Axis'}
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
              {decodeResult.synthesisMessage}
            </p>

            {/* Dominant Chakras Involved */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Dominant Energy Centers:</span>
              {decodeResult.dominantChakras.map((chakraId) => {
                const info = CHAKRA_LIST.find((c) => c.id === chakraId);
                return (
                  <span
                    key={chakraId}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      borderColor: info?.colorHex || '#a855f7',
                      backgroundColor: `${info?.colorHex || '#a855f7'}20`,
                      color: '#ffffff',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: info?.colorHex || '#a855f7' }}
                    />
                    {info?.name} ({info?.element} element)
                  </span>
                );
              })}
            </div>
          </div>

          {/* Primary Ailment Detailed Cards */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Symptom Correlations & Root Causes ({decodeResult.matchedAilments.length} Found)
            </h3>

            {decodeResult.matchedAilments.map(({ ailment, score }) => {
              const chakraInfo = CHAKRA_LIST.find((c) => c.id === ailment.chakra);
              return (
                <div
                  key={ailment.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition-colors"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-bold text-slate-100">{ailment.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                          Match {Math.min(99, score + 45)}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Physical Sphere: {ailment.organ} {ailment.meridian ? `• ${ailment.meridian}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-md border"
                        style={{
                          borderColor: chakraInfo?.colorHex,
                          color: chakraInfo?.colorHex,
                          backgroundColor: `${chakraInfo?.colorHex}15`,
                        }}
                      >
                        {chakraInfo?.name}
                      </span>
                    </div>
                  </div>

                  {/* Core Metaphysical Meaning */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
                      Metaphysical Significance
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed">{ailment.coreMeaning}</p>
                  </div>

                  {/* Emotional Root & Mental Pattern */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                        Probable Emotional Root Cause
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">{ailment.emotionalRoot}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
                        Subconscious Mental Pattern
                      </span>
                      <p className="text-slate-300 text-xs italic leading-relaxed">
                        &ldquo;{ailment.mentalPattern}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Lateral Nuance (Left vs Right) */}
                  {(ailment.leftSideNuance || ailment.rightSideNuance) && (
                    <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 text-xs space-y-1.5">
                      <span className="font-semibold text-purple-300 block">
                        Lateral Polarity Analysis:
                      </span>
                      {selectedSide === 'left' && ailment.leftSideNuance && (
                        <p className="text-slate-300">
                          <strong className="text-purple-300">Left Side Focus:</strong>{' '}
                          {ailment.leftSideNuance}
                        </p>
                      )}
                      {selectedSide === 'right' && ailment.rightSideNuance && (
                        <p className="text-slate-300">
                          <strong className="text-purple-300">Right Side Focus:</strong>{' '}
                          {ailment.rightSideNuance}
                        </p>
                      )}
                      {selectedSide === 'both' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                          {ailment.leftSideNuance && (
                            <div>
                              <strong className="text-purple-300">Left (Yin):</strong> {ailment.leftSideNuance}
                            </div>
                          )}
                          {ailment.rightSideNuance && (
                            <div>
                              <strong className="text-purple-300">Right (Yang):</strong> {ailment.rightSideNuance}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Healing Affirmation Box */}
                  <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        New Thought Pattern & Affirmation
                      </span>
                      <p className="text-emerald-100 text-sm font-medium italic">
                        &ldquo;{ailment.healingAffirmation}&rdquo;
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(ailment.healingAffirmation)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      {copiedAffirmation === ailment.healingAffirmation ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Affirmation
                        </>
                      )}
                    </button>
                  </div>

                  {/* Self-Inquiry Reflection Prompts */}
                  {ailment.reflectionQuestions.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Self-Inquiry Reflection Questions:
                      </span>
                      <ul className="space-y-1.5">
                        {ailment.reflectionQuestions.map((q, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Somatic Shift Exercise */}
                  {ailment.somaticTip && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-indigo-300 block mb-1">Gentle Somatic Exercise:</strong>
                      {ailment.somaticTip}
                    </div>
                  )}

                  {/* RELATED CONCEPTS SECTION (Requested explicitly) */}
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-2">
                      Metaphysically Linked & Related Concepts:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ailment.relatedConcepts.map((conceptName) => (
                        <button
                          key={conceptName}
                          type="button"
                          onClick={() => {
                            if (onSelectConceptFromDictionary) {
                              onSelectConceptFromDictionary(conceptName);
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/60 hover:border-purple-600 transition-all flex items-center gap-1 group cursor-pointer"
                        >
                          <span>{conceptName}</span>
                          <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save to Profile & History Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-purple-400" />
                  Save Reading to Your Profile & History
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track your symptom shifts over time and reflect on your healing journey.
                </p>
              </div>

              {user ? (
                <span className="text-xs px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800 text-purple-300">
                  Logged in as {user.displayName || user.email}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => signIn()}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                >
                  Sign in with Google to Sync Across Devices
                </button>
              )}
            </div>

            <div>
              <label htmlFor="reflection-notes" className="block text-xs font-medium text-slate-300 mb-1">
                Personal Journal Note (Optional):
              </label>
              <textarea
                id="reflection-notes"
                rows={2}
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="What feelings or events in your life correlate with this symptom today?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleSaveToHistory}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Saved to Your History!
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    Save Reading to History
                  </>
                )}
              </button>

              {onNavigateToHistory && (
                <button
                  type="button"
                  onClick={onNavigateToHistory}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  View Past History & Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
