
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NotebookText, PlusCircle, FileText, Download, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notes = [
  { id: 1, title: "Unit 1: Introduction to Data Structures", subject: "Data Structures", fileType: "PDF", uploadDate: "2024-07-01", size: "2.5 MB" },
  { id: 2, title: "Unit 2: Arrays and Linked Lists", subject: "Data Structures", fileType: "PPTX", uploadDate: "2024-07-08", size: "5.1 MB" },
  { id: 3, title: "Asymptotic Notation", subject: "Algorithms", fileType: "PDF", uploadDate: "2024-07-05", size: "1.2 MB" },
  { id: 4, title: "Lecture 5: Kirchhoff's Laws", subject: "Circuit Theory", fileType: "PDF", uploadDate: "2024-07-10", size: "800 KB" },
];

export default function LectureNotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <NotebookText className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Lecture Notes</h1>
                <p className="text-muted-foreground">
                    Upload and manage course materials for your students.
                </p>
            </div>
        </div>
        <Button><PlusCircle className="mr-2 h-4 w-4" /> Upload Notes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Materials</CardTitle>
          <CardDescription>A list of all lecture notes and slides you've uploaded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => (
                    <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.title}</TableCell>
                        <TableCell>{note.subject}</TableCell>
                        <TableCell>
                            <Badge variant="secondary" className="flex items-center w-fit">
                                <FileText className="h-3 w-3 mr-1" />
                                {note.fileType}
                            </Badge>
                        </TableCell>
                        <TableCell>{note.uploadDate}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                            </Button>
                             <Button variant="destructive" size="icon" className="h-8 w-8">
                                <Trash2 className="h-4 w-4" />
                            </Button>
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
