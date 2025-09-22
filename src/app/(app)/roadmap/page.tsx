
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenSquare, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, text: 'Complete "Variables & Data Types" in Python Basics', completed: true },
  { id: 2, text: 'Watch video on "Functions and Scope"', completed: true },
  { id: 3, text: 'Solve 5 practice problems on conditional logic', completed: false },
  { id: 4, text: 'Build a simple calculator application', completed: false },
];

export default function RoadmapBuilderPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskText, setNewTaskText] = useState("");

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <PenSquare className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Roadmap Builder</h1>
            <p className="text-muted-foreground">
                Create adaptive, day-by-day study plans with progress tracking.
            </p>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>My Learning Roadmap</CardTitle>
          <CardDescription>Add, remove, and track your study tasks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Overall Progress</span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
            </div>

            <div className="flex gap-2">
              <Input 
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Enter a new task..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <Button onClick={handleAddTask}><Plus className="mr-2"/> Add Task</Button>
            </div>
            
            <ul className="space-y-3">
              {tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 p-3 rounded-md border group">
                      <button onClick={() => handleToggleTask(task.id)}>
                        {task.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      <span className={cn("flex-1", task.completed && "text-muted-foreground line-through")}>
                          {task.text}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => handleRemoveTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                  </li>
              ))}
            </ul>
            {tasks.length === 0 && (
                <p className="text-center text-muted-foreground italic py-4">Your roadmap is empty. Add a task to get started!</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
