import React from 'react';
import { Battery, Satellite, Signal, Thermometer, Gauge, MapPin, Clock } from 'lucide-react';
import { TelemetryData } from '../services/DroneService';

interface TelemetryPanelProps {
  isConnected: boolean;
  telemetryData: TelemetryData | null;
}

const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ isConnected, telemetryData }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-400';
    if (level > 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (strength: number) => {
    if (strength > 70) return 'text-green-400';
    if (strength > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const data = telemetryData || {
    battery: 0,
    altitude: 0,
    speed: 0,
    temperature: 0,
    gpsSignal: 0,
    signalStrength: 0,
    latitude: 0,
    longitude: 0,
    pitch: 0,
    roll: 0,
    yaw: 0
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Live Telemetry</h2>
      
      <div className="space-y-4">
        {/* Battery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Battery className={`w-4 h-4 ${getBatteryColor(data.battery)}`} />
            <span className="text-sm text-gray-300">Battery</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  data.battery > 50 ? 'bg-green-400' : 
                  data.battery > 25 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${Math.max(0, data.battery)}%` }}
              />
            </div>
            <span className={`text-sm font-mono ${getBatteryColor(data.battery)}`}>
              {isConnected ? `${Math.round(data.battery)}%` : '--'}
            </span>
          </div>
        </div>

        {/* Altitude */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Altitude</span>
          </div>
          <span className="text-sm font-mono text-cyan-400">
            {isConnected ? `${data.altitude.toFixed(1)}m` : '--'}
          </span>
        </div>

        {/* Speed */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-blue-400 transform rotate-90" />
            <span className="text-sm text-gray-300">Speed</span>
          </div>
          <span className="text-sm font-mono text-blue-400">
            {isConnected ? `${data.speed.toFixed(1)} m/s` : '--'}
          </span>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Temperature</span>
          </div>
          <span className="text-sm font-mono text-orange-400">
            {isConnected ? `${Math.round(data.temperature)}°C` : '--'}
          </span>
        </div>

        {/* GPS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Satellite className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">GPS Satellites</span>
          </div>
          <span className="text-sm font-mono text-purple-400">
            {isConnected ? data.gpsSignal : '--'}
          </span>
        </div>

        {/* Signal Strength */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Signal className={`w-4 h-4 ${getSignalColor(data.signalStrength)}`} />
            <span className="text-sm text-gray-300">Signal</span>
          </div>
          <span className={`text-sm font-mono ${getSignalColor(data.signalStrength)}`}>
            {isConnected ? `${Math.round(data.signalStrength)}%` : '--'}
          </span>
        </div>

        {/* Attitude (Pitch, Roll, Yaw) */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-sm text-gray-300 mb-2">Attitude</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-gray-400">Pitch</div>
              <div className="text-cyan-400 font-mono">
                {isConnected ? `${data.pitch.toFixed(1)}°` : '--'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Roll</div>
              <div className="text-blue-400 font-mono">
                {isConnected ? `${data.roll.toFixed(1)}°` : '--'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Yaw</div>
              <div className="text-purple-400 font-mono">
                {isConnected ? `${data.yaw.toFixed(1)}°` : '--'}
              </div>
            </div>
          </div>
        </div>

        {/* GPS Coordinates */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">GPS Location</span>
          </div>
          <div className="text-xs font-mono text-green-400 space-y-1">
            <div>Lat: {isConnected ? data.latitude.toFixed(6) : '--'}</div>
            <div>Lng: {isConnected ? data.longitude.toFixed(6) : '--'}</div>
          </div>
        </div>

        {/* Data Logging Status */}
        {isConnected && (
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">Data Logging</span>
              </div>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TelemetryPanel;