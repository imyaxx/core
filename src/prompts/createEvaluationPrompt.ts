import type { CandidateInput } from "../schemas/candidateInput.js";

function formatShortAnswers(candidate: CandidateInput): string {
  if (candidate.shortAnswers.length === 0) {
    return "None provided.";
  }

  return candidate.shortAnswers
    .map((shortAnswer, index) =>
      [
        `Short Answer ${index + 1}`,
        `Question: ${shortAnswer.question}`,
        `Answer: ${shortAnswer.answer}`,
      ].join("\n"),
    )
    .join("\n\n");
}

export function createEvaluationPrompt(candidate: CandidateInput): string {
  return [
    "Evaluate the following candidate submission.",
    "Use only the provided evidence and return JSON only.",
    "",
    "Candidate Metadata",
    `Candidate ID: ${candidate.candidateId}`,
    `Candidate Name: ${candidate.name}`,
    "",
    "Essay",
    candidate.essay,
    "",
    "Short Answer Responses",
    formatShortAnswers(candidate),
  ].join("\n\n");
}