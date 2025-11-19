
import { GoogleGenAI } from "@google/genai";

console.log("=== ENVIRONMENT DEBUG ===");
console.log("All env vars:", import.meta.env);
console.log("VITE_GEMINI_API_KEY exists:", !!import.meta.env.VITE_GEMINI_API_KEY);
console.log("VITE_GEMINI_API_KEY value:", import.meta.env.VITE_GEMINI_API_KEY ?
    import.meta.env.VITE_GEMINI_API_KEY.substring(0, 15) + "..." : "MISSING");

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ CRITICAL: API key is not loaded!");
    console.error("Check: 1) .env.local file exists, 2) Dev server restarted, 3) File has correct variable name");
    throw new Error("❌ VITE_GEMINI_API_KEY environment variable is not set!");
}

console.log("✅ API Key loaded successfully");

let ai: GoogleGenAI;
try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
    console.log("✅ GoogleGenAI instance created");
} catch (error) {
    console.error("❌ Failed to create GoogleGenAI instance:", error);
    throw error;
}

export async function getAnswerFromImage(base64ImageData: string, mimeType: string): Promise<string> {
    console.log("=== STARTING API REQUEST ===");
    console.log("📊 Request details:", {
        imageSize: base64ImageData.length,
        mimeType: mimeType,
        apiKeyPresent: !!API_KEY
    });

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

        console.log("📦 Payload prepared");
        console.log("📡 Calling Gemini API with model: gemini-2.0-flash-exp");

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            contents: [{ parts: [imagePart, textPart] }],
        });

        console.log("📥 Raw response:", response);
        console.log("📝 Response text exists:", !!response.text);

        if (!response.text) {
            console.error("❌ Empty response from API");
            console.error("Full response object:", JSON.stringify(response, null, 2));
            throw new Error("The API returned an empty response.");
        }

        console.log("✅ SUCCESS! Answer received, length:", response.text.length);
        return response.text;
    } catch (error) {
        console.error("=== ERROR DETAILS ===");
        console.error("Error type:", error?.constructor?.name);
        console.error("Error message:", error instanceof Error ? error.message : "Unknown");
        console.error("Full error:", error);

        if (error instanceof Error) {
            // Check for specific error types
            if (error.message.includes("API key")) {
                throw new Error(`API Key Error: ${error.message}. Your key might be invalid or expired.`);
            }
            if (error.message.includes("quota")) {
                throw new Error(`Quota Error: ${error.message}. You may have exceeded your API limits.`);
            }
            if (error.message.includes("permission")) {
                throw new Error(`Permission Error: ${error.message}. Check your API key permissions.`);
            }
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}
