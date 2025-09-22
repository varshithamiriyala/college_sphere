
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchX, PlusCircle, Search, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const items = [
  { id: 1, name: "iPhone 13", lastSeen: "Library, 2nd Floor", reportedBy: "Zoe W.", status: "Lost", date: "June 28, 2024" },
  { id: 2, name: "Student ID Card", lastSeen: "Cafeteria", reportedBy: "Admin", status: "Found", date: "June 27, 2024" },
  { id: 3, name: "Black Jansport Backpack", lastSeen: "Near Block A", reportedBy: "Mike R.", status: "Lost", date: "June 27, 2024" },
  { id: 4, name: "Set of keys", lastSeen: "Main Gate", reportedBy: "Admin", status: "Found", date: "June 26, 2024" },
]

export default function LostAndFoundPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <SearchX className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Lost & Found</h1>
                <p className="text-muted-foreground">
                    Digital board to report or claim lost and found items.
                </p>
            </div>
        </div>
        <div className="flex gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for an item..." className="pl-9"/>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Report an Item</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
            <Card key={item.id}>
                <CardHeader>
                     <div className="flex items-center justify-between">
                        <CardTitle>{item.name}</CardTitle>
                        <Badge variant={item.status === 'Lost' ? 'destructive' : 'secondary'}>{item.status}</Badge>
                     </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> <span>Last Seen: {item.lastSeen}</span></div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> <span>Reported: {item.date} by {item.reportedBy}</span></div>
                    <Button className="w-full mt-4" variant="outline">
                        {item.status === 'Lost' ? 'I have found this' : 'Claim this item'}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
