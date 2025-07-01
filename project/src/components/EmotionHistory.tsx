import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { EmotionEntry } from '../types/emotion';

interface EmotionHistoryProps {
  entries: EmotionEntry[];
  onClearHistory: () => void;
}

export const EmotionHistory: React.FC<EmotionHistoryProps> = ({ entries, onClearHistory }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No emotion entries yet. Start by selecting how you feel!</p>
      </div>
    );
  }

  const getEmotionEmoji = (emotion: string) => {
    const emojiMap: Record<string, string> = {
      happy: '😊', sad: '😢', angry: '😠', anxious: '😰',
      excited: '🤩', frustrated: '😤', calm: '😌', overwhelmed: '😵',
      lonely: '😔', grateful: '🙏', confused: '🤔', hopeful: '🌟'
    };
    return emojiMap[emotion] || '😐';
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-800">Your Emotion Journey</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Clear History
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {entries.slice().reverse().map((entry) => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getEmotionEmoji(entry.emotion)}</span>
                <div>
                  <span className="font-medium capitalize text-gray-800">{entry.emotion}</span>
                  <span className="ml-2 text-sm text-gray-500">Intensity: {entry.intensity}/10</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {entry.timestamp.toLocaleTimeString()}
              </span>
            </div>
            {entry.description && (
              <p className="text-sm text-gray-600 mt-2">{entry.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};