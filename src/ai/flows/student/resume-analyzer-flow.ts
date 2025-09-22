
'use server';
/**
 * @fileOverview AI flow for analyzing a user's resume.
 *
 * - analyzeResume - A function that provides feedback on an uploaded resume.
 * - ResumeAnalysisInput - The input schema for the resume analyzer.
 * - ResumeAnalysisOutput - The output schema for the resume analyzer.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const ResumeAnalysisInputSchema = z.object({
  resumeDataUri: z.string().describe("The user's resume, provided as a data URI (e.g., PDF). Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

export const ResumeAnalysisOutputSchema = z.object({
    overallScore: z.number().min(0).max(100).describe('A score from 0-100 representing the resume\'s overall quality.'),
    overallFeedback: z.string().describe('A summary of the resume\'s strengths and weaknesses.'),
    suggestions: z.string().describe('Actionable suggestions for improvement, formatted as a Markdown list.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;

const resumeAnalyzerPrompt = ai.definePrompt({
    name: 'resumeAnalyzerPrompt',
    input: { schema: ResumeAnalysisInputSchema },
    output: { schema: ResumeAnalysisOutputSchema },
    prompt: `You are an expert AI Resume Analyzer and Career Coach. Your task is to provide a detailed analysis of the user's resume.

    Resume to analyze: {{media url=resumeDataUri}}

    Analyze the resume based on the following criteria:
    1.  **Clarity and Conciseness:** Is the information easy to read and understand?
    2.  **Impact and Action Verbs:** Does the candidate use strong action verbs to describe their accomplishments?
    3.  **Quantifiable Achievements:** Are there metrics and data to back up their claims?
    4.  **Formatting and Layout:** Is the resume professionally formatted and visually appealing?
    5.  **Relevance and Keywords:** Is the content tailored for a specific type of role (e.g., software engineering)?

    Based on your analysis:
    1.  Provide an 'overallScore' from 0 to 100.
    2.  Write a concise 'overallFeedback' summary (2-3 sentences).
    3.  Generate a list of specific, actionable 'suggestions' for improvement. Format these suggestions as a Markdown bulleted list.

    Return your analysis in a JSON object that strictly follows the output schema.
    `,
});

export async function analyzeResume(input: ResumeAnalysisInput): Promise<ResumeAnalysisOutput> {
    const { output } = await resumeAnalyzerPrompt(input);
    if (!output) {
        throw new Error("The AI model failed to return resume analysis.");
    }
    return output;
}
