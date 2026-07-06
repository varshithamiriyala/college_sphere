
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileDown, CheckCircle, AlertCircle, Clock } from "lucide-react";

const payments = [
  { id: 1, studentName: "Alice Johnson", studentId: "STU001", amount: "₹85,000", status: "Paid", dueDate: "2024-07-15", paymentDate: "2024-07-10" },
  { id: 2, name: "Bob Williams", studentId: "STU002", amount: "₹85,000", status: "Due", dueDate: "2024-07-15", paymentDate: null },
  { id: 3, name: "Charlie Brown", studentId: "STU003", amount: "₹85,000", status: "Overdue", dueDate: "2024-06-15", paymentDate: null },
  { id: 4, name: "Diana Miller", studentId: "STU004", amount: "₹85,000", status: "Paid", dueDate: "2024-07-15", paymentDate: "2024-07-12" },
  { id: 5, name: "Ethan Davis", studentId: "STU005", amount: "₹85,000", status: "Due", dueDate: "2024-07-15", paymentDate: null },
];

const statusConfig = {
    Paid: { icon: CheckCircle, color: "bg-green-500/20 text-green-700" },
    Due: { icon: Clock, color: "bg-yellow-500/20 text-yellow-700" },
    Overdue: { icon: AlertCircle, color: "bg-destructive/20 text-destructive" },
}

export default function FinancialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Fee & Payment Tracking</h1>
          <p className="text-muted-foreground">
            Record student fee payments and generate financial reports.
          </p>
        </div>
        <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Download Report</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tuition Fee Status</CardTitle>
          <CardDescription>An overview of all student fee payments for the current semester.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => {
                  const config = statusConfig[payment.status as keyof typeof statusConfig];
                  const Icon = config.icon;
                  return (
                    <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.studentName || payment.name}</TableCell>
                        <TableCell>{payment.studentId}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className={config.color}>
                                <Icon className="mr-1 h-3 w-3" />
                                {payment.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm" disabled={payment.status === 'Paid'}>
                            Record Payment
                        </Button>
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
