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
    <div className="grid grid-cols-1 gap-1 overflow-x-auto rounded-lg border bg-card p-1 md:grid-cols-[auto,repeat(6,1fr)]">
      {/* Time Header */}
      <div className="hidden md:block"></div>
      {days.map(day => (
        <div key={day} className="sticky top-0 z-10 bg-card p-3 text-center font-bold">
          {day}
        </div>
      ))}
      
      {timeSlots.map(time => (
        <div key={time} className="grid grid-cols-1 md:grid-cols-[auto,repeat(6,1fr)] md:contents">
          <div className="sticky left-0 bg-card p-3 text-center font-semibold md:text-right">
            {time}
          </div>
          {days.map(day => {
            const entry = getEntry(day, time);
            return (
              <div key={`${day}-${time}`} className="min-h-[120px] border-t border-dashed bg-background/50 p-1 first:border-t-0 md:border-l md:border-t-0">
                {entry && (
                  <Card className="h-full transform transition-transform hover:scale-[1.02] hover:shadow-lg">
                    <CardContent className="flex h-full flex-col justify-between p-3 text-xs">
                        <div className='space-y-1'>
                            <p className="font-bold">{entry.subject}</p>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{entry.faculty}</span>
                            </div>
                        </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="secondary">{entry.batch}</Badge>
                        <Badge variant="outline">{entry.room}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
