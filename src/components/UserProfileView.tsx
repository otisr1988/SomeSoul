import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  SavedSymptomEntry,
  subscribeToUserHistory,
  deleteSymptomEntry,
} from '../services/historyService.ts';
import { ChakraAnalytics } from './ChakraAnalytics.tsx';
import {
  User,
  LogIn,
  LogOut,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Download,
  Search,
  BookOpen,
  CloudCheck,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';

interface UserProfileViewProps {
  onNavigateToDecoder?: () => void;
  onSelectConceptFromDictionary?: (name: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onNavigateToDecoder,
  onSelectConceptFromDictionary,
}) => {
  const { user, signIn, signOut, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<SavedSymptomEntry[]>([]);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);
  const [copiedAffirmation, setCopiedAffirmation] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToUserHistory(user ? user.uid : null, (entries) => {
      setHistory(entries);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this symptom reading from your history?')) {
      await deleteSymptomEntry(id);
    }
  };

  const copyToClipboard = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedAffirmation(text);
    setTimeout(() => setCopiedAffirmation(null), 2500);
  };

  const filteredHistory = history.filter((entry) => {
    if (!searchHistoryQuery.trim()) return true;
    const q = searchHistoryQuery.toLowerCase();
    return (
      entry.symptomText.toLowerCase().includes(q) ||
      entry.primaryAilmentName.toLowerCase().includes(q) ||
      entry.metaphysicalMeaning.toLowerCase().includes(q) ||
      (entry.reflectionNotes && entry.reflectionNotes.toLowerCase().includes(q))
    );
  });

  const exportHistoryAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `somasoul_history_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Profile Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-20 h-20 rounded-full border-2 border-purple-500/50 shadow-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center border-2 border-purple-400/40 shadow-lg text-white font-bold text-2xl">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="w-9 h-9" />}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
                {user ? user.displayName || 'Soul Seeker' : 'Guest Seeker'}
              </h2>
              <p className="text-xs text-slate-400">
                {user ? user.email : 'Sign in to sync your symptom history across Android, Apple, Windows & Mac'}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-950 border border-slate-800 text-slate-300">
                  {user ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      Cloud Sync Active (Firestore)
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                      Local Device Storage
                    </>
                  )}
                </span>
                <span className="text-[11px] text-purple-300 bg-purple-950/60 border border-purple-900/60 px-2.5 py-1 rounded-md">
                  {history.length} Saved {history.length === 1 ? 'Reading' : 'Readings'}
                </span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="px-4 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => signIn()}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chakra Analytics & Distribution Over Time */}
      <ChakraAnalytics
        entries={history}
        onExploreChakra={onSelectConceptFromDictionary}
      />

      {/* History Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Symptom & Metaphysical History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review past symptom queries, metaphysical root causes, and your personal reflections.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={exportHistoryAsJson}
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export History (JSON)
            </button>
          )}
        </div>

        {/* History Search */}
        {history.length > 0 && (
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchHistoryQuery}
              onChange={(e) => setSearchHistoryQuery(e.target.value)}
              placeholder="Filter your history by symptom name, meaning, or reflection notes..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>
        )}

        {/* History Item List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((entry) => {
              const isExpanded = expandedEntryId === entry.id;
              const formattedDate = new Date(entry.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={entry.id}
                  className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-md transition-all hover:border-slate-700"
                >
                  <div
                    className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-100">
                          {entry.primaryAilmentName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                          {entry.bodySide === 'left' && 'Left Side (Yin)'}
                          {entry.bodySide === 'right' && 'Right Side (Yang)'}
                          {entry.bodySide === 'both' && 'Bilateral'}
                        </span>
                        <span className="text-[10px] text-slate-400">• {formattedDate}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">
                        <strong className="text-slate-400">Symptoms:</strong> {entry.symptomText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleDelete(entry.id, e)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="p-1 text-slate-400 hover:text-slate-200"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="pt-4 mt-3 border-t border-slate-800 space-y-4 text-xs animate-in fade-in duration-150">
                      <div>
                        <span className="font-bold text-purple-300 block mb-1">
                          Metaphysical Meaning:
                        </span>
                        <p className="text-slate-200 leading-relaxed">{entry.metaphysicalMeaning}</p>
                      </div>

                      {entry.emotionalRoot && (
                        <div>
                          <span className="font-bold text-amber-400 block mb-1">
                            Emotional Root Cause:
                          </span>
                          <p className="text-slate-300 leading-relaxed">{entry.emotionalRoot}</p>
                        </div>
                      )}

                      {/* Affirmation */}
                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-emerald-400 block mb-0.5">
                            Affirmation:
                          </span>
                          <p className="text-emerald-100 italic font-medium">
                            &ldquo;{entry.healingAffirmation}&rdquo;
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => copyToClipboard(entry.healingAffirmation, e)}
                          className="px-2.5 py-1 text-[11px] rounded bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shrink-0"
                        >
                          {copiedAffirmation === entry.healingAffirmation ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-300" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Personal Reflection Notes */}
                      {entry.reflectionNotes && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="font-bold text-indigo-300 block mb-1">
                            Your Personal Journal Reflection:
                          </span>
                          <p className="text-slate-300 whitespace-pre-wrap">{entry.reflectionNotes}</p>
                        </div>
                      )}

                      {/* Related concepts if present */}
                      {entry.relatedConcepts && entry.relatedConcepts.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-400 block mb-1">
                            Related Concepts:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.relatedConcepts.map((rc) => (
                              <button
                                key={rc}
                                type="button"
                                onClick={() => onSelectConceptFromDictionary && onSelectConceptFromDictionary(rc)}
                                className="px-2 py-0.5 rounded bg-purple-950/40 text-purple-200 border border-purple-800/40 hover:bg-purple-900/60"
                              >
                                {rc}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">No saved history yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Whenever you decode your symptoms in the Symptom Decoder, tap &quot;Save Reading to History&quot; to keep a somatic healing log.
            </p>
            {onNavigateToDecoder && (
              <button
                type="button"
                onClick={onNavigateToDecoder}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Go to Symptom Decoder
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
