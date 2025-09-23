
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Presentation, UserPlus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const events = [
  { id: 1, name: "Annual Tech Fest 'Innovate 2024'", date: "2024-09-15", location: "Main Auditorium", type: "Tech Fest", description: "A week-long celebration of technology with competitions, workshops, and expert talks." },
  { id: 2, name: "Workshop on Machine Learning", date: "2024-08-20", location: "CSE Seminar Hall", type: "Workshop", description: "A hands-on workshop covering the fundamentals of machine learning with Python." },
  { id: 3, name: "Guest Lecture by industry expert", date: "2024-08-05", location: "Main Auditorium", type: "Guest Lecture", description: "An inspiring talk on the future of AI by a leading industry expert." },
  { id: 4, name: "Sports Day", date: "2024-09-28", location: "College Ground", type: "Sports", description: "Annual sports meet with various track and field events." },
];

export default function StudentEventsPage() {
  const { toast } = useToast();
  const [applied, setApplied] = useState<Record<number, boolean>>({});

  const handleAction = (eventId: number, actionType: 'interest' | 'coordinator') => {
    setApplied(prev => ({ ...prev, [eventId]: true }));
    toast({
        title: actionType === 'interest' ? "Interest Shown!" : "Application Submitted!",
        description: `Your response for the event has been recorded. The admin will be notified.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Presentation className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Community Events</h1>
            <p className="text-muted-foreground">
                Browse upcoming events, show your interest, or apply to be a coordinator.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
            <Card key={event.id}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{event.name}</CardTitle>
                        <Badge variant="secondary">{event.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4"/> {event.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4"/> {event.location}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex gap-2">
                        <Button 
                            className="w-full" 
                            onClick={() => handleAction(event.id, 'interest')}
                            disabled={applied[event.id]}
                        >
                            <UserPlus className="mr-2 h-4 w-4" /> {applied[event.id] ? "Registered" : "Show Interest"}
                        </Button>
                         <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => handleAction(event.id, 'coordinator')}
                            disabled={applied[event.id]}
                        >
                            <Star className="mr-2 h-4 w-4" /> {applied[event.id] ? "Applied" : "Apply for Coordinator"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
