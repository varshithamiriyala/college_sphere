
'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { facultyData } from '@/lib/data';
import { useMemo } from 'react';

const leaveTrendsData = [
    { month: 'Jan', days: 5 }, { month: 'Feb', days: 3 }, { month: 'Mar', days: 8 },
    { month: 'Apr', days: 4 }, { month: 'May', days: 10 }, { month: 'Jun', days: 6 },
    { month: 'Jul', days: 12 }, { month: 'Aug', days: 7 }, { month: 'Sep', days: 5 },
];

export default function AnalyticsDashboard() {

  const { workloadData, submissionData } = useMemo(() => {
    // Memoize random data generation to ensure it's consistent across re-renders
    // and doesn't cause hydration issues on the client side.
    const workload = facultyData.map(f => ({
      name: f.name.split(' ').slice(1).join(' '),
      hours: Math.floor(Math.random() * 20) + 10, // Mock weekly hours
    }));

    const submissions = facultyData.map(f => ({
      name: f.name.split(' ').slice(1).join(' '),
      ...f.submissions,
    }));

    return { workloadData: workload, submissionData: submissions };
  }, []);

  const chartConfig = useMemo(() => ({
    hours: { label: "Workload (Hours)", color: "hsl(221 46% 20%)" },
    days: { label: "Leave Days", color: "hsl(38 75% 56%)" },
    marks: { label: "Marks Compliance", color: "hsl(221 46% 20%)" },
    assignments: { label: "Assignments Compliance", color: "hsl(38 75% 56%)" },
    attendance: { label: "Attendance Compliance", color: "hsl(216 18% 43%)" },
  }), []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="campus-card">
        <CardHeader className="border-b border-border/20 pb-4 relative">
          <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
            [ANL.WORK]
          </div>
          <CardTitle className="text-md font-bold font-display">Faculty Workload Distribution</CardTitle>
          <CardDescription className="text-xs">Weekly teaching hours per faculty officer.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <ResponsiveContainer>
              <BarChart data={workloadData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid vertical={false} stroke="rgba(27, 42, 74, 0.08)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="hsl(221, 46%, 20%)" radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="campus-card">
        <CardHeader className="border-b border-border/20 pb-4 relative">
          <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
            [ANL.LEAVE]
          </div>
          <CardTitle className="text-md font-bold font-display">Leave Trends</CardTitle>
          <CardDescription className="text-xs">Total leave days compiled per active monthly period.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart data={leaveTrendsData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid vertical={false} stroke="rgba(27, 42, 74, 0.08)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="days" stroke="hsl(38, 75%, 56%)" strokeWidth={2.5} dot={{ fill: 'hsl(38, 75%, 56%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="campus-card lg:col-span-2">
        <CardHeader className="border-b border-border/20 pb-4 relative">
          <div className="absolute top-2 right-2 text-[9px] font-mono text-muted-foreground uppercase font-bold">
            [ANL.COMPL]
          </div>
          <CardTitle className="text-md font-bold font-display">Submission Compliance Rates (%)</CardTitle>
          <CardDescription className="text-xs">Percentage of on-time log entries and curriculum tracking obligations.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="h-[360px] w-full">
            <ResponsiveContainer>
                <BarChart data={submissionData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="rgba(27, 42, 74, 0.08)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                    <YAxis domain={[50, 100]} tickLine={false} axisLine={false} tick={{ fill: '#5B6B82', fontSize: 10, fontFamily: 'monospace' }} />
                    <Tooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="marks" fill="hsl(221, 46%, 20%)" radius={2} />
                    <Bar dataKey="assignments" fill="hsl(38, 75%, 56%)" radius={2} />
                    <Bar dataKey="attendance" fill="hsl(216, 18%, 43%)" radius={2} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
