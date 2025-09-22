
'use server';
/**
 * @fileOverview AI flow for providing career advice.
 *
 * - suggestCareers - A function that suggests career paths based on skills and interests.
 * - CareerAdviceInput - The input schema for the career advisor.
 * - CareerAdviceOutput - The output schema for the career advisor.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const CareerAdviceInputSchema = z.object({
  skills: z.string().describe('A comma-separated list of the user\'s technical and soft skills.'),
  interests: z.string().describe('A comma-separated list of the user\'s interests and passions.'),
});
export type CareerAdviceInput = z.infer<typeof CareerAdviceInputSchema>;

export const CareerAdviceOutputSchema = z.object({
  careers: z.array(z.object({
    jobTitle: z.string().describe('The title of the suggested career path.'),
    description: z.string().describe('A brief description of what the role entails and why it fits the user\'s profile.'),
    requiredSkills: z.array(z.string()).describe('A list of key skills typically required for this role.'),
    marketTrends: z.string().describe('Current market trends, demand, and salary expectations for this role.'),
  })).describe('An array of 3 to 5 suggested career paths.'),
});
export type CareerAdviceOutput = z.infer<typeof CareerAdviceOutputSchema>;

const careerAdvisorPrompt = ai.definePrompt({
  name: 'careerAdvisorPrompt',
  input: { schema: CareerAdviceInputSchema },
  output: { schema: CareerAdviceOutputSchema },
  prompt: `You are an expert AI Career Advisor. Your task is to suggest 3 to 5 potential career paths based on a user's skills and interests.

Analyze the user's profile:
- Skills: {{{skills}}}
- Interests: {{{interests}}}

For each suggested career path, provide:
1.  A clear 'jobTitle'.
2.  A compelling 'description' explaining the role and why it's a good match for the user.
3.  A list of 'requiredSkills' that are essential for success in the role.
4.  A summary of current 'marketTrends', including job demand and typical salary range.

Generate a JSON object that strictly follows the output schema.`,
});

export async function suggestCareers(input: CareerAdviceInput): Promise<CareerAdviceOutput> {
  const { output } = await careerAdvisorPrompt(input);
  if (!output) {
    throw new Error("The AI model failed to return career suggestions.");
  }
  return output;
}
