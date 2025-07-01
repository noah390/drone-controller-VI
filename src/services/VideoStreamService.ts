export class VideoStreamService {
  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private isStreaming = false;
  private connectionType: 'wifi' | 'bluetooth' | null = null;

  constructor() {
    this.setupVideoElement();
  }

  private setupVideoElement(): void {
    this.videoElement = document.createElement('video');
    this.videoElement.autoplay = true;
    this.videoElement.muted = true;
    this.videoElement.playsInline = true;
  }

  async startStream(connectionType: 'wifi' | 'bluetooth'): Promise<HTMLVideoElement | null> {
    this.connectionType = connectionType;

    try {
      if (connectionType === 'wifi') {
        return await this.startWiFiStream();
      } else if (connectionType === 'bluetooth') {
        return await this.startBluetoothStream();
      }
      return null;
    } catch (error) {
      console.error('Failed to start video stream:', error);
      throw error;
    }
  }

  private async startWiFiStream(): Promise<HTMLVideoElement | null> {
    try {
      // For DJI Tello and similar WiFi drones
      // Method 1: Direct UDP stream (requires WebRTC or custom implementation)
      if (this.supportsWebRTC()) {
        return await this.startWebRTCStream();
      }

      // Method 2: HTTP stream from drone's built-in server
      if (this.videoElement) {
        this.videoElement.src = 'http://192.168.4.1:8080/stream';
        this.videoElement.load();
        this.isStreaming = true;
        return this.videoElement;
      }

      return null;
    } catch (error) {
      console.error('WiFi stream failed:', error);
      throw error;
    }
  }

  private async startWebRTCStream(): Promise<HTMLVideoElement | null> {
    try {
      // Create WebRTC connection to drone
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      // Handle incoming stream
      pc.ontrack = (event) => {
        if (this.videoElement && event.streams[0]) {
          this.videoElement.srcObject = event.streams[0];
          this.stream = event.streams[0];
          this.isStreaming = true;
        }
      };

      // Create offer and connect to drone's WebRTC endpoint
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to drone (implementation depends on drone's WebRTC support)
      const response = await fetch('http://192.168.4.1:8080/webrtc/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offer: offer.sdp })
      });

      const { answer } = await response.json();
      await pc.setRemoteDescription({ type: 'answer', sdp: answer });

      return this.videoElement;
    } catch (error) {
      console.error('WebRTC stream failed:', error);
      throw error;
    }
  }

  private async startBluetoothStream(): Promise<HTMLVideoElement | null> {
    try {
      // Bluetooth typically doesn't support high-bandwidth video streaming
      // This would be for low-resolution image transmission or compressed video
      
      // For demonstration, we'll use a mock stream
      console.warn('Bluetooth video streaming has limited bandwidth');
      
      // Create a canvas-based mock stream for Bluetooth
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      
      if (ctx && this.videoElement) {
        // Create a mock video stream from canvas
        const stream = canvas.captureStream(15); // 15 FPS for Bluetooth
        this.videoElement.srcObject = stream;
        this.stream = stream;
        this.isStreaming = true;
        
        // Simulate receiving image data via Bluetooth
        this.simulateBluetoothImages(ctx, canvas);
        
        return this.videoElement;
      }

      return null;
    } catch (error) {
      console.error('Bluetooth stream failed:', error);
      throw error;
    }
  }

  private simulateBluetoothImages(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    // This simulates receiving compressed images via Bluetooth
    // In a real implementation, you'd receive image data from the Bluetooth characteristic
    
    let frame = 0;
    const animate = () => {
      if (!this.isStreaming) return;

      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mock drone camera view
      ctx.fillStyle = '#16213e';
      ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

      // Add some animated elements to simulate camera feed
      ctx.fillStyle = '#0f3460';
      ctx.fillRect(100 + Math.sin(frame * 0.1) * 50, 100, 100, 100);

      ctx.fillStyle = '#e94560';
      ctx.beginPath();
      ctx.arc(300 + Math.cos(frame * 0.05) * 100, 200, 20, 0, Math.PI * 2);
      ctx.fill();

      // Add HUD elements
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }

  stopStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement.src = '';
    }

    this.isStreaming = false;
  }

  getVideoElement(): HTMLVideoElement | null {
    return this.videoElement;
  }

  isStreamActive(): boolean {
    return this.isStreaming;
  }

  // Recording functionality
  async startRecording(): Promise<MediaRecorder | null> {
    if (!this.stream) {
      throw new Error('No active stream to record');
    }

    try {
      const mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Auto-download the recording
        const a = document.createElement('a');
        a.href = url;
        a.download = `drone-recording-${new Date().toISOString()}.webm`;
        a.click();
        
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      return mediaRecorder;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  // Screenshot functionality
  captureScreenshot(): void {
    if (!this.videoElement) {
      throw new Error('No video element available');
    }

    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.videoWidth || 1920;
    canvas.height = this.videoElement.videoHeight || 1080;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(this.videoElement, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `drone-screenshot-${new Date().toISOString()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }
  }

  private supportsWebRTC(): boolean {
    return !!(window.RTCPeerConnection && navigator.mediaDevices);
  }

  // Stream quality adjustment
  adjustQuality(quality: 'low' | 'medium' | 'high'): void {
    if (!this.videoElement) return;

    const qualitySettings = {
      low: { width: 640, height: 480, bitrate: 500000 },
      medium: { width: 1280, height: 720, bitrate: 1500000 },
      high: { width: 1920, height: 1080, bitrate: 3000000 }
    };

    const settings = qualitySettings[quality];
    
    // Apply quality settings (implementation depends on stream type)
    console.log(`Adjusting stream quality to ${quality}:`, settings);
  }
}