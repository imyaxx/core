import { openAIClient, openAIModel } from "./openaiClient.js";

const EVALUATION_TEMPERATURE = 0.2;

export type ModelEvaluationRequest = {
  systemPrompt: string;
  userPrompt: string;
};

export async function requestModelEvaluation(
  request: ModelEvaluationRequest,
): Promise<string> {
  try {
    const response = await openAIClient.responses.create({
      model: openAIModel,
      instructions: request.systemPrompt,
      input: request.userPrompt,
      temperature: EVALUATION_TEMPERATURE,
      store: false,
      text: {
        format: {
          type: "json_object",
        },
      },
    });

    if (!response.output_text || response.output_text.trim().length === 0) {
      throw new Error("OpenAI returned an empty evaluation response.");
    }

    return response.output_text;
  } catch (error) {
    throw new Error("Failed to request model evaluation from OpenAI.", {
      cause: error,
    });
  }
}