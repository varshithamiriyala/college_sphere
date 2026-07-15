
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileDown, PlusCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const applicants = [
  { id: 1, name: "Alice Johnson", appliedFor: "B.Tech CSE", status: "Approved", date: "2024-06-15" },
  { id: 2, name: "Bob Williams", appliedFor: "B.Tech ECE", status: "Pending", date: "2024-06-18" },
  { id: 3, name: "Charlie Brown", appliedFor: "B.Tech Mech", status: "Rejected", date: "2024-06-20" },
  { id: 4, name: "Diana Miller", appliedFor: "B.Tech CSE", status: "Pending", date: "2024-06-22" },
  { id: 5, name: "Ethan Davis", appliedFor: "B.Tech IT", status: "Approved", date: "2024-06-25" },
];

const statusConfig = {
    Approved: { icon: CheckCircle, color: "bg-green-500/20 text-green-700" },
    Pending: { icon: Clock, color: "bg-yellow-500/20 text-yellow-700" },
    Rejected: { icon: XCircle, color: "bg-destructive/20 text-destructive" },
}

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Admission & Enrollment</h1>
          <p className="text-muted-foreground">
            Manage new student admissions, batch allocations, and course enrollments.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export List</Button>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Applicant</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applicant List</CardTitle>
          <CardDescription>A list of all applicants for the current admission cycle.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Course Applied</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => {
                  const config = statusConfig[applicant.status as keyof typeof statusConfig];
                  const Icon = config.icon;
                  return (
                    <TableRow key={applicant.id}>
                        <TableCell className="font-medium">{applicant.name}</TableCell>
                        <TableCell>{applicant.appliedFor}</TableCell>
                        <TableCell>{applicant.date}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={config.color}>
                                <Icon className="mr-1 h-3 w-3" />
                                {applicant.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            <Select defaultValue={applicant.status.toLowerCase()}>
                                <SelectTrigger className="w-32 h-9">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approve</SelectItem>
                                    <SelectItem value="rejected">Reject</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm">View Profile</Button>
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
