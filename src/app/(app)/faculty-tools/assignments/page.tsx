
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, PlusCircle, CheckCircle, Clock } from "lucide-react";

const assignments = [
  { id: 1, title: "Data Structures - Assignment 1", batch: "CS-A", dueDate: "2024-07-15", status: "Graded", submissions: "58/60" },
  { id: 2, title: "Algorithms - Problem Set 3", batch: "CS-B", dueDate: "2024-07-20", status: "Pending", submissions: "45/62" },
  { id: 3, title: "Circuit Theory - Lab Report", batch: "EE-A", dueDate: "2024-07-22", status: "Pending", submissions: "30/55" },
  { id: 4, title: "Thermodynamics - Mid-term Quiz", batch: "ME-A", dueDate: "2024-07-18", status: "Graded", submissions: "50/50" },
];

const statusConfig = {
    "Graded": { icon: <CheckCircle className="h-4 w-4 text-green-500" />, color: "bg-green-500/20 text-green-700" },
    "Pending": { icon: <Clock className="h-4 w-4 text-yellow-500" />, color: "bg-yellow-500/20 text-yellow-700" },
}

export default function AssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Edit className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Assignment Management</h1>
                <p className="text-muted-foreground">
                    Create, assign, and grade assignments with automatic tracking.
                </p>
            </div>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Assignment</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
          <CardDescription>A list of all active and past assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment) => {
                  const config = statusConfig[assignment.status as keyof typeof statusConfig];
                  return (
                    <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{assignment.batch}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>{assignment.submissions}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={config.color}>
                                {config.icon}
                                <span className="ml-2">{assignment.status}</span>
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm">Grade Submissions</Button>
                        </TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
