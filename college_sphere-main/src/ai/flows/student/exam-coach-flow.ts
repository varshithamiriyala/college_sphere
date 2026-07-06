
'use server';
/**
 * @fileOverview AI flow for generating a revision plan for an exam.
 *
 * - generateRevisionPlan - A function that generates key topics and definitions for a subject.
 * - ExamCoachOutput - The output schema for the exam coach.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ExamCoachOutputSchema = z.object({
    keyTopics: z.array(z.object({
        topic: z.string().describe('A key topic or concept relevant to the subject.'),
        explanation: z.string().describe('A concise explanation or definition of the topic.'),
    })).describe('A list of 5-7 crucial topics for revision.'),
});
export type ExamCoachOutput = z.infer<typeof ExamCoachOutputSchema>;

const examCoachPrompt = ai.definePrompt({
    name: 'examCoachPrompt',
    output: { schema: ExamCoachOutputSchema },
    prompt: `You are an expert AI Exam Coach. Your task is to generate a focused revision plan for a given subject.

    Subject: "{{{subject}}}"

    Generate a list of the 5 to 7 most important topics for this subject that a student should focus on for an exam.
    For each topic, provide a clear and concise explanation or definition.

    Return the plan in a JSON object that strictly follows the output schema.
    `,
});

export async function generateRevisionPlan(subject: string): Promise<ExamCoachOutput> {
    const { output } = await examCoachPrompt({ subject });
    if (!output) {
        throw new Error("The AI model failed to return a revision plan.");
    }
    return output;
}
