import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, StopCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ProcessMode = 'raw' | 'edges' | 'grayscale';

export const EdgeDetectionViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<ProcessMode>('edges');
  const [fps, setFps] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();
  const fpsIntervalRef = useRef<number>();
  const frameCountRef = useRef(0);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          startProcessing();
        };
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please grant camera permissions.",
        variant: "destructive"
      });
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (fpsIntervalRef.current) {
      clearInterval(fpsIntervalRef.current);
    }
    setIsStreaming(false);
    setFps(0);
  };

  const applyCannyEdgeDetection = (
    imageData: ImageData,
    width: number,
    height: number
  ): ImageData => {
    const output = new ImageData(width, height);
    const gray = new Uint8ClampedArray(width * height);
    
    // Convert to grayscale
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      gray[i / 4] = avg;
    }
    
    // Simple Sobel edge detection
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0;
        let gy = 0;
        
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = (y + ky) * width + (x + kx);
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            gx += gray[idx] * sobelX[kernelIdx];
            gy += gray[idx] * sobelY[kernelIdx];
          }
        }
        
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const threshold = magnitude > 50 ? 255 : 0;
        
        const outIdx = (y * width + x) * 4;
        output.data[outIdx] = threshold;
        output.data[outIdx + 1] = threshold;
        output.data[outIdx + 2] = threshold;
        output.data[outIdx + 3] = 255;
      }
    }
    
    return output;
  };

  const applyGrayscale = (imageData: ImageData): ImageData => {
    const output = new ImageData(imageData.width, imageData.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const gray = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      output.data[i] = gray;
      output.data[i + 1] = gray;
      output.data[i + 2] = gray;
      output.data[i + 3] = 255;
    }
    return output;
  };

  const processFrame = () => {
    if (!videoRef.current || !canvasRef.current || !processCanvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const processCanvas = processCanvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const processCtx = processCanvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx || !processCtx) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    processCanvas.width = video.videoWidth;
    processCanvas.height = video.videoHeight;
    
    ctx.drawImage(video, 0, 0);
    frameCountRef.current++;
    
    if (mode !== 'raw') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let processed: ImageData;
      
      if (mode === 'edges') {
        processed = applyCannyEdgeDetection(imageData, canvas.width, canvas.height);
      } else {
        processed = applyGrayscale(imageData);
      }
      
      processCtx.putImageData(processed, 0, 0);
    }
    
    animationRef.current = requestAnimationFrame(processFrame);
  };

  const startProcessing = () => {
    frameCountRef.current = 0;
    
    fpsIntervalRef.current = window.setInterval(() => {
      setFps(frameCountRef.current);
      frameCountRef.current = 0;
    }, 1000);
    
    processFrame();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              EdgeFlow Live
            </h1>
            <p className="text-muted-foreground mt-1">Real-time Edge Detection Viewer</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            {fps} FPS
          </Badge>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            {!isStreaming ? (
              <Button onClick={startCamera} size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Start Camera
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="destructive" size="lg" className="gap-2">
                <StopCircle className="w-5 h-5" />
                Stop Camera
              </Button>
            )}
            
            <div className="flex gap-2">
              <Button
                variant={mode === 'raw' ? 'default' : 'outline'}
                onClick={() => setMode('raw')}
                disabled={!isStreaming}
              >
                <Video className="w-4 h-4 mr-2" />
                Raw
              </Button>
              <Button
                variant={mode === 'edges' ? 'default' : 'outline'}
                onClick={() => setMode('edges')}
                disabled={!isStreaming}
              >
                Edge Detection
              </Button>
              <Button
                variant={mode === 'grayscale' ? 'default' : 'outline'}
                onClick={() => setMode('grayscale')}
                disabled={!isStreaming}
              >
                Grayscale
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Raw Feed</h3>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ display: mode === 'raw' ? 'block' : 'none' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Processed Output</h3>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <canvas
                  ref={processCanvasRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {!isStreaming && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Start camera to see processed output
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3">Technical Details</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Processing:</span>
              <p className="mt-1">Canvas 2D API with Sobel edge detection</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Camera:</span>
              <p className="mt-1">WebRTC MediaStream API (720p)</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Target FPS:</span>
              <p className="mt-1">10-15 FPS real-time processing</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
