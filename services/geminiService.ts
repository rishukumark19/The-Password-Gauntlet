
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a Python script based on a user-provided description.
 * @param description The user's request for the Python script.
 * @returns The generated Python script as a string.
 */
export const generatePythonScript = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: description,
      config: {
        systemInstruction: `You are an expert Python developer. Your sole purpose is to generate a single, complete, and functional Python script based on the user's request.
        
        RULES:
        - Do not provide any explanations, comments, or introductory text outside of the Python code itself.
        - The entire output must be only the raw Python code.
        - The script must be runnable in a standard Python 3 environment.
        - Do not use any external libraries unless explicitly asked for in the user's request.
        - The code should be well-structured and include comments where necessary for clarity.`,
        temperature: 0.2, // Lower temperature for more deterministic code generation
      },
    });

    let script = response.text.trim();
    
    // Clean up potential markdown formatting that the model might add
    if (script.startsWith('```python')) {
        script = script.substring(9).trim();
    }
    if (script.endsWith('```')) {
        script = script.substring(0, script.length - 3).trim();
    }
    
    return script;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate script from Gemini API.");
  }
};
