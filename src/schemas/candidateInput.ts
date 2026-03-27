import { z } from "zod";

export const shortAnswerSchema = z
  .object({
    question: z.string().trim().min(1),
    answer: z.string().trim().min(1),
  })
  .strict();

export const candidateInputSchema = z
  .object({
    candidateId: z.string().trim().min(1),
    name: z.string().trim().min(1),
    essay: z.string().trim().min(1),
    shortAnswers: z.array(shortAnswerSchema),
  })
  .strict();

export type ShortAnswer = z.infer<typeof shortAnswerSchema>;
export type CandidateInput = z.infer<typeof candidateInputSchema>;