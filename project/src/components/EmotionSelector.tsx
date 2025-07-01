import React from 'react';
import { EmotionType } from '../types/emotion';

interface EmotionSelectorProps {
  selectedEmotion: EmotionType | null;
  onEmotionSelect: (emotion: EmotionType) => void;
}

const emotions: { type: EmotionType; emoji: string; color: string }[] = [
  { type: 'happy', emoji: '😊', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
  { type: 'sad', emoji: '😢', color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
  { type: 'angry', emoji: '😠', color: 'bg-red-100 hover:bg-red-200 border-red-300' },
  { type: 'anxious', emoji: '😰', color: 'bg-purple-100 hover:bg-purple-200 border-purple-300' },
  { type: 'excited', emoji: '🤩', color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
  { type: 'frustrated', emoji: '😤', color: 'bg-pink-100 hover:bg-pink-200 border-pink-300' },
  { type: 'calm', emoji: '😌', color: 'bg-green-100 hover:bg-green-200 border-green-300' },
  { type: 'overwhelmed', emoji: '😵', color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  { type: 'lonely', emoji: '😔', color: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300' },
  { type: 'grateful', emoji: '🙏', color: 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300' },
  { type: 'confused', emoji: '🤔', color: 'bg-amber-100 hover:bg-amber-200 border-amber-300' },
  { type: 'hopeful', emoji: '🌟', color: 'bg-cyan-100 hover:bg-cyan-200 border-cyan-300' },
];

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onEmotionSelect,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Hi there! How are you feeling right now? 👋
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Take a moment to check in with yourself. What emotion feels most present for you today?
      </p>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {emotions.map((emotion) => (
          <button
            key={emotion.type}
            onClick={() => onEmotionSelect(emotion.type)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105
              ${emotion.color}
              ${selectedEmotion === emotion.type 
                ? 'ring-2 ring-primary-500 scale-105' 
                : ''
              }
            `}
          >
            <div className="text-3xl mb-2">{emotion.emoji}</div>
            <div className="text-sm font-medium capitalize text-gray-700">
              {emotion.type}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};