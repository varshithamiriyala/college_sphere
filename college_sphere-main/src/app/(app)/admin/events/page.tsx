
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, PlusCircle, Users } from "lucide-react";
import { ManageParticipantsDialog } from "@/components/app/manage-participants-dialog";

const events = [
  { id: 1, name: "Annual Tech Fest 'Innovate 2024'", date: "2024-09-15", location: "Main Auditorium", type: "Tech Fest", status: "Upcoming" },
  { id: 2, name: "Workshop on Machine Learning", date: "2024-08-20", location: "CSE Seminar Hall", type: "Workshop", status: "Upcoming" },
  { id: 3, name: "Guest Lecture by industry expert", date: "2024-08-05", location: "Main Auditorium", type: "Guest Lecture", status: "Completed" },
  { id: 4, name: "Sports Day", date: "2024-09-28", location: "College Ground", type: "Sports", status: "Upcoming" },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Event Management</h1>
          <p className="text-muted-foreground">
            Schedule, announce, and track participation in events and workshops.
          </p>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Event</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Past Events</CardTitle>
          <CardDescription>A list of all scheduled events and workshops.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell><div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> {event.date}</div></TableCell>
                    <TableCell><div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {event.location}</div></TableCell>
                    <TableCell><Badge variant="secondary">{event.type}</Badge></TableCell>
                    <TableCell>
                        <Badge variant={event.status === 'Upcoming' ? 'default' : 'outline'}>
                            {event.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <ManageParticipantsDialog event={event} />
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
