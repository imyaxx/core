import { z } from "zod";

const dimensionScoreSchema = z.number().finite().min(0).max(10);
const reasoningTextSchema = z.string().trim().min(1);
const insightListSchema = z.array(z.string().trim().min(1));
const confidenceSchema = z.number().finite().min(0).max(1);
const recommendationSchema = z.enum(["strong", "review", "weak"]);

export const dimensionScoresSchema = z
  .object({
    motivation: dimensionScoreSchema,
    leadership: dimensionScoreSchema,
    growthPotential: dimensionScoreSchema,
    initiative: dimensionScoreSchema,
    communication: dimensionScoreSchema,
    authenticity: dimensionScoreSchema,
  })
  .strict();

export const dimensionReasoningSchema = z
  .object({
    motivation: reasoningTextSchema,
    leadership: reasoningTextSchema,
    growthPotential: reasoningTextSchema,
    initiative: reasoningTextSchema,
    communication: reasoningTextSchema,
    authenticity: reasoningTextSchema,
  })
  .strict();

export const modelRawEvaluationSchema = z
  .object({
    scores: dimensionScoresSchema,
    reasoning: dimensionReasoningSchema,
    positives: insightListSchema,
    concerns: insightListSchema,
    summary: z.string().trim().min(1),
    confidence: confidenceSchema,
    recommendation: recommendationSchema,
    possibleInauthenticityRisk: z.boolean(),
  })
  .strict();

export type DimensionScores = z.infer<typeof dimensionScoresSchema>;
export type DimensionReasoning = z.infer<typeof dimensionReasoningSchema>;
export type ModelRecommendation = z.infer<typeof recommendationSchema>;
export type ModelRawEvaluation = z.infer<typeof modelRawEvaluationSchema>;
