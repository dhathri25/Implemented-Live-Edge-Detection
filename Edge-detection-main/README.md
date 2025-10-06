EdgeFlow Pro – Real-Time Edge Detection Viewer

EdgeFlow Pro is a high-performance web application that captures live camera frames and performs real-time edge detection. The app can run on the web and be deployed as a native Android app using Capacitor.

This project demonstrates your ability to integrate web technologies with native mobile features, implement image processing algorithms, and optimize performance for real-time applications.

🎯 Project Overview

EdgeFlow Pro highlights:

Real-time camera capture and frame processing

Edge detection using Sobel-based algorithms

Smooth performance targeting 10–15 FPS

Cross-platform deployment: Web + Android

Modern responsive design

This project is structured as a 3-day technical assessment to showcase your skills in frontend development, image processing, and mobile deployment.

🏗️ Architecture
Camera (WebRTC) ─▶ Canvas 2D ─▶ Edge Detection ─▶ Processed Output
                                  │
                               Capacitor
                                  │
                              Android App


Explanation:

Camera (WebRTC) – Captures live video frames from the device camera.

Canvas 2D Processing – Each frame is converted to grayscale and processed using the Sobel algorithm for edge detection.

Output – The processed video is displayed in real-time on the web or mobile.

Capacitor Bridge – Packages the web app as a native Android app with access to device features.

✨ Features
Core Features

✅ Real-time camera feed

✅ Edge detection and grayscale modes

✅ Toggle between Raw / Edge Detection / Grayscale

✅ Live FPS counter

✅ Responsive UI with dark/light mode

Technical Implementation

Camera Capture: WebRTC MediaStream API, 720p resolution

Processing Pipeline: Canvas 2D API for per-frame image manipulation

Edge Detection: Sobel operator convolution with gradient magnitude thresholding

Performance Optimization: requestAnimationFrame rendering loop

Mobile Integration: Capacitor with Camera plugin

🚀 Quick Start
Prerequisites

Node.js 18+ and npm

Android Studio + Android SDK (for mobile deployment)

Web Development
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build


Access at http://localhost:5173

Mobile Deployment (Android)
# Add Android platform
npx cap add android

# Sync web build to native project
npx cap sync

# Run on Android device/emulator
npx cap run android

# Or open Android Studio
npx cap open android

🛠️ Technology Stack
Frontend

React 18

TypeScript

Vite (build tool)

Tailwind CSS

shadcn/ui

Processing

Canvas 2D API

WebRTC API

Sobel-based edge detection

Mobile

Capacitor 6

Capacitor Camera Plugin

📊 Processing Pipeline
Edge Detection Algorithm

Grayscale Conversion

gray = (R + G + B) / 3


Sobel Convolution

Gx = [-1 0 1]    Gy = [-1 -2 -1]
     [-2 0 2]         [ 0 0 0]
     [-1 0 1]         [ 1 2 1]


Gradient Magnitude

magnitude = Math.sqrt(Gx*Gx + Gy*Gy)


Thresholding

edge = magnitude > 50 ? 255 : 0

🎯 Performance Targets

FPS: 10–15

Resolution: 1280x720

Latency: <100ms/frame

Efficient memory usage via canvas reuse

📱 Mobile-Specific Features

Native camera access via Capacitor Camera plugin

Full-screen immersive mode

Hardware-accelerated canvas rendering

Background processing optimization

🔧 Configuration
Capacitor Config (capacitor.config.ts)
{
  appId: 'com.newcompany.edgeflow', // new app ID
  appName: 'EdgeFlow Pro',           // new app display name
  webDir: 'dist',
  plugins: {
    Camera: {
      androidxExifInterface: true
    }
  }
}


This ensures that Android treats this as a separate app and preserves image metadata correctly.

🐛 Troubleshooting

Camera issues: Use HTTPS or localhost, allow permissions, recommended browsers: Chrome/Edge

Low FPS: Reduce camera resolution, tweak threshold values

Android build issues: Ensure Android SDK setup, run npx cap sync, check AndroidManifest.xml for permissions

📚 Resources

Capacitor Documentation

WebRTC API

Canvas 2D API

📝 Development Timeline (3-Day Assessment)
Day 1: Core Setup & Camera

Project initialization

Camera access implementation

Basic video rendering

FPS counter

Day 2: Processing Pipeline

Canvas processing setup

Edge detection and grayscale conversion

Mode toggling

Day 3: Mobile & Polish

Capacitor integration

Android deployment setup

UI/UX refinement

Documentation

🤝 License

MIT License – Free for personal, educational, and commercial use
