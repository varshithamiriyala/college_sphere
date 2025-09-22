
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const codingProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Table"] },
  { id: 2, title: "Valid Parentheses", difficulty: "Easy", tags: ["String", "Stack"] },
  { id: 3, title: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked List", "Recursion"] },
  { id: 4, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["String", "Sliding Window"] },
  { id: 5, title: "Container With Most Water", difficulty: "Medium", tags: ["Array", "Two Pointers"] },
  { id: 6, title: "Binary Tree Level Order Traversal", difficulty: "Medium", tags: ["Tree", "BFS"] },
  { id: 7, title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Array", "Binary Search"] },
  { id: 8, title: "Trapping Rain Water", difficulty: "Hard", tags: ["Array", "Dynamic Programming"] },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-700 border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-700 border-red-500/30",
};


export default function CodingPracticePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                <Code2 className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Coding Practice</h1>
                <p className="text-muted-foreground">
                    Topic- and difficulty-based coding challenges with AI hints.
                </p>
            </div>
        </div>
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search problems..." className="pl-9"/>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Problem Set</CardTitle>
          <CardDescription>Select a problem to start coding. An actual IDE and submission system are not yet implemented.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {codingProblems.map((problem) => (
            <Card key={problem.id} className="flex items-center justify-between p-4">
                <div>
                    <h3 className="font-semibold">{problem.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge className={difficultyColors[problem.difficulty]}>{problem.difficulty}</Badge>
                        {problem.tags.map(tag => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                    </div>
                </div>
                <Button>Solve Problem</Button>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
