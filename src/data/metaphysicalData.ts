import type { Ailment, ChakraInfo } from '../types/index.ts';

export const CHAKRA_LIST: ChakraInfo[] = [
  {
    id: 'root',
    name: 'Root Chakra',
    sanskrit: 'Muladhara',
    location: 'Base of spine, perineum, pelvic floor, legs, feet',
    color: 'Crimson Red',
    colorHex: '#ef4444',
    element: 'Earth',
    governs: 'Survival, physical security, basic material needs, ancestry, groundedness, home, financial stability',
    emotionalTheme: 'Safety vs. Fear, belonging, stability, right to exist',
    seedSound: 'LAM',
    affirmation: 'I am safe, grounded, supported by the earth, and protected in every moment.'
  },
  {
    id: 'sacral',
    name: 'Sacral Chakra',
    sanskrit: 'Svadhisthana',
    location: 'Lower abdomen, 2 inches below navel, womb/prostate, hips, sacrum',
    color: 'Vibrant Orange',
    colorHex: '#f97316',
    element: 'Water',
    governs: 'Emotions, sexuality, pleasure, creativity, fluid flow, intimacy, adaptability, joy of feeling',
    emotionalTheme: 'Guilt vs. Pleasure, emotional balance, creative expression, honoring desires',
    seedSound: 'VAM',
    affirmation: 'I celebrate my feelings, honor my creative vitality, and allow sweetness into my life.'
  },
  {
    id: 'solar_plexus',
    name: 'Solar Plexus Chakra',
    sanskrit: 'Manipura',
    location: 'Upper abdomen, stomach area, solar plexus, diaphragm',
    color: 'Golden Amber',
    colorHex: '#eab308',
    element: 'Fire',
    governs: 'Personal power, willpower, digestion of experience, self-esteem, boundaries, autonomy, gut instincts',
    emotionalTheme: 'Shame vs. Self-worth, control vs. surrender, inner fire and confidence',
    seedSound: 'RAM',
    affirmation: 'I stand in my authentic power. I digest all life experiences with ease and clarity.'
  },
  {
    id: 'heart',
    name: 'Heart Chakra',
    sanskrit: 'Anahata',
    location: 'Center of chest, cardiac plexus, lungs, circulatory system, shoulders',
    color: 'Emerald Green & Rose',
    colorHex: '#10b981',
    element: 'Air',
    governs: 'Love, compassion, forgiveness, grief processing, relationships, peace, self-acceptance, breathing space',
    emotionalTheme: 'Grief vs. Love, closed heart, bitterness vs. unconditional compassion',
    seedSound: 'YAM',
    affirmation: 'My heart is open to give and receive unconditional love. I forgive freely and am at peace.'
  },
  {
    id: 'throat',
    name: 'Throat Chakra',
    sanskrit: 'Vishuddha',
    location: 'Throat, vocal cords, thyroid, neck, jaw, cervical spine',
    color: 'Cerulean Sky Blue',
    colorHex: '#06b6d4',
    element: 'Ether',
    governs: 'Authentic expression, speaking truth, listening, creative resonance, integrity, self-advocacy',
    emotionalTheme: 'Silence vs. Truth, suppression of voice, fear of judgment, swallowing feelings',
    seedSound: 'HAM',
    affirmation: 'I express my truth with kindness and courage. My voice is valuable and heard.'
  },
  {
    id: 'third_eye',
    name: 'Third Eye Chakra',
    sanskrit: 'Ajna',
    location: 'Forehead, between and slightly above eyebrows, pineal gland, temples, eyes',
    color: 'Deep Indigo Blue',
    colorHex: '#6366f1',
    element: 'Light',
    governs: 'Intuition, inner sight, perception, mental clarity, wisdom, seeing beyond illusion, discernment',
    emotionalTheme: 'Illusion vs. Intuition, overthinking, rigid beliefs, trusting inner wisdom',
    seedSound: 'OM',
    affirmation: 'I trust my inner vision and intuition. I perceive the deeper truth in all things.'
  },
  {
    id: 'crown',
    name: 'Crown Chakra',
    sanskrit: 'Sahasrara',
    location: 'Top of head, crown, cerebral cortex, spiritual connection',
    color: 'Violet & Opalescent White',
    colorHex: '#a855f7',
    element: 'Consciousness',
    governs: 'Spiritual connection, unity consciousness, divine trust, cosmic oneness, purpose, existential peace',
    emotionalTheme: 'Separation vs. Unity, existential dread, feeling unmoored or spiritually abandoned',
    seedSound: 'SILENCE / AUM',
    affirmation: 'I am one with Divine Source. I am guided, connected, and completely whole.'
  }
];

export const BODY_SIDE_GUIDE = {
  left: {
    title: 'Left Side (Yin / Sacred Feminine)',
    energy: 'Receptive, Intuitive, Emotional, Nurturing',
    correlations: [
      'Relationship with the Mother, maternal figures, or inner feminine nature',
      'Ability to receive love, help, compliments, gifts, and abundance without guilt',
      'The past, emotional memories, and unfinished relational business',
      'Intuition, dream life, psychic sensitivity, and interior reflection',
      'Vulnerability, tenderness, and allowing feelings to flow without judgement'
    ],
    symbolicQuestion: 'What am I resisting receiving? What unresolved maternal or tender emotion is crying for nurture?'
  },
  right: {
    title: 'Right Side (Yang / Sacred Masculine)',
    energy: 'Expressive, Active, Rational, Outward Direction',
    correlations: [
      'Relationship with the Father, paternal figures, or inner masculine authority',
      'External world: career, finances, achievements, public standing, and business',
      'Giving, taking action, asserting boundaries, moving forward toward the future',
      'Control, logic, rational decision-making, and executive drive',
      'Anger, aggression, or pressure to perform and succeed'
    ],
    symbolicQuestion: 'Where am I over-exerting control or feeling anger toward authority, career, or my father figure?'
  },
  both: {
    title: 'Bilateral / Center Balance',
    energy: 'Integration of Masculine & Feminine / Core Self',
    correlations: [
      'Constitutional life lessons spanning both inner self and outer expression',
      'Systemic stress affecting foundational life pillars (safety, identity, worth)',
      'A call for full equilibrium between being (feminine) and doing (masculine)'
    ],
    symbolicQuestion: 'How can I harmonize my inner emotional truth with my outer daily actions?'
  }
};

