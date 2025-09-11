import { config } from 'dotenv';
config();

import '@/ai/flows/generate-timetable-from-data.ts';
import '@/ai/flows/suggest-timetable-rearrangements.ts';