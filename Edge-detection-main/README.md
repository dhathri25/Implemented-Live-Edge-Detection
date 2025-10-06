# EdgeFlow Live - Real-time Edge Detection Viewer

A high-performance web application for real-time edge detection with mobile deployment capabilities.

## 🎯 Project Overview

EdgeFlow Live is a technical assessment project demonstrating:
- Real-time camera frame capture and processing
- Advanced edge detection algorithms (Sobel-based Canny approximation)
- Performance optimization (10-15 FPS target)
- Cross-platform deployment (Web + Native Android via Capacitor)
- Modern web technologies and responsive design

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           Frontend (React + TypeScript)         │
│  ┌──────────────┐         ┌──────────────┐     │
│  │  WebRTC API  │────────▶│ Canvas 2D    │     │
│  │  (Camera)    │         │ Processing   │     │
│  └──────────────┘         └──────────────┘     │
│         │                        │              │
│         ▼                        ▼              │
│  ┌──────────────┐         ┌──────────────┐     │
│  │ Video Stream │────────▶│ Edge         │     │
│  │ (Raw Feed)   │         │ Detection    │     │
│  └──────────────┘         └──────────────┘     │
│                                  │              │
│                                  ▼              │
│                          ┌──────────────┐       │
│                          │ Processed    │       │
│                          │ Output       │       │
│                          └──────────────┘       │
└─────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Capacitor Bridge     │
              │  (Mobile Deployment)   │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Native Android App   │
              └────────────────────────┘
```

## ✨ Features

### Core Functionality
- ✅ Real-time camera access via WebRTC API
- ✅ Sobel-based edge detection algorithm
- ✅ Grayscale conversion
- ✅ Live FPS counter (targeting 10-15 FPS)
- ✅ Toggle between Raw/Edge Detection/Grayscale modes
- ✅ Responsive UI with dark/light mode support

### Technical Implementation
- **Camera Capture**: WebRTC MediaStream API with 720p resolution
- **Processing Pipeline**: Canvas 2D API with per-frame image processing
- **Edge Detection**: Sobel operator convolution with gradient magnitude thresholding
- **Performance**: RequestAnimationFrame-based rendering loop
- **Mobile**: Capacitor integration for native Android deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- For Android: Android Studio + Android SDK

### Web Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

### Mobile Deployment (Android)

1. **Export to GitHub**
   - Click "Export to Github" button in Lovable
   - Clone your repository locally

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add Android platform**
   ```bash
   npx cap add android
   ```

4. **Update native dependencies**
   ```bash
   npx cap update android
   ```

5. **Build the web app**
   ```bash
   npm run build
   ```

6. **Sync to native platform**
   ```bash
   npx cap sync
   ```

7. **Run on Android**
   ```bash
   npx cap run android
   ```

   Or open in Android Studio:
   ```bash
   npx cap open android
   ```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library

### Processing
- **Canvas 2D API** - Image processing
- **WebRTC** - Camera access
- **Sobel Algorithm** - Edge detection

### Mobile
- **Capacitor 6** - Native mobile deployment
- **Capacitor Camera Plugin** - Native camera integration

## 📊 Processing Pipeline

### Edge Detection Algorithm

1. **Grayscale Conversion**
   ```
   gray = (R + G + B) / 3
   ```

2. **Sobel Convolution**
   ```
   Gx = [-1  0  1]    Gy = [-1 -2 -1]
        [-2  0  2]         [ 0  0  0]
        [-1  0  1]         [ 1  2  1]
   ```

3. **Gradient Magnitude**
   ```
   magnitude = √(Gx² + Gy²)
   ```

4. **Thresholding**
   ```
   edge = magnitude > 50 ? 255 : 0
   ```

## 🎯 Performance Targets

- **FPS**: 10-15 FPS sustained
- **Resolution**: 1280x720 (720p)
- **Latency**: <100ms processing time per frame
- **Memory**: Efficient canvas reuse

## 📱 Mobile-Specific Features

When deployed as Android app:
- Native camera access via Capacitor Camera plugin
- Full-screen immersive mode
- Hardware acceleration for canvas rendering
- Background processing optimization

## 🔧 Configuration

### Capacitor Config (`capacitor.config.ts`)
```typescript
{
  appId: 'app.lovable.edgeflow',
  appName: 'edgeflow-live',
  webDir: 'dist',
  plugins: {
    Camera: {
      androidxExifInterface: true
    }
  }
}
```

## 📝 Development Timeline (3-Day Assessment)

### Day 1: Core Setup & Camera
- ✅ Project initialization
- ✅ Camera access implementation
- ✅ Basic video rendering
- ✅ FPS counter

### Day 2: Processing Pipeline
- ✅ Canvas processing setup
- ✅ Edge detection algorithm
- ✅ Grayscale conversion
- ✅ Mode toggling

### Day 3: Mobile & Polish
- ✅ Capacitor integration
- ✅ Android deployment setup
- ✅ UI/UX refinement
- ✅ Documentation

## 🐛 Troubleshooting

### Camera Access Issues
- Ensure HTTPS or localhost (required for WebRTC)
- Grant camera permissions in browser/device settings
- Check browser compatibility (Chrome/Edge recommended)

### Performance Issues
- Reduce video resolution in camera constraints
- Adjust threshold values in edge detection
- Check device hardware capabilities

### Android Build Issues
- Ensure Android SDK is properly configured
- Run `npx cap sync android` after code changes
- Check AndroidManifest.xml for camera permissions

## 📚 Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Lovable Mobile Development Guide](https://lovable.dev/blogs/TODO)

## 📄 License

MIT License - Free for educational and commercial use

## 🤝 Contributing

This is an assessment project, but contributions and suggestions are welcome!

---

Built with ❤️ using Lovable, React, and Capacitor
