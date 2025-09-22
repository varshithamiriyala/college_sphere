
'use server';
/**
 * @fileOverview AI flow for generating a resume from user data.
 *
 * - generateResume - A function that returns a formatted resume in Markdown.
 * - ResumeData - The input type for the resume generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ResumeDataSchema = z.object({
  fullName: z.string().describe("The user's full name."),
  email: z.string().email().describe("The user's email address."),
  phone: z.string().describe("The user's phone number."),
  linkedIn: z.string().url().optional().describe("URL to the user's LinkedIn profile."),
  github: z.string().url().optional().describe("URL to the user's GitHub profile."),
  education: z.string().describe("Details about the user's education. Include degree, university, dates, and GPA."),
  experience: z.string().optional().describe("Details about the user's work experience. Include job titles, companies, and responsibilities."),
  projects: z.string().describe("Details about the user's personal or academic projects."),
  skills: z.string().describe("A comma-separated list of the user's technical and soft skills."),
  template: z.enum(['modern', 'professional', 'creative']).describe("The desired resume template style."),
});
export type ResumeData = z.infer<typeof ResumeDataSchema>;

const resumeBuilderPrompt = ai.definePrompt({
    name: 'resumeBuilderPrompt',
    input: { schema: ResumeDataSchema },
    prompt: `You are an expert AI Resume Builder. Your task is to generate a professional resume in Markdown format based on the user's provided details and selected template.

    **User Details:**
    - Full Name: {{{fullName}}}
    - Email: {{{email}}}
    - Phone: {{{phone}}}
    - LinkedIn: {{{linkedIn}}}
    - GitHub: {{{github}}}
    - Education: {{{education}}}
    - Work Experience: {{{experience}}}
    - Projects: {{{projects}}}
    - Skills: {{{skills}}}

    **Template Style:** {{{template}}}

    **Instructions:**
    1.  Generate a complete resume using Markdown formatting.
    2.  Structure the resume with the following sections: Header (Name and Contact Info), Education, Skills, Projects, and Work Experience (if provided).
    3.  Adapt the formatting and tone to match the selected 'template' style.
        - **Professional:** Clean, classic, single-column layout. Use standard headings and bullet points.
        - **Modern:** Sleek, two-column layout might be described. Use clean lines and perhaps subtle iconography (using emojis).
        - **Creative:** More visually distinct. May use more expressive formatting, but must remain professional and readable within Markdown.
    4.  Ensure the contact information is presented clearly at the top.
    5.  Use bullet points for lists under Education, Experience, and Projects to enhance readability.
    6.  The entire output must be a single Markdown string. Do not wrap it in a code block.

    Begin generating the Markdown resume now.
    `,
});

export async function generateResume(data: ResumeData): Promise<string> {
    const { text } = await resumeBuilderPrompt(data);
    return text;
}
