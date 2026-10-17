import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { saveLocalEntry, SavedSymptomEntry } from '../services/historyService.ts';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Bookmark,
  Volume2,
  Wind,
  Heart,
  ChevronRight,
  Flame,
  Droplets,
  Mountain,
  Sun,
  Eye,
  Crown,
} from 'lucide-react';

interface DailyAffirmationProps {
  onSaveAffirmation?: (affirmationText: string, theme: string) => void;
}

interface AffirmationTheme {
  id: string;
  label: string;
  icon: React.ReactNode;
  chakra: string;
  color: string;
  colorHex: string;
  affirmations: string[];
  somaticPrompt: string;
}

const AFFIRMATION_THEMES: AffirmationTheme[] = [
  {
    id: 'grounding',
    label: 'Grounding & Safety',
    icon: <Mountain className="w-3.5 h-3.5" />,
    chakra: 'Root Chakra',
    color: 'from-rose-900/40 to-red-950/60 border-rose-500/30 text-rose-300',
    colorHex: '#ef4444',
    affirmations: [
      'I am safe, grounded, and deeply anchored in the support of Mother Earth. All my material needs are met with ease.',
      'I release all survival fear and catastrophic thinking. The ground beneath my feet holds me firmly.',
      'I have the divine right to occupy my physical space on this planet with peace, security, and certainty.',
      'I relax my lower back and pelvis. I am fully provided for by the abundance of the cosmos.',
    ],
    somaticPrompt: 'Feel both feet flat against the earth. Take a slow inhale into your pelvic bowl and sigh out: "I am safe here."',
  },
  {
    id: 'emotional_flow',
    label: 'Emotional Flow & Sweetness',
    icon: <Droplets className="w-3.5 h-3.5" />,
    chakra: 'Sacral Chakra',
    color: 'from-orange-900/40 to-amber-950/60 border-orange-500/30 text-orange-300',
    colorHex: '#f97316',
    affirmations: [
      'I allow the sweet waters of life to flow through me. My feelings are sacred rivers bringing wisdom, not danger.',
      'I release all guilt and shame. I honor my creative vitality, my sensuality, and my capacity for joyful pleasure.',
      'I flow with change gracefully. Like water, I yield, adapt, and wear away all unneeded rigid resistance.',
      'It is safe for me to feel vulnerable. I welcome emotional sweetness and tenderness into my everyday reality.',
    ],
    somaticPrompt: 'Rest both hands gently on your lower belly. Inhale warmth, exhale any holding tension in your hips.',
  },
  {
    id: 'inner_power',
    label: 'Personal Power & Digestion',
    icon: <Flame className="w-3.5 h-3.5" />,
    chakra: 'Solar Plexus',
    color: 'from-amber-900/40 to-yellow-950/60 border-amber-500/30 text-amber-300',
    colorHex: '#eab308',
    affirmations: [
      'I digest all life experiences with ease, discernment, and peace. Nothing can burn me or erode my confidence.',
      'I stand sovereign in my authentic power. I no longer seek permission to be my genuine self.',
      'I release the burning need to control external outcomes. My stomach is calm, warm, and radiant with quiet courage.',
      'I am worthy of respect and autonomy. I hold loving boundaries effortlessly without anger.',
    ],
    somaticPrompt: 'Place your palm over your upper stomach (solar plexus). Breathe into the warmth of your inner sun.',
  },
  {
    id: 'love_forgiveness',
    label: 'Unconditional Love & Heart Space',
    icon: <Heart className="w-3.5 h-3.5" />,
    chakra: 'Heart Chakra',
    color: 'from-emerald-900/40 to-teal-950/60 border-emerald-500/30 text-emerald-300',
    colorHex: '#10b981',
    affirmations: [
      'My heart is open to give and receive pure, unconditional love. I forgive the past and release all grief.',
      'I breathe in the fullness of life. My chest expands with infinite compassion for myself and others.',
      'I drop all heavy armor from my shoulders and chest. I am worthy of love simply because I exist.',
      'Love heals every cell of my body. Peace resides in the quiet center of my breastbone.',
    ],
    somaticPrompt: 'Place your right hand on the center of your chest. Inhale deep emerald light, exhale a soft, audible whisper: "Thank you."',
  },
  {
    id: 'authentic_voice',
    label: 'Authentic Voice & Truth',
    icon: <Wind className="w-3.5 h-3.5" />,
    chakra: 'Throat Chakra',
    color: 'from-cyan-900/40 to-blue-950/60 border-cyan-500/30 text-cyan-300',
    colorHex: '#06b6d4',
    affirmations: [
      'I speak my authentic truth with kindness, courage, and ease. My voice is valuable and deserves to be heard.',
      'I release all swallowed words, stifled tears, and unexpressed boundaries. My throat is open, free, and relaxed.',
      'I express my creative purpose without fear of judgment. It is safe for me to be seen and heard.',
      'I communicate with clarity and peace. I listen to others with love and honor my own boundaries.',
    ],
    somaticPrompt: 'Gently hum on a slow exhale with closed lips (Bhramari breath). Feel the vibration dissolving tension around your neck.',
  },
  {
    id: 'intuition_vision',
    label: 'Intuitive Clarity & Vision',
    icon: <Eye className="w-3.5 h-3.5" />,
    chakra: 'Third Eye',
    color: 'from-indigo-900/40 to-purple-950/60 border-indigo-500/30 text-indigo-300',
    colorHex: '#6366f1',
    affirmations: [
      'I trust my inner vision and gut knowing. I perceive the deeper spiritual truth beyond surface illusions.',
      'I quiet my analytical overthinking. The answers I seek are already blossoming inside my stillness.',
      'I see with love and understanding. I release self-criticism and open my eyes to beauty.',
      'My mind is clear, focused, and aligned with divine wisdom. I trust the direction of my path.',
    ],
    somaticPrompt: 'Gently touch the point between your eyebrows with two fingers. Breathe in cool indigo light and soften your temples.',
  },
  {
    id: 'divine_peace',
    label: 'Spiritual Unity & Trust',
    icon: <Crown className="w-3.5 h-3.5" />,
    chakra: 'Crown Chakra',
    color: 'from-purple-900/40 to-fuchsia-950/60 border-purple-500/30 text-purple-300',
    colorHex: '#a855f7',
    affirmations: [
      'I am one with the infinite intelligence of the universe. I surrender all worry and rest in divine timing.',
      'I release tension from my crown and scalp. I am spiritually guided, unconditionally loved, and completely whole.',
      'Peace fills my consciousness. I trust the unfolding journey of my soul through every season.',
      'I am connected to the eternal source of healing. Light flows through me from crown to root.',
    ],
    somaticPrompt: 'Inhale gently as if drinking light through the top of your head, washing down through your entire spine into the floor.',
  },
];

