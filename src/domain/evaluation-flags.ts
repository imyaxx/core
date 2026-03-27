import type { CandidateInput } from "../schemas/candidate-input.js";
import type { EvaluationFlags } from "../schemas/final-evaluation.js";
import type { ModelEvaluation } from "../schemas/model-evaluation.js";

export const evaluationFlagThresholds = {
  lowDataMinimumWordCount: 120,
  lowDataMinimumEvidenceItems: 2,
  highPotentialMinimumOverallScore: 7.8,
  highPotentialMinimumConfidence: 0.7,
  needsReviewMaximumConfidence: 0.55,
  needsReviewMinimumConcernCount: 3,
  needsReviewScoreBandFloor: 4.5,
  needsReviewScoreBandCeiling: 7.8,
} as const;

function countWords(text: string): number {
  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    return 0;
  }

  return trimmedText.split(/\s+/u).length;
}

function getEvidenceTexts(candidate: CandidateInput): string[] {
  const shortAnswerTexts = candidate.shortAnswers.map((shortAnswer) => shortAnswer.answer.trim());

  return [candidate.essay.trim(), ...shortAnswerTexts].filter((text) => text.length > 0);
}

export function buildEvaluationFlags(input: {
  candidate: CandidateInput;
  modelEvaluation: ModelEvaluation;
  overallScore: number;
}): EvaluationFlags {
  const evidenceTexts = getEvidenceTexts(input.candidate);
  const totalWordCount = evidenceTexts.reduce((wordCount, text) => wordCount + countWords(text), 0);
  const evidenceItemCount = evidenceTexts.length;

  const lowData =
    totalWordCount < evaluationFlagThresholds.lowDataMinimumWordCount ||
    evidenceItemCount < evaluationFlagThresholds.lowDataMinimumEvidenceItems;

  const highPotential =
    !lowData &&
    input.overallScore >= evaluationFlagThresholds.highPotentialMinimumOverallScore &&
    input.modelEvaluation.confidence >= evaluationFlagThresholds.highPotentialMinimumConfidence &&
    input.modelEvaluation.concerns.length < evaluationFlagThresholds.needsReviewMinimumConcernCount;

  const needsReview =
    lowData ||
    input.modelEvaluation.confidence < evaluationFlagThresholds.needsReviewMaximumConfidence ||
    input.modelEvaluation.concerns.length >= evaluationFlagThresholds.needsReviewMinimumConcernCount ||
    (input.overallScore >= evaluationFlagThresholds.needsReviewScoreBandFloor &&
      input.overallScore < evaluationFlagThresholds.needsReviewScoreBandCeiling);

  return {
    highPotential,
    needsReview,
    lowData,
  };
}
