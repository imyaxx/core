import { z } from "zod";

import { modelEvaluationSchema } from "./model-evaluation.js";

function roundToSingleDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export const evaluationFlagsSchema = z
  .object({
    highPotential: z.boolean(),
    needsReview: z.boolean(),
    lowData: z.boolean(),
  })
  .strict();

export const finalEvaluationSchema = modelEvaluationSchema.extend({
  overallScore: z.number().finite().min(0).max(10).transform(roundToSingleDecimal),
  flags: evaluationFlagsSchema,
});

export type EvaluationFlags = z.infer<typeof evaluationFlagsSchema>;
export type FinalEvaluation = z.infer<typeof finalEvaluationSchema>;
