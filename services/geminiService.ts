const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!API_KEY) {
    throw new Error("VITE_OPENROUTER_API_KEY environment variable is not set.");
}

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function getAnswerFromImage(base64ImageData: string, mimeType: string): Promise<string> {
    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin,
                "X-Title": "QwizAI",
            },
            body: JSON.stringify({
                model: "anthropic/claude-3.5-sonnet", // Using Claude 3.5 Sonnet for vision
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "You are an expert AI agent specializing in reasoning and solving multiple-choice questions (MCQs). Analyze the provided image and answer any questions within it. Provide a clear and concise explanation for your reasoning. If there are no clear questions, describe what you see and what potential questions could be asked."
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:${mimeType};base64,${base64ImageData}`
                                }
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
            throw new Error(`OpenRouter API Error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0]?.message?.content) {
            throw new Error("The API returned an empty response.");
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling OpenRouter API:", error);
        if (error instanceof Error) {
            throw new Error(`OpenRouter API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with OpenRouter API.");
    }
}
