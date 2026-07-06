# Setting Up AI Tools in College Sphere

## Overview

College Sphere uses Google Gemini AI to power its AI tools. To make all AI tools work, you need to configure API keys.

## AI Tools Included

1. **Diagram Generator** - Converts topics into Mermaid.js flowcharts
2. **Doubt Assistant** - Answers student questions with detailed explanations
3. **Exam Coach** - Generates exam revision plans
4. **Question Bank Generator** - Creates practice quizzes from study material
5. **Summarizer** - Summarizes long text into concise summaries
6. **Timetable Generator** - Generates conflict-free academic schedules
7. **Timetable Rearrangement Suggester** - Suggests optimal timetable changes

## Setup Instructions

### Step 1: Get a Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure the API Key

1. Open `.env.local` in the root directory
2. Add your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Save the file

### Step 3: Restart the Development Server

```bash
npm run dev
```

The development server will reload automatically, and all AI tools should now be functional.

## Troubleshooting

### Error: "Please pass in the API key"

- **Cause**: The `GEMINI_API_KEY` environment variable is not set
- **Solution**: Follow Step 1 and 2 above to set up the API key

### Error: "The AI model could not be reached"

- **Cause**: API key is invalid or expired
- **Solution**: 
  1. Verify the API key in `.env.local`
  2. Check that you've saved the file
  3. Restart the development server with `npm run dev`
  4. If the error persists, generate a new API key

### Genkit Build Warnings

The build may show warnings about handlebars and webpack. These are harmless and don't affect functionality.

## Production Deployment

For production deployment:

1. Add the `GEMINI_API_KEY` to your hosting platform's environment variables
2. For Vercel: Go to Settings → Environment Variables
3. For other platforms: Follow their documentation on setting environment variables

## Rate Limiting

The Google Gemini API has rate limits:

- **Free tier**: Limited free requests
- **Paid tier**: Higher rate limits with billing

Monitor your usage in [Google AI Studio](https://makersuite.google.com/app/apikey)

## Security Notes

- **Never commit `.env.local`** to version control (it's already in `.gitignore`)
- **Keep your API key secret** - don't share it or expose it in client-side code
- All Genkit flows use server-side operations for security

## Additional Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Genkit Documentation](https://genkit.dev)
- [College Sphere GitHub](https://github.com/your-repo)
