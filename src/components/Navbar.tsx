import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Sparkles, BookOpen, Stethoscope, User, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: 'decoder' | 'dictionary' | 'profile';
  setActiveTab: (tab: 'decoder' | 'dictionary' | 'profile') => void;
  onOpenOracle: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenOracle, onOpenChat }) => {
  const { user, signIn } = useAuth();

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('decoder')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-purple-100" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                SomaSoul
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/80">
                  Universal
                </span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
                Metaphysical Meaning & Symptom Decoder
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('decoder')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'decoder'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Symptom Decoder
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dictionary')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'dictionary'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Metaphysical Dictionary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'profile'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4" />
              Profile & History
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Gemini SomaOracle Button */}
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="px-3 py-1.5 text-xs font-medium rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-600/50 flex items-center gap-1.5 transition-all shadow-sm"
                title="Chat with SomaOracle Psychosomatic Guide"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span className="hidden sm:inline">Ask</span> AI
              </button>
            )}

            {/* Daily Oracle Button */}
            <button
              type="button"
              onClick={onOpenOracle}
              className="px-3 py-1.5 text-xs font-medium rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800/70 hover:to-indigo-800/70 text-purple-200 border border-purple-700/50 flex items-center gap-1.5 transition-all shadow-sm"
              title="Draw your daily body wisdom card"
            >
              <Compass className="w-3.5 h-3.5 text-purple-300" />
              <span className="hidden sm:inline">Daily</span> Oracle
            </button>

            {/* Profile Avatar / Login Button */}
            {user ? (
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="flex items-center gap-2 p-1 pl-2.5 pr-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-colors"
              >
                <span className="text-xs font-medium text-slate-200 max-w-[90px] truncate hidden sm:block">
                  {user.displayName?.split(' ')[0] || 'Account'}
                </span>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Profile'}
                    className="w-7 h-7 rounded-lg object-cover border border-purple-500/50"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center text-xs font-bold">
                    {user.displayName ? user.displayName[0] : 'U'}
                  </div>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => signIn()}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-purple-400" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Optimized for Android / iOS phones) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('decoder')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'decoder' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px]">Decoder</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dictionary')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'dictionary' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">Dictionary</span>
        </button>

        <button
          type="button"
          onClick={onOpenOracle}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-slate-400 hover:text-purple-300"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Oracle</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'profile' ? 'text-purple-400 font-bold' : 'text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </>
  );
};
