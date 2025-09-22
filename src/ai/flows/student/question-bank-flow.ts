
'use server';
/**
 * @fileOverview AI flow for generating multiple-choice questions from text.
 *
 * - generateQuestions - A function that turns study material into a quiz.
 * - QuestionBankOutput - The output schema for the generated questions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuestionBankOutputSchema = z.object({
  questions: z.array(z.object({
    questionText: z.string().describe('The multiple-choice question.'),
    options: z.array(z.string()).length(4).describe('An array of exactly four possible answers (one correct, three distractors).'),
    correctAnswer: z.string().describe('The correct answer from the options array.'),
    explanation: z.string().describe('A brief explanation of why the correct answer is right.'),
  })).describe('An array of generated multiple-choice questions.'),
});
export type QuestionBankOutput = z.infer<typeof QuestionBankOutputSchema>;

const questionBankPrompt = ai.definePrompt({
    name: 'questionBankPrompt',
    output: { schema: QuestionBankOutputSchema },
    prompt: `You are an expert Quiz Generator. Your task is to create a set of multiple-choice questions based on the provided study material.

    Study Material:
    ---
    {{{studyMaterial}}}
    ---

    Instructions:
    1.  Generate 5-10 high-quality multiple-choice questions that test understanding of the key concepts in the text.
    2.  For each question, provide:
        - A clear and unambiguous 'questionText'.
        - An array of exactly four 'options'. One option must be the correct answer, and the other three must be plausible but incorrect distractors.
        - The exact 'correctAnswer' string that matches one of the options.
        - A concise 'explanation' for why the answer is correct.

    Return the quiz in a JSON object that strictly follows the output schema.
    `,
});

export async function generateQuestions(studyMaterial: string): Promise<QuestionBankOutput> {
    const { output } = await questionBankPrompt({ studyMaterial });
    if (!output) {
        throw new Error("The AI model failed to generate questions.");
    }
    return output;
}
