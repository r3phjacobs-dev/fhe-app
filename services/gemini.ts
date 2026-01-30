
import { GoogleGenAI } from "@google/genai";

export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Pastikan API KEY tersedia sebelum inisialisasi
  const apiKey = (typeof process !== 'undefined' && process.env?.API_KEY) ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.error("API Key Gemini tidak ditemukan.");
    return "Maaf, asisten AI sedang tidak tersedia karena masalah konfigurasi.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
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

  return response.text;
};
