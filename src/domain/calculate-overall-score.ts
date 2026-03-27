import type { DimensionScores } from "../schemas/model-evaluation.js";

import { evaluationScoreWeights } from "./score-weights.js";

function roundToSingleDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function calculateOverallScore(scores: DimensionScores): number {
  const weightedScore =
    scores.motivation * evaluationScoreWeights.motivation +
    scores.leadership * evaluationScoreWeights.leadership +
    scores.growthPotential * evaluationScoreWeights.growthPotential +
    scores.initiative * evaluationScoreWeights.initiative +
    scores.communication * evaluationScoreWeights.communication +
    scores.authenticity * evaluationScoreWeights.authenticity;

  return roundToSingleDecimal(weightedScore);
}
