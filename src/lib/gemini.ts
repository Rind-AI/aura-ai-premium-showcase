import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. AI features will be disabled.");
}

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const CHAT_MODEL = "gemini-2.0-flash";
export const FAST_MODEL = "gemini-2.0-flash-lite";
export const GROUNDING_MODEL = "gemini-2.0-flash";

export interface Message {
  role: "user" | "model";
  text: string;
}

export async function chatWithGemini(messages: Message[], systemInstruction?: string) {
  if (!ai) throw new Error("AI not initialized");

  const chat = ai.chats.create({
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
  const result = await chat.sendMessage({
    message: lastMessage.text
  });

  return result.text;
}

export async function getGroundedInfo(query: string, type: "search" | "maps") {
  if (!ai) throw new Error("AI not initialized");

  const prompt = type === "maps"
    ? `Find location-based information, businesses, or geographical insights for: ${query}. Provide specific details including addresses, ratings, and practical information where available.`
    : query;

  const response = await ai.models.generateContent({
    model: GROUNDING_MODEL,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  return response.text;
}

export async function researchWithGrounding(query: string) {
  if (!ai) throw new Error("AI not initialized");

  const response = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: `Perform a deep data science research and provide a powerful, grounded analysis on the following topic: ${query}.
    Focus on industry trends, brand positioning, and innovative ideas.
    Use Google Search grounding to ensure accuracy and provide real-world insights.`,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });

  return response.text;
}
