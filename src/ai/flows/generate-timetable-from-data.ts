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
  collegeStartTime: z.string().optional().describe('The start time of the college day.'),
  collegeEndTime: z.string().optional().describe('The end time of the college day.'),
  periodDuration: z.number().optional().describe('The duration of each class period in minutes.'),
  breakTimings: z.string().optional().describe('Comma-separated break time intervals, e.g., "11:00-11:15, 13:00-14:00".'),
  maxClassesPerDay: z.string().optional().describe('Maximum number of classes allowed per day.'),
  classesPerSubject: z.string().optional().describe('Specifies the number of classes to be conducted for each subject (e.g., "Data Structures: 4 per week").'),
  labConstraints: z.string().optional().describe('Specifies subjects that have a fixed, multi-hour duration (e.g., "Data Structures Lab: 3 hours, Workshop: 2 hours").'),
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
- Classrooms: {{#each classrooms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Batches: {{#each batches}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Subjects: {{#each subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Faculty: {{#each faculty}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
- Available Time Slots: {{#each timings}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

**Constraints:**
{{#if collegeStartTime}}- College Start Time: {{{collegeStartTime}}}{{/if}}
{{#if collegeEndTime}}- College End Time: {{{collegeEndTime}}}{{/if}}
{{#if periodDuration}}- Standard Class Period Duration: {{{periodDuration}}} minutes{{/if}}
{{#if breakTimings}}- Break Times: {{{breakTimings}}}{{/if}}
{{#if maxClassesPerDay}}- Maximum classes per day: {{{maxClassesPerDay}}}{{/if}}
{{#if classesPerSubject}}- Weekly classes per subject: {{{classesPerSubject}}}{{/if}}
{{#if facultySubjectMapping}}- Faculty-Subject mapping: {{{facultySubjectMapping}}}{{/if}}
{{#if labConstraints}}- Lab & Special Durations: {{{labConstraints}}}. These sessions must be scheduled in a continuous, unbroken block of the specified duration.{{/if}}
{{#if specialConstraints}}- Other special constraints: {{{specialConstraints}}}{{/if}}

**Instructions:**
1.  Generate {{{numTimetables}}} different timetable versions.
2.  Ensure there are no conflicts: a faculty member, a classroom, or a batch cannot be in two places at once.
3.  Strictly adhere to all provided constraints.
4.  **Crucially, for any subject listed under "Lab & Special Durations", you MUST schedule it as a single, continuous block of the specified length.** For example, a 3-hour lab from 09:00 to 12:00 should be a single entry with "time": "09:00-12:00". Do not split it into multiple 1-hour slots.
5.  All other classes should follow the standard period duration.
6.  The generated class times must align with the provided 'Available Time Slots' or be composed of multiple consecutive slots for labs.
7.  For each timetable option, return a single JSON string which is an array of objects.
8.  Each object in the array represents a single class session and must include the keys: "day", "time", "room", "batch", "subject", and "faculty".
9.  The final output must be a JSON object with a "timetables" key, which is an array of objects, where each object has a "timetable" key containing the JSON string of the generated timetable.

Example of a single timetable entry in the JSON array:
{ "day": "Monday", "time": "09:00-10:00", "room": "CR-101", "batch": "CS-A", "subject": "Data Structures", "faculty": "Dr. Evelyn Reed" }
Example of a lab entry:
{ "day": "Tuesday", "time": "14:00-17:00", "room": "CS-LAB-1", "batch": "CS-A", "subject": "Data Structures Lab", "faculty": "Dr. Evelyn Reed" }
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

    

    