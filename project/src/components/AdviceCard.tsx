import React from 'react';
import { Heart, Lightbulb, Star } from 'lucide-react';
import { EmotionAdvice } from '../types/emotion';

interface AdviceCardProps {
  advice: EmotionAdvice;
  emotion: string;
  intensity: number;
}

export const AdviceCard: React.FC<AdviceCardProps> = ({ advice, emotion, intensity }) => {
  return (
    <div className="w-full animate-fade-in">
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-2xl shadow-lg border border-primary-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-full">
            <Heart className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{advice.title}</h3>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">{advice.description}</p>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-secondary-600" />
            <h4 className="font-semibold text-gray-800">Here's what I suggest:</h4>
          </div>
          <ul className="space-y-3">
            {advice.techniques.map((technique, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-secondary-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-gray-700">{technique}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white/70 p-4 rounded-xl border border-primary-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h4 className="font-semibold text-gray-800">A gentle reminder for you:</h4>
          </div>
          <p className="text-gray-800 font-medium italic">"{advice.affirmation}"</p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            I understand you're feeling <span className="font-semibold capitalize">{emotion}</span> at intensity {intensity}/10. 
            Remember, I'm here whenever you need support. 💙
          </p>
        </div>
      </div>
    </div>
  );
};