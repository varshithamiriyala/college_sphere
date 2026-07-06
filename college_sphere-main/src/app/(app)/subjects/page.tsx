
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookCopy, Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

type Unit = {
  id: number;
  title: string;
  description: string;
};

type Subject = {
  id: number;
  name: string;
  units: Unit[];
};

export default function SubjectOrganizerPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [currentSubjectId, setCurrentSubjectId] = useState<number | null>(null);
  const [newUnitTitle, setNewUnitTitle] = useState("");
  const [newUnitDescription, setNewUnitDescription] = useState("");

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      const newSubject: Subject = {
        id: Date.now(),
        name: newSubjectName.trim(),
        units: [],
      };
      setSubjects([...subjects, newSubject]);
      setNewSubjectName("");
      setIsSubjectDialogOpen(false);
    }
  };
  
  const handleAddUnit = () => {
    if (newUnitTitle.trim() && currentSubjectId !== null) {
      const newUnit: Unit = {
        id: Date.now(),
        title: newUnitTitle.trim(),
        description: newUnitDescription.trim(),
      };
      setSubjects(subjects.map(s => 
        s.id === currentSubjectId ? { ...s, units: [...s.units, newUnit] } : s
      ));
      setNewUnitTitle("");
      setNewUnitDescription("");
      setIsUnitDialogOpen(false);
      setCurrentSubjectId(null);
    }
  };
  
  const openUnitDialog = (subjectId: number) => {
    setCurrentSubjectId(subjectId);
    setIsUnitDialogOpen(true);
  };
  
  const handleDeleteSubject = (subjectId: number) => {
      setSubjects(subjects.filter(s => s.id !== subjectId));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <BookCopy className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Subject Organizer</h1>
                <p className="text-muted-foreground">
                    A digital notebook to create subjects, units, and upload PDF notes.
                </p>
            </div>
        </div>
        <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2" /> Add Subject</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Subject</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <Input 
                        placeholder="Enter subject name, e.g., 'Data Structures'"
                        value={newSubjectName}
                        onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleAddSubject}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      {subjects.length === 0 ? (
         <Card>
            <CardContent className="py-12 text-center">
                <BookCopy className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Subjects Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Click "Add Subject" to start organizing your notes.</p>
            </CardContent>
         </Card>
      ) : (
        <Card>
            <CardHeader>
                <CardTitle>My Subjects</CardTitle>
                <CardDescription>Click on a subject to view its units.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                {subjects.map(subject => (
                    <AccordionItem key={subject.id} value={`item-${subject.id}`}>
                        <div className="flex items-center w-full">
                            <AccordionTrigger className="text-lg font-medium flex-1">
                                {subject.name}
                            </AccordionTrigger>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteSubject(subject.id)} className="ml-4">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    <AccordionContent className="p-4 bg-muted/50 rounded-md">
                        <div className="space-y-4">
                        {subject.units.length > 0 ? (
                            subject.units.map(unit => (
                                <div key={unit.id} className="p-3 border rounded-md bg-background">
                                    <h4 className="font-semibold">{unit.title}</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{unit.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-center text-muted-foreground italic py-4">No units in this subject yet.</p>
                        )}
                         <Button variant="outline" size="sm" onClick={() => openUnitDialog(subject.id)}><Plus className="mr-2 h-4 w-4"/> Add Unit</Button>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      )}

      {/* Add Unit Dialog */}
      <Dialog open={isUnitDialogOpen} onOpenChange={setIsUnitDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Unit</DialogTitle>
                <p className="text-sm text-muted-foreground">
                    Adding to: {subjects.find(s => s.id === currentSubjectId)?.name}
                </p>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <Input 
                    placeholder="Unit title, e.g., 'Arrays and Linked Lists'"
                    value={newUnitTitle}
                    onChange={(e) => setNewUnitTitle(e.target.value)}
                />
                <Textarea 
                    placeholder="Brief description or key topics..."
                    value={newUnitDescription}
                    onChange={(e) => setNewUnitDescription(e.target.value)}
                    rows={4}
                />
            </div>
            <DialogFooter>
                <Button onClick={handleAddUnit}>Add Unit</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
