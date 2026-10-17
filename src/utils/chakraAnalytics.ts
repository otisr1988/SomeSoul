import type { SavedSymptomEntry } from '../services/historyService.ts';
import { CHAKRA_LIST } from '../data/metaphysicalData.ts';

export interface ChakraDistributionItem {
  id: string;
  name: string;
  sanskrit: string;
  count: number;
  percentage: number;
  color: string;
  element: string;
  theme: string;
}

export interface ChakraTimelinePoint {
  date: string;
  timestamp: number;
  root: number;
  sacral: number;
  solar_plexus: number;
  heart: number;
  throat: number;
  third_eye: number;
  crown: number;
  total: number;
}

export interface PolarityCount {
  name: string;
  key: string;
  count: number;
  percentage: number;
  color: string;
}

export function normalizeChakraId(rawChakra: string): string {
  if (!rawChakra) return 'heart';
  const clean = rawChakra.toLowerCase().replace(/chakra|\s/g, '');
  if (clean.includes('root') || clean.includes('muladhara')) return 'root';
  if (clean.includes('sacral') || clean.includes('svadhisthana')) return 'sacral';
  if (clean.includes('solar') || clean.includes('manipura') || clean.includes('plexus')) return 'solar_plexus';
  if (clean.includes('heart') || clean.includes('anahata')) return 'heart';
  if (clean.includes('throat') || clean.includes('vishuddha')) return 'throat';
  if (clean.includes('third') || clean.includes('eye') || clean.includes('ajna')) return 'third_eye';
  if (clean.includes('crown') || clean.includes('sahasrara')) return 'crown';
  return 'third_eye';
}

export function calculateChakraDistribution(entries: SavedSymptomEntry[]): ChakraDistributionItem[] {
  const counts: Record<string, number> = {
    root: 0,
    sacral: 0,
    solar_plexus: 0,
    heart: 0,
    throat: 0,
    third_eye: 0,
    crown: 0,
  };

  entries.forEach((e) => {
    const norm = normalizeChakraId(e.dominantChakra);
    counts[norm] = (counts[norm] || 0) + 1;
  });

  const total = entries.length || 1;

  return CHAKRA_LIST.map((c) => {
    const count = counts[c.id] || 0;
    const percentage = entries.length > 0 ? Math.round((count / total) * 100) : 0;
    return {
      id: c.id,
      name: c.name,
      sanskrit: c.sanskrit,
      count,
      percentage,
      color: c.colorHex,
      element: c.element,
      theme: c.emotionalTheme,
    };
  });
}

export function calculateChakraTimeline(entries: SavedSymptomEntry[]): ChakraTimelinePoint[] {
  if (!entries || entries.length === 0) return [];

  // Group by date (YYYY-MM-DD)
  const dateMap = new Map<string, ChakraTimelinePoint>();

  // Sort ascending by time
  const sorted = [...entries].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  sorted.forEach((e) => {
    const d = new Date(e.createdAt);
    const dateKey = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const normChakra = normalizeChakraId(e.dominantChakra);

    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, {
        date: dateKey,
        timestamp: d.getTime(),
        root: 0,
        sacral: 0,
        solar_plexus: 0,
        heart: 0,
        throat: 0,
        third_eye: 0,
        crown: 0,
        total: 0,
      });
    }

    const point = dateMap.get(dateKey)!;
    if (normChakra in point) {
      (point as any)[normChakra] += 1;
    }
    point.total += 1;
  });

  return Array.from(dateMap.values());
}

export function calculatePolarityBreakdown(entries: SavedSymptomEntry[]): PolarityCount[] {
  let left = 0;
  let right = 0;
  let both = 0;

  entries.forEach((e) => {
    if (e.bodySide === 'left') left++;
    else if (e.bodySide === 'right') right++;
    else both++;
  });

  const total = entries.length || 1;

  return [
    {
      name: 'Left (Yin / Feminine)',
      key: 'left',
      count: left,
      percentage: entries.length > 0 ? Math.round((left / total) * 100) : 0,
      color: '#c084fc',
    },
    {
      name: 'Bilateral / Center',
      key: 'both',
      count: both,
      percentage: entries.length > 0 ? Math.round((both / total) * 100) : 0,
      color: '#818cf8',
    },
    {
      name: 'Right (Yang / Masculine)',
      key: 'right',
      count: right,
      percentage: entries.length > 0 ? Math.round((right / total) * 100) : 0,
      color: '#38bdf8',
    },
  ];
}

