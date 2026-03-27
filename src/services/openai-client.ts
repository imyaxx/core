import "dotenv/config";

import OpenAI from "openai";
import { z } from "zod";

const openAiEnvironmentSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  OPENAI_MODEL: z.string().trim().min(1).default("gpt-4.1-mini"),
  OPENAI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.2),
  OPENAI_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(1200),
});

export interface OpenAiSettings {
  apiKey: string;
  model: string;
  temperature: number;
  maxOutputTokens: number;
}

let cachedSettings: OpenAiSettings | null = null;
let cachedClient: OpenAI | null = null;

export function getOpenAiSettings(): OpenAiSettings {
  if (cachedSettings !== null) {
    return cachedSettings;
  }

  const environmentResult = openAiEnvironmentSchema.safeParse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_TEMPERATURE: process.env.OPENAI_TEMPERATURE,
    OPENAI_MAX_OUTPUT_TOKENS: process.env.OPENAI_MAX_OUTPUT_TOKENS,
  });

  if (!environmentResult.success) {
    const errorMessage = environmentResult.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid OpenAI environment configuration. ${errorMessage}`);
  }

  cachedSettings = {
    apiKey: environmentResult.data.OPENAI_API_KEY,
    model: environmentResult.data.OPENAI_MODEL,
    temperature: environmentResult.data.OPENAI_TEMPERATURE,
    maxOutputTokens: environmentResult.data.OPENAI_MAX_OUTPUT_TOKENS,
  };

  return cachedSettings;
}

export function getOpenAiClient(): OpenAI {
  if (cachedClient !== null) {
    return cachedClient;
  }

  const settings = getOpenAiSettings();

  cachedClient = new OpenAI({
    apiKey: settings.apiKey,
  });

  return cachedClient;
}
