import { facultyData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FacultyProfile } from '@/components/app/faculty-profile';
import { AddFaculty } from '@/components/app/add-faculty';

export default function FacultyPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Faculty Members</h1>
          <p className="text-muted-foreground">Browse and manage faculty profiles and workloads.</p>
        </div>
        <AddFaculty />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {facultyData.map((faculty) => (
          <FacultyProfile key={faculty.id} faculty={faculty}>
            <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Avatar className="mb-4 h-24 w-24 border">
                  <AvatarImage src={faculty.avatar} alt={faculty.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{faculty.name}</h3>
                <p className="text-sm text-muted-foreground">{faculty.title}</p>
                <p className="text-xs text-muted-foreground">{faculty.department}</p>
              </CardContent>
            </Card>
          </FacultyProfile>
        ))}
      </div>
    </div>
  );
}
