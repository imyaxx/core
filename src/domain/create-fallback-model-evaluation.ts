import { modelEvaluationSchema, type ModelEvaluation } from "../schemas/model-evaluation.js";

function getFallbackConcern(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return `Automatic evaluation failed: ${error.message}`;
  }

  return "Automatic evaluation failed before a reliable model assessment was produced.";
}

export function createFallbackModelEvaluation(error: unknown): ModelEvaluation {
  const fallbackReasoning = "Automatic evaluation was unavailable, so this dimension requires human review.";

  return modelEvaluationSchema.parse({
    scores: {
      motivation: 0,
      leadership: 0,
      growthPotential: 0,
      initiative: 0,
      communication: 0,
      authenticity: 0,
    },
    reasoning: {
      motivation: fallbackReasoning,
      leadership: fallbackReasoning,
      growthPotential: fallbackReasoning,
      initiative: fallbackReasoning,
      communication: fallbackReasoning,
      authenticity: fallbackReasoning,
    },
    positives: [],
    concerns: [getFallbackConcern(error)],
    summary: "Automatic evaluation could not be completed reliably and requires human review.",
    confidence: 0,
  });
}
