
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Star className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Mentorship</h1>
            <p className="text-muted-foreground">
                Connect with alumni or professionals for guidance.
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
