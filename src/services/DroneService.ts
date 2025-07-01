export interface DroneCommand {
  type: 'takeoff' | 'land' | 'move' | 'rotate' | 'emergency' | 'flip';
  params?: {
    x?: number;
    y?: number;
    z?: number;
    speed?: number;
    direction?: string;
  };
}

export interface TelemetryData {
  battery: number;
  altitude: number;
  speed: number;
  temperature: number;
  gpsSignal: number;
  signalStrength: number;
  latitude: number;
  longitude: number;
  pitch: number;
  roll: number;
  yaw: number;
}

export class DroneService {
  private socket: WebSocket | null = null;
  private bluetoothDevice: BluetoothDevice | null = null;
  private bluetoothCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private isConnected = false;
  private connectionType: 'wifi' | 'bluetooth' | null = null;
  private telemetryCallback?: (data: TelemetryData) => void;

  // DJI Tello default settings
  private readonly TELLO_IP = '192.168.4.1';
  private readonly TELLO_PORT = 8889;
  private readonly TELLO_VIDEO_PORT = 11111;

  // Bluetooth UUIDs for common drone services
  private readonly DRONE_SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
  private readonly COMMAND_CHARACTERISTIC_UUID = '87654321-4321-4321-4321-cba987654321';
  private readonly TELEMETRY_CHARACTERISTIC_UUID = '11111111-2222-3333-4444-555555555555';

