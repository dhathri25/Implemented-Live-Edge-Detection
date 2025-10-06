import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1c754ab766574acab28faa0e1471c8ff',
  appName: 'edgeflow-live',
  webDir: 'dist',
  server: {
    url: 'https://1c754ab7-6657-4aca-b28f-aa0e1471c8ff.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      androidxExifInterface: true
    }
  }
};

export default config;