export const METAPHYSICAL_DICTIONARY: Ailment[] = [
  // --- HEAD & SENSORY ---
  {
    id: 'headache_migraine',
    name: 'Headache & Migraine',
    aliases: ['headache', 'migraine', 'pounding head', 'head tension', 'cephalalgia', 'temple throbbing', 'pressure in head'],
    bodyZone: 'head',
    organ: 'Brain, cranial blood vessels & nervous system',
    chakra: 'third_eye',
    element: 'Light',
    meridian: 'Gallbladder & Bladder Meridians',
    coreMeaning: 'Intense self-criticism, overthinking, invalidation of self, and suppressing intuitive guidance with relentless mental control.',
    emotionalRoot: 'Resistance to the flow of life; demanding perfection; forcing decisions with sheer intellect while ignoring gut feelings.',
    mentalPattern: 'Belief that you must control every outcome; feeling pressured by excessive expectations or unexpressed anger.',
    healingAffirmation: 'I relax the flow of life and let life provide all that I need easily and comfortably. I love and approve of myself.',
    newThoughtPattern: 'I quiet my analytical mind and trust the wisdom of my heart and intuition.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Suppressed Emotions & Bottled Feelings',
      'Lack of Clear Vision & Fear of Truth',
      'Anger & Resentment',
      'Neck Stiffness & Cervical Pain',
      'Eye Issues & Vision Problems'
    ],
    leftSideNuance: 'Self-judgment regarding intuition, emotional feelings, or mother figure relationships.',
    rightSideNuance: 'Mental pressure regarding career, finances, authority, or father figure expectations.',
    reflectionQuestions: [
      'Where am I being ruthlessly hard on myself?',
      'What intuitive knowing am I trying to logically override?',
      'What situation am I trying too hard to micromanage?'
    ],
    somaticTip: 'Place cool palms gently over your closed eyes. Inhale for 4 counts, exhale for 8 counts while relaxing your tongue away from the roof of the mouth.'
  },
  {
    id: 'dizziness_vertigo',
    name: 'Dizziness & Vertigo',
    aliases: ['dizziness', 'vertigo', 'lightheadedness', 'unsteady', 'spinning head', 'loss of balance'],
    bodyZone: 'head',
    organ: 'Inner ear labyrinth & vestibular system',
    chakra: 'crown',
    element: 'Ether',
    meridian: 'San Jiao (Triple Burner) Meridian',
    coreMeaning: 'Flighty, scattered thinking; refusal to look at what is directly in front of you; feeling off-balance in life circumstances.',
    emotionalRoot: 'Fear of committing to reality; rapid life changes happening faster than you can emotionally integrate.',
    mentalPattern: 'Trying to escape an overwhelming situation; ungrounded spirituality without earthly roots.',
    healingAffirmation: 'I am deeply centered and peaceful in life. It is safe for me to be alive and grounded right here and now.',
    newThoughtPattern: 'I plant my feet upon the earth and find stillness in the present moment.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Fear of the Future & Scarcity',
      'Lack of Clear Vision & Fear of Truth',
      'Tinnitus & Ear Issues',
      'Headache & Migraine'
    ],
    leftSideNuance: 'Feeling disoriented by emotional shifts or feminine relational changes.',
    rightSideNuance: 'Feeling unsteady regarding financial path, job direction, or material ambitions.',
    reflectionQuestions: [
      'What in my current reality am I afraid to look squarely in the eye?',
      'Am I living too much in my head, disconnected from my physical body?'
    ],
    somaticTip: 'Sit barefoot on the floor. Stomp both feet gently 5 times, then feel the weight of your pelvis sinking into gravity.'
  },
  {
    id: 'brain_fog',
    name: 'Brain Fog & Mental Exhaustion',
    aliases: ['brain fog', 'mental confusion', 'cloudy mind', 'forgetfulness', 'poor focus', 'overwhelmed mind'],
    bodyZone: 'head',
    organ: 'Prefrontal cortex & neurotransmitter pathways',
    chakra: 'crown',
    element: 'Consciousness',
    meridian: 'Spleen Meridian (Overthinking & Dampness)',
    coreMeaning: 'Cognitive defense mechanism against sensory or emotional overload; subconscious retreat from making hard choices.',
    emotionalRoot: 'Exhaustion from hyper-vigilance; feeling that if you stay clear-headed, you will have to confront painful truths.',
    mentalPattern: 'Too many open mental tabs; neglecting restorative solitude and spiritual surrender.',
    healingAffirmation: 'My mind is clear, calm, and illuminated with divine wisdom. I give myself permission to rest.',
    newThoughtPattern: 'I honor my limits. I release the need to process everything all at once.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Chronic Fatigue & Adrenal Burnout',
      'Insomnia & Sleep Disturbance',
      'Lack of Clear Vision & Fear of Truth',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What decision am I avoiding by claiming "I just do not know"?',
      'What emotional weight am I carrying that is sapping my cognitive vitality?'
    ],
    somaticTip: 'Step outside into natural daylight for 5 minutes. Take 10 deep belly breaths with no screens in sight.'
  },
  {
    id: 'hair_loss',
    name: 'Hair Loss & Scalp Sensitivity',
    aliases: ['hair loss', 'alopecia', 'thinning hair', 'scalp pain', 'shedding hair'],
    bodyZone: 'head',
    organ: 'Hair follicles, scalp circulation',
    chakra: 'crown',
    element: 'Consciousness',
    meridian: 'Kidney Meridian (TCM: Hair is surplus of Kidney Essence / Jing)',
    coreMeaning: 'Tension, fear, and gripping tightly to control; deep-seated fear of loss of vitality or personal crown/power.',
    emotionalRoot: 'Extreme stress where one feels "plucked" from safety; distrusting the natural cycles of growth and release.',
    mentalPattern: 'Fear that you are losing your strength, beauty, or sovereignty in the world.',
    healingAffirmation: 'I am safe. I relax and trust the process of life. My roots are nourished and eternally strong.',
    newThoughtPattern: 'I let go of tension on my crown. I allow new life to sprout in divine timing.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Fear of the Future & Scarcity',
      'Chronic Fatigue & Adrenal Burnout',
      'Shame & Unworthiness'
    ],
    reflectionQuestions: [
      'What am I clutching onto with desperate fear of losing it?',
      'How can I replenish my vital life essence (sleep, hydration, boundary setting)?'
    ],
    somaticTip: 'Gently massage your scalp with fingertips in slow circular motions, intentionally visualizing releasing tension from your crown down into the floor.'
  },
  {
    id: 'eyes_vision',
    name: 'Eye Issues & Vision Problems',
    aliases: ['vision problems', 'blurry vision', 'myopia', 'nearsighted', 'farsighted', 'astigmatism', 'dry eyes', 'stye', 'conjunctivitis'],
    bodyZone: 'eyes_ears',
    organ: 'Eyes, retina, optic nerve',
    chakra: 'third_eye',
    element: 'Light',
    meridian: 'Liver Meridian (TCM: Liver opens into the eyes)',
    coreMeaning: 'Not wanting to see what is right before you, or fear of seeing the future clearly.',
    emotionalRoot: 'Nearsightedness (Myopia): Fear of the future or distrusting what lies ahead. Farsightedness (Presbyopia): Fear of the present, discomfort with current reality. Conjunctivitis: Anger and frustration at what you are witnessing.',
    mentalPattern: 'Closing your spiritual or physical eyes to avoid experiencing painful truths or disappointing behavior in others.',
    healingAffirmation: 'I see with love and joy. I create a life that I love to look upon. My vision is clear and compassionate.',
    newThoughtPattern: 'I view myself and others through the eyes of understanding rather than judgment.',
    relatedConcepts: [
      'Lack of Clear Vision & Fear of Truth',
      'Headache & Migraine',
      'Anger & Resentment',
      'Suppressed Emotions & Bottled Feelings',
      'Stress & Hyper-Vigilance'
    ],
    leftSideNuance: 'Reluctance to see emotional truth or painful dynamics with female figures.',
    rightSideNuance: 'Reluctance to see career obstacles, financial reality, or father figure friction.',
    reflectionQuestions: [
      'What am I witnessing in my environment that makes me want to close my eyes?',
      'Am I terrified of looking toward my future, or looking at my current day-to-day life?'
    ],
    somaticTip: 'Palm your eyes: rub hands until warm, cup warm palms gently over your orbits, and let the eyes rest in total, nourishing darkness.'
  },
  {
    id: 'tinnitus_ear_issues',
    name: 'Tinnitus & Ear Issues',
    aliases: ['tinnitus', 'ear ringing', 'ringing in ears', 'ear infection', 'ear ache', 'hearing loss', 'blocked ears'],
    bodyZone: 'eyes_ears',
    organ: 'Inner ear, cochlea, auditory nerve',
    chakra: 'throat',
    element: 'Ether',
    meridian: 'Kidney & Gallbladder Meridians',
    coreMeaning: 'Refusal to listen; tuning out inner guidance or outer noise; anger at what you have been forced to hear.',
    emotionalRoot: 'Tinnitus often manifests when you refuse to listen to your inner intuitive still small voice, or when you are bombarded with harsh criticism. Ear infections express anger and not wanting to hear bickering.',
    mentalPattern: '"Nobody listens to me, and I do not want to hear what they are saying anyway."',
    healingAffirmation: 'I listen with love to the quiet voice within. I hear the harmony of life. I am safe to receive the sounds of existence.',
    newThoughtPattern: 'I tune into the divine frequency of peace. I discern between trivial noise and spiritual truth.',
    relatedConcepts: [
      'Suppressed Emotions & Bottled Feelings',
      'Anger & Resentment',
      'Sore Throat & Laryngitis',
      'Stress & Hyper-Vigilance',
      'Dizziness & Vertigo'
    ],
    leftSideNuance: 'Ignoring your maternal intuition, emotional feelings, or gentle inner needs.',
    rightSideNuance: 'Frustration with outer demands, boss/work orders, or harsh masculine voices.',
    reflectionQuestions: [
      'What message has my intuition been whispering that I keep trying to drown out?',
      'What harsh words in my environment am I trying to block out?'
    ],
    somaticTip: 'Gently pull your earlobes downward and outward while yawning widely to equalize pressure and soothe the vagus nerve.'
  },

  // --- MOUTH & THROAT ---
  {
    id: 'sore_throat_laryngitis',
    name: 'Sore Throat & Laryngitis',
    aliases: ['sore throat', 'laryngitis', 'lost voice', 'pharyngitis', 'hoarseness', 'scratchy throat', 'throat tightness'],
    bodyZone: 'throat',
    organ: 'Vocal cords, pharynx, larynx',
    chakra: 'throat',
    element: 'Ether',
    meridian: 'Lung & Stomach Meridians',
    coreMeaning: 'Suppressed anger; inability or fear of speaking up for oneself; swallowed emotions and stifled creativity.',
    emotionalRoot: 'Feeling that it is dangerous or unacceptable to speak your authentic truth; swallowing resentment until the throat burns.',
    mentalPattern: '"If I speak up, I will be rejected, punished, or abandoned."',
    healingAffirmation: 'I express my thoughts freely and joyously. I speak up for myself with love. My voice is sacred.',
    newThoughtPattern: 'It is safe for me to take up acoustic space. I release all swallowed words with grace.',
    relatedConcepts: [
      'Suppressed Emotions & Bottled Feelings',
      'Thyroid Imbalance (Hypo / Hyper)',
      'Anger & Resentment',
      'Teeth, Gums & TMJ / Jaw Clenching',
      'Neck Stiffness & Cervical Pain'
    ],
    leftSideNuance: 'Difficulty speaking your emotional vulnerability or needs to close loved ones.',
    rightSideNuance: 'Struggling to assert yourself in professional settings, negotiation, or authority disputes.',
    reflectionQuestions: [
      'What words have I swallowed and kept inside over the past week?',
      'Whose reaction am I afraid of if I speak my unfiltered truth?'
    ],
    somaticTip: 'Gently hum on an exhale with lips closed (Bhramari breath). Feel the vibration dissolving tension around the vocal cords.'
  },
  {
    id: 'thyroid_issues',
    name: 'Thyroid Imbalance (Hypo / Hyper)',
    aliases: ['thyroid', 'hypothyroidism', 'hyperthyroidism', 'hashimotos', 'goiter', 'sluggish metabolism'],
    bodyZone: 'throat',
    organ: 'Thyroid gland, endocrine system',
    chakra: 'throat',
    element: 'Ether',
    meridian: 'San Jiao & Conception Vessel',
    coreMeaning: 'Relationship with time, self-advocacy, and suppressed creative expression. The eternal cry: "When do I get my turn?"',
    emotionalRoot: 'Hypothyroidism: Giving up; profound discouragement; feeling subordinate; running out of time. Hyperthyroidism: Rage at being left out; frantic hurry; believing you must do everything at breakneck speed.',
    mentalPattern: 'Feeling like a perpetual victim of other people\'s schedules and demands while putting your own soul purpose on the back burner.',
    healingAffirmation: 'I move beyond old limitations and freely express my creative power. My timing is divinely aligned with my purpose.',
    newThoughtPattern: 'I honor my personal rhythm. I step to the front of my own life.',
    relatedConcepts: [
      'Suppressed Emotions & Bottled Feelings',
      'Chronic Fatigue & Adrenal Burnout',
      'Sore Throat & Laryngitis',
      'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)',
      'Shame & Unworthiness'
    ],
    reflectionQuestions: [
      'Where in my life am I waiting for permission to take my turn?',
      'Am I frantic trying to prove my worth, or have I surrendered in exhaustion?'
    ],
    somaticTip: 'Place both warm hands softly across your throat. Whisper: "I have time. I matter. I am worthy of my own life."'
  },
  {
    id: 'teeth_gums_tmj',
    name: 'Teeth, Gums & TMJ / Jaw Clenching',
    aliases: ['tmj', 'jaw clenching', 'teeth grinding', 'bruxism', 'gum disease', 'gingivitis', 'toothache', 'jaw pain'],
    bodyZone: 'throat',
    organ: 'Jaw (temporomandibular joint), teeth, gums',
    chakra: 'throat',
    element: 'Ether',
    meridian: 'Stomach & Large Intestine Meridians',
    coreMeaning: 'Inability to bite into life; indecision; suppressed rage; biting back words of anger and frustration.',
    emotionalRoot: 'Teeth represent decisions and taking action. TMJ / Bruxism represents holding back fury, wanting to "bite" someone metaphorically but clamping down.',
    mentalPattern: 'Internalizing anger so deeply that you grind through your own enamel rather than express frustration.',
    healingAffirmation: 'I make my decisions based on principles of truth, and I rest securely knowing only right action is taking place.',
    newThoughtPattern: 'I release resentment. I express healthy boundaries calmly without needing to clench.',
    relatedConcepts: [
      'Anger & Resentment',
      'Suppressed Emotions & Bottled Feelings',
      'Stress & Hyper-Vigilance',
      'Headache & Migraine',
      'Neck Stiffness & Cervical Pain'
    ],
    reflectionQuestions: [
      'What decision have I been chewing on for weeks without taking a bite?',
      'Whom or what am I clenching my teeth against in suppressed rage?'
    ],
    somaticTip: 'Open your mouth wide in a gentle yawn. Massage the masseter muscles under your cheekbones with two fingers while breathing out a soft sigh.'
  },

  // --- CHEST & CARDIOVASCULAR ---
  {
    id: 'heart_palpitations',
    name: 'Heart Palpitations & Arrhythmia',
    aliases: ['heart palpitations', 'racing heart', 'fluttering chest', 'arrhythmia', 'rapid heartbeat'],
    bodyZone: 'chest',
    organ: 'Heart muscle, cardiac nervous system',
    chakra: 'heart',
    element: 'Fire',
    meridian: 'Heart Meridian',
    coreMeaning: 'Panic around love, joy, or emotional safety. The heart racing to alert you that your boundaries or emotional equilibrium are disrupted.',
    emotionalRoot: 'Long-standing emotional grief; fear that love will hurt; panic when intimacy deepens or when joy is suddenly interrupted.',
    mentalPattern: 'Living on emotional edge; waiting for the other shoe to drop in love and life.',
    healingAffirmation: 'My heart beats to the rhythm of love. I am safe to relax and open my heart to joy and peace.',
    newThoughtPattern: 'I allow love to enter smoothly and steadily. My heart is held by the cosmos.',
    relatedConcepts: [
      'Grief & Heartache',
      'Stress & Hyper-Vigilance',
      'High Blood Pressure (Hypertension)',
      'Asthma, Bronchitis & Shortness of Breath',
      'Fear of the Future & Scarcity'
    ],
    leftSideNuance: 'Deep emotional longing or heartbreak in your personal intimate relationships.',
    rightSideNuance: 'Anxiety regarding duty, provider stress, or public pressure weighing on your vitality.',
    reflectionQuestions: [
      'What sudden joy or deep vulnerability am I recoiling from out of fear?',
      'Am I holding an old heartache that gets triggered whenever someone gets close?'
    ],
    somaticTip: 'Place your right hand over your heart center and left hand over your navel. Feel the warmth of your palm soothing the heartbeat until the pace softens.'
  },
  {
    id: 'high_blood_pressure',
    name: 'High Blood Pressure (Hypertension)',
    aliases: ['high blood pressure', 'hypertension', 'elevated bp', 'arterial tension'],
    bodyZone: 'chest',
    organ: 'Arteries, circulatory system, heart',
    chakra: 'heart',
    element: 'Fire',
    meridian: 'Heart & Pericardium Meridians',
    coreMeaning: 'Unresolved emotional conflict that has simmered for years; hyper-control; holding the pressure cooker lid on tight.',
    emotionalRoot: 'Carrying deep resentment and acute pressure to perform without releasing steam; inability to let go of old battles.',
    mentalPattern: 'Feeling like you must constantly fight or stay braced against the world.',
    healingAffirmation: 'I joyfully release the past. I am at peace. I allow the sweet river of life to flow through me without resistance.',
    newThoughtPattern: 'I do not need to control the world. I choose peace over being right.',
    relatedConcepts: [
      'Anger & Resentment',
      'Stress & Hyper-Vigilance',
      'Heart Palpitations & Arrhythmia',
      'Suppressed Emotions & Bottled Feelings',
      'Headache & Migraine'
    ],
    reflectionQuestions: [
      'What ancient grudge or resentment is constantly elevating my internal pressure?',
      'What would happen if I stopped fighting and allowed things to be as they are?'
    ],
    somaticTip: 'Slow extended exhalations: Inhale gently through the nose for 4 counts, exhale smoothly through parted lips for 8 counts.'
  },
  {
    id: 'asthma_bronchitis',
    name: 'Asthma, Bronchitis & Shortness of Breath',
    aliases: ['asthma', 'shortness of breath', 'bronchitis', 'wheezing', 'chest tightness', 'shallow breathing', 'air hunger'],
    bodyZone: 'chest',
    organ: 'Lungs, bronchial tubes, diaphragm',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Lung Meridian (TCM: Lungs hold grief and govern Qi)',
    coreMeaning: 'Smother love; inability to breathe for oneself; feeling stifled or unworthy of taking up space and living fully.',
    emotionalRoot: 'Deep unexpressed grief; feeling crushed by guilt or an overbearing environment; fear of life’s fullness.',
    mentalPattern: '"I have no right to take up space; I will suffocate under other people\'s emotional demands."',
    healingAffirmation: 'It is safe for me to take charge of my own life. I choose to be free. I breathe in the fullness of life with joy.',
    newThoughtPattern: 'I have the divine right to breathe deeply and occupy my sacred place in this world.',
    relatedConcepts: [
      'Grief & Heartache',
      'Suppressed Emotions & Bottled Feelings',
      'Eczema & Atopic Dermatitis',
      'Persistent Cough & Chest Congestion',
      'Stress & Hyper-Vigilance'
    ],
    leftSideNuance: 'Grief related to personal relationships, maternal smothering, or emotional dependency.',
    rightSideNuance: 'Feeling suffocated by professional obligations, societal demands, or patriarchal expectations.',
    reflectionQuestions: [
      'Who or what in my environment makes me feel suffocated or stifled?',
      'What deep well of sorrow or grief have I not allowed myself to weep for?'
    ],
    somaticTip: 'Stand with arms spread wide, shoulder blades together. Inhale expansive golden light into your chest, exhale and sigh aloud: "HA".'
  },
  {
    id: 'cough_chest_congestion',
    name: 'Persistent Cough & Chest Congestion',
    aliases: ['cough', 'chest congestion', 'phlegm in chest', 'bronchial cough', 'hacking cough'],
    bodyZone: 'chest',
    organ: 'Lungs, trachea, respiratory mucosa',
    chakra: 'throat',
    element: 'Air',
    meridian: 'Lung & Large Intestine Meridians',
    coreMeaning: 'A subconscious desire to bark at the world: "Look at me! Listen to me!" A physical attempt to expel an irritant that is emotional.',
    emotionalRoot: 'Annoyance, irritation at daily life; feeling that you are not being acknowledged; needing to clear the emotional atmosphere.',
    mentalPattern: 'Harboring chronic minor irritations that you choke down instead of addressing calmly.',
    healingAffirmation: 'I am noticed and appreciated in the most positive ways. I am loved. Life supports my every breath.',
    newThoughtPattern: 'I release all irritations. I choose harmony in my words and relationships.',
    relatedConcepts: [
      'Sore Throat & Laryngitis',
      'Asthma, Bronchitis & Shortness of Breath',
      'Suppressed Emotions & Bottled Feelings',
      'Anger & Resentment'
    ],
    reflectionQuestions: [
      'What or who is sticking in my throat and chest that I am desperately trying to cough up?',
      'Where do I feel invisible or unheard?'
    ],
    somaticTip: 'Sip warm chamomile or thyme tea mindfully, focusing on softening the respiratory tract with every swallow.'
  },

  // --- DIGESTIVE & SOLAR PLEXUS ---
  {
    id: 'acid_reflux_gerd',
    name: 'Acid Reflux, Heartburn & GERD',
    aliases: ['acid reflux', 'heartburn', 'gerd', 'indigestion', 'stomach burning', 'sour stomach', 'gastric regurgitation'],
    bodyZone: 'solar_plexus',
    organ: 'Esophagus, lower esophageal sphincter, stomach',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Stomach Meridian',
    coreMeaning: 'Fear, dread, and being unable to digest new ideas or stressful situations. Acidity symbolizes corrosive anger and swallowed irritation.',
    emotionalRoot: 'Rejection of experiences; feeling like something forced upon you is "too acidic to swallow"; anxiety turning back upward.',
    mentalPattern: '"I cannot stomach this situation; it burns me up inside."',
    healingAffirmation: 'I breathe freely and deeply. I am safe. I trust the process of life. Everything is working out for my highest good.',
    newThoughtPattern: 'I digest life with ease and lightness. Every experience brings me wisdom without bitterness.',
    relatedConcepts: [
      'Anger & Resentment',
      'Gastritis & Stomach Ulcers',
      'Stress & Hyper-Vigilance',
      'Suppressed Emotions & Bottled Feelings',
      'Bloating, Gas & Irritable Bowel (IBS)'
    ],
    reflectionQuestions: [
      'What recent event or person’s behavior makes me feel burning resentment?',
      'What situation am I trying to "stomach" against my true values?'
    ],
    somaticTip: 'Lie on your left side to assist natural gastric anatomical drainage. Place a warm palm over your upper epigastrium.'
  },
  {
    id: 'stomach_ulcer_gastritis',
    name: 'Gastritis & Stomach Ulcers',
    aliases: ['gastritis', 'stomach ulcer', 'peptic ulcer', 'stomach pain', 'cramping stomach', 'gnawing stomach'],
    bodyZone: 'solar_plexus',
    organ: 'Stomach lining, gastric mucosa',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Stomach & Spleen Meridians',
    coreMeaning: 'Anxiety and fear that you are "not good enough"; dread of failing to please others; the ego eating away at itself.',
    emotionalRoot: 'Severe dread and worry; agonizing over perfection; internalizing conflict until digestive acid corrodes tissue.',
    mentalPattern: 'Consuming yourself with anxiety and self-doubt; believing failure will result in total loss of love.',
    healingAffirmation: 'I love and approve of myself. I am at peace with myself. I am wonderful just as I am.',
    newThoughtPattern: 'I am safe. I do not need to prove anything to deserve existence and affection.',
    relatedConcepts: [
      'Shame & Unworthiness',
      'Acid Reflux, Heartburn & GERD',
      'Stress & Hyper-Vigilance',
      'Bloating, Gas & Irritable Bowel (IBS)',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What is eating away at me from the inside out?',
      'Whose approval am I agonizing over losing?'
    ],
    somaticTip: 'Circular clockwise belly massage with sesame or lavender oil around the navel to soothe the enteric nervous system.'
  },
  {
    id: 'bloating_ibs',
    name: 'Bloating, Gas & Irritable Bowel (IBS)',
    aliases: ['bloating', 'gas', 'ibs', 'irritable bowel', 'distended stomach', 'gut cramping', 'digestive sensitivity'],
    bodyZone: 'solar_plexus',
    organ: 'Small and large intestines, gut microbiome',
    chakra: 'solar_plexus',
    element: 'Earth',
    meridian: 'Spleen & Large Intestine Meridians',
    coreMeaning: 'Difficulty processing, absorbing, and assimilating life events; anxiety trapped in gut instincts; fear of vulnerability.',
    emotionalRoot: 'IBS oscillates between clinging tightly (constipation) and panicked purging (diarrhea); fear of losing control over outcomes.',
    mentalPattern: 'Hyper-sensitivity to criticism; feeling that the environment is turbulent and unpredictable.',
    healingAffirmation: 'I assimilate and absorb all that is good for me, and I release the rest with total trust. My gut is calm and wise.',
    newThoughtPattern: 'I honor my gut intuition. I digest life in manageable bites without urgency.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Constipation',
      'Diarrhea',
      'Fear of the Future & Scarcity',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What experience am I struggling to process and integrate right now?',
      'Where am I holding onto old tension instead of letting life pass through me naturally?'
    ],
    somaticTip: 'Cat-Cow spine stretches followed by 3 minutes in Child’s Pose (Balasana), breathing deeply into the low abdomen.'
  },
  {
    id: 'constipation',
    name: 'Constipation',
    aliases: ['constipation', 'hard stool', 'difficulty passing stool', 'infrequent bowel', 'retaining waste'],
    bodyZone: 'solar_plexus',
    organ: 'Colon, rectum, large intestine',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Large Intestine Meridian',
    coreMeaning: 'Refusal to release old ideas, grievances, or material possessions; stinginess born of poverty consciousness; fear of scarcity.',
    emotionalRoot: 'Gripping onto what is familiar even if it has turned toxic; fear that if you let go, you will be left with nothing.',
    mentalPattern: '"I must hold on to everything because there might not be enough later."',
    healingAffirmation: 'As I release the past, the new and fresh and vital enters. I allow life to flow through me effortlessly.',
    newThoughtPattern: 'I trust abundance. Releasing waste makes room for fresh nourishment.',
    relatedConcepts: [
      'Fear of the Future & Scarcity',
      'Bloating, Gas & Irritable Bowel (IBS)',
      'Lower Back Pain & Sciatica',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What old mental baggage, resentment, or physical clutter am I refusing to purge?',
      'Where am I operating from a mindset of scarcity rather than trust?'
    ],
    somaticTip: 'Drink a tall glass of warm lemon water while standing. Do 10 gentle torso twists to awaken the descending colon.'
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    aliases: ['diarrhea', 'loose stool', 'watery stool', 'urgent bowel', 'gut flushing'],
    bodyZone: 'solar_plexus',
    organ: 'Colon, small intestine, enteric mucosa',
    chakra: 'solar_plexus',
    element: 'Water',
    meridian: 'Small Intestine & Spleen Meridians',
    coreMeaning: 'Fear, rejection, and panicked running away from a person or situation; throwing away nourishment because of sheer anxiety.',
    emotionalRoot: 'Feeling unready to handle the demands of a situation; panic so intense that the body discards everything without absorbing nutrition.',
    mentalPattern: '"I have to get out of here right now; I cannot handle this pressure."',
    healingAffirmation: 'My intake, assimilation, and elimination are in perfect order. I am at peace with life.',
    newThoughtPattern: 'I have the strength to digest what is in front of me. I remain calm and centered.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Fear of the Future & Scarcity',
      'Bloating, Gas & Irritable Bowel (IBS)',
      'Acid Reflux, Heartburn & GERD'
    ],
    reflectionQuestions: [
      'What upcoming event or responsibility is triggering an urge to run away?',
      'Why do I feel incapable of absorbing the lessons of this moment?'
    ],
    somaticTip: 'Lie on your back with knees bent. Place both hands over your lower belly and hum in low steady pitches to stimulate parasympathetic vagal tone.'
  },
  {
    id: 'liver_gallbladder',
    name: 'Liver & Gallbladder Issues',
    aliases: ['liver', 'gallbladder', 'gallstones', 'fatty liver', 'biliary colic', 'sluggish liver', 'hepatic pain'],
    bodyZone: 'solar_plexus',
    organ: 'Liver, gallbladder, bile ducts',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Liver & Gallbladder Meridians (TCM: Seat of Anger & Vision)',
    coreMeaning: 'Seat of anger, primitive emotions, and chronic complaining. Bitterness, harsh judgment of others, and hard unyielding opinions (gallstones = crystallized bitterness).',
    emotionalRoot: 'Justifying fault-finding to deceive oneself; suppressed rage at being thwarted in life goals; bitter disappointment.',
    mentalPattern: 'Viewing life through lenses of indignation, blame, and rigid inflexibility.',
    healingAffirmation: 'I release all bitterness and blame. I choose to live through the open space in my heart. I look for love and find it everywhere.',
    newThoughtPattern: 'I dissolve all rigid stones of anger. My vision is clear, flexible, and generous.',
    relatedConcepts: [
      'Anger & Resentment',
      'Suppressed Emotions & Bottled Feelings',
      'Lack of Clear Vision & Fear of Truth',
      'Eye Issues & Vision Problems',
      'Headache & Migraine'
    ],
    leftSideNuance: 'Resentment toward family members, maternal demands, or emotional wounds.',
    rightSideNuance: 'Fury toward colleagues, boss, competitor, or authority figures in the outer arena.',
    reflectionQuestions: [
      'What ancient grudge am I keeping alive like a pet rock?',
      'Who am I secretly blaming for my current lack of happiness?'
    ],
    somaticTip: 'Gentle right rib cage breathing. Place right palm below right breast, breathe in clarity, breathe out green mist of irritation.'
  },
  {
    id: 'diabetes_blood_sugar',
    name: 'Diabetes & Blood Sugar Imbalance',
    aliases: ['diabetes', 'hyperglycemia', 'hypoglycemia', 'insulin resistance', 'blood sugar crash', 'craving sugar'],
    bodyZone: 'solar_plexus',
    organ: 'Pancreas, islets of Langerhans, liver',
    chakra: 'solar_plexus',
    element: 'Earth',
    meridian: 'Spleen & Pancreas Meridian',
    coreMeaning: 'Longing for what might have been; a great need to control; deep sorrow; "no sweetness left in life."',
    emotionalRoot: 'Grieving a lost sweetness or joy; substituting refined physical sweets for genuine emotional sweetness and affection.',
    mentalPattern: '"Life is bitter, disappointing, and devoid of genuine joy; I must strictly control everything."',
    healingAffirmation: 'This moment is filled with joy. I now choose to experience the sweetness of today. Life is sweet.',
    newThoughtPattern: 'I allow warmth and sweet love to enter my days. I relish simple moments of delight.',
    relatedConcepts: [
      'Grief & Heartache',
      'Weight Retention & Protective Armor',
      'Chronic Fatigue & Adrenal Burnout',
      'Shame & Unworthiness'
    ],
    reflectionQuestions: [
      'Where did the genuine sweetness disappear from my day-to-day life?',
      'What past sorrow am I holding onto that makes the present feel dry and bitter?'
    ],
    somaticTip: 'Engage in a conscious savoring practice: taste a piece of fruit slowly, noticing all sensory nuances and breathing in joy.'
  },

  // --- SPINE & SKELETAL ---
  {
    id: 'neck_stiffness_pain',
    name: 'Neck Stiffness & Cervical Pain',
    aliases: ['neck pain', 'stiff neck', 'cervical pain', 'whiplash', 'crick in neck', 'limited neck rotation'],
    bodyZone: 'spine',
    organ: 'Cervical spine, trapezius, levator scapulae',
    chakra: 'throat',
    element: 'Ether',
    meridian: 'Bladder & Small Intestine Meridians',
    coreMeaning: 'Refusal to see other sides of an issue; stubbornness and inflexibility; being "stiff-necked" against change.',
    emotionalRoot: 'Inability or refusal to look behind you, to the left, or to the right; refusing to consider an alternative viewpoint.',
    mentalPattern: '"My way is the only right way; I refuse to bend or see your perspective."',
    healingAffirmation: 'It is with flexibility and ease that I see all sides of an issue. There are endless ways of doing things and seeing things. I am safe.',
    newThoughtPattern: 'I soften my stance. I welcome diverse viewpoints without feeling threatened.',
    relatedConcepts: [
      'Headache & Migraine',
      'Shoulder Tension & Frozen Shoulder',
      'Sore Throat & Laryngitis',
      'Suppressed Emotions & Bottled Feelings',
      'Lack of Clear Vision & Fear of Truth'
    ],
    leftSideNuance: 'Refusal to understand the emotional or maternal perspective.',
    rightSideNuance: 'Stubbornness around career methodology, male colleagues, or rigid dogmas.',
    reflectionQuestions: [
      'Where am I digging my heels in and refusing to see another viewpoint?',
      'What would happen if I admitted that someone else might have a valid perspective?'
    ],
    somaticTip: 'Slow chin tucks followed by gently rolling the head from shoulder to shoulder, exhaling tension into the upper back.'
  },
  {
    id: 'upper_back_pain',
    name: 'Upper Back Pain (Between Shoulder Blades)',
    aliases: ['upper back pain', 'thoracic pain', 'between shoulder blades', 'rhomboid spasm', 'knots in upper back'],
    bodyZone: 'spine',
    organ: 'Thoracic spine, rhomboids, upper trapezius',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Bladder & Governor Vessel Meridians',
    coreMeaning: 'Lack of emotional support; feeling unloved; holding back love and affection; feeling "stabbed in the back."',
    emotionalRoot: 'Belief that nobody truly supports you or holds your heart; feeling that you have to bear the emotional burden of the whole family alone.',
    mentalPattern: '"Nobody loves me or backs me up; I am utterly on my own."',
    healingAffirmation: 'I love and approve of myself. Life supports and loves me. I am surrounded by unconditional affection.',
    newThoughtPattern: 'I open my back heart to receive support. I let go of feeling betrayed.',
    relatedConcepts: [
      'Grief & Heartache',
      'Shoulder Tension & Frozen Shoulder',
      'Heart Palpitations & Arrhythmia',
      'Shame & Unworthiness',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'Where do I feel betrayed or unsupported by those closest to me?',
      'Am I giving love while closing myself off from receiving back-up?'
    ],
    somaticTip: 'Hug yourself tightly, wrapping your hands around opposite shoulder blades. Breathe deeply into the space between your scapulae.'
  },
  {
    id: 'middle_back_pain',
    name: 'Middle Back Pain',
    aliases: ['middle back pain', 'mid back tension', 'thoracolumbar pain', 'back guilt'],
    bodyZone: 'spine',
    organ: 'Mid-spine (T6-T12), spinal erectors',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Bladder Meridian',
    coreMeaning: 'Guilt; stuck in all the stuff behind you; "get off my back!" Feeling overloaded by past mistakes or unresolved obligations.',
    emotionalRoot: 'Carrying baggage that belongs to the past; feeling that people are riding on your back and weighing you down.',
    mentalPattern: 'Ruminating over past mistakes; feeling responsible for past failures.',
    healingAffirmation: 'I release the past. I am free to move forward with love in my heart. I leave yesterday behind.',
    newThoughtPattern: 'I shed everyone else’s expectations. I walk light and unencumbered.',
    relatedConcepts: [
      'Shame & Unworthiness',
      'Lower Back Pain & Sciatica',
      'Upper Back Pain (Between Shoulder Blades)',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'Whose burden am I carrying on my back that does not belong to me?',
      'What past mistake am I punishing myself for every single day?'
    ],
    somaticTip: 'Lie on a foam roller or rolled towel positioned horizontally under your mid-back, extending arms overhead for 2 minutes.'
  },
  {
    id: 'lower_back_pain_sciatica',
    name: 'Lower Back Pain & Sciatica',
    aliases: ['lower back pain', 'lumbar pain', 'sciatica', 'sacroiliac pain', 'lumbago', 'slipped disc', 'pinched nerve back'],
    bodyZone: 'spine',
    organ: 'Lumbar spine (L1-L5), sciatic nerve, sacrum',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Kidney & Bladder Meridians',
    coreMeaning: 'Fear of money, lack of financial support, or fear of survival and material instability. Sciatica symbolizes being hypocritical or terrified of money and moving forward.',
    emotionalRoot: 'Feeling unsupported in the physical world; panic over bills, housing, career security, or feeling that the foundation is cracking beneath you.',
    mentalPattern: '"I have no financial safety net; if I fall, nobody will catch me."',
    healingAffirmation: 'I trust the process of life. All I need is always taken care of. I am completely safe in the material world.',
    newThoughtPattern: 'Abundance flows to me in unexpected ways. The universe is my ultimate foundation.',
    relatedConcepts: [
      'Fear of the Future & Scarcity',
      'Hip Pain & Stiffness',
      'Kidney Pain & Kidney Stones',
      'Plantar Fasciitis & Foot Pain',
      'Constipation'
    ],
    leftSideNuance: 'Fear of financial vulnerability when depending on a partner or family.',
    rightSideNuance: 'Intense dread over career standing, personal earnings, or business solvency.',
    reflectionQuestions: [
      'What financial fear or material insecurity is keeping my lumbar muscles in a chronic spasm?',
      'Where am I afraid that the ground will give way underneath my feet?'
    ],
    somaticTip: 'Knees-to-chest pose (Apanasana) on a firm surface, gently rocking the sacrum side to side to release lumbar compression.'
  },

  // --- PELVIS, SACRAL & REPRODUCTIVE ---
  {
    id: 'menstrual_cramps_pms',
    name: 'Menstrual Cramps & PMS',
    aliases: ['menstrual cramps', 'period pain', 'dysmenorrhea', 'pms', 'pms mood', 'uterine cramps'],
    bodyZone: 'pelvis',
    organ: 'Uterus, ovaries, endocrine hormones',
    chakra: 'sacral',
    element: 'Water',
    meridian: 'Spleen, Liver & Conception Vessel',
    coreMeaning: 'Rejection of the feminine process; guilt or fear around womanhood, sensuality, or cyclical surrender; anger at being a woman.',
    emotionalRoot: 'Giving power over to others; unconscious belief that being feminine is a curse, vulnerable, or painful.',
    mentalPattern: 'Resisting the natural cycle of shedding and regeneration; forcing constant masculine productivity through menstrual phases.',
    healingAffirmation: 'I accept my full power as a woman and accept all my body processes as normal and wonderful. I love and honor my body.',
    newThoughtPattern: 'I honor my cycles. I allow myself to rest, shed, and rejuvenate without guilt.',
    relatedConcepts: [
      'Suppressed Emotions & Bottled Feelings',
      'Bladder Infection (UTI) & Cystitis',
      'Shame & Unworthiness',
      'Hip Pain & Stiffness'
    ],
    reflectionQuestions: [
      'Am I punishing myself for resting when my body requests slowdown?',
      'What beliefs did I inherit about womanhood or emotional vulnerability?'
    ],
    somaticTip: 'Place a warm castor oil pack or hot water bottle over the lower womb area while listening to binaural beats at 432 Hz.'
  },
  {
    id: 'uti_bladder_issues',
    name: 'Bladder Infection (UTI) & Cystitis',
    aliases: ['uti', 'urinary tract infection', 'cystitis', 'bladder pain', 'burning urination', 'frequent urination'],
    bodyZone: 'pelvis',
    organ: 'Bladder, urethra, urinary epithelium',
    chakra: 'sacral',
    element: 'Water',
    meridian: 'Bladder Meridian (TCM: reservoir of emotions)',
    coreMeaning: 'Anxiety, holding onto old ideas, being "pissed off," especially at a partner or someone in your territorial space.',
    emotionalRoot: 'Anger over boundary violations in your personal domain; feeling that someone has encroached upon your private territory.',
    mentalPattern: '"I am furious that my boundaries were crossed, and I am burning with anger at him/them."',
    healingAffirmation: 'I release the pattern in my consciousness that created this condition. I am willing to change. I love and approve of myself.',
    newThoughtPattern: 'I establish clear, firm boundaries peacefully. I release all burning irritations.',
    relatedConcepts: [
      'Anger & Resentment',
      'Kidney Pain & Kidney Stones',
      'Suppressed Emotions & Bottled Feelings',
      'Menstrual Cramps & PMS'
    ],
    leftSideNuance: 'Anger at emotional boundary breaches in domestic or family life.',
    rightSideNuance: 'Rage over workplace territory or financial violations.',
    reflectionQuestions: [
      'Who or what has invaded my space or crossed my boundaries that has left me "pissed off"?',
      'Where am I holding onto burning irritation instead of speaking a clear boundary?'
    ],
    somaticTip: 'Drink ample warm water with a dash of unsweetened cranberry; visualize soothing cool blue light washing through the pelvic bowl.'
  },
  {
    id: 'prostate_issues',
    name: 'Prostate Issues & Prostatitis',
    aliases: ['prostate', 'prostatitis', 'bph', 'enlarged prostate', 'prostate pain'],
    bodyZone: 'pelvis',
    organ: 'Prostate gland',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Kidney & Conception Vessel',
    coreMeaning: 'Mental fears weakening the masculine identity; giving up; sexual pressure and guilt; belief in aging and decline.',
    emotionalRoot: 'Feeling that one is losing virility, authority, or purpose; despair over sexual performance or societal relevance.',
    mentalPattern: '"I am no longer the man I used to be; my strength and importance are slipping away."',
    healingAffirmation: 'I accept and rejoice in my masculinity. I am forever young in spirit. My power comes from within.',
    newThoughtPattern: 'True masculine power is wisdom, presence, and heart-centered integrity, not youthful brute force.',
    relatedConcepts: [
      'Fear of the Future & Scarcity',
      'Shame & Unworthiness',
      'Lower Back Pain & Sciatica',
      'Kidney Pain & Kidney Stones'
    ],
    reflectionQuestions: [
      'Where do I feel that my manhood, authority, or creative power is under threat?',
      'Am I harboring shame or anxiety about sexual expectations?'
    ],
    somaticTip: 'Pelvic floor relaxation (reverse Kegel) coupled with slow belly breathing to release deep hypertonic tension in the perineum.'
  },
  {
    id: 'kidney_issues_stones',
    name: 'Kidney Pain & Kidney Stones',
    aliases: ['kidney pain', 'kidney stones', 'renal colic', 'flank pain', 'kidney inflammation', 'nephritis'],
    bodyZone: 'pelvis',
    organ: 'Kidneys, adrenal glands, ureters',
    chakra: 'sacral',
    element: 'Water',
    meridian: 'Kidney Meridian (TCM: Seat of Fear & Ancestral Will)',
    coreMeaning: 'Criticism, disappointment, failure, and shame. Kidney stones represent lumps of undissolved anger and calcified fear.',
    emotionalRoot: 'Deep-seated existential fear; reacting like a child who cannot do anything right; feeling perpetually criticized.',
    mentalPattern: '"No matter what I do, I will fail and be humiliated; I am full of fear."',
    healingAffirmation: 'Divine right action is always taking place in my life. Only good comes from each experience. It is safe for me to grow up.',
    newThoughtPattern: 'I dissolve all calcified fear with the warm waters of self-compassion.',
    relatedConcepts: [
      'Fear of the Future & Scarcity',
      'Anger & Resentment',
      'Bladder Infection (UTI) & Cystitis',
      'Chronic Fatigue & Adrenal Burnout',
      'Shame & Unworthiness'
    ],
    leftSideNuance: 'Deep fear of emotional abandonment by a mother figure or romantic partner.',
    rightSideNuance: 'Fear of failing in career, judgment by a father figure or societal authority.',
    reflectionQuestions: [
      'What deep fear is currently paralyzing my decision-making?',
      'Where have I calcified old disappointments into rigid bitterness?'
    ],
    somaticTip: 'Rub your lower back over the kidneys with warm fists until the area glows with warmth, then rest comfortably.'
  },

  // --- LIMBS, JOINTS & MUSCLES ---
  {
    id: 'shoulder_frozen_tension',
    name: 'Shoulder Tension & Frozen Shoulder',
    aliases: ['shoulder pain', 'frozen shoulder', 'rotator cuff', 'tight shoulders', 'shoulder bursitis', 'heavy shoulders'],
    bodyZone: 'arms_hands',
    organ: 'Shoulder joint, deltoids, rotator cuff',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Small Intestine, Large Intestine & San Jiao Meridians',
    coreMeaning: 'Carrying the weight of the world; believing life is a burdensome cross to bear; shouldering responsibilities that belong to others.',
    emotionalRoot: 'Taking on everyone else\'s problems; inability to let others suffer their own consequences; martyring oneself.',
    mentalPattern: '"If I do not carry this load, everything will fall apart."',
    healingAffirmation: 'I choose to allow all my experiences to be joyous and loving. I lay down all burdens that do not belong to me.',
    newThoughtPattern: 'I am only responsible for my own energy. I allow others the dignity of carrying their own path.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Upper Back Pain (Between Shoulder Blades)',
      'Neck Stiffness & Cervical Pain',
      'Carpal Tunnel & Wrist Pain',
      'Suppressed Emotions & Bottled Feelings'
    ],
    leftSideNuance: 'Carrying the emotional or domestic burdens of family and close relationships.',
    rightSideNuance: 'Carrying the financial, professional, or organizational weight of a workplace or business.',
    reflectionQuestions: [
      'Whose baggage am I carrying on my shoulders right now?',
      'What would happen if I put down the burden and simply said: "This is not my job"?'
    ],
    somaticTip: 'Slow shoulder rolls: shrug shoulders up to the ears on an inhale, roll them back and drop them down with a loud exhaling sigh.'
  },
  {
    id: 'carpal_tunnel_wrists',
    name: 'Carpal Tunnel & Wrist Pain',
    aliases: ['carpal tunnel', 'wrist pain', 'repetitive strain', 'wrist stiffness', 'hand numbness'],
    bodyZone: 'arms_hands',
    organ: 'Median nerve, carpal tunnel, wrist flexors',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Pericardium & Lung Meridians',
    coreMeaning: 'Anger and frustration over feeling helpless in how life is being handled; feeling restricted in one\'s creative agency.',
    emotionalRoot: 'Struggling against repetitive, uninspiring tasks; feeling trapped in a routine where your hands are tied.',
    mentalPattern: '"My hands are tied; I cannot shape my life the way I desire."',
    healingAffirmation: 'I handle all my experiences with wisdom, love, and ease. My hands are channels of creative joy.',
    newThoughtPattern: 'I possess the creative freedom to handle my reality with flexibility and grace.',
    relatedConcepts: [
      'Hand & Finger Pain / Arthritis',
      'Shoulder Tension & Frozen Shoulder',
      'Anger & Resentment',
      'Stress & Hyper-Vigilance'
    ],
    leftSideNuance: 'Feeling restricted in handling personal, artistic, or intimate matters.',
    rightSideNuance: 'Feeling trapped in work duties, contracts, or financial obligations.',
    reflectionQuestions: [
      'Where do I feel that my hands are metaphorically tied?',
      'What uninspiring grind is my body rebelling against?'
    ],
    somaticTip: 'Gently flex and extend wrists with slow circular rotations, shaking out the fingers as if flicking water off the fingertips.'
  },
  {
    id: 'hands_fingers_arthritis',
    name: 'Hand & Finger Pain / Arthritis',
    aliases: ['hand pain', 'finger pain', 'hand arthritis', 'stiff fingers', 'clenched hands', 'joint pain hands'],
    bodyZone: 'arms_hands',
    organ: 'Phalanges, metacarpals, hand joints',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Heart, Lung & Large Intestine Meridians',
    coreMeaning: 'Holding and handling; gripping too tightly; fear of letting go of control; feeling unloved and criticized (arthritis = feeling deeply criticized).',
    emotionalRoot: 'Desire to micromanage every detail; resentment at having to do everything with your hands; feeling that love was withheld.',
    mentalPattern: '"I have to hold onto everything with an iron fist, otherwise it slips away."',
    healingAffirmation: 'I handle all ideas with love and joy. I release my grip with trust. Life holds me in gentle hands.',
    newThoughtPattern: 'I open my hands to receive and let go. I do not need to cling tightly.',
    relatedConcepts: [
      'Carpal Tunnel & Wrist Pain',
      'Shoulder Tension & Frozen Shoulder',
      'Anger & Resentment',
      'Shame & Unworthiness'
    ],
    reflectionQuestions: [
      'What am I grasping onto with white knuckles?',
      'Where am I suffering from chronic self-criticism or feeling scrutinized by others?'
    ],
    somaticTip: 'Open your palms wide facing upward on your lap. Whisper: "I surrender the need to grip. I open to receive."'
  },
  {
    id: 'hip_pain',
    name: 'Hip Pain & Stiffness',
    aliases: ['hip pain', 'hip stiffness', 'hip bursitis', 'labral tear', 'sacroiliac joint', 'tight hips'],
    bodyZone: 'pelvis',
    organ: 'Hip joint, acetabulum, gluteal complex',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Gallbladder & Bladder Meridians',
    coreMeaning: 'Fear of going forward in major decisions; feeling there is nothing to move forward to; carrying ancestral trauma in the pelvic cradle.',
    emotionalRoot: 'Dread of a major life transition (relocation, career pivot, divorce, retirement); paralyzed at the crossroads.',
    mentalPattern: '"If I take a step forward, disaster will follow; it is safer to stay stuck."',
    healingAffirmation: 'I move forward in life with joy and ease. At every age, I step forward into greater wisdom and peace.',
    newThoughtPattern: 'Every step I take is guided by divine intelligence. I step into my future with confidence.',
    relatedConcepts: [
      'Knee Pain & Inflexibility',
      'Lower Back Pain & Sciatica',
      'Fear of the Future & Scarcity',
      'Plantar Fasciitis & Foot Pain'
    ],
    leftSideNuance: 'Fear of moving forward emotionally or leaving a maternal pattern behind.',
    rightSideNuance: 'Fear of advancing in career, moving to a new home, or making a big financial commitment.',
    reflectionQuestions: [
      'What major life transition am I avoiding or terrified of stepping into?',
      'What old family pattern is trapped in my hips, resisting progress?'
    ],
    somaticTip: 'Gentle figure-4 stretch or Butterfly pose (Baddha Konasana), breathing slow warm breaths into the hip sockets.'
  },
  {
    id: 'knee_pain',
    name: 'Knee Pain & Inflexibility',
    aliases: ['knee pain', 'knee stiffness', 'meniscus', 'patellar pain', 'swollen knee', 'inflexible knees'],
    bodyZone: 'legs_feet',
    organ: 'Knee joint, ligaments, cartilage, synovial capsule',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Stomach, Spleen, Liver & Kidney Meridians',
    coreMeaning: 'Stubborn pride and ego; inability to bend; fear of kneeling or yielding; inflexibility when asked to surrender.',
    emotionalRoot: 'Refusal to compromise; feeling that yielding to another person is defeat; pride blocking reconciliation.',
    mentalPattern: '"I will never bend my knee to you; I would rather break than submit."',
    healingAffirmation: 'Forgiveness, tolerance, and compassion. I bend and flow with ease, and all is well.',
    newThoughtPattern: 'Flexibility is true strength. To bend with the wind is to remain unbroken.',
    relatedConcepts: [
      'Hip Pain & Stiffness',
      'Plantar Fasciitis & Foot Pain',
      'Neck Stiffness & Cervical Pain',
      'Anger & Resentment'
    ],
    leftSideNuance: 'Pride and stubbornness in close family dynamics, mother or partner relations.',
    rightSideNuance: 'Refusal to yield to employers, commercial laws, or father figure authority.',
    reflectionQuestions: [
      'Where is my stubborn ego refusing to compromise or apologize?',
      'Who am I unwilling to forgive or yield ground to?'
    ],
    somaticTip: 'Kneel gently onto cushions (if comfortable) in child\'s pose, mentally bowing your head in humble surrender to the universe.'
  },
  {
    id: 'plantar_fasciitis_foot',
    name: 'Plantar Fasciitis & Foot Pain',
    aliases: ['plantar fasciitis', 'foot pain', 'heel pain', 'heel spur', 'arch pain', 'pain walking'],
    bodyZone: 'legs_feet',
    organ: 'Plantar fascia, calcaneus heel, arch of foot',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Kidney Meridian (TCM: Yongquan K1 - Bubbling Spring is on sole)',
    coreMeaning: 'Fear of the future and not stepping forward in life; despair about standing on your own two feet; ungrounded existence.',
    emotionalRoot: 'Dread of where your life path is leading; feeling like every step you take is painful and unappreciated.',
    mentalPattern: '"I hate the direction my life is heading; I do not want to walk this path anymore."',
    healingAffirmation: 'I stand in truth. I move forward with joy. I have divine understanding of my path and direction.',
    newThoughtPattern: 'I walk with purpose and joy. The ground beneath me welcomes every step.',
    relatedConcepts: [
      'Fear of the Future & Scarcity',
      'Lower Back Pain & Sciatica',
      'Knee Pain & Inflexibility',
      'Hip Pain & Stiffness',
      'Chronic Fatigue & Adrenal Burnout'
    ],
    leftSideNuance: 'Hesitation to walk away from emotionally draining relationships.',
    rightSideNuance: 'Dread of going to a specific job, office, or professional commitment.',
    reflectionQuestions: [
      'Where in my life do I dread walking each morning?',
      'Am I feeling unsupported in standing on my own two feet?'
    ],
    somaticTip: 'Roll a tennis ball or frozen water bottle under the sole of each foot for 2 minutes while grounding your attention into the earth.'
  },

  // --- SKIN & BOUNDARIES ---
  {
    id: 'eczema_dermatitis',
    name: 'Eczema & Atopic Dermatitis',
    aliases: ['eczema', 'dermatitis', 'dry skin', 'itchy skin', 'skin rash', 'flaky skin', 'weeping skin'],
    bodyZone: 'skin',
    organ: 'Skin epidermis, boundary immunity',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Lung & Large Intestine Meridians (TCM: Lung rules the skin)',
    coreMeaning: 'Breath-taking antagonism; mental eruptions of repressed anger; separation trauma; porous emotional boundaries.',
    emotionalRoot: 'Feeling separated from love; feeling that external things threaten your safety; repressed eruptions of emotional irritation.',
    mentalPattern: '"My boundaries are too thin; people get under my skin and irritate me."',
    healingAffirmation: 'Harmony and peace, love and joy surround and indwell me. I am safe and secure to be me.',
    newThoughtPattern: 'My boundaries are strong yet loving. Nothing can penetrate my peace without my consent.',
    relatedConcepts: [
      'Suppressed Emotions & Bottled Feelings',
      'Asthma, Bronchitis & Shortness of Breath',
      'Psoriasis',
      'Anger & Resentment',
      'Allergies & Hay Fever'
    ],
    leftSideNuance: 'Irritation regarding emotional separation from maternal figures or loved ones.',
    rightSideNuance: 'Aggravation over work environment or public boundary violations.',
    reflectionQuestions: [
      'Who or what has been "getting under my skin"?',
      'Where do I need to establish firmer boundaries to protect my sensitivity?'
    ],
    somaticTip: 'Apply soothing organic coconut or jojoba oil, whispering: "My skin is a sacred shield of peace. I am safe in my own flesh."'
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    aliases: ['psoriasis', 'silvery plaques', 'scaly skin', 'thickened skin', 'plaque psoriasis'],
    bodyZone: 'skin',
    organ: 'Skin, accelerated keratinocyte turnover',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Liver & Lung Meridians',
    coreMeaning: 'Fear of being hurt; deadening the senses of the self; refusal to accept responsibility for one’s own feelings; creating an armor plate against the world.',
    emotionalRoot: 'Deep-seated wound of betrayal; building a literal suit of armor (keratin plaques) so nobody can touch the wounded child inside.',
    mentalPattern: '"I must armor myself so nobody can ever pierce my emotional core again."',
    healingAffirmation: 'I am alive to the joys of life. I deserve and accept the very best in life. I love and approve of myself.',
    newThoughtPattern: 'I soften my armor. Love is safe, and I am worthy of tender touch.',
    relatedConcepts: [
      'Weight Retention & Protective Armor',
      'Eczema & Atopic Dermatitis',
      'Shame & Unworthiness',
      'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)'
    ],
    reflectionQuestions: [
      'What ancient hurt am I building an emotional wall of armor to protect?',
      'Who am I afraid will hurt me if I drop my guard?'
    ],
    somaticTip: 'Place a warm soft cloth against the affected area with gentle, non-judgmental acceptance instead of frustration.'
  },
  {
    id: 'acne',
    name: 'Acne & Skin Breakouts',
    aliases: ['acne', 'pimples', 'breakouts', 'cystic acne', 'blemishes', 'blackheads'],
    bodyZone: 'skin',
    organ: 'Sebaceous glands, facial & back skin',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Stomach & Gallbladder Meridians',
    coreMeaning: 'Not accepting the self; dislike of the self; eruption of subconscious shame; fear of being seen and judged as flawed.',
    emotionalRoot: 'Subconsciously erupting blemishes to keep others at a safe distance; intense self-rejection.',
    mentalPattern: '"I am ugly, unlovable, or dirty; I do not want anyone to look too closely at me."',
    healingAffirmation: 'I am a divine expression of life. I love and accept myself at this moment where I am.',
    newThoughtPattern: 'I radiate inner beauty. It is safe for me to be seen and celebrated.',
    relatedConcepts: [
      'Shame & Unworthiness',
      'Suppressed Emotions & Bottled Feelings',
      'Anger & Resentment',
      'Eczema & Atopic Dermatitis'
    ],
    reflectionQuestions: [
      'Where am I secretly ashamed of who I am?',
      'Am I using skin issues as a subconscious shield to prevent intimacy?'
    ],
    somaticTip: 'Look into the mirror into your own eyes (not the blemishes) for 60 seconds and say aloud: "I see your soul, and you are beautiful."'
  },

  // --- IMMUNE, AUTOIMMUNE & SYSTEMIC ---
  {
    id: 'chronic_fatigue_burnout',
    name: 'Chronic Fatigue & Adrenal Burnout',
    aliases: ['chronic fatigue', 'burnout', 'exhaustion', 'adrenal fatigue', 'low energy', 'lethargy', 'drained'],
    bodyZone: 'immune_system',
    organ: 'Adrenal glands, endocrine axis, mitochondria',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Kidney Meridian (Adrenals rest on kidneys)',
    coreMeaning: 'Resistance, boredom, and lack of love for what one does. Running on the treadmill of perfection until your battery is completely drained.',
    emotionalRoot: 'Believing your value is solely tied to how much you produce; severe inner slave-driver; ignoring your soul\'s cry for joy.',
    mentalPattern: '"If I stop producing, I am worthless; I have to keep running until I collapse."',
    healingAffirmation: 'I am enthusiastic about life and filled with energy and enthusiasm. I give myself permission to rest deeply.',
    newThoughtPattern: 'Rest is holy. My worth is intrinsic, not measured by exhaustion.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Fibromyalgia & Generalized Body Pain',
      'Insomnia & Sleep Disturbance',
      'Brain Fog & Mental Exhaustion',
      'Shame & Unworthiness'
    ],
    reflectionQuestions: [
      'What joyless duty am I forcing myself to perform every single day?',
      'What would happen if I rested without justifying it?'
    ],
    somaticTip: 'Legs-up-the-wall pose (Viparita Karani) for 10 minutes in a darkened room, allowing adrenal recovery.'
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia & Generalized Body Pain',
    aliases: ['fibromyalgia', 'widespread body pain', 'tender points', 'muscle aches everywhere', 'chronic pain syndrome'],
    bodyZone: 'immune_system',
    organ: 'Central nervous system pain pathways, fascial matrix',
    chakra: 'sacral',
    element: 'Water',
    meridian: 'San Jiao & Bladder Meridians',
    coreMeaning: 'Severe internalized self-blame; double-bind conflicts; feeling trapped between duty and desire; holding painful memory in the entire fascial web.',
    emotionalRoot: 'Sacrificing oneself for family while feeling perpetual resentment; trapped in situations where every choice feels wrong.',
    mentalPattern: '"Every fiber of my being hurts because I cannot satisfy everyone\'s demands and my own soul."',
    healingAffirmation: 'I release all need to sacrifice myself. I love and comfort myself. I am free to live my joy.',
    newThoughtPattern: 'My body is a temple of comfort. I release the pain of the past from my cells.',
    relatedConcepts: [
      'Chronic Fatigue & Adrenal Burnout',
      'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)',
      'Suppressed Emotions & Bottled Feelings',
      'Shame & Unworthiness',
      'Insomnia & Sleep Disturbance'
    ],
    reflectionQuestions: [
      'Where am I caught in an impossible double-bind where I feel damned if I do and damned if I don’t?',
      'Who am I sacrificing my physical health for?'
    ],
    somaticTip: 'Warm Epsom salt bath with lavender oil; gently stroking arms and legs with kindness and affirming safety.'
  },
  {
    id: 'autoimmune_conditions',
    name: 'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)',
    aliases: ['autoimmune', 'lupus', 'rheumatoid arthritis', 'self attack', 'immune confusion', 'immune inflammation'],
    bodyZone: 'immune_system',
    organ: 'Immune system, white blood cells, self-antigens',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Immune axis / San Jiao Meridian',
    coreMeaning: 'The self attacking the self. Deep unconscious belief that you are fundamentally flawed, sinful, or unworthy of existing peacefully.',
    emotionalRoot: 'Severe self-hatred or guilt; internalized violence of words; turning frustration inwards against one\'s own tissues rather than expressing it.',
    mentalPattern: '"I am bad, wrong, or guilty; I must punish myself before anyone else does."',
    healingAffirmation: 'I am at peace with myself. I forgive myself completely. My body protects me with wisdom and love.',
    newThoughtPattern: 'I sign a peace treaty with my body. My immune system is my guardian, not my enemy.',
    relatedConcepts: [
      'Shame & Unworthiness',
      'Suppressed Emotions & Bottled Feelings',
      'Thyroid Imbalance (Hypo / Hyper)',
      'Fibromyalgia & Generalized Body Pain',
      'Psoriasis'
    ],
    reflectionQuestions: [
      'Where am I attacking myself with harsh thoughts, self-reproach, or unyielding guilt?',
      'What would it take to declare total peace with who I am right now?'
    ],
    somaticTip: 'Place both hands over your thymus (upper chest above heart). Tap lightly 20 times while repeating: "I love you. You are safe. You are home."'
  },
  {
    id: 'insomnia_sleep_disorders',
    name: 'Insomnia & Sleep Disturbance',
    aliases: ['insomnia', 'cannot sleep', 'waking at 3am', 'sleep disturbance', 'restless sleep', 'night terrors'],
    bodyZone: 'head',
    organ: 'Pineal gland, circadian rhythm, reticular activating system',
    chakra: 'crown',
    element: 'Consciousness',
    meridian: 'Liver Meridian (1-3 AM awakening) / Lung Meridian (3-5 AM awakening)',
    coreMeaning: 'Fear, guilt, and distrust of the process of life. Inability to surrender control into the dark unknown of sleep.',
    emotionalRoot: 'Waking between 1 AM - 3 AM points to Liver Meridian: unresolved anger and resentment. Waking between 3 AM - 5 AM points to Lung Meridian: deep sorrow, grief, or spiritual calling.',
    mentalPattern: '"If I let go of vigilance and sleep, something terrible will happen or I will be caught off guard."',
    healingAffirmation: 'I lovingly release the day and slip into peaceful sleep, knowing tomorrow will take care of itself. I am protected.',
    newThoughtPattern: 'The night is a sanctuary. I surrender into the arms of the cosmos.',
    relatedConcepts: [
      'Stress & Hyper-Vigilance',
      'Fear of the Future & Scarcity',
      'Brain Fog & Mental Exhaustion',
      'Anger & Resentment',
      'Grief & Heartache'
    ],
    reflectionQuestions: [
      'What am I terrified would happen if I truly let go of control?',
      'If I wake up at a specific hour every night, what emotion (anger at 2am, grief at 4am) is calling for resolution?'
    ],
    somaticTip: '4-7-8 breathing: Inhale through nose for 4 counts, hold gently for 7 counts, exhale through mouth with whoosh sound for 8 counts. Repeat 4 cycles.'
  },
  {
    id: 'allergies_hayfever',
    name: 'Allergies & Hay Fever',
    aliases: ['allergies', 'hay fever', 'allergic rhinitis', 'seasonal allergy', 'sneezing', 'histamine reaction'],
    bodyZone: 'immune_system',
    organ: 'Mast cells, histamine pathways, nasal mucosa',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Lung & Spleen Meridians',
    coreMeaning: 'Who are you allergic to? Denying your own power; false alarm responses where the subconscious perceives the outer world as hostile.',
    emotionalRoot: 'Irritation at someone in your immediate circle; hyper-defensiveness; feeling that the environment is out to get you.',
    mentalPattern: '"The world is irritating and hostile; I must put up barricades against harmless things."',
    healingAffirmation: 'The world is safe and friendly. I am safe. I am at peace with life.',
    newThoughtPattern: 'I am safe in my environment. I live in harmony with nature and all elements.',
    relatedConcepts: [
      'Eczema & Atopic Dermatitis',
      'Asthma, Bronchitis & Shortness of Breath',
      'Stress & Hyper-Vigilance',
      'Anger & Resentment'
    ],
    reflectionQuestions: [
      'Who or what in my immediate daily life am I truly "allergic" to?',
      'Where am I overreacting to harmless triggers out of old hyper-vigilance?'
    ],
    somaticTip: 'Dip tongue to roof of mouth, breathe slowly through the nose, and visualize your cells relaxing their defensive posture.'
  },

  // --- CORE METAPHYSICAL EMOTIONAL CONCEPTS ---
  {
    id: 'stress_hyper_vigilance',
    name: 'Stress & Hyper-Vigilance',
    aliases: ['stress', 'hyper-vigilance', 'nervous tension', 'chronic stress', 'adrenal alarm', 'fight or flight', 'high cortisol'],
    bodyZone: 'emotional_state',
    organ: 'Nervous system, sympathetic branch & adrenal glands',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'San Jiao & Kidney Meridians',
    coreMeaning: 'Distrusting life’s rhythm; believing you must anticipate every threat; bracing the nervous system against imaginary impact.',
    emotionalRoot: 'Fear of sudden loss, judgment, or disaster. Believing you are the only guardian standing between order and catastrophe.',
    mentalPattern: '"If I lower my guard for a single second, everything will collapse."',
    healingAffirmation: 'I release all need to defend and control. I rest in the peace of the present moment. I am safe.',
    newThoughtPattern: 'I allow my nervous system to recalibrate. Peace is my natural baseline.',
    relatedConcepts: [
      'Headache & Migraine',
      'Insomnia & Sleep Disturbance',
      'Shoulder Tension & Frozen Shoulder',
      'High Blood Pressure (Hypertension)',
      'Chronic Fatigue & Adrenal Burnout',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What threat from the past am I still guarding against today?',
      'What would happen if I fully relaxed my muscles right now?'
    ],
    somaticTip: 'Voo Sound: Inhale deeply, and on the exhale make a deep vibrating "VOOOO" sound from the pelvis to settle the vagal brake.'
  },
  {
    id: 'suppressed_emotions',
    name: 'Suppressed Emotions & Bottled Feelings',
    aliases: ['suppressed emotions', 'bottled feelings', 'repressed grief', 'swallowed anger', 'emotional numbing', 'stifled feelings'],
    bodyZone: 'emotional_state',
    organ: 'Connective fascia, diaphragm & autonomic plexus',
    chakra: 'throat',
    element: 'Water',
    meridian: 'Conception Vessel & Liver Meridian',
    coreMeaning: 'Locking unexpressed tears, rage, and truth within the cellular structure rather than letting them flow and disperse.',
    emotionalRoot: 'Childhood conditioning where crying or anger was penalized as weakness, rebellion, or danger.',
    mentalPattern: '"It is not safe or polite to feel; I must swallow everything and smile."',
    healingAffirmation: 'My feelings are sacred messengers. It is safe for me to feel deeply, weep freely, and speak my truth.',
    newThoughtPattern: 'Emotions are energy in motion. I allow the river to flow clean.',
    relatedConcepts: [
      'Headache & Migraine',
      'Sore Throat & Laryngitis',
      'Acid Reflux, Heartburn & GERD',
      'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)',
      'Fibromyalgia & Generalized Body Pain',
      'Teeth, Gums & TMJ / Jaw Clenching'
    ],
    reflectionQuestions: [
      'What emotion am I most afraid would overwhelm me if I let it surface?',
      'Who taught me that my tears or righteous anger were unacceptable?'
    ],
    somaticTip: 'Somatic shaking: Stand up and shake your wrists, arms, and whole torso vigorously for 90 seconds while breathing out through an open mouth.'
  },
  {
    id: 'lack_of_clear_vision',
    name: 'Lack of Clear Vision & Fear of Truth',
    aliases: ['lack of clear vision', 'fear of truth', 'spiritual blindness', 'avoiding reality', 'clouded judgment', 'denial'],
    bodyZone: 'emotional_state',
    organ: 'Pineal gland, optic chiasm & cognitive filtering',
    chakra: 'third_eye',
    element: 'Light',
    meridian: 'Gallbladder & Liver Meridians',
    coreMeaning: 'Willful blindness to facts, relationships, or intuitive warnings; fearing that seeing clearly will force an unbearable choice.',
    emotionalRoot: 'Choosing comfort in illusions over the disruption of truth. Subconscious dread of knowing what you already know.',
    mentalPattern: '"If I see things as they really are, I will have to change my entire life."',
    healingAffirmation: 'I am willing to see the truth in all circumstances. The truth sets me free, and I am held in wisdom.',
    newThoughtPattern: 'I open my eyes to reality without terror. Truth brings clarity and liberation.',
    relatedConcepts: [
      'Headache & Migraine',
      'Eye Issues & Vision Problems',
      'Dizziness & Vertigo',
      'Brain Fog & Mental Exhaustion',
      'Liver & Gallbladder Issues'
    ],
    reflectionQuestions: [
      'What reality am I pretending not to notice because it would be too disruptive to acknowledge?',
      'What is my gut seeing that my rational mind wants to ignore?'
    ],
    somaticTip: 'Trataka (Candle Gazing): Look at a steady flame or soft focal point for 2 minutes without blinking, then close eyes and observe the inner light.'
  },
  {
    id: 'grief_heartache',
    name: 'Grief & Heartache',
    aliases: ['grief', 'heartache', 'broken heart', 'sorrow', 'mourning', 'bereavement', 'deep sadness', 'emotional loss'],
    bodyZone: 'emotional_state',
    organ: 'Lungs, thymus gland & heart muscle',
    chakra: 'heart',
    element: 'Air',
    meridian: 'Lung & Heart Meridians',
    coreMeaning: 'The heavy contraction of love that has lost its physical object; unexpressed tears solidifying in the chest and bronchi.',
    emotionalRoot: 'Loss of a loved one, a dream, innocence, or partnership; feeling that life will never carry warmth or color again.',
    mentalPattern: '"A piece of me died with that loss; joy will never feel safe again."',
    healingAffirmation: 'I honor my grief as the measure of my great capacity to love. My heart expands through tenderness and returns to life.',
    newThoughtPattern: 'I weep my holy tears. Love is never lost; it transforms and heals my soul.',
    relatedConcepts: [
      'Asthma, Bronchitis & Shortness of Breath',
      'Heart Palpitations & Arrhythmia',
      'Upper Back Pain (Between Shoulder Blades)',
      'Persistent Cough & Chest Congestion',
      'Insomnia & Sleep Disturbance'
    ],
    reflectionQuestions: [
      'Whom or what have I not fully allowed myself to mourn?',
      'Am I holding onto sorrow as a way of remaining connected to what was lost?'
    ],
    somaticTip: 'Place a warm heavy object (like a heated stone or weighted eye pillow) over your sternum while lying flat, breathing long sighs.'
  },
  {
    id: 'anger_resentment',
    name: 'Anger & Resentment',
    aliases: ['anger', 'resentment', 'fury', 'bitterness', 'grudge', 'rage', 'indignation', 'smoldering wrath'],
    bodyZone: 'emotional_state',
    organ: 'Liver, gallbladder, jaw & arterial walls',
    chakra: 'solar_plexus',
    element: 'Fire',
    meridian: 'Liver & Gallbladder Meridians',
    coreMeaning: 'Burning energy from thwarted will, violated boundaries, or perceived injustice that has calcified into chronic ill will.',
    emotionalRoot: 'Feeling powerless to rectify an unfair situation; drinking poison and waiting for the other person to suffer.',
    mentalPattern: '"They wronged me, and I will never let them off the hook, even if it burns me up."',
    healingAffirmation: 'I release resentment. Forgiveness does not excuse them; it frees me. I claim my peace now.',
    newThoughtPattern: 'I channel fiery energy into creative transformation and healthy boundary setting.',
    relatedConcepts: [
      'Liver & Gallbladder Issues',
      'High Blood Pressure (Hypertension)',
      'Acid Reflux, Heartburn & GERD',
      'Teeth, Gums & TMJ / Jaw Clenching',
      'Bladder Infection (UTI) & Cystitis',
      'Headache & Migraine'
    ],
    reflectionQuestions: [
      'Who is occupying rent-free space in my mind through my resentment?',
      'What healthy boundary did I fail to set when this injustice occurred?'
    ],
    somaticTip: 'Twist a dry towel with both hands with all your strength while exhaling forcefully, expelling the heat from the bile ducts.'
  },
  {
    id: 'shame_unworthiness',
    name: 'Shame & Unworthiness',
    aliases: ['shame', 'unworthiness', 'feeling defective', 'imposter syndrome', 'self-disgust', 'not good enough'],
    bodyZone: 'emotional_state',
    organ: 'Skin, stomach lining & thymus',
    chakra: 'solar_plexus',
    element: 'Earth',
    meridian: 'Spleen & Stomach Meridians',
    coreMeaning: 'The belief that not only have you made mistakes, but that you are fundamentally broken or defective at your core.',
    emotionalRoot: 'Early childhood humiliation, conditional love, or scapegoating that led to a collapsed posture and self-punishment.',
    mentalPattern: '"If people truly knew what I was like inside, they would turn away in disgust."',
    healingAffirmation: 'I am innocent. I am worthy of love, dignity, and belonging exactly as I am. There is nothing wrong with me.',
    newThoughtPattern: 'I step out of hiding. I am a sacred spark of the universe, inherently worthy.',
    relatedConcepts: [
      'Gastritis & Stomach Ulcers',
      'Autoimmune Diseases (Lupus, RA, Hashimoto\'s)',
      'Acne & Skin Breakouts',
      'Psoriasis',
      'Fibromyalgia & Generalized Body Pain'
    ],
    reflectionQuestions: [
      'Whose voice was the first to tell me that I was "too much" or "not enough"?',
      'Can I hold that wounded child inside me with total warmth and forgiveness?'
    ],
    somaticTip: 'Cross arms over chest in a self-compassion hug (butterfly hug), tapping alternately left and right 30 times while breathing slowly.'
  },
  {
    id: 'fear_of_future_scarcity',
    name: 'Fear of the Future & Scarcity',
    aliases: ['fear of the future', 'scarcity mindset', 'financial anxiety', 'dread', 'anticipatory panic', 'fear of going broke'],
    bodyZone: 'emotional_state',
    organ: 'Kidneys, adrenals, lumbar spine, feet',
    chakra: 'root',
    element: 'Earth',
    meridian: 'Kidney & Bladder Meridians',
    coreMeaning: 'Terror that the universe cannot supply what is needed; catastrophic forecasting; living in projected doom.',
    emotionalRoot: 'Ancestral trauma of famine, poverty, or sudden displacement. Believing safety is impossible.',
    mentalPattern: '"There is never enough money, time, or safety; the worst case scenario is inevitable."',
    healingAffirmation: 'My supply is infinite and divinely guaranteed. The earth supports my steps. I trust tomorrow.',
    newThoughtPattern: 'I return to this single breath. In this breath, I have everything I need.',
    relatedConcepts: [
      'Lower Back Pain & Sciatica',
      'Kidney Pain & Kidney Stones',
      'Constipation',
      'Plantar Fasciitis & Foot Pain',
      'Hip Pain & Stiffness'
    ],
    reflectionQuestions: [
      'Am I borrowing catastrophe from a future that has not arrived?',
      'What evidence do I have that I have survived 100% of my worst days so far?'
    ],
    somaticTip: 'Stand barefoot with feet hip-width apart. Feel the magnetic downward draw of the earth’s gravitational field pulling worry down into the bedrock.'
  },
  {
    id: 'weight_retention_armor',
    name: 'Weight Retention & Protective Armor',
    aliases: ['weight retention', 'extra weight', 'protective weight', 'fluid retention', 'edema', 'insulation layer'],
    bodyZone: 'emotional_state',
    organ: 'Adipose tissue, lymphatic fluid, metabolism',
    chakra: 'root',
    element: 'Water',
    meridian: 'Spleen & Kidney Meridians',
    coreMeaning: 'Need for protection; buffering against emotional hurt, criticism, abuse, or unwanted sexual attention.',
    emotionalRoot: 'Subconsciously creating physical bulk as a shock absorber against harsh environments or emotional intrusion.',
    mentalPattern: '"I need padding between myself and the cold, cruel world so I cannot be bruised."',
    healingAffirmation: 'I am protected by divine love. I am always safe. It is safe for me to let go of old protection.',
    newThoughtPattern: 'My true protection is clear energetic boundaries, not physical layers. I am safe in my body.',
    relatedConcepts: [
      'Psoriasis',
      'Shame & Unworthiness',
      'Diabetes & Blood Sugar Imbalance',
      'Chronic Fatigue & Adrenal Burnout',
      'Suppressed Emotions & Bottled Feelings'
    ],
    reflectionQuestions: [
      'What vulnerability or threat made my body feel it needed a protective buffer?',
      'How can I establish energetic safety without relying on physical padding?'
    ],
    somaticTip: 'Lymphatic dry brushing or gentle circular strokes sweeping from extremities toward the heart, visualizing stagnant fluid leaving.'
  }
];
