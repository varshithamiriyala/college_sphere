
'use client';

import { useState, useEffect } from 'react';
import { Check, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Theme = {
  name: string;
  primary: string;
  background: string;
  accent: string;
};

const themes: Theme[] = [
    { name: 'Default', primary: '222.2 47.4% 11.2%', background: '0 0% 100%', accent: '210 40% 96.1%' },
    { name: 'Oceanic', primary: '205 90% 45%', background: '210 40% 98%', accent: '180 70% 40%' },
    { name: 'Forest', primary: '140 60% 35%', background: '120 20% 99%', accent: '90 50% 45%' },
    { name: 'Sunset', primary: '25 95% 55%', background: '20 40% 98%', accent: '0 85% 60%' },
    { name: 'Lavender', primary: '250 60% 60%', background: '250 30% 99%', accent: '240 80% 75%' },
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
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--accent', theme.accent);
    // Simple derivatives
    root.style.setProperty('--card', theme.background);
    root.style.setProperty('--muted', `hsl(${theme.accent} / 0.5)`);
    root.style.setProperty('--secondary', `hsl(${theme.accent} / 0.2)`);
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
                  <div style={{ backgroundColor: `hsl(${theme.background})`, border: '1px solid hsl(var(--border))' }} className="h-1/2 rounded-br-sm" />
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
