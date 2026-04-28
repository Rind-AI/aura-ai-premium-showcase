import { GoogleGenAI } from "@google/genai";

// KEY RULE: NEVER hardcode API keys here — they get pushed to public GitHub and Google auto-revokes them.
// Key lives ONLY in .env.local (gitignored) as VITE_GEMINI_API_KEY
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export const CHAT_MODEL = "gemini-2.5-flash";
export const FAST_MODEL = "gemini-2.5-flash";
export const GROUNDING_MODEL = "gemini-2.5-flash";

export interface Message {
  role: "user" | "model";
  text: string;
}

function getClient(): GoogleGenAI {
  if (!GEMINI_KEY) {
    throw new Error("API_KEY_MISSING: Add VITE_GEMINI_API_KEY to .env.local and rebuild.");
  }
  return new GoogleGenAI({ apiKey: GEMINI_KEY });
}

export async function chatWithGemini(messages: Message[], systemInstruction?: string) {
  const client = getClient();
  const chat = client.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: systemInstruction || "You are Aura, a premium AI assistant for Khalid Rind's digital showcase website. You are sophisticated, helpful, and concise.",
    },
    history: messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }))
  });
  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage({ message: lastMessage.text });
  return result.text;
}

export async function getGroundedInfo(query: string, type: "search" | "maps") {
  const client = getClient();
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
}

export async function researchWithGrounding(query: string) {
  const client = getClient();
  const response = await client.models.generateContent({
    model: CHAT_MODEL,
    contents: `Perform a deep data science research and provide a powerful, grounded analysis on the following topic: ${query}. Focus on industry trends, brand positioning, and innovative ideas. Use Google Search grounding to ensure accuracy and provide real-world insights.`,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });
  return response.text;
}
