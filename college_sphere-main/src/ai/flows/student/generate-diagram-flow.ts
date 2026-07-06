
'use server';
/**
 * @fileOverview AI flow for generating Mermaid.js diagrams.
 *
 * - generateDiagram - A function that returns a Mermaid.js diagram string based on a topic.
 */

import { ai } from '@/ai/genkit';

const diagramPrompt = ai.definePrompt({
    name: 'diagramPrompt',
    prompt: `You are an expert in creating diagrams using Mermaid.js syntax. Based on the user's topic, generate a 'graph TD' (top-down flowchart) or a similar simple Mermaid graph.

    IMPORTANT: Your response must ONLY contain the Mermaid code block, like this:
    \`\`\`mermaid
    graph TD;
        A[Start] --> B{Is it?};
        B -->|Yes| C[OK];
        C --> D[End];
        B -->|No| E[Not OK];
        E --> D[End];
    \`\`\`

    Do NOT include any other text, explanations, or formatting. Only the code block.

    Topic: "{{{topic}}}"
    `,
});

export async function generateDiagram(topic: string): Promise<string> {
    const { text } = await diagramPrompt({ topic });
    return text;
}
