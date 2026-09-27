import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Generate LinkedIn Post API endpoint
app.post('/api/generate-post', async (req, res) => {
  const { eventTitle, hostCompany, takeaways, tone, tags, authorName, speakerName } = req.body;

  try {
    if (ai) {
      const prompt = `You are a world-class executive ghostwriter and social media strategist crafting a high-engagement, authentic LinkedIn post for a conference attendee.

Event Title: ${eventTitle || 'SaaS Frontiers Annual Summit 2025'}
Host Company: ${hostCompany || 'CloudVentures Inc.'}
Session/Keynote: ${speakerName || 'Sarah Chen Keynote • Future of Autonomous Agentic Workflows'}
Attendee Highlights & Takeaways: ${takeaways || 'Unbelievable keynote on the future of autonomous agentic workflows by Sarah Chen! 3 main takeaways on scaling multi-agent architecture and customer value.'}
Persona & Tone: ${tone || 'Professional'}
Official Tags to include: ${(tags || ['#SaaSSummit25', '#B2BGrowth', '#AIWorkflows', '#TechLeadership', '#EventPulse']).join(' ')}

Instructions:
1. Write a punchy, authentic LinkedIn post in the first person.
2. Hook the reader immediately with an energetic observation.
3. Clearly present 3 key takeaways formatted with numbers or clean spacing.
4. Express genuine gratitude or a thought-provoking closing note.
5. End with 4-5 relevant hashtags on a new line.
6. Do NOT output markdown code blocks or quotes. Return only the raw text of the post.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return res.json({ text: response.text.trim(), aiGenerated: true });
      }
    }

    // High quality deterministic fallback generator
    const tagsList = tags && tags.length > 0 ? tags : ['#SaaSSummit25', '#B2BGrowth', '#AIWorkflows', '#TechLeadership', '#EventPulse'];
    const tagsStr = tagsList.join(' ');
    const hostTag = `@${(hostCompany || 'CloudVentures').replace(/[^a-zA-Z0-9]/g, '')}`;

    let generatedText = '';
    if (tone === 'Grateful Attendee') {
      generatedText = `What an unforgettable day at ${tagsList[0] || '#SaaSSummit25'} hosted by ${hostTag}! 🙏\n\nBeyond inspired by the vision shared during today's sessions, especially ${speakerName || 'Sarah Chen'}'s deep dive into autonomous workflows.\n\nKey takeaways:\n1. Community and shared architectural learning speed up innovation by 10x.\n2. True value lies in solving real user friction, not just shipping shiny models.\n3. The caliber of builders in this room is unmatched.\n\nHuge thank you to the entire organizing team for curating such a world-class experience. Already looking forward to tomorrow!\n\n${tagsStr}`;
    } else if (tone === 'Key Takeaways') {
      generatedText = `3 massive takeaways from ${speakerName || 'Sarah Chen'}'s keynote at ${eventTitle || 'SaaS Frontiers Annual Summit 2025'}:\n\n1. Multi-agent workflows are shifting from experimental to mission-critical.\n2. Context grounding > raw model parameter size.\n3. User trust is earned through predictable UX.\n\nBig props to ${hostTag} for gathering the sharpest minds across tech.\n\nWhich of these resonates most with your current roadmap?\n\n${tagsStr}`;
    } else if (tone === 'Contrarian') {
      generatedText = `Contrarian take after hearing ${speakerName || 'Sarah Chen'} at ${eventTitle || 'SaaS Frontiers Summit'}:\n\nMost teams are focusing on the wrong AI metrics.\n\nBenchmark chasing is vanity. Latency, reliability, and contextual grounding are sanity.\n\n1. If your agentic flow fails 5% of the time, users abandon it.\n2. Small, finely-tuned models with grounded retrieval beat monster models every day.\n3. Great UX beats raw intelligence.\n\nAgree or disagree? Drop your thoughts below 👇\n\n${tagsStr}`;
    } else {
      // Default Professional
      generatedText = `Still energized from day 2 at ${tagsList[0] || '#SaaSSummit25'} hosted by ${hostTag}! 🚀\n\nHuge inspiration listening to ${speakerName || 'Sarah Chen'} breaking down practical AI agent architectures. Key takeaways:\n\n1. Multi-agent workflows are shifting from experimental to mission-critical.\n2. Context grounding > raw model parameter size.\n3. User trust is earned through predictable UX.\n\nGrateful for the incredible conversations with fellow founders and builders! Looking forward to tomorrow's sessions.\n\n${tagsStr}`;
    }

    return res.json({ text: generatedText, aiGenerated: false });
  } catch (error: any) {
    console.error('Error generating post:', error);
    res.status(500).json({ error: 'Failed to generate post', message: error?.message });
  }
});

// Start Express server with Vite middleware in dev
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`EventPulse server listening on port ${PORT}`);
  });
}

startServer();
