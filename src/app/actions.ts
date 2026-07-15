'use server';

import {
  generateTimetableFromData,
  GenerateTimetableFromDataInput,
  GenerateTimetableFromDataOutput,
} from '@/ai/flows/generate-timetable-from-data';
import {
  suggestTimetableRearrangements,
  SuggestTimetableRearrangementsInput,
  SuggestTimetableRearrangementsOutput,
} from '@/ai/flows/suggest-timetable-rearrangements';

export async function generateTimetableAction(
  input: GenerateTimetableFromDataInput
): Promise<GenerateTimetableFromDataOutput> {
  try {
    const output = await generateTimetableFromData(input);
    return output;
  } catch (error) {
    console.error('Error generating timetable:', error);
    throw new Error('Failed to generate timetable. The AI model could not process the request.');
  }
}

export async function suggestRearrangementsAction(
  input: SuggestTimetableRearrangementsInput
): Promise<SuggestTimetableRearrangementsOutput> {
  try {
    const output = await suggestTimetableRearrangements(input);
    return output;
  } catch (error) {
    console.error('Error suggesting rearrangements:', error);
    throw new Error('Failed to suggest rearrangements. The AI model could not process the request.');
  }
}
