import type { CandidateInput } from "../schemas/candidate-input.js";

export function createEvaluationPrompt(candidate: CandidateInput): string {
  const candidatePayload = {
    candidateId: candidate.candidateId,
    name: candidate.name,
    essay: candidate.essay,
    shortAnswers: candidate.shortAnswers,
  };

  return [
    "Evaluate the following candidate submission for an admissions review workflow.",
    "Use only the supplied evidence.",
    "Return JSON only.",
    "Candidate submission:",
    JSON.stringify(candidatePayload, null, 2),
  ].join("\n\n");
}
