
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Loader2, Sparkles, Wand2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateQuestions, QuestionBankOutput } from '@/ai/flows/student/question-bank-flow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  studyMaterial: z.string().min(100, {
    message: 'Please enter at least 100 characters of study material.',
  }),
});

type QuizState = {
    selectedAnswer: string | null;
    isCorrect: boolean | null;
};

export default function QuestionGeneratorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<QuestionBankOutput | null>(null);
  const [quizStates, setQuizStates] = useState<QuizState[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { studyMaterial: '' },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAiResponse(null);
    setQuizStates([]);
    try {
      const response = await generateQuestions(data.studyMaterial);
      setAiResponse(response);
      setQuizStates(response.questions.map(() => ({ selectedAnswer: null, isCorrect: null })));
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'The AI model could not be reached. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    const question = aiResponse?.questions[questionIndex];
    if (!question) return;

    setQuizStates(prev => {
        const newStates = [...prev];
        newStates[questionIndex] = {
            selectedAnswer: selectedOption,
            isCorrect: selectedOption === question.correctAnswer,
        };
        return newStates;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Question Bank Generator</h1>
            <p className="text-muted-foreground">
                Turn your notes into a practice quiz to test your knowledge.
            </p>
        </div>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Study Material</CardTitle>
            <CardDescription>
              Paste the text you want to generate questions from below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="studyMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your long article, notes, or any text here..."
                          className="resize-y"
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

      {(isLoading || aiResponse) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generated Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
             {isLoading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : (
                <div className="space-y-8">
                    {aiResponse?.questions.map((q, qIndex) => (
                        <div key={qIndex}>
                            <p className="font-semibold">{qIndex + 1}. {q.questionText}</p>
                            <RadioGroup 
                                className="mt-4 space-y-2"
                                onValueChange={(value) => handleAnswerSelect(qIndex, value)}
                                value={quizStates[qIndex]?.selectedAnswer || undefined}
                                disabled={quizStates[qIndex]?.selectedAnswer !== null}
                            >
                                {q.options.map((option, oIndex) => {
                                    const isSelected = quizStates[qIndex]?.selectedAnswer === option;
                                    const isCorrect = q.correctAnswer === option;
                                    
                                    return (
                                        <div 
                                            key={oIndex} 
                                            className={cn(
                                                "flex items-center space-x-2 p-3 rounded-md border",
                                                isSelected && quizStates[qIndex]?.isCorrect === false && "bg-destructive/20 border-destructive",
                                                isSelected && quizStates[qIndex]?.isCorrect === true && "bg-green-500/20 border-green-500"
                                            )}
                                        >
                                            <RadioGroupItem value={option} id={`q${qIndex}-o${oIndex}`} />
                                            <FormLabel htmlFor={`q${qIndex}-o${oIndex}`} className="flex-1 cursor-pointer">{option}</FormLabel>
                                            {isSelected && quizStates[qIndex]?.isCorrect === true && <Check className="h-5 w-5 text-green-600" />}
                                            {isSelected && quizStates[qIndex]?.isCorrect === false && <X className="h-5 w-5 text-destructive" />}
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                            {quizStates[qIndex]?.selectedAnswer && (
                                 <Card className="mt-4 bg-muted/50">
                                    <CardContent className="p-4">
                                        <p className="text-sm font-semibold">
                                            {quizStates[qIndex].isCorrect ? 'Correct!' : `Correct Answer: ${q.correctAnswer}`}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">{q.explanation}</p>
                                    </CardContent>
                                 </Card>
                            )}
                        </div>
                    ))}
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
