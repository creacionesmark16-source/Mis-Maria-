import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { Message } from "../types";

const apiKey = process.env.GEMINI_API_KEY || "";

export const sendMessageToGemini = async (userMessage: string, history: Message[], exchangeRate?: number | null) => {
  if (!apiKey) {
    throw new Error("API Key de Gemini no configurada.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const rateInfo = exchangeRate 
    ? `\n\nINFORMACIÓN DE TASA DE CAMBIO (BCV): La tasa oficial de hoy es Bs. ${exchangeRate.toLocaleString('es-VE', { minimumFractionDigits: 2 })} por dólar. Siempre que menciones precios, puedes darlos en ambas monedas si el cliente lo prefiere.`
    : "";

  // Convertir el historial al formato que espera Gemini
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // Añadir el mensaje actual
  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT + rateInfo,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text || "Lo siento, no he podido procesar tu solicitud. 🍷";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Disculpa, ha ocurrido un error técnico. Por favor, contacta con nosotros al teléfono de reservas. ✨";
  }
};
