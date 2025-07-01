import { useState } from 'react';
import { Brain, RotateCcw, History } from 'lucide-react';
import { EmotionSelector } from './components/EmotionSelector';
import { IntensitySlider } from './components/IntensitySlider';
import { AdviceCard } from './components/AdviceCard';
import { EmotionHistory } from './components/EmotionHistory';
import { useEmotionStorage } from './hooks/useEmotionStorage';
import { getIntensityBasedAdvice } from './data/emotionAdvice';
import { EmotionType, EmotionAdvice } from './types/emotion';

function App() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [currentAdvice, setCurrentAdvice] = useState<EmotionAdvice | null>(null);
  const [description, setDescription] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const { entries, addEntry, clearEntries } = useEmotionStorage();

  const handleGetAdvice = () => {
    if (!selectedEmotion) return;

    const advice = getIntensityBasedAdvice(selectedEmotion, intensity);
    setCurrentAdvice(advice);

    // Save to history
    addEntry({
      emotion: selectedEmotion,
      intensity,
      description,
      advice: advice.title
    });
  };

  const handleReset = () => {
    setSelectedEmotion(null);
    setIntensity(5);
    setCurrentAdvice(null);
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 rounded-full animate-pulse-soft">
              <Brain className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              NOLAZ
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hi! I'm NOLAZ, your personal AI companion for emotional wellness. I'm here to listen, 
            understand, and provide personalized support based on exactly how you're feeling right now.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowHistory(false)}
            className={`px-6 py-2 rounded-full transition-all ${
              !showHistory 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Talk to NOLAZ
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
              showHistory 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <History className="w-4 h-4" />
            Your Journey ({entries.length})
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {showHistory ? (
            <EmotionHistory entries={entries} onClearHistory={clearEntries} />
          ) : (
            <>
              {/* Emotion Selection */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                <EmotionSelector
                  selectedEmotion={selectedEmotion}
                  onEmotionSelect={setSelectedEmotion}
                />
              </div>

              {/* Intensity Slider */}
              {selectedEmotion && (
                <IntensitySlider
                  intensity={intensity}
                  onIntensityChange={setIntensity}
                />
              )}

              {/* Optional Description */}
              {selectedEmotion && (
                <div className="bg-white p-6 rounded-2xl shadow-lg border animate-slide-up">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Want to share more with NOLAZ? (optional)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Sometimes it helps to talk about what's going on. I'm here to listen without judgment.
                  </p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What's on your mind? Share anything that might help me understand what you're going through..."
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    rows={3}
                  />
                </div>
              )}

              {/* Get Advice Button */}
              {selectedEmotion && (
                <div className="text-center animate-slide-up">
                  <button
                    onClick={handleGetAdvice}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Talk to NOLAZ
                  </button>
                </div>
              )}

              {/* Advice Display */}
              {currentAdvice && selectedEmotion && (
                <div className="space-y-6">
                  <AdviceCard
                    advice={currentAdvice}
                    emotion={selectedEmotion}
                    intensity={intensity}
                  />
                  
                  {/* Reset Button */}
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 mx-auto px-6 py-3 bg-white text-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:text-primary-600"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Share Another Feeling
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            💝 NOLAZ is built with care for your emotional wellbeing • 100% Private & Secure
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;