
'use server';
/**
 * @fileOverview AI flow for generating interview preparation questions.
 *
 * - generateInterviewQuestions - A function that generates questions for a specific job role.
 * - InterviewPrepOutput - The output schema for the interview prep questions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const InterviewPrepOutputSchema = z.object({
    technical: z.array(z.object({
        question: z.string().describe('The technical question.'),
        answer: z.string().describe('A detailed sample answer.'),
    })).describe('A list of technical questions relevant to the job role.'),
    behavioral: z.array(z.object({
        question: z.string().describe('The behavioral question.'),
        answer: z.string().describe('A detailed sample answer using the STAR method (Situation, Task, Action, Result) where applicable.'),
    })).describe('A list of common behavioral questions.'),
    situational: z.array(z.object({
        question: z.string().describe('The situational or scenario-based question.'),
        answer: z.string().describe('A detailed sample answer explaining the reasoning and approach.'),
    })).describe('A list of situational questions to test problem-solving skills.'),
});
export type InterviewPrepOutput = z.infer<typeof InterviewPrepOutputSchema>;

const interviewPrepPrompt = ai.definePrompt({
    name: 'interviewPrepPrompt',
    output: { schema: InterviewPrepOutputSchema },
    prompt: `You are an expert AI Interview Coach. Your task is to generate a comprehensive list of interview questions for a specific job role.

    Job Role: "{{{jobRole}}}"

    Generate a mix of questions across three categories:
    1.  **Technical Questions:** Create 3-5 questions that are highly specific and relevant to the core technical skills required for the given job role. Provide detailed, accurate sample answers.
    2.  **Behavioral Questions:** Create 3-5 common behavioral questions that assess soft skills like teamwork, leadership, and problem-solving. For the answers, use the STAR (Situation, Task, Action, Result) method where appropriate.
    3.  **Situational Questions:** Create 2-3 scenario-based questions that test the candidate's on-the-spot problem-solving and decision-making skills. Provide well-reasoned sample answers.

    Return the questions and answers in a JSON object that strictly follows the output schema.
    `,
});

export async function generateInterviewQuestions(jobRole: string): Promise<InterviewPrepOutput> {
    const { output } = await interviewPrepPrompt({ jobRole });
    if (!output) {
        throw new Error("The AI model failed to return interview questions.");
    }
    return output;
}
