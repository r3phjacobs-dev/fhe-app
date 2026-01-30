
import { GoogleGenAI } from "@google/genai";

export const chatWithGemini = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  // Inisialisasi di dalam fungsi agar tidak crash saat file ini di-import
  const apiKey = (window as any).process?.env?.API_KEY || "";
  
  if (!apiKey) {
    console.error("API Key tidak ditemukan di environment.");
    return "Maaf, sistem AI sedang dalam pemeliharaan. Silakan coba lagi nanti.";
  }

  try {
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

    return response.text || "Saya tidak dapat memberikan jawaban saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI.";
  }
};
