import TimetableGenerator from '@/components/app/timetable-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GenerateTimetablePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Generate Timetable</h1>
        <p className="text-muted-foreground">Generate conflict-free timetables with the power of AI.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Timetable Generator</CardTitle>
          <CardDescription>
            Provide the necessary data to generate multiple timetable options. Use comma-separated values for lists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimetableGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