export function getDominantChakraInsight(distribution: ChakraDistributionItem[]): {
  dominantChakra: ChakraDistributionItem;
  insight: string;
} {
  const sorted = [...distribution].sort((a, b) => b.count - a.count);
  const dominant = sorted[0];

  if (!dominant || dominant.count === 0) {
    return {
      dominantChakra: distribution[3] || {
        id: 'heart',
        name: 'Heart Chakra',
        sanskrit: 'Anahata',
        count: 0,
        percentage: 0,
        color: '#10b981',
        element: 'Air',
        theme: 'Love and forgiveness',
      },
      insight: 'As you log more symptom readings, this somatic analytics chart will reveal your primary emotional and energetic centers.',
    };
  }

  const chakraLessons: Record<string, string> = {
    root: 'Your symptoms most frequently reflect physical safety, grounding, and financial or survival concerns. Dedicate time to barefoot earthing and reminding yourself: "I am safe and secure."',
    sacral: 'Your somatic focus highlights emotional processing, creativity, and the right to feel sweetness and pleasure without guilt. Allow your feelings to flow like water.',
    solar_plexus: 'Your body is drawing attention to digestion, personal power, and releasing the urge to control external circumstances. Practice soothing your gut and stepping into relaxed self-worth.',
    heart: 'Your energy center with the highest activity is the Heart space. This points to processing grief, unexpressed love, or boundary renewal. Place your hand on your sternum and breathe in forgiveness.',
    throat: 'Your physical symptoms cluster around authentic self-expression, speaking your boundaries, and creative truth. Give yourself permission to speak up without fear.',
    third_eye: 'Your readings indicate high mental energy, intense overthinking, and intuitive calibration. Practice resting your eyes and honoring your intuitive inner sight over analytical stress.',
    crown: 'Your somatic pattern connects to existential surrender, spiritual trust, and releasing hyper-vigilance. Rest in the assurance that the universe supports your path.',
  };

  return {
    dominantChakra: dominant,
    insight: chakraLessons[dominant.id] || `Your highest symptom frequency involves the ${dominant.name} (${dominant.element} element), emphasizing themes of ${dominant.theme}.`,
  };
}

// Sample entries for demo preview
export const DEMO_SAMPLE_ENTRIES: SavedSymptomEntry[] = [
  {
    id: 'demo_1',
    userId: 'demo',
    symptomText: 'Pounding headache and eye fatigue',
    primaryAilmentId: 'headache_migraine',
    primaryAilmentName: 'Headache & Migraine',
    dominantChakra: 'third_eye',
    bodySide: 'left',
    metaphysicalMeaning: 'Intense self-criticism and overthinking.',
    emotionalRoot: 'Resistance to the flow of life; demanding perfection.',
    healingAffirmation: 'I relax the flow of life and let life provide all that I need.',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'demo_2',
    userId: 'demo',
    symptomText: 'Tightness in throat and hoarseness',
    primaryAilmentId: 'sore_throat_laryngitis',
    primaryAilmentName: 'Sore Throat & Laryngitis',
    dominantChakra: 'throat',
    bodySide: 'both',
    metaphysicalMeaning: 'Suppressed voice and swallowed resentment.',
    emotionalRoot: 'Fear of speaking up for oneself.',
    healingAffirmation: 'I express my thoughts freely and joyously.',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'demo_3',
    userId: 'demo',
    symptomText: 'Sharp lower back pain when standing',
    primaryAilmentId: 'lower_back_pain_sciatica',
    primaryAilmentName: 'Lower Back Pain & Sciatica',
    dominantChakra: 'root',
    bodySide: 'right',
    metaphysicalMeaning: 'Fear of money and lack of financial support.',
    emotionalRoot: 'Survival anxiety and material dread.',
    healingAffirmation: 'I trust the process of life. All my needs are taken care of.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'demo_4',
    userId: 'demo',
    symptomText: 'Acid reflux and stomach cramping',
    primaryAilmentId: 'acid_reflux_gerd',
    primaryAilmentName: 'Acid Reflux & GERD',
    dominantChakra: 'solar_plexus',
    bodySide: 'both',
    metaphysicalMeaning: 'Difficulty digesting recent stressful life events.',
    emotionalRoot: 'Acidity from swallowed irritation.',
    healingAffirmation: 'I digest life with ease and lightness.',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'demo_5',
    userId: 'demo',
    symptomText: 'Chest tightness and shallow breathing',
    primaryAilmentId: 'asthma_bronchitis',
    primaryAilmentName: 'Asthma & Breath Tightness',
    dominantChakra: 'heart',
    bodySide: 'left',
    metaphysicalMeaning: 'Deep unexpressed grief and feeling smothered.',
    emotionalRoot: 'Feeling unworthy of taking up space.',
    healingAffirmation: 'I have the divine right to breathe deeply and live fully.',
    createdAt: new Date().toISOString(),
  },
];
