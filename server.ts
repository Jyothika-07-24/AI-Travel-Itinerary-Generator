import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { generateFallbackItinerary, curatedCities } from './server/fallbackData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING, description: "City name with proper spelling and capitalization" },
    country: { type: Type.STRING, description: "Country where the city is located" },
    tagline: { type: Type.STRING, description: "An evocative 1-sentence description capturing the spirit of the destination" },
    summary: { type: Type.STRING, description: "A concise 2-3 sentence overview of this 3-day travel itinerary" },
    bestTimeToVisit: { type: Type.STRING, description: "Best months/season to visit and why" },
    localCurrency: { type: Type.STRING, description: "Currency symbol, name, and ISO code" },
    transitTip: { type: Type.STRING, description: "Practical transit recommendation for navigating the city" },
    estimatedBudgetDaily: { type: Type.STRING, description: "Approximate daily budget range per traveler" },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayNumber: { type: Type.INTEGER, description: "1, 2, or 3" },
          title: { type: Type.STRING, description: "Descriptive theme title for this day" },
          theme: { type: Type.STRING, description: "Core thematic highlight" },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Clock time (e.g. 09:00 AM, 12:30 PM, 07:00 PM)" },
                period: { type: Type.STRING, description: "Morning, Afternoon, Evening, or Night" },
                title: { type: Type.STRING, description: "Name of the landmark, museum, restaurant, or experience" },
                description: { type: Type.STRING, description: "Detailed 2-3 sentence description with historical/cultural context and what to do" },
                location: { type: Type.STRING, description: "District, neighborhood, or specific address/square" },
                category: { type: Type.STRING, description: "One of: Sightseeing, Culture, Dining, Nature, Shopping, Nightlife, Relaxation" },
                estimatedCost: { type: Type.STRING, description: "Estimated cost range or Free" },
                insiderTip: { type: Type.STRING, description: "Specific expert tip to maximize enjoyment or save time/money" },
              },
              required: ["time", "period", "title", "description", "location", "category", "estimatedCost"],
            },
          },
        },
        required: ["dayNumber", "title", "theme", "activities"],
      },
    },
  },
  required: ["destination", "country", "tagline", "summary", "bestTimeToVisit", "localCurrency", "transitTip", "estimatedBudgetDaily", "days"],
};

async function createServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client if API key is provided
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

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  // Generate Itinerary endpoint
  app.post('/api/itinerary', async (req, res) => {
    const { city, vibe = "Balanced", pace = "Moderate", budget = "Moderate" } = req.body;

    if (!city || typeof city !== 'string' || !city.trim()) {
      return res.status(400).json({ error: "City name is required." });
    }

    const trimmedCity = city.trim();

    // Check if we have an API key and can call Gemini
    if (ai) {
      try {
        const prompt = `Create a meticulously structured 3-day travel itinerary for the city: "${trimmedCity}".
Traveler Preferences:
- Travel Style / Vibe: ${vibe}
- Pace: ${pace}
- Budget Tier: ${budget}

Guidelines:
1. Provide exactly 3 sequential days (Day 1, Day 2, Day 3).
2. Each day must contain 4 distinct, chronologically ordered activities covering Morning, Midday/Afternoon, Late Afternoon/Evening, and Night.
3. Group activities logically geographically so travelers don't spend excessive time crisscrossing the city.
4. Include authentic local neighborhood names, realistic times, estimated ticket/meal costs, and concrete insider tips (e.g. ticket advance booking, viewpoint secrets, best signature dishes).
5. Ensure categories match: Sightseeing, Culture, Dining, Nature, Shopping, Nightlife, or Relaxation.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: "You are an award-winning world travel editor and concierge. You craft detailed, authentic, highly practical travel itineraries with realistic geography, timing, and local recommendations. Always return structured JSON adhering strictly to the provided responseSchema.",
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          // Attach IDs and timestamps
          const itinerary = {
            id: `itin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            ...parsed,
            vibe,
            pace,
            budget,
            createdAt: new Date().toISOString(),
            days: parsed.days.map((day: any, dIdx: number) => ({
              ...day,
              dayNumber: day.dayNumber || (dIdx + 1),
              activities: day.activities.map((act: any, aIdx: number) => ({
                ...act,
                id: `act-${dIdx + 1}-${aIdx + 1}-${Math.random().toString(36).slice(2, 6)}`,
                isCompleted: false,
              })),
            })),
          };

          return res.json({ itinerary, source: 'gemini' });
        }
      } catch (geminiError: any) {
        console.warn("Gemini generation failed or timed out, falling back to curated engine:", geminiError?.message || geminiError);
        // Fall through to fallback engine below
      }
    }

    // Graceful fallback to curated data
    const fallbackData = generateFallbackItinerary(trimmedCity, { vibe, pace, budget });
    const itinerary = {
      id: `itin-curated-${Date.now()}`,
      ...fallbackData,
      vibe,
      pace,
      budget,
      createdAt: new Date().toISOString(),
      days: fallbackData.days.map((day, dIdx) => ({
        ...day,
        activities: day.activities.map((act, aIdx) => ({
          ...act,
          id: `act-${dIdx + 1}-${aIdx + 1}-${Math.random().toString(36).slice(2, 6)}`,
          isCompleted: false,
        })),
      })),
    };

    return res.json({ itinerary, source: 'curated' });
  });

  // Quick curated city list endpoint
  app.get('/api/popular-cities', (_req, res) => {
    res.json({
      cities: [
        { name: "Tokyo", country: "Japan", highlight: "Neon skylines, ancient shrines & Michelin ramen" },
        { name: "Paris", country: "France", highlight: "Louvre masterpieces, Seine sunsets & bistros" },
        { name: "Rome", country: "Italy", highlight: "Colosseum, Vatican treasures & pasta carbonara" },
        { name: "Barcelona", country: "Spain", highlight: "Gaudí architecture, Gothic Quarter & tapas" },
        { name: "Kyoto", country: "Japan", highlight: "Bamboo groves, 1,000 torii gates & matcha" },
        { name: "New York", country: "USA", highlight: "Central Park, Broadway & world-class skyline" },
      ]
    });
  });

  // Vite dev middleware or static dist serve
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WanderPlan Server running on http://0.0.0.0:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
