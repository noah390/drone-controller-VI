import React, { useState, useRef, useEffect } from 'react';
import { Navigation, RotateCw, Move, ArrowUp, Zap } from 'lucide-react';

interface FlightControlsProps {
  isConnected: boolean;
  onTakeoff: () => Promise<boolean>;
  onLand: () => Promise<boolean>;
  onMove: (x: number, y: number, z: number, speed?: number) => Promise<boolean>;
  onRotate: (direction: string, speed?: number) => Promise<boolean>;
  onFlip: (direction?: string) => Promise<boolean>;
}

const FlightControls: React.FC<FlightControlsProps> = ({ 
  isConnected, 
  onTakeoff, 
  onLand, 
  onMove, 
  onRotate, 
  onFlip 
}) => {
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [rightStick, setRightStick] = useState({ x: 0, y: 0 });
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  
  const leftStickRef = useRef<HTMLDivElement>(null);
  const rightStickRef = useRef<HTMLDivElement>(null);

  // Send movement commands based on stick positions
  useEffect(() => {
    if (!isConnected || (!leftStick.x && !leftStick.y && !rightStick.x && !rightStick.y)) return;

    const throttleInterval = setInterval(() => {
      // Convert stick positions to movement commands
      const throttle = -leftStick.y / 2; // Up/down
      const yaw = leftStick.x / 2; // Rotation
      const pitch = -rightStick.y / 2; // Forward/backward
      const roll = rightStick.x / 2; // Left/right

      if (Math.abs(throttle) > 5 || Math.abs(yaw) > 5 || Math.abs(pitch) > 5 || Math.abs(roll) > 5) {
        onMove(roll, pitch, throttle, 50);
        if (Math.abs(yaw) > 5) {
          onRotate(yaw > 0 ? 'cw' : 'ccw', Math.abs(yaw));
        }
      }
    }, 100); // Send commands every 100ms

    return () => clearInterval(throttleInterval);
  }, [leftStick, rightStick, isConnected, onMove, onRotate]);

  const handleMouseDown = (stick: 'left' | 'right') => (e: React.MouseEvent) => {
    e.preventDefault();
    if (stick === 'left') {
      setIsDraggingLeft(true);
    } else {
      setIsDraggingRight(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingLeft && !isDraggingRight) return;

    if (isDraggingLeft && leftStickRef.current) {
      const rect = leftStickRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDistance = rect.width / 2 - 20;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance <= maxDistance) {
        setLeftStick({ x: deltaX, y: deltaY });
      } else {
        const angle = Math.atan2(deltaY, deltaX);
        setLeftStick({
          x: Math.cos(angle) * maxDistance,
          y: Math.sin(angle) * maxDistance
        });
      }
    }

    if (isDraggingRight && rightStickRef.current) {
      const rect = rightStickRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDistance = rect.width / 2 - 20;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance <= maxDistance) {
        setRightStick({ x: deltaX, y: deltaY });
      } else {
        const angle = Math.atan2(deltaY, deltaX);
        setRightStick({
          x: Math.cos(angle) * maxDistance,
          y: Math.sin(angle) * maxDistance
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
    setLeftStick({ x: 0, y: 0 });
    setRightStick({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDraggingLeft || isDraggingRight) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingLeft, isDraggingRight]);

  const handleTakeoff = async () => {
    try {
      await onTakeoff();
      setIsFlying(true);
    } catch (error) {
      console.error('Takeoff failed:', error);
    }
  };

  const handleLand = async () => {
    try {
      await onLand();
      setIsFlying(false);
    } catch (error) {
      console.error('Landing failed:', error);
    }
  };

  const handleFlip = async (direction: string) => {
    try {
      await onFlip(direction);
    } catch (error) {
      console.error('Flip failed:', error);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Flight Controls</h2>
      
      {/* Virtual Joysticks */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left Stick - Throttle & Yaw */}
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Throttle / Yaw</div>
          <div
            ref={leftStickRef}
            className="relative w-24 h-24 mx-auto bg-white/10 rounded-full border-2 border-white/20 cursor-pointer hover:border-cyan-400/50 transition-all"
          >
            <div
              className="absolute w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transition-all duration-75 cursor-grab active:cursor-grabbing"
              style={{
                left: `calc(50% + ${leftStick.x}px - 16px)`,
                top: `calc(50% + ${leftStick.y}px - 16px)`,
                opacity: isConnected ? 1 : 0.3,
                transform: isDraggingLeft ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseDown={handleMouseDown('left')}
            />
            {/* Stick indicators */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-6 bg-white/20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-1 bg-white/20"></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Up/Down • Left/Right
          </div>
        </div>

        {/* Right Stick - Pitch & Roll */}
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Pitch / Roll</div>
          <div
            ref={rightStickRef}
            className="relative w-24 h-24 mx-auto bg-white/10 rounded-full border-2 border-white/20 cursor-pointer hover:border-cyan-400/50 transition-all"
          >
            <div
              className="absolute w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transition-all duration-75 cursor-grab active:cursor-grabbing"
              style={{
                left: `calc(50% + ${rightStick.x}px - 16px)`,
                top: `calc(50% + ${rightStick.y}px - 16px)`,
                opacity: isConnected ? 1 : 0.3,
                transform: isDraggingRight ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseDown={handleMouseDown('right')}
            />
            {/* Stick indicators */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-6 bg-white/20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-1 bg-white/20"></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Forward/Back • Left/Right
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          disabled={!isConnected || isFlying}
          onClick={handleTakeoff}
          className="flex items-center justify-center space-x-2 p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm">Takeoff</span>
        </button>
        <button
          disabled={!isConnected || !isFlying}
          onClick={handleLand}
          className="flex items-center justify-center space-x-2 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUp className="w-4 h-4 transform rotate-180" />
          <span className="text-sm">Land</span>
        </button>
      </div>

      {/* Advanced Maneuvers */}
      <div className="space-y-3 mb-4">
        <div className="text-sm text-gray-400 mb-2">Advanced Maneuvers</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={!isConnected || !isFlying}
            onClick={() => handleFlip('f')}
            className="flex items-center justify-center space-x-1 p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3 h-3" />
            <span>Flip Forward</span>
          </button>
          <button
            disabled={!isConnected || !isFlying}
            onClick={() => handleFlip('b')}
            className="flex items-center justify-center space-x-1 p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3 h-3" />
            <span>Flip Back</span>
          </button>
          <button
            disabled={!isConnected || !isFlying}
            onClick={() => handleFlip('l')}
            className="flex items-center justify-center space-x-1 p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3 h-3" />
            <span>Flip Left</span>
          </button>
          <button
            disabled={!isConnected || !isFlying}
            onClick={() => handleFlip('r')}
            className="flex items-center justify-center space-x-1 p-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-3 h-3" />
            <span>Flip Right</span>
          </button>
        </div>
      </div>

      {/* Auto Flight Modes */}
      <div className="space-y-3">
        <div className="text-sm text-gray-400 mb-2">Auto Flight Modes</div>
        <button
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCw className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-300">Auto Rotate</span>
        </button>
        <button
          disabled={!isConnected}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Navigation className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">Follow Me</span>
        </button>
      </div>

      {/* Flight Status */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Flight Status</span>
          <span className={`font-semibold ${isFlying ? 'text-green-400' : 'text-gray-400'}`}>
            {isFlying ? 'In Flight' : 'Grounded'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlightControls;