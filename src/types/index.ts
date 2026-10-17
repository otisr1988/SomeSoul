export type ChakraType =
  | 'root'
  | 'sacral'
  | 'solar_plexus'
  | 'heart'
  | 'throat'
  | 'third_eye'
  | 'crown';

export type BodyZoneType =
  | 'head'
  | 'eyes_ears'
  | 'throat'
  | 'chest'
  | 'solar_plexus'
  | 'spine'
  | 'pelvis'
  | 'arms_hands'
  | 'legs_feet'
  | 'skin'
  | 'immune_system'
  | 'emotional_state';

export type SideType = 'left' | 'right' | 'both' | 'center';

export interface Ailment {
  id: string;
  name: string;
  aliases: string[];
  bodyZone: BodyZoneType;
  organ: string;
  chakra: ChakraType;
  element: 'Earth' | 'Water' | 'Fire' | 'Air' | 'Ether' | 'Light' | 'Consciousness';
  meridian?: string;
  coreMeaning: string;
  emotionalRoot: string;
  mentalPattern: string;
  healingAffirmation: string;
  newThoughtPattern: string;
  relatedConcepts: string[];
  leftSideNuance?: string;
  rightSideNuance?: string;
  reflectionQuestions: string[];
  somaticTip: string;
  relatedAilments?: string[];
}

export interface ChakraInfo {
  id: ChakraType;
  name: string;
  sanskrit: string;
  location: string;
  color: string;
  colorHex: string;
  element: string;
  governs: string;
  emotionalTheme: string;
  seedSound: string;
  affirmation: string;
}

export interface DecodeResult {
  query: string;
  matchedAilments: {
    ailment: Ailment;
    score: number;
    matchedKeywords: string[];
  }[];
  primaryAilment?: Ailment;
  dominantChakras: ChakraType[];
  synthesisMessage: string;
  sideAnalysis?: {
    side: SideType;
    meaning: string;
  };
  recommendedAffirmations: string[];
  reflectionPrompts: string[];
  somaticExercise: {
    title: string;
    description: string;
    duration: string;
  };
}

export interface JournalEntry {
  id: string;
  date: string;
  symptomSummary: string;
  side: SideType;
  primaryAilmentName: string;
  notes: string;
  affirmationChosen: string;
  ratingBefore?: number;
  ratingAfter?: number;
}
