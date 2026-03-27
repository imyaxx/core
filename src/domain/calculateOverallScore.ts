import type { DimensionScores } from "../schemas/modelEvaluation.js";

// Motivation and growthPotential are weighted slightly higher because
// they better reflect long-term fit and development potential in an
// admissions context.

const SCORE_WEIGHTS: Readonly<Record<keyof DimensionScores, number>> = {
  motivation: 0.22,
  leadership: 0.16,
  growthPotential: 0.22,
  initiative: 0.16,
  communication: 0.12,
  authenticity: 0.12,
};

// Floating-point arithmetic can introduce tiny precision errors, so
// weight validation uses a tolerance instead of strict equality.

const WEIGHT_SUM_TOLERANCE = 0.0001;

const TOTAL_WEIGHT = Object.values(SCORE_WEIGHTS).reduce(
  (sum, weight) => sum + weight,
  0,
);

if (Math.abs(TOTAL_WEIGHT - 1) > WEIGHT_SUM_TOLERANCE) {
  throw new Error("Score weights must sum to 1.");
}

function roundToTwoDecimalPlaces(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateOverallScore(scores: DimensionScores): number {
  const weightedScore =
    scores.motivation * SCORE_WEIGHTS.motivation +
    scores.leadership * SCORE_WEIGHTS.leadership +
    scores.growthPotential * SCORE_WEIGHTS.growthPotential +
    scores.initiative * SCORE_WEIGHTS.initiative +
    scores.communication * SCORE_WEIGHTS.communication +
    scores.authenticity * SCORE_WEIGHTS.authenticity;

  return roundToTwoDecimalPlaces(weightedScore);
}