import { z } from "zod";

import { modelRawEvaluationSchema } from "./modelEvaluation.js";

const overallScoreSchema = z.number().finite().min(0).max(10);

export const evaluationFlagsSchema = z
  .object({
    highPotential: z.boolean(),
    needsReview: z.boolean(),
    lowData: z.boolean(),
  })
  .strict();

export const finalEvaluationSchema = modelRawEvaluationSchema
  .extend({
    overallScore: overallScoreSchema,
    flags: evaluationFlagsSchema,
  })
  .strict();

export type EvaluationFlags = z.infer<typeof evaluationFlagsSchema>;
export type FinalEvaluation = z.infer<typeof finalEvaluationSchema>;