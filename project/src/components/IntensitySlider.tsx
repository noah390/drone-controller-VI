import React from 'react';

interface IntensitySliderProps {
  intensity: number;
  onIntensityChange: (intensity: number) => void;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
  intensity,
  onIntensityChange,
}) => {
  const getIntensityLabel = (value: number) => {
    if (value <= 2) return 'Very Mild';
    if (value <= 4) return 'Mild';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'Strong';
    return 'Very Strong';
  };

  const getIntensityColor = (value: number) => {
    if (value <= 2) return 'text-green-600';
    if (value <= 4) return 'text-yellow-600';
    if (value <= 6) return 'text-orange-600';
    if (value <= 8) return 'text-red-600';
    return 'text-red-800';
  };

  const getIntensityMessage = (value: number) => {
    if (value <= 3) return "That's a gentle feeling - let's explore it together.";
    if (value <= 6) return "I can sense this is noticeable for you.";
    if (value <= 8) return "This sounds like it's really affecting you.";
    return "This feels very intense - I'm here to help you through it.";
  };

  return (
    <div className="w-full animate-slide-up">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        How intense is this feeling for you?
      </h3>
      <p className="text-gray-600 text-center mb-4">
        {getIntensityMessage(intensity)}
      </p>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">1 - Very Mild</span>
            <span className={`text-lg font-semibold ${getIntensityColor(intensity)}`}>
              {intensity} - {getIntensityLabel(intensity)}
            </span>
            <span className="text-sm text-gray-500">10 - Very Strong</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => onIntensityChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #f59e0b ${intensity * 10}%, #e5e7eb ${intensity * 10}%, #e5e7eb 100%)`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
      </div>
    </div>
  );
};