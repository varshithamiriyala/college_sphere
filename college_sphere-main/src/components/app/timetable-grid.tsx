'use client';

import { TimetableEntry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock, Building, BookOpen } from 'lucide-react';

interface TimetableGridProps {
  timetable: TimetableEntry[];
}

export default function TimetableGrid({ timetable }: TimetableGridProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = Array.from(new Set(timetable.map(entry => entry.time))).sort();

  const getEntry = (day: string, time: string) => {
    return timetable.find(entry => entry.day === day && entry.time === time);
  };

  return (
    <div className="grid grid-cols-1 overflow-x-auto rounded-none border-2 border-[#1B2A4A] dark:border-border bg-[#EEF2F6] dark:bg-card/20 p-0 md:grid-cols-[110px,repeat(6,1fr)] divide-y divide-[#1B2A4A] dark:divide-border md:divide-y-0">
      {/* Time Header Column Filler */}
      <div className="hidden md:flex bg-[#1B2A4A] dark:bg-[#10192B] border-r border-b border-[#1B2A4A] dark:border-border items-center justify-center text-[10px] font-mono text-[#E2A73E] font-bold">
        [SCHED]
      </div>
      {days.map(day => (
        <div key={day} className="sticky top-0 z-10 bg-[#1B2A4A] dark:bg-[#10192B] border-b border-[#1B2A4A] dark:border-border p-3 text-center font-bold font-display text-xs tracking-wider text-[#EEF2F6] md:border-r last:border-r-0 uppercase">
          {day}
        </div>
      ))}
      
      {timeSlots.map(time => (
        <div key={time} className="grid grid-cols-1 md:grid-cols-[110px,repeat(6,1fr)] md:contents">
          <div className="sticky left-0 bg-[#1B2A4A]/5 dark:bg-[#10192B]/50 p-3 text-center font-bold font-mono text-xs flex items-center justify-center text-[#1B2A4A] dark:text-[#EEF2F6] border-b border-r border-[#1B2A4A]/20 dark:border-border/30">
            {time}
          </div>
          {days.map((day, idx) => {
            const entry = getEntry(day, time);
            return (
              <div key={`${day}-${time}`} className="min-h-[145px] bg-[#FFFFFF] dark:bg-card/40 p-2 border-b border-r border-[#1B2A4A]/10 dark:border-border/20 md:last:border-r-0">
                {entry && (
                  <div className="h-full border border-[#1B2A4A]/20 dark:border-border/30 bg-card rounded-[2px] p-3 flex flex-col justify-between text-xs hover:border-[#E2A73E] dark:hover:border-[#E2A73E] hover:bg-[#E2A73E]/5 transition-colors relative">
                    <div className="space-y-1">
                      <p className="font-bold font-sans text-sm text-[#1B2A4A] dark:text-[#EEF2F6] leading-tight">{entry.subject}</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#5B6B82] dark:text-muted-foreground font-sans">
                        <User className="h-3 w-3 shrink-0 text-[#E2A73E]" />
                        <span className="truncate">{entry.faculty}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1 items-center">
                      <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-bold bg-[#E2A73E]/20 text-[#E2A73E] border border-[#E2A73E]/30 uppercase">
                        {entry.batch}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-bold bg-transparent text-[#5B6B82] dark:text-muted-foreground border border-border">
                        {entry.room}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
