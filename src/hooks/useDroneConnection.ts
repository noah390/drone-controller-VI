import { useState, useEffect, useCallback } from 'react';
import { DroneService, TelemetryData } from '../services/DroneService';
import { VideoStreamService } from '../services/VideoStreamService';

export const useDroneConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionType, setConnectionType] = useState<'wifi' | 'bluetooth' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [droneService] = useState(() => new DroneService());
  const [videoService] = useState(() => new VideoStreamService());

  useEffect(() => {
    // Set up telemetry callback
    droneService.setTelemetryCallback((data: TelemetryData) => {
      setTelemetryData(data);
    });

    return () => {
      // Cleanup on unmount
      droneService.disconnect();
      videoService.stopStream();
    };
  }, [droneService, videoService]);

  const connect = useCallback(async (type: 'wifi' | 'bluetooth') => {
    setIsConnecting(true);
    setError(null);

    try {
      let success = false;
      
      if (type === 'wifi') {
        success = await droneService.connectWiFi();
      } else {
        success = await droneService.connectBluetooth();
      }

      if (success) {
        setIsConnected(true);
        setConnectionType(type);
        
        // Start video stream
        await videoService.startStream(type);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMessage);
      console.error('Connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [droneService, videoService]);

  const disconnect = useCallback(async () => {
    try {
      await droneService.disconnect();
      videoService.stopStream();
      setIsConnected(false);
      setConnectionType(null);
      setTelemetryData(null);
      setError(null);
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  }, [droneService, videoService]);

  const sendCommand = useCallback(async (command: any) => {
    if (!isConnected) {
      throw new Error('Not connected to drone');
    }

    try {
      return await droneService.sendCommand(command);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Command failed';
      setError(errorMessage);
      throw err;
    }
  }, [droneService, isConnected]);

  const takeoff = useCallback(async () => {
    return await sendCommand({ type: 'takeoff' });
  }, [sendCommand]);

  const land = useCallback(async () => {
    return await sendCommand({ type: 'land' });
  }, [sendCommand]);

  const emergencyStop = useCallback(async () => {
    return await sendCommand({ type: 'emergency' });
  }, [sendCommand]);

  const move = useCallback(async (x: number, y: number, z: number, speed = 50) => {
    return await sendCommand({ 
      type: 'move', 
      params: { x, y, z, speed } 
    });
  }, [sendCommand]);

  const rotate = useCallback(async (direction: string, speed = 90) => {
    return await sendCommand({ 
      type: 'rotate', 
      params: { direction, speed } 
    });
  }, [sendCommand]);

  const flip = useCallback(async (direction = 'f') => {
    return await sendCommand({ 
      type: 'flip', 
      params: { direction } 
    });
  }, [sendCommand]);

  // Video controls
  const startRecording = useCallback(async () => {
    return await videoService.startRecording();
  }, [videoService]);

  const captureScreenshot = useCallback(() => {
    videoService.captureScreenshot();
  }, [videoService]);

  const getVideoElement = useCallback(() => {
    return videoService.getVideoElement();
  }, [videoService]);

  return {
    // Connection state
    isConnected,
    connectionType,
    isConnecting,
    error,
    telemetryData,

    // Connection methods
    connect,
    disconnect,

    // Flight controls
    takeoff,
    land,
    emergencyStop,
    move,
    rotate,
    flip,
    sendCommand,

    // Video controls
    startRecording,
    captureScreenshot,
    getVideoElement,

    // Services (for advanced usage)
    droneService,
    videoService
  };
};