import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { SymptomDecoderView } from './components/SymptomDecoderView.tsx';
import { DictionaryView } from './components/DictionaryView.tsx';
import { UserProfileView } from './components/UserProfileView.tsx';
import { DailyOracleModal } from './components/DailyOracleModal.tsx';
import { GeminiChatbot } from './components/GeminiChatbot.tsx';
import { Sparkles, Heart, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'decoder' | 'dictionary' | 'profile'>('decoder');
  const [dictionarySearchQuery, setDictionarySearchQuery] = useState('');
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigateToConcept = (conceptName: string) => {
    setDictionarySearchQuery(conceptName);
    setActiveTab('dictionary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
        {/* Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenOracle={() => setIsOracleOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-6xl w-full mx-auto">
          {activeTab === 'decoder' && (
            <SymptomDecoderView
              onSelectConceptFromDictionary={handleNavigateToConcept}
              onNavigateToHistory={() => setActiveTab('profile')}
            />
          )}

          {activeTab === 'dictionary' && (
            <DictionaryView
              initialSearchQuery={dictionarySearchQuery}
              onSelectAilmentForDecode={(name) => {
                setActiveTab('decoder');
              }}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfileView
              onNavigateToDecoder={() => setActiveTab('decoder')}
              onSelectConceptFromDictionary={handleNavigateToConcept}
            />
          )}
        </main>

        {/* Daily Oracle Modal */}
        <DailyOracleModal
          isOpen={isOracleOpen}
          onClose={() => setIsOracleOpen(false)}
        />

        {/* Gemini Multi-turn Psychosomatic Chatbot */}
        <GeminiChatbot
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        {/* Universal Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-8 mb-14 md:mb-0 text-center text-xs text-slate-500 space-y-3">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="font-semibold text-slate-300">SomaSoul Metaphysics</span>
              <span>— Cross-Platform Holistic Symptom Decoder</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" /> Android &amp; iOS
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Windows &amp; Mac
              </span>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-[11px] text-slate-400 leading-relaxed">
            Metaphysical interpretations explore the symbolic mind-body connection and psychosomatic correlates
            for personal self-reflection. This app does not constitute medical advice or clinical diagnosis.
          </p>
        </footer>
      </div>
    </AuthProvider>
  );
}
