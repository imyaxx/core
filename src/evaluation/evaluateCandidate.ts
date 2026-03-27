import { calculateOverallScore } from "../domain/calculateOverallScore.js";
import { createFallbackModelEvaluation } from "../domain/create-fallback-model-evaluation.js";
import { buildEvaluationFlags } from "../domain/buildEvaluationFlags.js";
import { createEvaluationPrompt } from "../prompts/createEvaluationPrompt.js";
import { evaluationSystemPrompt } from "../prompts/evaluationSystemPrompt.js";
import { candidateInputSchema, type CandidateInput } from "../schemas/candidateInput.js";
import { finalEvaluationSchema, type FinalEvaluation } from "../schemas/finalEvaluation.js";
import type { ModelRawEvaluation } from "../schemas/modelEvaluation.js";
import { requestModelEvaluation } from "../services/requestModelEvaluation.js";
import { parseModelResponse } from "../parsing/parseModelResponse.js";

function formatCandidateValidationError(error: string): string {
  return `Candidate input validation failed. ${error}`;
}

export async function evaluateCandidate(candidate: CandidateInput): Promise<FinalEvaluation> {
  const candidateValidation = candidateInputSchema.safeParse(candidate);

  if (!candidateValidation.success) {
    const issueList = candidateValidation.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(formatCandidateValidationError(issueList));
  }

  const validatedCandidate = candidateValidation.data;
  const userPrompt = createEvaluationPrompt(validatedCandidate);

  let modelEvaluation: ModelRawEvaluation;

  try {
    const rawModelResponse = await requestModelEvaluation({
      systemPrompt: evaluationSystemPrompt,
      userPrompt,
    });

    modelEvaluation = parseModelResponse(rawModelResponse);
  } catch (error) {
    modelEvaluation = createFallbackModelEvaluation(error);
  }

  const overallScore = calculateOverallScore(modelEvaluation.scores);
  const flags = buildEvaluationFlags({
    overallScore,
    confidence: modelEvaluation.confidence,
    authenticityScore: modelEvaluation.scores.authenticity,
  });

  return finalEvaluationSchema.parse({
    ...modelEvaluation,
    overallScore,
    flags,
  });
}
