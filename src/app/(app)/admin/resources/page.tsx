
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, PlusCircle, Square, Tag, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const classrooms = [
  { id: "CR101", capacity: 60, type: "Classroom", available: true },
  { id: "CR102", capacity: 60, type: "Classroom", available: false },
  { id: "LH-201", capacity: 120, type: "Lecture Hall", available: true },
  { id: "CS-LAB-1", capacity: 50, type: "Lab", available: true },
  { id: "ECE-LAB-2", capacity: 40, type: "Lab", available: false },
  { id: "Seminar-Hall", capacity: 150, type: "Hall", available: true },
];

const equipment = [
    { id: "PROJ001", name: "Projector", location: "CR101", status: "Operational" },
    { id: "PROJ002", name: "Projector", location: "CR102", status: "Operational" },
    { id: "SCOPE01", name: "Oscilloscope", location: "ECE-LAB-2", status: "Under Maintenance" },
    { id: "SCOPE02", name: "Oscilloscope", location: "ECE-LAB-2", status: "Operational" },
    { id: "PC-CSL1-01", name: "Desktop PC", location: "CS-LAB-1", status: "Operational" },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
          <p className="text-muted-foreground">
            Track classrooms, labs, equipment, and other institutional resources.
          </p>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Resource</Button>
      </div>

        <Tabs defaultValue="rooms">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="rooms">Rooms & Labs</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
            </TabsList>
            <TabsContent value="rooms">
                <Card>
                    <CardHeader>
                        <CardTitle>Rooms, Labs, and Halls</CardTitle>
                        <CardDescription>A list of all physical spaces available.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Room ID</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {classrooms.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell className="font-medium flex items-center gap-2"><Building className="h-4 w-4" />{room.id}</TableCell>
                                <TableCell><div className="flex items-center gap-2"><Users className="h-4 w-4" /> {room.capacity}</div></TableCell>
                                <TableCell><Badge variant="outline">{room.type}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={room.available ? "secondary" : "destructive"}>
                                        {room.available ? "Available" : "In Use"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="equipment">
                 <Card>
                    <CardHeader>
                        <CardTitle>Equipment</CardTitle>
                        <CardDescription>A list of all trackable equipment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Asset ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {equipment.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                                <TableCell className="font-medium"><div className="flex items-center gap-2"><Square className="h-4 w-4" />{item.name}</div></TableCell>
                                <TableCell><Badge variant="outline">{item.location}</Badge></TableCell>
                                <TableCell>
                                    <Badge variant={item.status === 'Operational' ? "secondary" : "destructive"}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
