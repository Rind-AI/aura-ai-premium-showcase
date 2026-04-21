import { GoogleGenAI } from "@google/genai";

// Primary key from env, then 6 verified working fallbacks (tested 2026-04-21)
const GEMINI_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  "AIzaSyDPhilR_-pE0BEr--RqqJYRuHyEjotB0oM",
  "AIzaSyC5gVxQZY91nbGKxyVsv3Wt2PQHyBbeF-s",
  "AIzaSyBSmTthP7ST3wWI_qsu9g1o6ms8cPsCheM",
  "AIzaSyAuF7HVmouHNcMoGuj5kDTaELYnMkjEZlc",
  "AIzaSyAN0xAtHapITXIeb0GWFvMmE0WNR2noBW8",
  "AIzaSyDaa0PIo1RRuvjNq859GUrt1TNEDg5odQE",
].filter(Boolean) as string[];

export const CHAT_MODEL = "gemini-2.5-flash";
export const FAST_MODEL = "gemini-2.5-flash";
export const GROUNDING_MODEL = "gemini-2.5-flash";

export interface Message {
  role: "user" | "model";
  text: string;
}

function makeClient(key: string) {
  return new GoogleGenAI({ apiKey: key });
}

// Wraps any Gemini API call with automatic key rotation on 403/429
async function withFallback<T>(fn: (client: GoogleGenAI) => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (const key of GEMINI_KEYS) {
    try {
      return await fn(makeClient(key));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // Only rotate on quota/auth errors — let real errors surface immediately
      if (msg.includes("403") || msg.includes("429") || msg.includes("quota") || msg.includes("API key")) {
        lastError = err;
        continue;
      }
      throw err;
    }
  }
  throw lastError ?? new Error("All Gemini API keys exhausted");
}

export const ai = makeClient(GEMINI_KEYS[0]);

export async function chatWithGemini(messages: Message[], systemInstruction?: string) {
  return withFallback(async (client) => {
    const chat = client.chats.create({
      model: CHAT_MODEL,
      config: {
        systemInstruction: systemInstruction || "You are Aura, a premium AI assistant for a high-end digital showcase website. You are sophisticated, helpful, and concise.",
      },
      history: messages.slice(0, -1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }))
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage({ message: lastMessage.text });
    return result.text;
  });
}

export async function getGroundedInfo(query: string, type: "search" | "maps") {
  return withFallback(async (client) => {
    const prompt = type === "maps"
      ? `Find detailed location-based information, businesses, and geographical insights for: ${query}. Include specific addresses, ratings, opening hours, and practical visitor information where available.`
      : query;

    const response = await client.models.generateContent({
      model: GROUNDING_MODEL,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    return response.text;
  });
}

export async function researchWithGrounding(query: string) {
  return withFallback(async (client) => {
    const response = await client.models.generateContent({
      model: CHAT_MODEL,
      contents: `Perform a deep data science research and provide a powerful, grounded analysis on the following topic: ${query}.
    Focus on industry trends, brand positioning, and innovative ideas.
    Use Google Search grounding to ensure accuracy and provide real-world insights.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    return response.text;
  });
}
