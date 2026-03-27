import { evaluateCandidate } from "./evaluation/evaluateCandidate.js";
import { candidateFixtures } from "./fixtures/candidates.js";

function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown evaluation failure.";
}

async function runDemo(): Promise<void> {
  for (const candidate of candidateFixtures) {
    console.log(`\n=== ${candidate.candidateId} | ${candidate.name} ===`);

    try {
      const evaluation = await evaluateCandidate(candidate);

      console.log(`Overall Score: ${evaluation.overallScore}`);
      console.log(`Summary: ${evaluation.summary}`);
      console.dir(evaluation, { depth: null });
    } catch (error) {
      console.error(`Evaluation failed: ${formatErrorMessage(error)}`);
    }
  }
}

void runDemo().catch((error: unknown) => {
  console.error(`Demo failed: ${formatErrorMessage(error)}`);
  process.exitCode = 1;
});