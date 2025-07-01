import React, { useState } from 'react';
import { Wifi, Bluetooth, CheckCircle, Circle, AlertCircle, Info } from 'lucide-react';

interface ConnectionPanelProps {
  isConnected: boolean;
  connectionType: 'wifi' | 'bluetooth' | null;
  isConnecting: boolean;
  error: string | null;
  onConnect: (type: 'wifi' | 'bluetooth') => void;
  onDisconnect: () => void;
}

const ConnectionPanel: React.FC<ConnectionPanelProps> = ({
  isConnected,
  connectionType,
  isConnecting,
  error,
  onConnect,
  onDisconnect,
}) => {
  const [selectedType, setSelectedType] = useState<'wifi' | 'bluetooth'>('wifi');
  const [showHelp, setShowHelp] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      onDisconnect();
    } else {
      onConnect(selectedType);
    }
  };

  const getConnectionInstructions = (type: 'wifi' | 'bluetooth') => {
    if (type === 'wifi') {
      return {
        title: 'WiFi Connection Setup',
        steps: [
          'Power on your drone (DJI Tello, Bebop, etc.)',
          'Connect your device to the drone\'s WiFi network',
          'Network name usually starts with "TELLO-" or "Bebop-"',
          'Click "Connect to Drone" below',
          'Wait for automatic detection and pairing'
        ],
        note: 'WiFi provides the best video quality and range'
      };
    } else {
      return {
        title: 'Bluetooth Connection Setup',
        steps: [
          'Power on your Bluetooth-enabled drone',
          'Put drone in pairing mode (check manual)',
          'Ensure your browser supports Web Bluetooth (Chrome/Edge)',
          'Click "Connect to Drone" and select your drone',
          'Complete the pairing process'
        ],
        note: 'Bluetooth has limited video quality but works without WiFi'
      };
    }
  };

  const instructions = getConnectionInstructions(selectedType);

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Real Drone Connection</h2>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
        >
          <Info className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {showHelp && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">{instructions.title}</h3>
          <ol className="text-xs text-blue-200 space-y-1 mb-3">
            {instructions.steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-blue-400">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="text-xs text-blue-300 bg-blue-500/10 p-2 rounded">
            💡 {instructions.note}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedType('wifi')}
            disabled={isConnected}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all ${
              selectedType === 'wifi'
                ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-300'
                : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
            } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Wifi className="w-5 h-5" />
            <span>Wi-Fi</span>
          </button>
          <button
            onClick={() => setSelectedType('bluetooth')}
            disabled={isConnected}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all ${
              selectedType === 'bluetooth'
                ? 'bg-blue-500/30 border-2 border-blue-400 text-blue-300'
                : 'bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20'
            } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Bluetooth className="w-5 h-5" />
            <span>Bluetooth</span>
          </button>
        </div>

        {/* Browser Compatibility Warning */}
        {selectedType === 'bluetooth' && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-400">
                <div className="font-semibold mb-1">Browser Requirement</div>
                <div>Bluetooth requires Chrome or Edge browser with HTTPS connection.</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            isConnected
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
              : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Connecting to {selectedType.toUpperCase()}...
            </div>
          ) : isConnected ? (
            'Disconnect from Drone'
          ) : (
            `Connect via ${selectedType.toUpperCase()}`
          )}
        </button>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-red-400">
                <div className="font-semibold mb-1">Connection Error</div>
                <div>{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Connection Status */}
        <div className="flex items-center space-x-2 text-sm">
          {isConnected ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Circle className="w-4 h-4 text-gray-400" />
          )}
          <span className={isConnected ? 'text-green-400' : 'text-gray-400'}>
            {isConnected ? `Connected via ${connectionType?.toUpperCase()}` : 'Not connected'}
          </span>
        </div>

        {/* Supported Drones */}
        <div className="pt-3 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-2">Supported Drones:</div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>• DJI Tello (WiFi) - Recommended</div>
            <div>• DJI Mini series (WiFi/Bluetooth)</div>
            <div>• Parrot Bebop (WiFi)</div>
            <div>• Custom ESP32/Arduino drones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPanel;