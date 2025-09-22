
'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const modes = {
  focus: {
    duration: 25 * 60,
    title: "Focus",
    description: "Time to lock in and get things done.",
    className: "bg-primary text-primary-foreground",
  },
  short: {
    duration: 5 * 60,
    title: "Short Break",
    description: "Time for a quick stretch and a breather.",
    className: "bg-green-500 text-white",
  },
  long: {
    duration: 15 * 60,
    title: "Long Break",
    description: "Time for a longer rest to recharge.",
    className: "bg-sky-500 text-white",
  }
};

type Mode = keyof typeof modes;

export default function PomodoroTimerPage() {
  const [mode, setMode] = useState<Mode>('focus');
  const [timeRemaining, setTimeRemaining] = useState(modes.focus.duration);
  const [isActive, setIsActive] = useState(false);
  const alarmRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      setIsActive(false);
      if (alarmRef.current) {
        alarmRef.current.play();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  useEffect(() => {
    document.title = `${formatTime(timeRemaining)} - ${modes[mode].title}`;
  }, [timeRemaining, mode]);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeRemaining(modes[newMode].duration);
  }, []);

  const handleStartPause = () => {
    setIsActive(prev => !prev);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setTimeRemaining(modes[mode].duration);
  }

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Timer className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Pomodoro Timer</h1>
            <p className="text-muted-foreground">
                Boost your productivity with the Pomodoro technique.
            </p>
        </div>
      </div>
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
            <div className="flex justify-center gap-2 mb-2">
                <Button size="sm" variant={mode === 'focus' ? 'default' : 'outline'} onClick={() => handleModeChange('focus')}>Focus</Button>
                <Button size="sm" variant={mode === 'short' ? 'default' : 'outline'} onClick={() => handleModeChange('short')}>Short Break</Button>
                <Button size="sm" variant={mode === 'long' ? 'default' : 'outline'} onClick={() => handleModeChange('long')}>Long Break</Button>
            </div>
          <CardTitle>{modes[mode].title}</CardTitle>
          <CardDescription>{modes[mode].description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className={cn("text-8xl font-bold font-mono tracking-tighter my-8 p-6 rounded-lg transition-colors", modes[mode].className)}>
                {formatTime(timeRemaining)}
            </div>
            <div className="mt-4 flex gap-2 justify-center">
                <Button size="lg" onClick={handleStartPause} className="w-32">
                    {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                    {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button size="lg" variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-2" />
                    Reset
                </Button>
            </div>
        </CardContent>
      </Card>
      <audio ref={alarmRef} src="/sounds/alarm-bell.mp3" preload="auto" />
    </div>
  );
}
