import type { EvaluationFlags } from "../schemas/finalEvaluation.js";

const EVALUATION_FLAG_THRESHOLDS = {
  highPotentialMinimumOverallScore: 8,
  lowConfidenceMaximumValue: 0.45,
  veryLowConfidenceMaximumValue: 0.25,
  lowAuthenticityMaximumScore: 4,
} as const;

type BuildEvaluationFlagsInput = {
  overallScore: number;
  confidence: number;
  authenticityScore: number;
};

export function buildEvaluationFlags(
  input: BuildEvaluationFlagsInput
): EvaluationFlags {
  const highPotential =
    input.overallScore >=
    EVALUATION_FLAG_THRESHOLDS.highPotentialMinimumOverallScore;

  const lowData =
    input.confidence <=
    EVALUATION_FLAG_THRESHOLDS.veryLowConfidenceMaximumValue;

  const needsReview =
    input.authenticityScore <=
      EVALUATION_FLAG_THRESHOLDS.lowAuthenticityMaximumScore ||
    input.confidence <=
      EVALUATION_FLAG_THRESHOLDS.lowConfidenceMaximumValue;

  return {
    highPotential,
    needsReview,
    lowData,
  };
}