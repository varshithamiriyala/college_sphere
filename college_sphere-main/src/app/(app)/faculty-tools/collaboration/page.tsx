
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Pen, MessageSquare, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const projects = [
  { id: 1, title: "Revamp CS-A Curriculum for 2025", lead: "Dr. Evelyn Reed", members: ["Dr. Isabella Chen", "Dr. John Smith 0"], status: "In Progress" },
  { id: 2, title: "Organize Inter-Departmental Tech Fest", lead: "Dr. Samuel Green", members: ["Dr. Marcus Hayes", "Dr. Leo Patel"], status: "Planning" },
  { id: 3, title: "Joint Research Paper on AI in Education", lead: "Dr. Isabella Chen", members: ["Dr. Evelyn Reed"], status: "Idea" },
];

export default function CollaborationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Share2 className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Faculty Collaboration</h1>
            <p className="text-muted-foreground">
                Collaborate with peers on course content, events, and research.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
            <Card key={project.id}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge>{project.status}</Badge>
                    </div>
                    <CardDescription>Led by {project.lead}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Team:</p>
                        <div className="flex items-center space-x-2">
                             <div className="flex -space-x-2 overflow-hidden">
                                {project.members.map(m => (
                                    <Avatar key={m} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                        <AvatarImage src={`https://picsum.photos/seed/${m.replace(/\s+/g, '')}/200`} />
                                        <AvatarFallback>{m.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">+{project.members.length} members</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1"><Pen className="h-4 w-4 mr-2"/> Edit</Button>
                        <Button variant="outline" size="sm" className="flex-1"><MessageSquare className="h-4 w-4 mr-2"/> Discuss</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
