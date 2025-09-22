
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCopy } from "lucide-react";

export default function SubjectOrganizerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <BookCopy className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Subject Organizer</h1>
            <p className="text-muted-foreground">
                A digital notebook to create subjects, units, and upload PDF notes.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This feature is under construction. Soon you'll be able to organize all your study materials here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
