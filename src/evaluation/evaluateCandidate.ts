import { calculateOverallScore } from "../domain/calculateOverallScore.js";
import { buildEvaluationFlags } from "../domain/buildEvaluationFlags.js";
import { parseModelResponse } from "../parsing/parseModelResponse.js";
import { createEvaluationPrompt } from "../prompts/createEvaluationPrompt.js";
import { evaluationSystemPrompt } from "../prompts/evaluationSystemPrompt.js";
import {
  candidateInputSchema,
  type CandidateInput,
} from "../schemas/candidateInput.js";
import {
  finalEvaluationSchema,
  type FinalEvaluation,
} from "../schemas/finalEvaluation.js";
import { requestModelEvaluation } from "../services/requestModelEvaluation.js";

export async function evaluateCandidate(
  candidate: CandidateInput,
): Promise<FinalEvaluation> {
  const validatedCandidate = candidateInputSchema.parse(candidate);
  const userPrompt = createEvaluationPrompt(validatedCandidate);

  const rawModelResponse = await requestModelEvaluation({
    systemPrompt: evaluationSystemPrompt,
    userPrompt,
  });

  const modelEvaluation = parseModelResponse(rawModelResponse);
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