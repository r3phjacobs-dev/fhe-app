
import { GoogleGenAI } from "@google/genai";

// Core function to interact with Gemini API
export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Always use this specific initialization format with named apiKey parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-flash-preview as the default model for general chat tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: prompt }] }
    ],
    config: {
      systemInstruction: 'Anda adalah FHE Intelligence, asisten AI pakar Trading Forex dari komunitas Forex Home Expert. Gunakan gaya bahasa profesional, informatif, dan bijak dalam manajemen risiko. Berikan analisis singkat namun mendalam. Selalu ingatkan bahwa trading memiliki risiko tinggi.',
      temperature: 0.7,
    }
  });

  // Extract text output using the .text property as per guidelines
  return response.text;
};
