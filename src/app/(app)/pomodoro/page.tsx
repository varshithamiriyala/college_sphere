
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";

export default function PomodoroTimerPage() {
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
          <CardTitle>Stay Focused</CardTitle>
          <CardDescription>Use the timer to work in focused 25-minute intervals.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="text-8xl font-bold font-mono tracking-tighter my-8">25:00</div>
            <div className="mt-4 flex gap-2 justify-center">
                <Button size="lg">Start Focus</Button>
                <Button size="lg" variant="outline">Short Break</Button>
                <Button size="lg" variant="outline">Long Break</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