  async connectWiFi(): Promise<boolean> {
    try {
      // For DJI Tello and similar WiFi drones
      this.socket = new WebSocket(`ws://${this.TELLO_IP}:${this.TELLO_PORT}`);
      
      return new Promise((resolve, reject) => {
        if (!this.socket) {
          reject(new Error('Failed to create WebSocket'));
          return;
        }

        this.socket.onopen = () => {
          console.log('Connected to drone via WiFi');
          this.isConnected = true;
          this.connectionType = 'wifi';
          this.startTelemetryStream();
          resolve(true);
        };

        this.socket.onerror = (error) => {
          console.error('WiFi connection error:', error);
          reject(error);
        };

        this.socket.onmessage = (event) => {
          this.handleTelemetryData(event.data);
        };

        this.socket.onclose = () => {
          console.log('WiFi connection closed');
          this.isConnected = false;
          this.connectionType = null;
        };

        // Timeout after 10 seconds
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('Connection timeout'));
          }
        }, 10000);
      });
    } catch (error) {
      console.error('WiFi connection failed:', error);
      throw error;
    }
  }

  async connectBluetooth(): Promise<boolean> {
    try {
      if (!navigator.bluetooth) {
        throw new Error('Bluetooth not supported in this browser');
      }

      // Request Bluetooth device
      this.bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [this.DRONE_SERVICE_UUID] },
          { namePrefix: 'Drone' },
          { namePrefix: 'Tello' },
          { namePrefix: 'Bebop' }
        ],
        optionalServices: [this.DRONE_SERVICE_UUID]
      });

      if (!this.bluetoothDevice.gatt) {
        throw new Error('GATT not available');
      }

      // Connect to GATT server
      const server = await this.bluetoothDevice.gatt.connect();
      const service = await server.getPrimaryService(this.DRONE_SERVICE_UUID);
      
      // Get command characteristic
      this.bluetoothCharacteristic = await service.getCharacteristic(this.COMMAND_CHARACTERISTIC_UUID);
      
      // Get telemetry characteristic and start notifications
      const telemetryCharacteristic = await service.getCharacteristic(this.TELEMETRY_CHARACTERISTIC_UUID);
      await telemetryCharacteristic.startNotifications();
      
      telemetryCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
        if (value) {
          this.handleBluetoothTelemetry(value);
        }
      });

      this.isConnected = true;
      this.connectionType = 'bluetooth';
      
      console.log('Connected to drone via Bluetooth');
      return true;
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.bluetoothDevice && this.bluetoothDevice.gatt?.connected) {
      await this.bluetoothDevice.gatt.disconnect();
      this.bluetoothDevice = null;
      this.bluetoothCharacteristic = null;
    }

    this.isConnected = false;
    this.connectionType = null;
    console.log('Disconnected from drone');
  }

  async sendCommand(command: DroneCommand): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Not connected to drone');
    }

    try {
      if (this.connectionType === 'wifi' && this.socket) {
        return this.sendWiFiCommand(command);
      } else if (this.connectionType === 'bluetooth' && this.bluetoothCharacteristic) {
        return this.sendBluetoothCommand(command);
      }
      return false;
    } catch (error) {
      console.error('Failed to send command:', error);
      throw error;
    }
  }

  private async sendWiFiCommand(command: DroneCommand): Promise<boolean> {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return false;
    }

    // Convert command to Tello SDK format
    let commandString = '';
    
    switch (command.type) {
      case 'takeoff':
        commandString = 'takeoff';
        break;
      case 'land':
        commandString = 'land';
        break;
      case 'emergency':
        commandString = 'emergency';
        break;
      case 'move':
        if (command.params) {
          const { x = 0, y = 0, z = 0, speed = 50 } = command.params;
          commandString = `go ${x} ${y} ${z} ${speed}`;
        }
        break;
      case 'rotate':
        if (command.params?.direction) {
          commandString = `${command.params.direction} ${command.params.speed || 90}`;
        }
        break;
      case 'flip':
        commandString = `flip ${command.params?.direction || 'f'}`;
        break;
    }

    this.socket.send(commandString);
    console.log('Sent WiFi command:', commandString);
    return true;
  }

  private async sendBluetoothCommand(command: DroneCommand): Promise<boolean> {
    if (!this.bluetoothCharacteristic) {
      return false;
    }

    // Convert command to binary format for Bluetooth
    const commandBuffer = this.encodeBluetoothCommand(command);
    await this.bluetoothCharacteristic.writeValue(commandBuffer);
    
    console.log('Sent Bluetooth command:', command);
    return true;
  }

  private encodeBluetoothCommand(command: DroneCommand): ArrayBuffer {
    // This is a simplified encoding - real implementation depends on drone protocol
    const encoder = new TextEncoder();
    const commandJson = JSON.stringify(command);
    return encoder.encode(commandJson).buffer;
  }

  private startTelemetryStream(): void {
    if (this.connectionType === 'wifi' && this.socket) {
      // Request telemetry data every second
      const telemetryInterval = setInterval(() => {
        if (this.socket?.readyState === WebSocket.OPEN) {
          this.socket.send('battery?');
          this.socket.send('speed?');
          this.socket.send('time?');
          this.socket.send('height?');
          this.socket.send('temp?');
          this.socket.send('attitude?');
        } else {
          clearInterval(telemetryInterval);
        }
      }, 1000);
    }
  }

  private handleTelemetryData(data: string): void {
    try {
      // Parse telemetry data from drone
      const telemetryData = this.parseTelemetryString(data);
      if (this.telemetryCallback && telemetryData) {
        this.telemetryCallback(telemetryData);
      }
    } catch (error) {
      console.error('Failed to parse telemetry data:', error);
    }
  }

  private handleBluetoothTelemetry(value: DataView): void {
    try {
      // Decode Bluetooth telemetry data
      const telemetryData = this.parseBluetoothTelemetry(value);
      if (this.telemetryCallback && telemetryData) {
        this.telemetryCallback(telemetryData);
      }
    } catch (error) {
      console.error('Failed to parse Bluetooth telemetry:', error);
    }
  }

  private parseTelemetryString(data: string): TelemetryData | null {
    // Parse Tello-style telemetry responses
    const telemetry: Partial<TelemetryData> = {};
    
    if (data.includes('bat:')) {
      telemetry.battery = parseInt(data.match(/bat:(\d+)/)?.[1] || '0');
    }
    if (data.includes('h:')) {
      telemetry.altitude = parseInt(data.match(/h:(\d+)/)?.[1] || '0');
    }
    if (data.includes('templ:')) {
      telemetry.temperature = parseInt(data.match(/templ:(\d+)/)?.[1] || '0');
    }

    // Return mock data for demo - replace with actual parsing
    return {
      battery: telemetry.battery || 85,
      altitude: telemetry.altitude || 0,
      speed: 0,
      temperature: telemetry.temperature || 22,
      gpsSignal: 8,
      signalStrength: 85,
      latitude: 40.7128,
      longitude: -74.0060,
      pitch: 0,
      roll: 0,
      yaw: 0
    };
  }

  private parseBluetoothTelemetry(value: DataView): TelemetryData | null {
    // Parse binary telemetry data from Bluetooth
    // This is drone-specific - implement based on your drone's protocol
    
    return {
      battery: value.getUint8(0),
      altitude: value.getFloat32(1, true),
      speed: value.getFloat32(5, true),
      temperature: value.getInt8(9),
      gpsSignal: value.getUint8(10),
      signalStrength: value.getUint8(11),
      latitude: value.getFloat64(12, true),
      longitude: value.getFloat64(20, true),
      pitch: value.getFloat32(28, true),
      roll: value.getFloat32(32, true),
      yaw: value.getFloat32(36, true)
    };
  }

  setTelemetryCallback(callback: (data: TelemetryData) => void): void {
    this.telemetryCallback = callback;
  }

  getConnectionStatus(): { connected: boolean; type: string | null } {
    return {
      connected: this.isConnected,
      type: this.connectionType
    };
  }

  // Video streaming methods
  async startVideoStream(): Promise<MediaStream | null> {
    if (!this.isConnected) {
      return null;
    }

    try {
      if (this.connectionType === 'wifi') {
        // For WiFi drones, typically use WebRTC or direct video stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
          }
        });
        return stream;
      }
      return null;
    } catch (error) {
      console.error('Failed to start video stream:', error);
      return null;
    }
  }

  // Geofencing and safety features
  checkGeofence(latitude: number, longitude: number): boolean {
    // Implement geofencing logic
    // Check against no-fly zones, altitude limits, etc.
    return true;
  }

  async emergencyLand(): Promise<void> {
    await this.sendCommand({ type: 'emergency' });
  }

  async returnToHome(): Promise<void> {
    await this.sendCommand({ type: 'move', params: { x: 0, y: 0, z: 0, speed: 100 } });
  }
}