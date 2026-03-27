import { calculateOverallScore } from "./domain/calculate-overall-score.js";
import { createFallbackModelEvaluation } from "./domain/create-fallback-model-evaluation.js";
import { buildEvaluationFlags } from "./domain/evaluation-flags.js";
import { createEvaluationPrompt } from "./prompts/create-evaluation-prompt.js";
import { evaluationSystemPrompt } from "./prompts/evaluation-system-prompt.js";
import { candidateInputSchema, type CandidateInput } from "./schemas/candidate-input.js";
import { finalEvaluationSchema, type FinalEvaluation } from "./schemas/final-evaluation.js";
import type { ModelEvaluation } from "./schemas/model-evaluation.js";
import { requestModelEvaluation } from "./services/request-model-evaluation.js";
import { parseModelEvaluation } from "./utils/parse-model-evaluation.js";

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

  let modelEvaluation: ModelEvaluation;

  try {
    const rawModelResponse = await requestModelEvaluation({
      systemPrompt: evaluationSystemPrompt,
      userPrompt,
    });

    modelEvaluation = parseModelEvaluation(rawModelResponse);
  } catch (error) {
    modelEvaluation = createFallbackModelEvaluation(error);
  }

  const overallScore = calculateOverallScore(modelEvaluation.scores);
  const flags = buildEvaluationFlags({
    candidate: validatedCandidate,
    modelEvaluation,
    overallScore,
  });

  return finalEvaluationSchema.parse({
    ...modelEvaluation,
    overallScore,
    flags,
  });
}
