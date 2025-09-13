
'use client';

import { useState, useEffect } from 'react';
import { Check, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Theme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

const themes: Theme[] = [
  { name: 'Default', primary: '231 48% 48%', secondary: '0 0% 92%', accent: '262 52% 58%', background: '0 0% 96.1%' },
  { name: 'Oceanic', primary: '205 90% 45%', secondary: '210 40% 96.1%', accent: '180 70% 40%', background: '210 40% 98%' },
  { name: 'Forest', primary: '140 60% 35%', secondary: '120 20% 95%', accent: '90 50% 45%', background: '120 20% 99%' },
  { name: 'Sunset', primary: '25 95% 55%', secondary: '30 50% 95%', accent: '0 85% 60%', background: '20 40% 98%' },
  { name: 'Lavender', primary: '250 60% 60%', secondary: '250 30% 96%', accent: '240 80% 75%', background: '250 30% 99%' },
];

export default function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Default');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('app-theme') || 'Default';
    const theme = themes.find(t => t.name === storedTheme) || themes[0];
    applyTheme(theme);
    setActiveTheme(theme.name);
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
    // Simple mapping for card/muted as they are often derived from background/secondary
    root.style.setProperty('--card', theme.background === '0 0% 96.1%' ? '0 0% 100%' : theme.background);
    root.style.setProperty('--muted', theme.secondary);
  };

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = themes.find(t => t.name === themeName);
    if (selectedTheme) {
      applyTheme(selectedTheme);
      setActiveTheme(selectedTheme.name);
      localStorage.setItem('app-theme', selectedTheme.name);
      toast({
        title: 'Theme Updated',
        description: `Switched to the ${selectedTheme.name} theme.`,
      });
    }
  };

  if (!mounted) {
    return null; // or a skeleton loader
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Color Palette</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {themes.map((theme) => (
          <div key={theme.name} className="space-y-2">
            <Button
              variant="outline"
              className={cn(
                'flex flex-col items-start justify-start h-20 w-full p-2 relative',
                activeTheme === theme.name && 'border-2 border-primary'
              )}
              onClick={() => handleThemeChange(theme.name)}
            >
              <div className="flex w-full h-full">
                <div style={{ backgroundColor: `hsl(${theme.primary})` }} className="w-1/2 h-full rounded-l-sm" />
                <div className="flex flex-col w-1/2 h-full">
                  <div style={{ backgroundColor: `hsl(${theme.accent})` }} className="h-1/2 rounded-tr-sm" />
                  <div style={{ backgroundColor: `hsl(${theme.secondary})` }} className="h-1/2 rounded-br-sm" />
                </div>
              </div>
              {activeTheme === theme.name && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">{theme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
