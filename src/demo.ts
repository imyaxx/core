import { candidateFixtures } from "./fixtures/candidates.js";
import { evaluateCandidate } from "./evaluate-candidate.js";

async function runDemo(): Promise<void> {
  for (const candidate of candidateFixtures) {
    const evaluation = await evaluateCandidate(candidate);

    console.log(`\n=== ${candidate.candidateId} | ${candidate.name} ===`);
    console.dir(evaluation, { depth: null });
  }
}

void runDemo().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown demo failure.";

  console.error(message);
  process.exitCode = 1;
});
