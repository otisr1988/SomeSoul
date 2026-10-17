import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import type { DecodeResult, SideType } from '../types/index.ts';

export interface SavedSymptomEntry {
  id: string;
  userId: string;
  symptomText: string;
  primaryAilmentId: string;
  primaryAilmentName: string;
  dominantChakra: string;
  bodySide: SideType;
  metaphysicalMeaning: string;
  emotionalRoot: string;
  healingAffirmation: string;
  reflectionNotes?: string;
  relatedConcepts?: string[];
  createdAt: string;
}

const LOCAL_STORAGE_KEY = 'somasoul_local_history_v1';

export function getLocalEntries(): SavedSymptomEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse local history', e);
    return [];
  }
}

export function saveLocalEntry(entry: SavedSymptomEntry): void {
  try {
    const existing = getLocalEntries();
    const updated = [entry, ...existing.filter((e) => e.id !== entry.id)].slice(0, 100);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to local history', e);
  }
}

export function deleteLocalEntry(id: string): void {
  try {
    const existing = getLocalEntries();
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete from local history', e);
  }
}

export async function saveSymptomReading(
  decodeResult: DecodeResult,
  notes: string = ''
): Promise<SavedSymptomEntry> {
  const currentUserId = auth.currentUser?.uid || 'guest';
  const entryId = 'entry_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const nowIso = new Date().toISOString();

  const entry: SavedSymptomEntry = {
    id: entryId,
    userId: currentUserId,
    symptomText: decodeResult.query || 'Selected Symptoms',
    primaryAilmentId: decodeResult.primaryAilment?.id || 'unknown',
    primaryAilmentName: decodeResult.primaryAilment?.name || 'Metaphysical Insight',
    dominantChakra: decodeResult.dominantChakras[0] || 'third_eye',
    bodySide: decodeResult.sideAnalysis?.side || 'both',
    metaphysicalMeaning: decodeResult.primaryAilment?.coreMeaning || decodeResult.synthesisMessage,
    emotionalRoot: decodeResult.primaryAilment?.emotionalRoot || 'Emotional misalignment',
    healingAffirmation: decodeResult.primaryAilment?.healingAffirmation || 'I am safe and supported.',
    reflectionNotes: notes,
    relatedConcepts: decodeResult.primaryAilment?.relatedConcepts || [],
    createdAt: nowIso,
  };

  // Always save locally for instant offline availability
  saveLocalEntry(entry);

  // If signed in, sync to Firestore
  if (auth.currentUser) {
    const path = `users/${auth.currentUser.uid}/symptomEntries`;
    try {
      const entryRef = doc(db, path, entryId);
      await setDoc(entryRef, {
        ...entry,
        userId: auth.currentUser.uid,
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `${path}/${entryId}`);
    }
  }

  return entry;
}

export async function deleteSymptomEntry(entryId: string): Promise<void> {
  deleteLocalEntry(entryId);

  if (auth.currentUser) {
    const path = `users/${auth.currentUser.uid}/symptomEntries/${entryId}`;
    try {
      const entryRef = doc(db, 'users', auth.currentUser.uid, 'symptomEntries', entryId);
      await deleteDoc(entryRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }
}

export function subscribeToUserHistory(
  userId: string | null,
  callback: (entries: SavedSymptomEntry[]) => void
): () => void {
  if (!userId) {
    // Return local entries for guests
    callback(getLocalEntries());
    return () => {};
  }

  const path = `users/${userId}/symptomEntries`;
  try {
    const colRef = collection(db, 'users', userId, 'symptomEntries');
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const cloudEntries: SavedSymptomEntry[] = snapshot.docs.map((docSnap) => ({
          ...(docSnap.data() as SavedSymptomEntry),
          id: docSnap.id,
        }));
        // Merge cloud with local entries that might be unsynced
        const local = getLocalEntries();
        const mergedMap = new Map<string, SavedSymptomEntry>();
        cloudEntries.forEach((e) => mergedMap.set(e.id, e));
        local.forEach((e) => {
          if (!mergedMap.has(e.id)) mergedMap.set(e.id, e);
        });

        const merged = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        callback(merged);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return () => {};
  }
}