export const DailyAffirmation: React.FC<DailyAffirmationProps> = ({ onSaveAffirmation }) => {
  const { user } = useAuth();
  const [selectedThemeId, setSelectedThemeId] = useState<string>('love_forgiveness');
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [customAffirmation, setCustomAffirmation] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isBreathingMode, setIsBreathingMode] = useState(false);

  // Time-based greeting
  const [greeting, setGreeting] = useState('Welcome');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const currentTheme = AFFIRMATION_THEMES.find((t) => t.id === selectedThemeId) || AFFIRMATION_THEMES[0];
  const activeAffirmationText = customAffirmation || currentTheme.affirmations[currentAffirmationIndex];

  // Randomize / shuffle affirmation
  const handleShuffleAffirmation = () => {
    setCustomAffirmation(null);
    setCopied(false);
    setSaved(false);
    const nextIdx = (currentAffirmationIndex + 1) % currentTheme.affirmations.length;
    setCurrentAffirmationIndex(nextIdx);
  };

  // AI Generation with Gemini backend
  const handleGenerateAiAffirmation = async () => {
    setIsGeneratingAi(true);
    setCopied(false);
    setSaved(false);
    try {
      const res = await fetch('/api/affirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: user?.displayName?.split(' ')[0] || 'Soul Seeker',
          focusArea: currentTheme.label,
          chakra: currentTheme.chakra,
        }),
      });
      const data = await res.json();
      if (data.affirmation) {
        setCustomAffirmation(data.affirmation);
      }
    } catch (e) {
      console.error('Failed to generate AI affirmation:', e);
      handleShuffleAffirmation();
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAffirmationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const entryId = 'affirmation_' + Date.now();
    const entry: SavedSymptomEntry = {
      id: entryId,
      userId: user?.uid || 'guest',
      symptomText: `Daily Affirmation: ${currentTheme.label}`,
      primaryAilmentId: currentTheme.id,
      primaryAilmentName: `Mindful Focus: ${currentTheme.label}`,
      dominantChakra: currentTheme.chakra,
      bodySide: 'both',
      metaphysicalMeaning: `Somatic affirmation for balancing the ${currentTheme.chakra} and restoring emotional harmony.`,
      emotionalRoot: currentTheme.somaticPrompt,
      healingAffirmation: activeAffirmationText,
      reflectionNotes: `Saved from Daily Affirmation widget. Personal anchor for ${new Date().toLocaleDateString()}.`,
      createdAt: new Date().toISOString(),
    };
    saveLocalEntry(entry);
    setSaved(true);
    if (onSaveAffirmation) {
      onSaveAffirmation(activeAffirmationText, currentTheme.label);
    }
    setTimeout(() => setSaved(false), 3000);
  };

  const todayFormatted = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-purple-950/40 to-slate-950/95 border border-purple-500/30 p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
      {/* Background Subtle Sacred Glow */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: currentTheme.colorHex }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: '#a855f7' }}
      />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-colors"
            style={{ backgroundColor: `${currentTheme.colorHex}25`, border: `1px solid ${currentTheme.colorHex}60` }}
          >
            <Sparkles className="w-5 h-5" style={{ color: currentTheme.colorHex }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300">
                Daily Personalized Affirmation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                {todayFormatted}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-100">
              {greeting}, {user?.displayName ? user.displayName.split(' ')[0] : 'Soul Seeker'}
            </h2>
          </div>
        </div>

        {/* Breath Pacer Toggle */}
        <button
          type="button"
          onClick={() => setIsBreathingMode(!isBreathingMode)}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer ${
            isBreathingMode
              ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
              : 'bg-slate-950/80 text-purple-200 border-purple-800/60 hover:border-purple-600'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          {isBreathingMode ? 'Exit Breath Pacer' : 'Breathe with Affirmation'}
        </button>
      </div>

      {/* Focus Area Theme Selectors */}
      <div className="relative z-10 space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
          Select Today&apos;s Energy Focus:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
          {AFFIRMATION_THEMES.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  setSelectedThemeId(theme.id);
                  setCustomAffirmation(null);
                  setCurrentAffirmationIndex(0);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600/30 border-purple-400 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span style={{ color: theme.colorHex }}>{theme.icon}</span>
                <span>{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Affirmation Presentation Box */}
      <div className="relative z-10 bg-slate-950/85 border border-purple-500/20 rounded-2xl p-5 sm:p-6 shadow-inner space-y-4">
        {/* Chakra & Origin Badge */}
        <div className="flex items-center justify-between text-xs">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-semibold border"
            style={{
              borderColor: `${currentTheme.colorHex}60`,
              backgroundColor: `${currentTheme.colorHex}15`,
              color: currentTheme.colorHex,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.colorHex }} />
            {currentTheme.chakra}
          </span>
          <span className="text-[11px] text-slate-500 italic">
            {customAffirmation ? 'Gemini AI Curated' : `Affirmation #${currentAffirmationIndex + 1}`}
          </span>
        </div>

        {/* The Affirmation Statement */}
        <div className="py-2 text-center sm:text-left">
          <p className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 leading-snug sm:leading-relaxed">
            &ldquo;{activeAffirmationText}&rdquo;
          </p>
        </div>

        {/* Somatic Anchor Prompt */}
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/30 text-xs text-purple-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-purple-300 font-semibold block mb-0.5">Somatic Integration Anchor:</strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">{currentTheme.somaticPrompt}</p>
          </div>
        </div>

        {/* Breathing Visualizer (When active) */}
        {isBreathingMode && (
          <div className="pt-2 flex flex-col items-center justify-center p-4 bg-slate-900/90 rounded-2xl border border-purple-500/30 animate-in fade-in">
            <div className="relative flex items-center justify-center w-28 h-28 my-2">
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-25"
                style={{ backgroundColor: currentTheme.colorHex }}
              />
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xl animate-pulse"
                style={{ backgroundColor: currentTheme.colorHex }}
              >
                Breathe
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2 font-medium">
              Inhale peace for 4 seconds... hold gently... exhale tension for 6 seconds.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShuffleAffirmation}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Draw another affirmation from this energy center"
            >
              <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
              New Affirmation
            </button>

            <button
              type="button"
              onClick={handleGenerateAiAffirmation}
              disabled={isGeneratingAi}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-950/70 hover:bg-purple-900 text-purple-200 border border-purple-800/80 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Generate a custom AI personalized affirmation via Gemini"
            >
              <Sparkles className={`w-3.5 h-3.5 text-purple-300 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              {isGeneratingAi ? 'Synthesizing...' : 'AI Personalize'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved to History</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Affirmation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
