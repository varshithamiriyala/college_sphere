import TimetableGrid from "@/components/app/timetable-grid";
import RearrangementSuggester from "@/components/app/rearrangement-suggester";
import { Button } from "@/components/ui/button";
import { FileDown, Bot } from "lucide-react";
import { sampleTimetable } from "@/lib/data";

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Master Timetable</h1>
          <p className="text-muted-foreground">View and manage the weekly schedule. Drag and drop to make changes (feature coming soon).</p>
        </div>
        <div className="flex gap-2">
          <RearrangementSuggester />
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>
      <TimetableGrid timetable={sampleTimetable} />
    </div>
  );
}
