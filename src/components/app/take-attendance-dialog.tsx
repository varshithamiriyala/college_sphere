
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import QRCode from "react-qr-code";
import { QrCode } from 'lucide-react';

interface ClassInfo {
    id: number;
    subject?: string;
    title?: string;
    batch: string;
    time: string;
}

interface TakeAttendanceDialogProps {
    classInfo: ClassInfo;
}

const QR_VALIDITY_SECONDS = 60;

export function TakeAttendanceDialog({ classInfo }: TakeAttendanceDialogProps) {
  const [open, setOpen] = useState(false);
  const [qrValue, setQrValue] = useState('');
  const [countdown, setCountdown] = useState(QR_VALIDITY_SECONDS);

  useEffect(() => {
    if (open) {
      // Generate a new unique value for the QR code when the dialog opens
      const uniqueSessionId = `class:${classInfo.id}-batch:${classInfo.batch}-time:${Date.now()}`;
      setQrValue(uniqueSessionId);
      setCountdown(QR_VALIDITY_SECONDS);
    }
  }, [open, classInfo]);
  
  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (open && countdown === 0) {
        // In a real app, you might auto-close or show a "expired" message
        setQrValue(''); // Invalidate QR code
    }
  }, [open, countdown]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><QrCode className="mr-2"/> Take Attendance</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Live Attendance for {classInfo.subject || classInfo.title}</DialogTitle>
          <DialogDescription>
            Students can scan this QR code to mark their attendance. The code is valid for a limited time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
            {qrValue ? (
                <div className="bg-white p-4 rounded-lg">
                    <QRCode value={qrValue} size={256} />
                </div>
            ) : (
                <div className="h-[288px] w-[288px] flex items-center justify-center bg-muted rounded-lg">
                    <p className="text-muted-foreground">QR Code has expired.</p>
                </div>
            )}
            <div className="text-center">
                <p className="text-lg font-medium">
                    Code expires in: <span className="font-bold text-primary">{countdown}s</span>
                </p>
                <p className="text-xs text-muted-foreground">A new code will be generated next time.</p>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
