import { modelRawEvaluationSchema, type ModelRawEvaluation } from "../schemas/modelEvaluation.js";

export function parseModelResponse(rawResponse: string): ModelRawEvaluation {
  if (!rawResponse || rawResponse.trim().length === 0) {
    throw new Error("Model response is empty.");
  }

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(rawResponse);
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

    throw new Error(
      `Model response does not match expected evaluation schema. ${issueList}`,
    );
  }

  return validationResult.data;
}