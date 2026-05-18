export { hermieConfig } from "./hermie-config";
export { jimmyConfig, jimmySystemPrompt } from "./jimmy-config";

// Utility types for agent responses
export interface HermieResult {
  title: string;
  doi?: string;
  abstract: string;
  sourceUrl: string;
  keywords: string[];
  biomarkers: string[];
}

export interface JimmyResult {
  title: string;
  category: string;
  bibleVerse: string;
  scriptureText: string;
  scientificMechanism: string;
  physiologicalBenefit: string;
  socialHook: string;
}

// OpenRouter API client
import axios from "axios";

export class OpenRouterClient {
  private apiKey: string;
  private baseURL = "https://openrouter.ai/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(
    systemPrompt: string,
    userMessage: string,
    model: string = "anthropic/claude-3.5-sonnet",
  ) {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://bio-theology-engine.railway.app",
            "X-Title": "Bio-Theology Engine",
          },
        },
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw error;
    }
  }
}
