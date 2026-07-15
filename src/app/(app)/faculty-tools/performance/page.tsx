
'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart as LineChartIcon, Users, BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const studentPerformanceData = [
  { student: 'Alice', score: 88 }, { student: 'Bob', score: 92 }, { student: 'Charlie', score: 75 },
  { student: 'David', score: 95 }, { student: 'Eve', score: 81 }, { student: 'Frank', score: 68 },
];

const topicMasteryData = [
    { topic: 'Arrays', mastery: 95 }, { topic: 'Linked Lists', mastery: 85 }, { topic: 'Trees', mastery: 72 },
    { topic: 'Graphs', mastery: 65 }, { topic: 'Sorting', mastery: 90 }, { topic: 'Searching', mastery: 98 },
]

export default function PerformanceAnalyticsPage() {
    const chartConfig = {
        score: { label: "Score (%)", color: "hsl(var(--primary))" },
        mastery: { label: "Mastery (%)", color: "hsl(var(--accent))" },
    };

  return (
    <div className="space-y-6">
       <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <LineChartIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
            <p className="text-muted-foreground">
                Visual dashboards showing student performance, subject mastery, and weak areas.
            </p>
        </div>
      </div>
      
       <Card>
        <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <CardTitle>Filter Analytics</CardTitle>
                    <CardDescription>Select a batch and subject to view performance data.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select Batch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cs-a">CS-A</SelectItem>
                            <SelectItem value="cs-b">CS-B</SelectItem>
                            <SelectItem value="ee-a">EE-A</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ds">Data Structures</SelectItem>
                            <SelectItem value="algo">Algorithms</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Student Performance (Data Structures)</CardTitle>
            <CardDescription>Overall scores in the last assessment.</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                <BarChart data={studentPerformanceData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="student" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 100]}/>
                    <Tooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" radius={4} />
                </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
            <CardTitle>Topic Mastery (Data Structures)</CardTitle>
            <CardDescription>Average student mastery level per topic.</CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                <LineChart data={topicMasteryData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="topic" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[50, 100]}/>
                    <Tooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="mastery" stroke="var(--color-mastery)" strokeWidth={2} dot={true} />
                </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

