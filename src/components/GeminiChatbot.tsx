import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Bot,
  User,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Compass,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface GeminiChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialPrompt?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen = false,
  onClose,
  initialPrompt,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      role: 'model',
      text: 'Greetings. I am SomaOracle, your psychosomatic and metaphysical guide. Tell me what your physical body is experiencing—pain, stiffness, sensations, or tension—and we can gently explore the emotional roots, chakra flows, lateral polarity, and healing affirmations together. How is your body feeling right now?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelChoice, setModelChoice] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Send entire conversation history for true multi-turn context
      const formattedHistory = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedHistory,
          modelName: modelChoice,
          systemInstruction: `You are SomaOracle, an empathetic and spiritually grounded metaphysical guide and psychosomatic counselor.
Give concise, compassionate, and illuminating responses exploring:
1. The symbolic and emotional meaning of physical symptoms (drawing from Louise Hay, German New Medicine, TCM meridians, and Chakras).
2. Lateral Polarity (Left side = feminine/receptive/mother/feeling vs Right side = masculine/active/career/father).
3. A transformative new thought pattern / healing affirmation.
4. A simple somatic reset or breathing suggestion.
Tone: Warm, grounded, wise, and supportive. Always maintain self-awareness that this is for personal reflection and does not substitute clinical medical advice.`,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || data.error || 'Your body holds deep wisdom. Take a slow breath and listen within.';

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        role: 'model',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: 'error_' + Date.now(),
        role: 'model',
        text: 'I am taking a mindful pause. Take a deep grounding breath into your belly. What symptom would you like to explore next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Start a fresh conversation with SomaOracle?')) {
      setMessages([
        {
          id: 'welcome_reset',
          role: 'model',
          text: 'Conversation cleared. What is your body communicating with you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const quickPrompts = [
    'Why do I get headaches on the left side of my head?',
    'What is the emotional root cause of my lower back pain?',
    'I feel tightness in my throat and chest when speaking up.',
    'Give me a soothing somatic exercise for neck stiffness.',
  ];

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
        isMinimized ? 'w-auto' : 'w-[95vw] sm:w-[460px]'
      }`}
    >
      {/* Minimized Bubble */}
      {isMinimized ? (
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border border-purple-400/40"
        >
          <Sparkles className="w-5 h-5 text-purple-200" />
          <span className="text-xs font-bold pr-1">Ask SomaOracle</span>
        </button>
      ) : (
        /* Full Chat Interface Container */
        <div className="bg-slate-900/95 border border-purple-500/40 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col h-[580px] max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-purple-950/80 to-slate-950 border-b border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    SomaOracle
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                    Gemini AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Psychosomatic &amp; Metaphysical Counselor</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Model Selector Tooltip */}
              <select
                aria-label="Select Gemini Model"
                value={modelChoice}
                onChange={(e) => setModelChoice(e.target.value as any)}
                className="bg-slate-950 text-slate-300 text-[10px] font-medium border border-slate-800 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 cursor-pointer"
                title="Select Gemini Model for role complexity"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (General)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
                <option value="gemini-4-argon">gemini-4-argon (Complex)</option>
              </select>

              <button
                type="button"
                onClick={handleClearHistory}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
                title="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
                title="Minimize chat"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                      isUser
                        ? 'bg-purple-600 text-white'
                        : 'bg-indigo-950 border border-purple-500/40 text-purple-300'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed relative group ${
                      isUser
                        ? 'bg-purple-600 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-950/80 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-white/10 text-[9px] opacity-70">
                      <span>{m.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopy(m.id, m.text)}
                          className="hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-2.5 h-2.5 text-emerald-300" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg shrink-0 bg-indigo-950 border border-purple-500/40 text-purple-300 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-purple-300 ml-1">SomaOracle is reflecting...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-1.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider shrink-0">
              Inquire:
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-200 border border-slate-800 shrink-0 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputText);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about your symptom, emotion, or bodily message..."
                disabled={isLoading}
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all cursor-pointer shadow-md"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
