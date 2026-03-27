import type { DimensionScores } from "../schemas/modelEvaluation.js";

export const evaluationScoreWeights: Record<keyof DimensionScores, number> = {
  motivation: 0.22,
  leadership: 0.17,
  growthPotential: 0.22,
  initiative: 0.17,
  communication: 0.11,
  authenticity: 0.11,
};
