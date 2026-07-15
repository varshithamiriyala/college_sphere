
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Star, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const feedback = [
  { id: 1, subject: "Data Structures", batch: "CS-A", rating: 5, comment: "The lecture on Trees was very clear. The real-world examples really helped!", date: "2024-07-10", type: "Positive" },
  { id: 2, subject: "Algorithms", batch: "CS-B", rating: 4, comment: "Could we have more practice problems for dynamic programming? The concept is a bit tricky.", date: "2024-07-09", type: "Suggestion" },
  { id: 3, subject: "Data Structures", batch: "CS-A", rating: 3, comment: "The pace of the last lecture on Graphs felt a bit fast.", date: "2024-07-08", type: "Constructive" },
  { id: 4, subject: "Circuit Theory", batch: "EE-A", rating: 5, comment: "Excellent explanation of Thevenin's theorem. Thank you!", date: "2024-07-11", type: "Positive" },
];

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Feedback</h1>
            <p className="text-muted-foreground">
                View anonymous feedback submitted by students on lectures and teaching quality.
            </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>This is a read-only view of anonymous student feedback.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {feedback.map(item => (
                <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{item.subject} - <span className="text-muted-foreground">{item.batch}</span></p>
                            <p className="text-sm text-muted-foreground italic mt-2">"{item.comment}"</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <div className="flex items-center justify-end gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                ))}
                            </div>
                             <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                                <Clock className="h-3 w-3"/>{item.date}
                            </p>
                        </div>
                    </div>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
