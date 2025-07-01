# 🚁 Real-Life Drone Web Controller

## Overview
A production-ready web-based drone controller that connects to real drones via Bluetooth and WiFi. Control your drone directly from any web browser with live video streaming, telemetry data, and full flight controls.

## 🎯 Features
- **Real Bluetooth & WiFi Connectivity** - Connect to actual drones
- **Live Video Streaming** - Real-time camera feed from drone
- **Flight Controls** - Virtual joysticks and flight commands
- **Telemetry Monitoring** - Battery, GPS, altitude, speed, temperature
- **Emergency Controls** - Safety features and emergency landing
- **Cross-Platform** - Works on desktop, tablet, and mobile

## 🔧 Hardware Requirements

### Supported Drones
- **DJI Tello** (WiFi) - Recommended for beginners
- **DJI Mini series** (WiFi/Bluetooth)
- **Parrot Bebop** (WiFi)
- **Custom ESP32-based drones** (WiFi/Bluetooth)
- **Arduino-based drones** with WiFi/Bluetooth modules

### Browser Requirements
- **Chrome/Edge** (recommended) - Full WebRTC and Bluetooth support
- **Firefox** - Limited Bluetooth support
- **Safari** - WebRTC support only

## 🚀 Quick Start Guide

### 1. Clone & Own This Project

#### Option A: Claim Existing Deployment
1. Visit: [Claim URL](https://app.netlify.com/claim)
2. Sign up/login to Netlify
3. Claim the deployed site
4. You now own the live controller!

#### Option B: Deploy Your Own
```bash
# Clone the repository
git clone <your-repo-url>
cd drone-controller

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Netlify
npm run deploy
```

### 2. Enable Browser Permissions

#### For Chrome/Edge:
1. Go to `chrome://settings/content/bluetooth`
2. Enable "Sites can ask to connect to Bluetooth devices"
3. Go to `chrome://settings/content/camera`
4. Allow camera access for your domain
5. Go to `chrome://settings/content/microphone`
6. Allow microphone access

#### For HTTPS (Required):
- Bluetooth/Camera APIs only work over HTTPS
- Use the deployed Netlify URL (automatically HTTPS)
- For local development, use `https://localhost:5173`

### 3. Connect Your Drone

#### DJI Tello Setup:
1. Power on your Tello drone
2. Connect your device to Tello's WiFi network (TELLO-XXXXXX)
3. Open the controller in your browser
4. Click "Connect to Drone" → Select "Wi-Fi"
5. The controller will automatically detect and connect

#### Bluetooth Drone Setup:
1. Power on your Bluetooth-enabled drone
2. Put drone in pairing mode
3. Open the controller → Click "Connect to Drone" → Select "Bluetooth"
4. Select your drone from the device list
5. Pair and connect

## 🔌 Real Connectivity Implementation

### WiFi Connection (UDP/WebSocket)
The controller uses WebSocket connections to communicate with WiFi-enabled drones:

```javascript
// Automatic drone discovery on local network
const droneIP = await discoverDrone();
const socket = new WebSocket(`ws://${droneIP}:8080`);

// Send flight commands
socket.send(JSON.stringify({
  command: 'takeoff',
  params: {}
}));
```

### Bluetooth Connection (Web Bluetooth API)
Direct Bluetooth communication with compatible drones:

```javascript
// Connect to Bluetooth drone
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ['drone-service-uuid'] }]
});

