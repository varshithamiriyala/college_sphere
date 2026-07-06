
'use server';
/**
 * @fileOverview AI flow for summarizing text.
 *
 * - summarizeText - A function that returns a concise summary of a given text.
 */

import { ai } from '@/ai/genkit';

const summarizePrompt = ai.definePrompt({
    name: 'summarizePrompt',
    prompt: `You are an expert summarizer. Your task is to provide a concise, easy-to-read summary of the following text.
    
    Focus on extracting the key points and main ideas. The summary should be significantly shorter than the original text but retain all critical information.
    
    Format the output as a single block of text.

    Text to summarize:
    ---
    {{{text}}}
    ---
    `,
});

export async function summarizeText(text: string): Promise<string> {
    const { text: summary } = await summarizePrompt({ text });
    return summary;
}
