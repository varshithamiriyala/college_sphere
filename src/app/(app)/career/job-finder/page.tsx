

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, MapPin, Building, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const jobPostings = [
  { id: 1, title: "Software Engineer Intern", company: "Google", location: "Mountain View, CA", type: "Internship" },
  { id: 2, title: "Product Manager", company: "Microsoft", location: "Redmond, WA", type: "Full-Time" },
  { id: 3, title: "Data Scientist Intern", company: "Netflix", location: "Los Gatos, CA", type: "Internship" },
  { id: 4, title: "UX Designer", company: "Airbnb", location: "San Francisco, CA", type: "Full-Time" },
  { id: 5, title: "Frontend Developer", company: "Amazon", location: "Seattle, WA", type: "Full-Time" },
  { id: 6, title: "Machine Learning Engineer", company: "Meta", location: "Menlo Park, CA", type: "Full-Time" },
];


export default function JobFinderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <BriefcaseBusiness className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Finder</h1>
            <p className="text-muted-foreground">
                Aggregates jobs and internships from multiple platforms. This is a mock-up.
            </p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Filter Opportunities</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by title or company..." className="pl-9"/>
                </div>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sf">San Francisco, CA</SelectItem>
                        <SelectItem value="mv">Mountain View, CA</SelectItem>
                        <SelectItem value="seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="full-time">Full-Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {jobPostings.map((job) => (
                <Card key={job.id} className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1.5"><Building className="h-4 w-4" /> {job.company}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={job.type === 'Internship' ? 'secondary' : 'default'}>{job.type}</Badge>
                        <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply
                        </Button>
                    </div>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
