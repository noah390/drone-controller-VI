import { useState, useEffect } from 'react';
import { EmotionEntry } from '../types/emotion';

const STORAGE_KEY = 'emotion-advisor-entries';

export const useEmotionStorage = () => {
  const [entries, setEntries] = useState<EmotionEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const entriesWithDates = parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setEntries(entriesWithDates);
      } catch (error) {
        console.error('Error parsing stored emotions:', error);
      }
    }
  }, []);

  const addEntry = (entry: Omit<EmotionEntry, 'id' | 'timestamp'>) => {
    const newEntry: EmotionEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    
    return newEntry;
  };

  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    entries,
    addEntry,
    clearEntries
  };
};