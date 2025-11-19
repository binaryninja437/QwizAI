
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("🔑 Gemini API Key Status:", {
    isLoaded: !!API_KEY,
    keyStart: API_KEY ? API_KEY.substring(0, 10) + "..." : "❌ MISSING"
});

if (!API_KEY) {
    throw new Error("❌ VITE_GEMINI_API_KEY environment variable is not set!");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getAnswerFromImage(base64ImageData: string, mimeType: string): Promise<string> {
    console.log("🚀 Starting Gemini API request...");

    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };

        const textPart = {
            text: "You are an expert AI agent specializing in reasoning and solving multiple-choice questions (MCQs). Analyze the provided image and answer any questions within it. Provide a clear and concise explanation for your reasoning. If there are no clear questions, describe what you see and what potential questions could be asked.",
        };

        console.log("📡 Sending request to Gemini API...");

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [{ parts: [imagePart, textPart] }],
        });

        console.log("📥 Response received");

        if (!response.text) {
            console.error("❌ Empty response");
            throw new Error("The API returned an empty response.");
        }

        console.log("✅ Answer generated successfully!");
        return response.text;
    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}
