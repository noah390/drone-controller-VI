import React from 'react';
import { LogOut, Settings, Wifi, Bluetooth, ExternalLink } from 'lucide-react';
import ConnectionPanel from './ConnectionPanel';
import VideoFeed from './VideoFeed';
import FlightControls from './FlightControls';
import TelemetryPanel from './TelemetryPanel';
import EmergencyControls from './EmergencyControls';
import { useDroneConnection } from '../hooks/useDroneConnection';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const {
    isConnected,
    connectionType,
    isConnecting,
    error,
    telemetryData,
    connect,
    disconnect,
    takeoff,
    land,
    emergencyStop,
    move,
    rotate,
    flip,
    startRecording,
    captureScreenshot,
    getVideoElement
  } = useDroneConnection();

  return (
    <div className="min-h-screen p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Real Drone Controller</h1>
              <div className="flex items-center space-x-2">
                {connectionType === 'wifi' && <Wifi className="w-5 h-5 text-cyan-400" />}
                {connectionType === 'bluetooth' && <Bluetooth className="w-5 h-5 text-blue-400" />}
                <span className={`text-sm font-medium ${isConnected ? 'text-green-400' : 'text-gray-400'}`}>
                  {isConnected ? 'Live Connection' : 'Disconnected'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/your-repo/drone-controller"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Documentation</span>
              </a>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <ConnectionPanel
            isConnected={isConnected}
            connectionType={connectionType}
            isConnecting={isConnecting}
            error={error}
            onConnect={connect}
            onDisconnect={disconnect}
          />
          <TelemetryPanel 
            isConnected={isConnected} 
            telemetryData={telemetryData}
          />
          <EmergencyControls 
            isConnected={isConnected}
            onEmergencyStop={emergencyStop}
            onReturnHome={() => move(0, 0, 0, 100)}
            onAutoLand={land}
          />
        </div>

        {/* Center Column */}
        <div className="space-y-6">
          <VideoFeed 
            isConnected={isConnected}
            getVideoElement={getVideoElement}
            onStartRecording={startRecording}
            onCaptureScreenshot={captureScreenshot}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <FlightControls 
            isConnected={isConnected}
            onTakeoff={takeoff}
            onLand={land}
            onMove={move}
            onRotate={rotate}
            onFlip={flip}
          />
        </div>
      </div>

      {/* Real-time Status Bar */}
      {isConnected && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="backdrop-blur-xl bg-green-500/20 border border-green-500/30 rounded-full px-6 py-2">
            <div className="flex items-center space-x-3 text-green-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Drone Connection Active</span>
              <div className="text-xs">
                {telemetryData?.battery}% • {telemetryData?.altitude?.toFixed(1)}m
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;