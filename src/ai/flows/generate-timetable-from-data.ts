// src/ai/flows/generate-timetable-from-data.ts
'use server';

/**
 * @fileOverview Generates conflict-free timetables based on provided data.
 *
 * - generateTimetableFromData - A function that generates timetables.
 * - GenerateTimetableFromDataInput - The input type for the generateTimetableFromData function.
 * - GenerateTimetableFromDataOutput - The return type for the generateTimetableFromData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimetableFromDataInputSchema = z.object({
  classrooms: z
    .array(z.string())
    .describe('List of available classrooms.'),
  batches: z.array(z.string()).describe('List of batches.'),
  subjects: z.array(z.string()).describe('List of subjects.'),
  faculty: z.array(z.string()).describe('List of faculty members.'),
  timings: z.array(z.string()).describe('List of available time slots.'),
  numTimetables: z
    .number()
    .int()
    .min(3)
    .max(5)
    .default(3)
    .describe('Number of conflict-free timetables to generate (3-5).'),
});
export type GenerateTimetableFromDataInput = z.infer<
  typeof GenerateTimetableFromDataInputSchema
>;

const GenerateTimetableFromDataOutputSchema = z.object({
  timetables: z.array(
    z.object({
      timetable: z.string().describe('Generated timetable data.'),
    })
  ),
});
export type GenerateTimetableFromDataOutput = z.infer<
  typeof GenerateTimetableFromDataOutputSchema
>;

export async function generateTimetableFromData(
  input: GenerateTimetableFromDataInput
): Promise<GenerateTimetableFromDataOutput> {
  return generateTimetableFromDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTimetablePrompt',
  input: {schema: GenerateTimetableFromDataInputSchema},
  output: {schema: GenerateTimetableFromDataOutputSchema},
  prompt: `You are a timetable generation expert. Generate {{{numTimetables}}} conflict-free timetables based on the following data:\n\nClassrooms: {{{classrooms}}}\nBatches: {{{batches}}}\nSubjects: {{{subjects}}}\nFaculty: {{{faculty}}}\nTimings: {{{timings}}}\n\nEnsure that the generated timetables are valid and do not have any conflicts. Use only the provided timings. Return the timetables in a JSON format. Each timetable must have the format:\n{
 "timetable": "..."
}
Include details like Day, Time, Room, Batch, Subject, and Faculty for each entry in the timetable.
`,
});

const generateTimetableFromDataFlow = ai.defineFlow(
  {
    name: 'generateTimetableFromDataFlow',
    inputSchema: GenerateTimetableFromDataInputSchema,
    outputSchema: GenerateTimetableFromDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
