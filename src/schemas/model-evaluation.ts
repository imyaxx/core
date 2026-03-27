import { z } from "zod";

function roundToSingleDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

function deduplicateItems(values: string[]): string[] {
  return Array.from(new Set(values));
}

const dimensionScoreSchema = z.number().finite().min(0).max(10).transform(roundToSingleDecimal);
const reasoningTextSchema = z.string().trim().min(1);
const insightListSchema = z
  .array(z.string().trim().min(1))
  .transform((values) => deduplicateItems(values));
const confidenceSchema = z.number().finite().min(0).max(1).transform(roundToTwoDecimals);

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

export const modelEvaluationSchema = z
  .object({
    scores: dimensionScoresSchema,
    reasoning: dimensionReasoningSchema,
    positives: insightListSchema,
    concerns: insightListSchema,
    summary: z.string().trim().min(1),
    confidence: confidenceSchema,
  })
  .strict();

export type DimensionScores = z.infer<typeof dimensionScoresSchema>;
export type DimensionReasoning = z.infer<typeof dimensionReasoningSchema>;
export type ModelEvaluation = z.infer<typeof modelEvaluationSchema>;
