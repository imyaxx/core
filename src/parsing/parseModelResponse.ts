import { modelRawEvaluationSchema, type ModelRawEvaluation } from "../schemas/modelEvaluation.js";

function unwrapJsonCodeFence(rawResponse: string): string {
  const trimmedResponse = rawResponse.trim();

  if (!trimmedResponse.startsWith("```")) {
    return trimmedResponse;
  }

  return trimmedResponse
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export function parseModelEvaluation(rawResponse: string): ModelRawEvaluation {
  const normalizedResponse = unwrapJsonCodeFence(rawResponse);

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(normalizedResponse);
  } catch (error) {
    throw new Error("Model response was not valid JSON.", {
      cause: error,
    });
  }

  const validationResult = modelRawEvaluationSchema.safeParse(parsedResponse);

  if (!validationResult.success) {
    const issueList = validationResult.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Model response failed schema validation. ${issueList}`);
  }

  return validationResult.data;
}
