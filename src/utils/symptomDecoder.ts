import type { Ailment, DecodeResult, SideType } from '../types/index.ts';
import { METAPHYSICAL_DICTIONARY, BODY_SIDE_GUIDE, CHAKRA_LIST } from '../data/metaphysicalData.ts';

interface DecodeOptions {
  bodyZone?: string;
  side?: SideType;
  selectedTags?: string[];
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligent query engine that scores dictionary entries against user symptom descriptions
 */
export function queryMetaphysicalDictionary(
  input: string,
  options: DecodeOptions = {}
): DecodeResult {
  const normalizedInput = normalizeText(input);
  const inputWords = normalizedInput.split(' ').filter((w) => w.length > 2);
  const side = options.side || 'both';

  const scoredAilments: {
    ailment: Ailment;
    score: number;
    matchedKeywords: string[];
  }[] = [];

  for (const ailment of METAPHYSICAL_DICTIONARY) {
    let score = 0;
    const matchedKeywords: string[] = [];

    // Exact or strong name match
    const normName = normalizeText(ailment.name);
    if (normalizedInput.includes(normName)) {
      score += 40;
      matchedKeywords.push(ailment.name);
    } else {
      // Check individual words of name
      const nameWords = normName.split(' ').filter((w) => w.length > 2);
      for (const nw of nameWords) {
        if (inputWords.includes(nw)) {
          score += 12;
          if (!matchedKeywords.includes(nw)) matchedKeywords.push(nw);
        }
      }
    }

    // Aliases match
    for (const alias of ailment.aliases) {
      const normAlias = normalizeText(alias);
      if (normalizedInput.includes(normAlias)) {
        score += 30;
        if (!matchedKeywords.includes(alias)) matchedKeywords.push(alias);
      } else {
        const aliasWords = normAlias.split(' ').filter((w) => w.length > 2);
        for (const aw of aliasWords) {
          if (inputWords.includes(aw)) {
            score += 8;
            if (!matchedKeywords.includes(aw)) matchedKeywords.push(aw);
          }
        }
      }
    }

    // Organ and body zone match
    const normOrgan = normalizeText(ailment.organ);
    for (const word of inputWords) {
      if (normOrgan.includes(word)) {
        score += 10;
        if (!matchedKeywords.includes(word)) matchedKeywords.push(word);
      }
    }

    if (options.bodyZone && ailment.bodyZone === options.bodyZone) {
      score += 25;
      matchedKeywords.push(`Zone: ${ailment.bodyZone}`);
    }

    // Selected tags match
    if (options.selectedTags && options.selectedTags.length > 0) {
      for (const tag of options.selectedTags) {
        const normTag = normalizeText(tag);
        if (normName.includes(normTag) || ailment.aliases.some((a) => normalizeText(a).includes(normTag))) {
          score += 35;
          if (!matchedKeywords.includes(tag)) matchedKeywords.push(tag);
        }
      }
    }

    // Core emotional keywords
    const emotionalKeywords = ['stress', 'anger', 'grief', 'fear', 'shame', 'guilt', 'burnout', 'control', 'unloved', 'sadness', 'anxiety'];
    for (const ek of emotionalKeywords) {
      if (normalizedInput.includes(ek)) {
        if (
          ailment.emotionalRoot.toLowerCase().includes(ek) ||
          ailment.coreMeaning.toLowerCase().includes(ek)
        ) {
          score += 8;
          if (!matchedKeywords.includes(ek)) matchedKeywords.push(ek);
        }
      }
    }

    if (score > 0) {
      scoredAilments.push({
        ailment,
        score,
        matchedKeywords: Array.from(new Set(matchedKeywords))
      });
    }
  }

  // Sort descending by score
  scoredAilments.sort((a, b) => b.score - a.score);

  // If no direct matches, return top related or default fallback to first 2 ailments
  const topMatches = scoredAilments.slice(0, 5);
  const primaryAilment = topMatches[0]?.ailment || METAPHYSICAL_DICTIONARY[0];

  // Extract unique dominant chakras
  const dominantChakras = Array.from(
    new Set(topMatches.map((m) => m.ailment.chakra).filter(Boolean))
  );

  // Synthesize overarching theme
  const synthesisMessage = generateSynthesisMessage(topMatches.map((m) => m.ailment), side);

  // Side analysis
  const sideKey = side === 'center' ? 'both' : side;
  const sideInfo = BODY_SIDE_GUIDE[sideKey] || BODY_SIDE_GUIDE.both;
  const sideAnalysis = {
    side,
    meaning: sideInfo.title + ': ' + sideInfo.energy + '. ' + sideInfo.symbolicQuestion
  };

  // Recommended affirmations
  const recommendedAffirmations = Array.from(
    new Set(topMatches.map((m) => m.ailment.healingAffirmation))
  ).slice(0, 3);

  // Reflection prompts
  const reflectionPrompts = Array.from(
    new Set(topMatches.flatMap((m) => m.ailment.reflectionQuestions))
  ).slice(0, 4);

  // Somatic exercise
  const somaticExercise = topMatches[0]?.ailment.somaticTip
    ? {
        title: `Somatic Reset for ${topMatches[0].ailment.name}`,
        description: topMatches[0].ailment.somaticTip,
        duration: '2-5 minutes'
      }
    : {
        title: 'Centering Vagus Nerve Breathing',
        description: 'Take 5 slow breaths with elongated exhalations (4 seconds in, 8 seconds out) with a hand on the heart.',
        duration: '3 minutes'
      };

  return {
    query: input,
    matchedAilments: topMatches,
    primaryAilment,
    dominantChakras,
    synthesisMessage,
    sideAnalysis,
    recommendedAffirmations,
    reflectionPrompts,
    somaticExercise
  };
}

function generateSynthesisMessage(ailments: Ailment[], side: SideType): string {
  if (ailments.length === 0) {
    return 'Tune into the subtle sensations of your body. Physical symptoms are the subconscious mind’s biological language attempting to bring unintegrated feelings into conscious awareness.';
  }

  const names = ailments.map((a) => a.name).join(' & ');
  const chakras = Array.from(new Set(ailments.map((a) => a.chakra)));
  const chakraNames = chakras.map((c) => CHAKRA_LIST.find((ci) => ci.id === c)?.name).join(' and ');

  let sideNote = '';
  if (side === 'left') {
    sideNote = ' Because your symptoms appear predominantly on the left side, this energetic pattern highlights receptive, maternal, emotional, or intuitive dynamics calling for gentle nurturing.';
  } else if (side === 'right') {
    sideNote = ' Because your symptoms appear predominantly on the right side, this reflects external pressures, active output, career direction, authority, or paternal expectations.';
  }

  if (ailments.length === 1) {
    return `Your focus on ${ailments[0].name} relates directly to the ${chakraNames || 'energetic body'}. Symbolically, this points to: "${ailments[0].coreMeaning.slice(0, 160)}..."${sideNote}`;
  }

  return `The combination of ${names} suggests an energetic bridge across your ${chakraNames}. Your body is communicating a somatic dialogue between ${ailments[0].coreMeaning.slice(0, 80)} and ${ailments[1]?.coreMeaning.slice(0, 80) || 'cellular tension'}.${sideNote}`;
}

export function filterDictionary(
  items: Ailment[],
  searchQuery: string,
  category: string,
  chakra: string
): Ailment[] {
  let filtered = [...items];

  if (searchQuery.trim()) {
    const q = normalizeText(searchQuery);
    const scored: { item: Ailment; score: number }[] = [];

    for (const item of filtered) {
      let matchScore = 0;
      const normName = normalizeText(item.name);
      if (normName.includes(q)) matchScore += 100;
      if (item.aliases.some((a) => normalizeText(a).includes(q))) matchScore += 80;
      if (normalizeText(item.organ).includes(q)) matchScore += 40;
      if (normalizeText(item.coreMeaning).includes(q)) matchScore += 20;
      if (item.relatedConcepts.some((c) => normalizeText(c).includes(q))) matchScore += 10;

      if (matchScore > 0) {
        scored.push({ item, score: matchScore });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    filtered = scored.map((s) => s.item);
  }

  if (category && category !== 'all') {
    filtered = filtered.filter((item) => item.bodyZone === category);
  }

  if (chakra && chakra !== 'all') {
    filtered = filtered.filter((item) => item.chakra === chakra);
  }

  return filtered;
}
