import "dotenv/config";

import OpenAI from "openai";

function readRequiredEnvironmentValue(name: string): string {
  const value = process.env[name]?.trim();

  if (value === undefined || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const openAIModel = readRequiredEnvironmentValue("OPENAI_MODEL");

export const openAIClient = new OpenAI({
  apiKey: readRequiredEnvironmentValue("OPENAI_API_KEY"),
});