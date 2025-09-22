
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 } from "lucide-react";

export default function CodingPracticePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Code2 className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Coding Practice</h1>
            <p className="text-muted-foreground">
                Topic- and difficulty-based coding challenges with AI hints.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Feature Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature is currently under development. Check back soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
