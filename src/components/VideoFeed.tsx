import React, { useState, useEffect, useRef } from 'react';
import { SwordIcon as Record, Camera, Maximize2, Download, Settings } from 'lucide-react';

interface VideoFeedProps {
  isConnected: boolean;
  getVideoElement: () => HTMLVideoElement | null;
  onStartRecording: () => Promise<MediaRecorder | null>;
  onCaptureScreenshot: () => void;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ 
  isConnected, 
  getVideoElement,
  onStartRecording,
  onCaptureScreenshot
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [streamQuality, setStreamQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (isConnected) {
      const videoElement = getVideoElement();
      if (videoElement && videoContainerRef.current) {
        // Clear any existing video elements
        const existingVideo = videoContainerRef.current.querySelector('video');
        if (existingVideo) {
          existingVideo.remove();
        }
        
        // Style the video element
        videoElement.className = 'w-full h-full object-cover rounded-lg';
        videoElement.controls = false;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        
        // Add to container
        videoContainerRef.current.appendChild(videoElement);
      }
    }
  }, [isConnected, getVideoElement]);

  const handleRecording = async () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    } else {
      try {
        const recorder = await onStartRecording();
        if (recorder) {
          setMediaRecorder(recorder);
          setIsRecording(true);
          
          recorder.onstop = () => {
            setIsRecording(false);
            setMediaRecorder(null);
          };
        }
      } catch (error) {
        console.error('Failed to start recording:', error);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Live Camera Feed</h2>
        <div className="flex items-center space-x-3">
          {/* Stream Quality Selector */}
          <select
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value as 'low' | 'medium' | 'high')}
            disabled={!isConnected}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white disabled:opacity-50"
          >
            <option value="low">480p</option>
            <option value="medium">720p</option>
            <option value="high">1080p</option>
          </select>
          
          {isRecording && (
            <div className="flex items-center space-x-2 text-red-400">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
      </div>

      <div 
        ref={videoContainerRef}
        className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 group"
      >
        {isConnected ? (
          <>
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-4 left-4 text-green-400 font-mono text-sm bg-black/50 rounded px-2 py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <div className="text-xs mt-1">
                  {streamQuality === 'low' && '640x480'}
                  {streamQuality === 'medium' && '1280x720'}
                  {streamQuality === 'high' && '1920x1080'}
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-cyan-400 font-mono text-sm text-right bg-black/50 rounded px-2 py-1">
                <div>GPS: ACTIVE</div>
                <div>SIGNAL: STRONG</div>
                <div>LATENCY: 45ms</div>
              </div>
              
              {/* Crosshair */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 border-2 border-cyan-400/50 rounded-full">
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>

              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute bottom-4 left-4 bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ● REC {formatTime(recordingTime)}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-16 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Connect to Drone</p>
              <p className="text-sm">Live camera feed will appear here</p>
              <div className="mt-4 text-xs text-gray-500">
                <div>• Real-time video streaming</div>
                <div>• HD quality up to 1080p</div>
                <div>• Recording & screenshot capture</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          disabled={!isConnected}
          onClick={handleRecording}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            isRecording
              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Record className="w-4 h-4" />
          <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
        </button>
        
        <button
          disabled={!isConnected}
          onClick={onCaptureScreenshot}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-gray-300 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-4 h-4" />
          <span>Screenshot</span>
        </button>
        
        <button
          disabled={!isConnected}
          className="p-2 bg-white/10 text-gray-300 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Stream Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Stream Info */}
      {isConnected && (
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="text-gray-400">Bitrate</div>
              <div className="text-cyan-400 font-mono">
                {streamQuality === 'low' && '500 kbps'}
                {streamQuality === 'medium' && '1.5 Mbps'}
                {streamQuality === 'high' && '3.0 Mbps'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">FPS</div>
              <div className="text-green-400 font-mono">30</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Codec</div>
              <div className="text-blue-400 font-mono">H.264</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;