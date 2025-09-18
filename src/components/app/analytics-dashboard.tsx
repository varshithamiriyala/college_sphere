
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
    // and doesn't cause hydration issues.
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
    hours: { label: "Workload (Hours)", color: "hsl(var(--primary))" },
    days: { label: "Leave Days", color: "hsl(var(--accent))" },
    marks: { label: "Marks", color: "hsl(var(--chart-1))" },
    assignments: { label: "Assignments", color: "hsl(var(--chart-2))" },
    attendance: { label: "Attendance", color: "hsl(var(--chart-3))" },
  }), []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Faculty Workload Distribution</CardTitle>
          <CardDescription>Weekly teaching hours per faculty member.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={workloadData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave Trends</CardTitle>
          <CardDescription>Total leave days taken by all faculty per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={leaveTrendsData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="days" stroke="var(--color-days)" strokeWidth={2} dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Submission Compliance Rates (%)</CardTitle>
          <CardDescription>Percentage of on-time submissions for key academic tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer>
                <BarChart data={submissionData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 100]} />
                    <Tooltip cursor={false} content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="marks" fill="var(--color-marks)" radius={4} />
                    <Bar dataKey="assignments" fill="var(--color-assignments)" radius={4} />
                    <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
