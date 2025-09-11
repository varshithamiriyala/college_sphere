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
  classrooms: z.array(z.string()).describe('List of available classrooms.'),
  batches: z.array(z.string()).describe('List of student batches.'),
  subjects: z.array(z.string()).describe('List of subjects to be taught.'),
  faculty: z.array(z.string()).describe('List of available faculty members.'),
  timings: z.array(z.string()).describe('List of available time slots.'),
  numTimetables: z
    .number()
    .int()
    .min(3)
    .max(5)
    .default(3)
    .describe('Number of conflict-free timetable options to generate (3-5).'),
  maxClassesPerDay: z.string().optional().describe('Maximum number of classes allowed per day.'),
  classesPerSubject: z.string().optional().describe('Specifies the number of classes to be conducted for each subject (e.g., "Data Structures: 4 per week").'),
  facultySubjectMapping: z.string().optional().describe('Mapping of which faculty can teach which subjects (e.g., "Dr. Reed: Data Structures, Algorithms").'),
  specialConstraints: z.string().optional().describe('Any other special constraints or fixed slots, like lab schedules or faculty availability (e.g., "No classes after 4 PM on Fridays").'),
});
export type GenerateTimetableFromDataInput = z.infer<
  typeof GenerateTimetableFromDataInputSchema
>;

const GenerateTimetableFromDataOutputSchema = z.object({
  timetables: z.array(
    z.object({
      timetable: z.string().describe('Generated timetable data in a JSON array format.'),
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
  prompt: `You are a timetable generation expert. Your task is to generate {{{numTimetables}}} unique, conflict-free timetable options based on the data and constraints provided below.

**Core Data:**
- Classrooms: {{{classrooms}}}
- Batches: {{{batches}}}
- Subjects: {{{subjects}}}
- Faculty: {{{faculty}}}
- Timings: {{{timings}}}

**Constraints:**
{{#if maxClassesPerDay}}- Maximum classes per day: {{{maxClassesPerDay}}}{{/if}}
{{#if classesPerSubject}}- Weekly classes per subject: {{{classesPerSubject}}}{{/if}}
{{#if facultySubjectMapping}}- Faculty-Subject mapping: {{{facultySubjectMapping}}}{{/if}}
{{#if specialConstraints}}- Special constraints: {{{specialConstraints}}}{{/if}}

**Instructions:**
1.  Generate {{{numTimetables}}} different timetable versions.
2.  Ensure there are no conflicts: a faculty member, a classroom, or a batch cannot be in two places at once.
3.  Strictly adhere to all provided constraints, including timings, class limits, and special requirements.
4.  For each timetable option, return a single JSON string which is an array of objects.
5.  Each object in the array represents a single class session and must include the keys: "day", "time", "room", "batch", "subject", and "faculty".
6.  The final output must be a JSON object with a "timetables" key, which is an array of objects, where each object has a "timetable" key containing the JSON string of the generated timetable.

Example of a single timetable entry in the JSON array:
{ "day": "Monday", "time": "09:00-10:00", "room": "CR-101", "batch": "CS-A", "subject": "Data Structures", "faculty": "Dr. Evelyn Reed" }
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
