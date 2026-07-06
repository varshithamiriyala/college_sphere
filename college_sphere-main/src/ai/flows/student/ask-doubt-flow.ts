
'use server';
/**
 * @fileOverview AI flow for answering student doubts.
 *
 * - askDoubt - A function that provides a detailed explanation for a student's question.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const determineResponseType = ai.defineTool(
  {
    name: 'determineResponseType',
    description: 'Determines if the user\'s question requires a simple definition or a more complex explanation with a worked example.',
    inputSchema: z.object({
      question: z.string().describe("The user's question."),
    }),
    outputSchema: z.enum(['definition_only', 'example_needed']),
  },
  async ({ question }) => {
    const lowerCaseQuestion = question.toLowerCase();
    if (lowerCaseQuestion.startsWith('what is') || lowerCaseQuestion.startsWith('define')) {
      return 'definition_only';
    }
    return 'example_needed';
  }
);


const doubtPrompt = ai.definePrompt({
    name: 'doubtPrompt',
    tools: [determineResponseType],
    prompt: `You are an expert AI Doubt Assistant for students. Your goal is to provide clear, concise, and accurate explanations for academic questions.

    Analyze the user's question: "{{{question}}}"

    Use the 'determineResponseType' tool to decide the best format for the answer.
    - If the question is a simple definition, provide a clear and concise definition.
    - If the question is more complex or asks for an explanation of a process, provide a step-by-step explanation followed by a clear, worked example.
    
    Format your response using Markdown for readability. Use headings, bold text, and bullet points where appropriate.
    `,
});


export async function askDoubt(question: string): Promise<string> {
    const { text } = await doubtPrompt({ question });
    return text;
}
