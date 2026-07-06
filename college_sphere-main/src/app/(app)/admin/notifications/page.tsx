
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Send, Clock, Users, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const sentNotifications = [
    { id: 1, subject: "Upcoming Holiday Reminder", recipient: "All Faculty", date: "2024-06-28", status: "Sent" },
    { id: 2, subject: "Timetable Changes for CSE Dept", recipient: "CSE Dept", date: "2024-06-25", status: "Sent" },
    { id: 3, subject: "Deadline for Mark Submission", recipient: "All Faculty", date: "2024-06-20", status: "Sent" },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Notifications & Alerts</h1>
        <p className="text-muted-foreground">
          Send targeted alerts for deadlines, exams, or policy updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card>
            <CardHeader>
                <CardTitle>Compose Notification</CardTitle>
                <CardDescription>Draft and send a new notification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Recipient</label>
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Faculty</SelectItem>
                            <SelectItem value="cse">CSE Department</SelectItem>
                            <SelectItem value="ece">ECE Department</SelectItem>
                            <SelectItem value="specific">Specific Faculty</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="Enter notification subject" />
                </div>
                <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Type your message here..." rows={6} />
                </div>
                <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Notification
                </Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Sent History</CardTitle>
                <CardDescription>A log of previously sent notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {sentNotifications.map(item => (
                    <div key={item.id} className="p-3 rounded-md border flex items-start justify-between">
                       <div>
                            <p className="font-semibold">{item.subject}</p>
                            <div className="text-xs text-muted-foreground flex items-center gap-4 mt-1">
                                <span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {item.recipient}</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {item.date}</span>
                            </div>
                       </div>
                       <Badge variant="secondary"><Mail className="h-3 w-3 mr-1"/>{item.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
