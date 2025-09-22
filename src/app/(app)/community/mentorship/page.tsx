
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare, Search, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mentors = [
  { id: 1, name: "Sarah Chen", role: "Sr. Software Engineer at Google", avatar: "https://picsum.photos/seed/mentor1/200/200", expertise: ["Interview Prep", "System Design", "Career Growth"] },
  { id: 2, name: "David Lee", role: "Product Manager at Microsoft", avatar: "https://picsum.photos/seed/mentor2/200/200", expertise: ["Product Thinking", "Agile", "User Research"] },
  { id: 3, name: "Priya Sharma", role: "Data Scientist at Netflix", avatar: "https://picsum.photos/seed/mentor3/200/200", expertise: ["Machine Learning", "Python", "Data Visualization"] },
  { id: 4, name: "Marcus Rodriguez", role: "UX Designer at Airbnb", avatar: "https://picsum.photos/seed/mentor4/200/200", expertise: ["Figma", "Prototyping", "User Testing"] },
]

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mentorship Program</h1>
                <p className="text-muted-foreground">
                    Connect with alumni and professionals for guidance.
                </p>
            </div>
        </div>
        <div className="flex gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by expertise (e.g., Python)..." className="pl-9"/>
            </div>
            <Button variant="outline">Become a Mentor</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map(mentor => (
            <Card key={mentor.id}>
                <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
                    <Avatar className="w-24 h-24 border">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold">{mentor.name}</h3>
                        <p className="text-primary flex items-center gap-2"><Briefcase className="h-4 w-4" />{mentor.role}</p>
                        <div className="my-3">
                            <p className="text-sm font-semibold mb-2">Expertise:</p>
                            <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map(skill => <Badge key={skill}>{skill}</Badge>)}
                            </div>
                        </div>
                        <Button className="w-full">
                            <MessageSquare className="mr-2 h-4 w-4" /> Request Mentorship
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