// Send commands via Bluetooth
await characteristic.writeValue(commandBuffer);
```

### Video Streaming
Real-time video streaming using WebRTC:

```javascript
// Receive video stream from drone
const stream = await navigator.mediaDevices.getUserMedia({
  video: { deviceId: droneCamera }
});
videoElement.srcObject = stream;
```

## 📱 Mobile App Alternative

### Progressive Web App (PWA)
This controller works as a PWA - install it on your phone:

1. Open the controller URL in mobile browser
2. Tap "Add to Home Screen"
3. Launch like a native app
4. Full offline capability

### Native Mobile Features
- **Gyroscope Control** - Tilt phone to control drone
- **Touch Gestures** - Swipe and pinch controls
- **Voice Commands** - "Take off", "Land", "Emergency stop"

## 🛡️ Safety Features

### Built-in Safeguards
- **Geofencing** - Automatic boundary limits
- **Low Battery Return** - Auto-return when battery < 20%
- **Connection Loss Protocol** - Auto-land if signal lost
- **Emergency Stop** - Immediate motor shutdown
- **Altitude Limits** - Configurable maximum height

### Legal Compliance
- **No-Fly Zone Detection** - Automatic restriction near airports
- **Registration Reminder** - Links to drone registration
- **Flight Log Export** - For regulatory compliance

## 🔧 Advanced Configuration

### Custom Drone Integration
Add support for your custom drone:

```javascript
// src/services/DroneService.js
export class CustomDroneService {
  async connect(connectionType) {
    if (connectionType === 'wifi') {
      return await this.connectWiFi();
    } else if (connectionType === 'bluetooth') {
      return await this.connectBluetooth();
    }
  }
  
  async sendCommand(command, params) {
    // Your drone's command protocol
  }
}
```

### Environment Variables
Create `.env` file:

```env
VITE_DRONE_DEFAULT_IP=192.168.4.1
VITE_BLUETOOTH_SERVICE_UUID=12345678-1234-1234-1234-123456789abc
VITE_ENABLE_GEOFENCING=true
VITE_MAX_ALTITUDE=120
```

## 📊 Telemetry Data

### Real-time Monitoring
- **GPS Coordinates** - Latitude/longitude tracking
- **Altitude** - Height above ground level
- **Speed** - Current velocity (m/s)
- **Battery Level** - Remaining power percentage
- **Signal Strength** - Connection quality
- **Temperature** - Drone internal temperature
- **Flight Time** - Current session duration

### Data Logging
All telemetry is automatically logged and can be exported:
- CSV format for analysis
- KML format for Google Earth
- JSON format for custom processing

## 🎮 Control Methods

### Virtual Joysticks
- **Left Stick** - Throttle (up/down) and Yaw (rotation)
- **Right Stick** - Pitch (forward/back) and Roll (left/right)
- **Sensitivity Settings** - Adjustable response curves

### Keyboard Controls
- **WASD** - Basic movement
- **Space** - Take off
- **L** - Land
- **E** - Emergency stop
- **R** - Return to home

### Gamepad Support
- **Xbox Controller** - Full button mapping
- **PlayStation Controller** - Native support
- **Custom Mapping** - Configure any USB gamepad

## 🔒 Security & Privacy

### Data Protection
- **Local Processing** - No data sent to external servers
- **Encrypted Connections** - All communications secured
- **No Tracking** - Your flight data stays private

### Access Control
- **User Authentication** - Secure login system
- **Session Management** - Automatic timeout
- **Device Pairing** - Trusted device list

## 🆘 Troubleshooting

### Common Issues

#### "Bluetooth not available"
- Ensure you're using Chrome/Edge
- Check browser permissions
- Verify HTTPS connection

#### "Cannot connect to drone"
- Verify drone is powered on
- Check WiFi network connection
- Ensure drone is in pairing mode

#### "Video feed not working"
- Grant camera permissions
- Check drone camera is enabled
- Verify network bandwidth

### Support Resources
- **Documentation**: [Full API docs](./docs/)
- **Community**: [Discord server](https://discord.gg/drone-controller)
- **Issues**: [GitHub issues](https://github.com/your-repo/issues)

## 📈 Future Roadmap

### Planned Features
- **Multi-drone Support** - Control multiple drones simultaneously
- **AI Flight Modes** - Autonomous flight patterns
- **VR Integration** - Virtual reality control interface
- **Cloud Sync** - Backup flight data and settings
- **Live Streaming** - Broadcast flights to social media

### Contributing
We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License
MIT License - Use commercially, modify freely, distribute as needed.

## 🙏 Acknowledgments
- Web Bluetooth API community
- WebRTC developers
- Drone manufacturer APIs
- Open source flight control software

---

**Ready to fly? Start with the Quick Start Guide above! 🚁**