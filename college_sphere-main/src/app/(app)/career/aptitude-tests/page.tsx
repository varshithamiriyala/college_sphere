
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type Question = {
  id: string;
  text: string;
  options: string[];
  answer: string;
};

const questions: Record<string, Question[]> = {
  logical: [
    {
      id: "q1",
      text: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?",
      options: ["7", "10", "12", "13"],
      answer: "10",
    },
    {
      id: "q2",
      text: "Which word does NOT belong with the others?",
      options: ["book", "index", "glossary", "chapter"],
      answer: "book",
    }
  ],
  numerical: [
    {
      id: "q3",
      text: "A car travels at a speed of 80 km/hr. How far will it travel in 90 minutes?",
      options: ["100 km", "120 km", "140 km", "160 km"],
      answer: "120 km",
    },
     {
      id: "q4",
      text: "What is 20% of 200?",
      options: ["20", "40", "60", "80"],
      answer: "40",
    }
  ],
  verbal: [
    {
      id: "q5",
      text: "Choose the word that is most nearly opposite in meaning to the word in capital letters: VAGUE",
      options: ["undefined", "unclear", "precise", "shady"],
      answer: "precise",
    },
    {
        id: "q6",
        text: "The library has been closed ___ two days for cleaning.",
        options: ["since", "for", "from", "until"],
        answer: "for",
    }
  ]
};

type QuizState = {
    selectedAnswer: string | null;
    isCorrect: boolean | null;
};

export default function AptitudeTestsPage() {
  const [quizStates, setQuizStates] = useState<Record<string, QuizState>>({});

  const handleAnswerSelect = (questionId: string, selectedOption: string, correctAnswer: string) => {
    setQuizStates(prev => ({
        ...prev,
        [questionId]: {
            selectedAnswer: selectedOption,
            isCorrect: selectedOption === correctAnswer,
        }
    }));
  };
  
  const resetQuiz = () => {
    setQuizStates({});
  };

  const renderQuestion = (question: Question) => {
    const state = quizStates[question.id];
    return (
        <Card key={question.id} className="mb-6">
            <CardHeader>
                <CardTitle className="text-base">{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup 
                    onValueChange={(value) => handleAnswerSelect(question.id, value, question.answer)}
                    value={state?.selectedAnswer || undefined}
                    disabled={!!state}
                >
                    {question.options.map((option, index) => {
                         const isSelected = state?.selectedAnswer === option;
                         const isCorrect = question.answer === option;
                        return (
                            <div key={index} className={cn(
                                "flex items-center space-x-3 p-3 rounded-md border",
                                isSelected && !state.isCorrect && "bg-destructive/20 border-destructive",
                                isSelected && state.isCorrect && "bg-green-500/20 border-green-500",
                                !!state && isCorrect && "bg-green-500/20 border-green-500"
                            )}>
                                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                                <Label htmlFor={`${question.id}-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                                {state && isSelected && state.isCorrect && <Check className="h-5 w-5 text-green-600" />}
                                {state && isSelected && !state.isCorrect && <X className="h-5 w-5 text-destructive" />}
                            </div>
                        )
                    })}
                </RadioGroup>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Aptitude Tests</h1>
            <p className="text-muted-foreground">
                Practice questions in Logical, Numerical, and Verbal Reasoning.
            </p>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Practice Zone</CardTitle>
          <CardDescription>Select a category and test your skills. The backend for saving progress is not yet implemented.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="logical">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="logical">Logical Reasoning</TabsTrigger>
                    <TabsTrigger value="numerical">Numerical Ability</TabsTrigger>
                    <TabsTrigger value="verbal">Verbal Reasoning</TabsTrigger>
                </TabsList>
                <TabsContent value="logical" className="mt-6">
                    {questions.logical.map(renderQuestion)}
                </TabsContent>
                <TabsContent value="numerical" className="mt-6">
                    {questions.numerical.map(renderQuestion)}
                </TabsContent>
                <TabsContent value="verbal" className="mt-6">
                    {questions.verbal.map(renderQuestion)}
                </TabsContent>
            </Tabs>
            <Button onClick={resetQuiz} variant="outline" className="mt-6">Reset Quiz</Button>
        </CardContent>
      </Card>
    </div>
  );
}
