# 🚀 Deployment & Ownership Guide

## Quick Deployment Options

### Option 1: Claim Existing Deployment (Fastest)
1. **Visit the live site**: https://jocular-youtiao-e5f1c1.netlify.app
2. **Claim ownership**: https://app.netlify.com/claim?utm_source=bolt#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI1aDZmZEstVktNTXZuRjNiRlZUaktfU2JKVGgzNlNfMjJheTlpTHhVX0Q4Iiwic2Vzc2lvbl9pZCI6IjUxMzg1NzQ4OjI0ODg5MzIiLCJpYXQiOjE3NTEzOTE1MTV9.OI4aqX4N-zVyWzXv1KJPxjQgl0Cm2I5vNVuWOFJLb_o
3. **Sign up/Login** to Netlify
4. **You now own the controller!**

### Option 2: Deploy Your Own Copy

#### Prerequisites
- Node.js 18+ installed
- Git installed
- Netlify account (free)

#### Steps
```bash
# 1. Clone this repository
git clone <your-repo-url>
cd drone-controller

# 2. Install dependencies
npm install

# 3. Test locally
npm run dev

# 4. Build for production
npm run build

# 5. Deploy to Netlify
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## 🔧 Environment Setup

### Required Environment Variables
Create a `.env` file in your project root:

```env
# Drone Connection Settings
VITE_DRONE_DEFAULT_IP=192.168.4.1
VITE_DRONE_PORT=8889
VITE_VIDEO_PORT=11111

# Bluetooth Configuration
VITE_BLUETOOTH_SERVICE_UUID=12345678-1234-1234-1234-123456789abc
VITE_COMMAND_CHARACTERISTIC_UUID=87654321-4321-4321-4321-cba987654321
VITE_TELEMETRY_CHARACTERISTIC_UUID=11111111-2222-3333-4444-555555555555

# Safety Settings
VITE_ENABLE_GEOFENCING=true
VITE_MAX_ALTITUDE=120
VITE_MAX_DISTANCE=500
VITE_LOW_BATTERY_THRESHOLD=20

# Video Settings
VITE_DEFAULT_VIDEO_QUALITY=medium
VITE_MAX_RECORDING_TIME=1800
```

### Netlify Deployment Configuration
Create `netlify.toml` in your project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🌐 Custom Domain Setup

### Using Netlify
1. Go to your Netlify dashboard
2. Select your drone controller site
3. Go to "Domain settings"
4. Click "Add custom domain"
5. Enter your domain (e.g., `mydrone.com`)
6. Follow DNS configuration instructions

### DNS Configuration
Add these records to your domain:

```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

## 🔒 HTTPS & Security

### Automatic HTTPS
Netlify provides automatic HTTPS certificates. Your drone controller will be accessible at:
- `https://your-domain.com`
- `https://your-site-name.netlify.app`

### Security Headers
The controller includes security headers for:
- XSS protection
- Content type sniffing prevention
- Frame options
- Referrer policy

## 📱 Progressive Web App (PWA)

### Installation
Your deployed controller works as a PWA:

1. **Mobile**: Visit site → "Add to Home Screen"
2. **Desktop**: Visit site → Install icon in address bar
3. **Works offline** for basic functionality

### PWA Features
- ✅ Offline capability
- ✅ App-like experience
- ✅ Push notifications (future)
- ✅ Background sync (future)

## 🔄 Continuous Deployment

### GitHub Integration
1. Connect your GitHub repository to Netlify
2. Enable auto-deploy on push to main branch
3. Set up branch previews for testing

### Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📊 Analytics & Monitoring

### Built-in Analytics
Enable Netlify Analytics:
1. Go to your site dashboard
2. Enable "Analytics"
3. View traffic, performance, and usage data

### Error Monitoring
Add error tracking:

```javascript
// src/utils/errorTracking.js
export const trackError = (error, context) => {
  console.error('Drone Controller Error:', error, context);
  
  // Send to your preferred error tracking service
  // Example: Sentry, LogRocket, etc.
};
```

## 🚀 Performance Optimization

### Build Optimization
The controller is optimized for:
- **Fast loading** - Code splitting and lazy loading
- **Small bundle size** - Tree shaking and minification
- **Caching** - Aggressive caching for static assets

### Performance Metrics
Target metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

## 🔧 Customization

### Branding
Update these files for your branding:
- `public/favicon.ico` - Your favicon
- `index.html` - Title and meta tags
- `src/components/LoginPage.tsx` - Logo and branding
- `README.md` - Project description

### Configuration
Modify `src/config/droneConfig.ts`:

```typescript
export const droneConfig = {
  supportedDrones: [
    { name: 'DJI Tello', type: 'wifi', ip: '192.168.4.1' },
    { name: 'Custom Drone', type: 'bluetooth', uuid: 'your-uuid' }
  ],
  defaultSettings: {
    maxAltitude: 120,
    maxSpeed: 10,
    videoQuality: 'medium'
  }
};
```

## 🆘 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### HTTPS Required Error
- Ensure you're accessing via HTTPS
- Bluetooth/Camera APIs require secure context

#### Deployment Not Updating
- Check build logs in Netlify dashboard
- Verify environment variables are set
- Clear browser cache

### Support Resources
- **Documentation**: [Full API docs](./docs/)
- **Community**: [Discord server](https://discord.gg/drone-controller)
- **Issues**: [GitHub issues](https://github.com/your-repo/issues)

## 📈 Scaling & Advanced Features

### Multi-Drone Support
Future roadmap includes:
- Control multiple drones simultaneously
- Swarm flight patterns
- Coordinated missions

### Cloud Integration
Planned integrations:
- Cloud flight logs
- Remote drone access
- Fleet management

### Enterprise Features
Available for enterprise:
- Custom branding
- Advanced analytics
- Priority support
- On-premise deployment

---

**🎉 Congratulations! You now own a production-ready drone controller!**

Need help? Check the [README.md](./README.md) for detailed usage instructions.