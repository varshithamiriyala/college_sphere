

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckSquare, Percent, FileDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TakeAttendanceDialog } from "@/components/app/take-attendance-dialog";

const classes = [
  { id: 1, subject: "Data Structures", batch: "CS-A", time: "Monday, 09:00 AM", attendance: 95 },
  { id: 2, title: "Algorithms", batch: "CS-B", time: "Monday, 10:00 AM", attendance: 88 },
  { id: 3, title: "Circuit Theory", batch: "EE-A", time: "Monday, 11:00 AM", attendance: 92 },
  { id: 4, title: "Operating Systems", batch: "CS-A", time: "Tuesday, 10:00 AM", attendance: 85 },
];

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Attendance Tracker</h1>
                <p className="text-muted-foreground">
                    Mark attendance digitally and generate compliance reports.
                </p>
            </div>
        </div>
        <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Download Report</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Classes</CardTitle>
          <CardDescription>Select a class to mark attendance for today's session.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Avg. Attendance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                    <TableRow key={cls.id}>
                        <TableCell className="font-medium">{cls.subject || cls.title}</TableCell>
                        <TableCell>{cls.batch}</TableCell>
                        <TableCell>{cls.time}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Progress value={cls.attendance} className="w-24" />
                                <span className="text-muted-foreground text-xs">{cls.attendance}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                           <TakeAttendanceDialog classInfo={cls} />
                        </TableCell>
                    </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
