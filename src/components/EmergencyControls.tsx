import React, { useState } from 'react';
import { AlertTriangle, Home, StopCircle, RotateCcw, Shield } from 'lucide-react';

interface EmergencyControlsProps {
  isConnected: boolean;
  onEmergencyStop: () => Promise<boolean>;
  onReturnHome: () => Promise<boolean>;
  onAutoLand: () => Promise<boolean>;
}

const EmergencyControls: React.FC<EmergencyControlsProps> = ({ 
  isConnected, 
  onEmergencyStop, 
  onReturnHome, 
  onAutoLand 
}) => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isReturningHome, setIsReturningHome] = useState(false);
  const [isAutoLanding, setIsAutoLanding] = useState(false);

  const handleEmergencyStop = async () => {
    try {
      setIsEmergencyMode(true);
      await onEmergencyStop();
      setTimeout(() => setIsEmergencyMode(false), 5000);
    } catch (error) {
      console.error('Emergency stop failed:', error);
      setIsEmergencyMode(false);
    }
  };

  const handleReturnHome = async () => {
    try {
      setIsReturningHome(true);
      await onReturnHome();
      setTimeout(() => setIsReturningHome(false), 10000);
    } catch (error) {
      console.error('Return home failed:', error);
      setIsReturningHome(false);
    }
  };

  const handleAutoLand = async () => {
    try {
      setIsAutoLanding(true);
      await onAutoLand();
      setTimeout(() => setIsAutoLanding(false), 8000);
    } catch (error) {
      console.error('Auto land failed:', error);
      setIsAutoLanding(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-red-400" />
        <h2 className="text-lg font-semibold text-white">Emergency Controls</h2>
      </div>
      
      <div className="space-y-3">
        {/* Emergency Stop */}
        <button
          disabled={!isConnected}
          onClick={handleEmergencyStop}
          className={`w-full flex items-center justify-center space-x-2 p-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isEmergencyMode
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:scale-105'
          }`}
        >
          <StopCircle className="w-5 h-5" />
          <span>{isEmergencyMode ? 'EMERGENCY ACTIVATED' : 'Emergency Stop'}</span>
        </button>

        {/* Return to Home */}
        <button
          disabled={!isConnected}
          onClick={handleReturnHome}
          className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isReturningHome
              ? 'bg-orange-500/40 text-orange-300 animate-pulse'
              : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{isReturningHome ? 'Returning Home...' : 'Return to Home'}</span>
        </button>

        {/* Auto Land */}
        <button
          disabled={!isConnected}
          onClick={handleAutoLand}
          className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isAutoLanding
              ? 'bg-yellow-500/40 text-yellow-300 animate-pulse'
              : 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isAutoLanding ? 'Auto Landing...' : 'Auto Land'}</span>
        </button>
      </div>

      {/* Safety Features Status */}
      {isConnected && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="text-xs text-green-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>Geofencing</span>
              <span className="text-green-300">✓ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Low Battery RTH</span>
              <span className="text-green-300">✓ Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Signal Loss RTH</span>
              <span className="text-green-300">✓ Enabled</span>
            </div>
          </div>
        </div>
      )}

      {/* Safety Notice */}
      <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-400">
            <div className="font-semibold mb-1">Safety Protocol</div>
            <div>Emergency controls override all flight commands. Use responsibly and ensure safe landing area.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyControls;