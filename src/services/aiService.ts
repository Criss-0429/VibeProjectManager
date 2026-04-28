import { GoogleGenAI, Type } from "@google/genai";
import { ActionIntent } from "../lib/types";

// Requires GEMINI_API_KEY environment variable. We use process.env.GEMINI_API_KEY as injected by Vite.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const extractIntent = async (text: string): Promise<ActionIntent> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following text and extract the user's intent according to the schema. Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          intent: {
            type: Type.STRING,
            description: "The user's intent. Must be one of CREATE_TASK, COMPLETE_TASK, ADD_NOTE, READOUT_REQUEST, UNKNOWN",
            enum: ["CREATE_TASK", "COMPLETE_TASK", "ADD_NOTE", "READOUT_REQUEST", "UNKNOWN"]
          },
          target_project_slug: {
            type: Type.STRING,
            description: "The slug of the target project, e.g., alpha-core, beta-ui. Leave empty if undetermined."
          },
          extracted_text: {
            type: Type.STRING,
            description: "The main body of the task or note"
          },
          confidence_score: {
            type: Type.NUMBER,
            description: "Confidence from 0.0 to 1.0"
          }
        },
        required: ["intent", "extracted_text", "confidence_score"]
      }
    }
  });

  const rawText = response.text || "{}";
  try {
    return JSON.parse(rawText) as ActionIntent;
  } catch (e) {
    console.error("Failed to parse intent:", e);
    return {
      intent: "UNKNOWN",
      extracted_text: text,
      confidence_score: 0
    };
  }
};
