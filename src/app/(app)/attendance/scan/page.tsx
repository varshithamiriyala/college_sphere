
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Video, VideoOff, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ScanAttendancePage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      // Check if running in a browser environment
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to scan for attendance.',
          });
        }
      } else {
        setHasCameraPermission(false);
        toast({
            variant: 'destructive',
            title: 'Camera Not Supported',
            description: 'Your browser does not support camera access.',
          });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop the video stream when the component unmounts
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);
  
  const handleMockScan = () => {
      toast({
          title: "Attendance Marked!",
          description: "You have been successfully marked present for Data Structures.",
          action: <div className="p-2 rounded-full bg-green-500"><CheckCircle className="text-white" /></div>
      })
  }

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <QrCode className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Scan Attendance</h1>
            <p className="text-muted-foreground">
                Point your camera at the QR code displayed by your faculty to mark your attendance.
            </p>
        </div>
      </div>
      
      <Card className="max-w-xl mx-auto">
        <CardHeader>
            <CardTitle>Camera View</CardTitle>
            <CardDescription>Position the QR code within the frame.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="relative w-full aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                        <VideoOff className="h-12 w-12 mb-4" />
                        <h3 className="text-xl font-semibold">Camera Access Required</h3>
                        <p className="text-center">Please grant camera permissions to continue.</p>
                    </div>
                )}
                 {hasCameraPermission === null && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                        <Video className="h-12 w-12 mb-4 animate-pulse" />
                        <h3 className="text-xl font-semibold">Requesting Camera...</h3>
                    </div>
                )}
            </div>
            {hasCameraPermission === false && (
                 <Alert variant="destructive">
                    <AlertTitle>Camera Access Denied</AlertTitle>
                    <AlertDescription>
                        You must enable camera permissions in your browser's site settings to use this feature.
                    </AlertDescription>
                </Alert>
            )}
            <Button onClick={handleMockScan} className="w-full" disabled={!hasCameraPermission}>
                Simulate Successful Scan
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                Note: This is a simulation. A real QR scanning library is needed for full functionality.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
