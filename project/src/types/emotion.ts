export interface EmotionEntry {
  id: string;
  emotion: string;
  intensity: number;
  description: string;
  timestamp: Date;
  advice?: string;
}

export interface EmotionAdvice {
  title: string;
  description: string;
  techniques: string[];
  affirmation: string;
}

export type EmotionType = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'anxious' 
  | 'excited' 
  | 'frustrated' 
  | 'calm' 
  | 'overwhelmed'
  | 'lonely'
  | 'grateful'
  | 'confused'
  | 'hopeful';