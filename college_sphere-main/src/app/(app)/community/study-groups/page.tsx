
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Group, PlusCircle, Search, User, Clock } from "lucide-react";

const groups = [
  { id: 1, name: "Data Structures Study Group", members: 8, schedule: "Mon, Wed 5-7 PM" },
  { id: 2, name: "Thermodynamics Problem Solving", members: 5, schedule: "Tue, Thu 6-8 PM" },
  { id: 3, name: "Algorithms Whiteboarding Practice", members: 12, schedule: "Fri 4-6 PM" },
  { id: 4, name: "Final Year Project - AI Group", members: 4, schedule: "Sat 11 AM - 2 PM" },
]

export default function StudyGroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Group className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Study Groups</h1>
                <p className="text-muted-foreground">
                    Find or join subject-based study groups with your peers.
                </p>
            </div>
        </div>
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search groups..." className="pl-9"/>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Group</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(group => (
            <Card key={group.id}>
                <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2"><User className="h-4 w-4" /> <span>{group.members} Members</span></div>
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> <span>{group.schedule}</span></div>
                    </div>
                    <Button className="w-full">Join Group</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
