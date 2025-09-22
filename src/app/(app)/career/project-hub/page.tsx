

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projectIdeas = [
    { 
        id: 1, 
        title: "AI Personal Trainer", 
        description: "A web app that uses computer vision to track exercises and provide real-time feedback on form.", 
        difficulty: "Hard", 
        tech: ["Python", "TensorFlow.js", "React", "Node.js"] 
    },
    { 
        id: 2, 
        title: "Community Skill Share Platform", 
        description: "A platform where users can offer and request services from others in their community, like a local marketplace.", 
        difficulty: "Medium", 
        tech: ["Next.js", "Firebase", "Tailwind CSS"] 
    },
    { 
        id: 3, 
        title: "Portfolio Website Generator", 
        description: "A simple tool that takes user information and generates a clean, professional portfolio website.", 
        difficulty: "Easy", 
        tech: ["HTML", "CSS", "JavaScript"] 
    },
     { 
        id: 4, 
        title: "Real-time Collaborative Whiteboard", 
        description: "A drawing application where multiple users can collaborate on the same canvas simultaneously.", 
        difficulty: "Hard", 
        tech: ["WebSockets", "React", "Canvas API"] 
    },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-700 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-700 border-red-500/30",
};


export default function ProjectHubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
            <p className="text-muted-foreground">
                Curated project ideas with tech stacks and difficulty levels.
            </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectIdeas.map((project) => (
            <Card key={project.id}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge className={difficultyColors[project.difficulty]}>{project.difficulty}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{project.description}</p>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                        </div>
                    </div>
                    <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
