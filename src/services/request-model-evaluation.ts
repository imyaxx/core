import { getOpenAiClient, getOpenAiSettings } from "./openai-client.js";

export interface ModelEvaluationRequest {
  systemPrompt: string;
  userPrompt: string;
}

export async function requestModelEvaluation(
  request: ModelEvaluationRequest,
): Promise<string> {
  const client = getOpenAiClient();
  const settings = getOpenAiSettings();

  try {
    const response = await client.responses.create({
      model: settings.model,
      instructions: request.systemPrompt,
      input: request.userPrompt,
      temperature: settings.temperature,
      max_output_tokens: settings.maxOutputTokens,
      store: false,
      text: {
        format: {
          type: "json_object",
        },
      },
    });

    const outputText = response.output_text.trim();

    if (outputText.length === 0) {
      throw new Error("OpenAI response did not include JSON content.");
    }

    return outputText;
  } catch (error) {
    throw new Error("Failed to request model evaluation from OpenAI.", {
      cause: error,
    });
  }
}
