
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export default function RoadmapBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <PenSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Roadmap Builder</h1>
            <p className="text-muted-foreground">
                Create adaptive, day-by-day study plans with progress tracking.
            </p>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature is under construction. Get ready to build your personalized learning path!</p>
        </CardContent>
      </Card>
    </div>
  );
}
