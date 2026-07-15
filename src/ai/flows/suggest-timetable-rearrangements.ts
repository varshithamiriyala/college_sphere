'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting timetable rearrangements.
 *
 * The flow takes in timetable data and constraints, and suggests optimal rearrangements if a perfect timetable solution isn't feasible.
 * It exports:
 *   - `suggestTimetableRearrangements`: The main function to trigger the flow.
 *   - `SuggestTimetableRearrangementsInput`: The input type for the flow.
 *   - `SuggestTimetableRearrangementsOutput`: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTimetableRearrangementsInputSchema = z.object({
  classrooms: z.array(z.string()).describe('List of classroom IDs.'),
  batches: z.array(z.string()).describe('List of batch IDs.'),
  subjects: z.array(z.string()).describe('List of subject IDs.'),
  faculty: z.array(z.string()).describe('List of faculty IDs.'),
  timetableConstraints: z
    .string()
    .describe(
      'A detailed description of the constraints for the timetable, including hard constraints that must be met.'
    ),
  currentTimetable: z.string().optional().describe('The current timetable, if any, in a string format.'),
});
export type SuggestTimetableRearrangementsInput = z.infer<
  typeof SuggestTimetableRearrangementsInputSchema
>;

const SuggestTimetableRearrangementsOutputSchema = z.object({
  suggestedRearrangements: z
    .string()
    .describe(
      'A detailed description of the suggested timetable rearrangements, including the rationale for each change and the expected impact on constraint satisfaction.'
    ),
  feasibilityReport: z
    .string()
    .describe(
      'A report on the feasibility of creating a timetable with the given constraints, highlighting any conflicts or unmet requirements.'
    ),
});
export type SuggestTimetableRearrangementsOutput = z.infer<
  typeof SuggestTimetableRearrangementsOutputSchema
>;

export async function suggestTimetableRearrangements(
  input: SuggestTimetableRearrangementsInput
): Promise<SuggestTimetableRearrangementsOutput> {
  return suggestTimetableRearrangementsFlow(input);
}

const suggestTimetableRearrangementsPrompt = ai.definePrompt({
  name: 'suggestTimetableRearrangementsPrompt',
  input: {schema: SuggestTimetableRearrangementsInputSchema},
  output: {schema: SuggestTimetableRearrangementsOutputSchema},
  prompt: `You are an AI assistant specialized in optimizing academic timetables.

  Given the following information about classrooms, batches, subjects, faculty, timetable constraints, and the current timetable (if any), your task is to suggest the best possible rearrangements to create a feasible and optimal timetable.

  Classrooms: {{{classrooms}}}
  Batches: {{{batches}}}
  Subjects: {{{subjects}}}
  Faculty: {{{faculty}}}
  Timetable Constraints: {{{timetableConstraints}}}
  Current Timetable (if any): {{{currentTimetable}}}

  Your output should include:

  1.  Suggested Rearrangements: A clear and detailed description of the suggested changes to the timetable. Explain the reasoning behind each change, and how it helps to resolve conflicts or better satisfy the given constraints. Focus on making minimal changes to the current timetable where possible.
  2.  Feasibility Report: An analysis of whether it is possible to create a timetable that satisfies all the given constraints. If there are any conflicts or unmet requirements, highlight them in this report.

  Ensure that the suggested rearrangements are practical and take into consideration factors such as faculty preferences, workload balancing, and room availability.
  `,
});

const suggestTimetableRearrangementsFlow = ai.defineFlow(
  {
    name: 'suggestTimetableRearrangementsFlow',
    inputSchema: SuggestTimetableRearrangementsInputSchema,
    outputSchema: SuggestTimetableRearrangementsOutputSchema,
  },
  async input => {
    const {output} = await suggestTimetableRearrangementsPrompt(input);
    return output!;
  }
);
