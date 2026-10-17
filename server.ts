import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_SYSTEM_INSTRUCTION = `You are SomaOracle, an empathetic, intuitive, and spiritually grounded metaphysical guide and psychosomatic counselor.
Your role:
- Help users uncover the deeper metaphysical meaning, emotional root causes, and subconscious thought patterns behind their physical body symptoms and sensations.
- Draw upon psychosomatic body mapping, Traditional Chinese Medicine (TCM) meridians, and Eastern Chakra anatomy.
- Always analyze lateral polarity:
  * Left side (Yin, sacred feminine, receptive, mother, emotions, past)
  * Right side (Yang, sacred masculine, active output, father, career, finances, future)
- Offer tailored healing affirmations, gentle self-inquiry reflection questions, and grounding somatic release exercises (such as vagus nerve sighs, breathwork, or gentle movement).
- Maintain a compassionate, warm, non-judgmental tone.
- Important boundary: Always include a brief reminder that metaphysical exploration is for self-reflection and personal spiritual awareness, and does not replace professional clinical diagnosis or medical care.`;

// Multi-turn Gemini Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, modelName, systemInstruction } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    // Select model based on task: gemini-3.8-flash (default general), gemini-3.1-flash-lite (fast), gemini-4-argon (complex)
    let selectedModel = 'gemini-3.8-flash';
    if (modelName === 'gemini-3.1-flash-lite' || modelName === 'gemini-4-argon' || modelName === 'gemini-3.8-flash') {
      selectedModel = modelName;
    }

    if (!apiKey) {
      // Graceful fallback if API key is not yet set
      const lastMsg = messages[messages.length - 1]?.text || '';
      res.json({
        reply: `I hear your reflection on "${lastMsg}". Your body is a sacred vessel communicating emotional wisdom. In psychosomatic reflection, every physical symptom points to an unexpressed feeling or need for boundary restoration. Place a gentle hand over your heart, breathe into your belly, and affirm: "I listen to my body with unconditional compassion."`,
      });
      return;
    }

    // Format messages for @google/genai SDK
    // The contents parameter accepts an array of Content objects with role ('user' | 'model') and parts
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction: systemInstruction || DEFAULT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Your body is speaking; take a quiet moment to honor what it feels.';
    res.json({ reply, modelUsed: selectedModel });
  } catch (err: unknown) {
    console.error('Error in /api/chat:', err);
    const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
    res.status(500).json({ error: errorMessage });
  }
});

// Dynamic Personalized Affirmation Generator Endpoint
app.post('/api/affirmation', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, focusArea, chakra } = req.body;

    if (!apiKey) {
      // Fallback
      res.json({
        affirmation: 'I release all tension and trust the natural rhythm of life. My body is a temple of radiant peace.',
        theme: focusArea || 'Universal Peace',
      });
      return;
    }

    const prompt = `Generate a powerful, deeply grounding, and personalized 1-2 sentence healing affirmation for someone named "${userName || 'Soul Seeker'}" who is focusing on "${focusArea || 'General Well-being'}" and the "${chakra || 'Heart'}" energy center. Return ONLY the affirmation text in quotes, followed by a 1-sentence mindful intention.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        systemInstruction: 'You write transformative, poetic, psychosomatically restorative healing affirmations.',
        temperature: 0.8,
      },
    });

    res.json({
      affirmation: response.text?.replace(/^["']|["']$/g, '').trim(),
      focusArea,
    });
  } catch (err) {
    console.error('Error generating affirmation:', err);
    res.json({
      affirmation: 'I honor my body, release old burdens, and allow divine healing to flow through every cell.',
      focusArea: req.body?.focusArea || 'Universal',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite middlewares in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SomaSoul Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
