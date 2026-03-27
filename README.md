# Admissions Evaluation Engine

An AI-powered admissions evaluation engine for essays and short answers. It transforms unstructured candidate submissions into a structured, explainable evaluation with scores, reasoning, summary insights, confidence, and review flags.

This system is designed for human-in-the-loop admissions workflows. It does not make autonomous decisions. Instead, it supports reviewers with a consistent, transparent first-pass evaluation.

---

## Project Overview

Admissions teams often need to evaluate large numbers of candidates quickly while maintaining fairness, consistency, and explainability.

This project addresses that challenge by combining:
- structured prompting for stable model outputs
- schema validation for reliability
- deterministic scoring for consistency
- explicit review flags for human oversight

The result is a minimal, explainable AI evaluation engine that is easy to understand, test, and extend.

---

## Why This Matters

This system helps admissions teams:

- reduce inconsistency across reviewers  
- identify high-potential candidates faster  
- surface weak or generic applications for deeper review  
- maintain transparency in decision-making  
- support human judgment rather than replace it  

---

## Key Features

- Evaluates candidate essays and short answers across six dimensions:
  - motivation
  - leadership
  - growthPotential
  - initiative
  - communication
  - authenticity
- Produces structured reasoning for each dimension
- Returns positives, concerns, summary, and confidence
- Computes overallScore deterministically in code
- Builds explicit review flags (highPotential, needsReview, lowData)
- Validates all model output using Zod schemas
- Clean separation of concerns across architecture layers

---

## Architecture

The codebase is intentionally modular and minimal:

src/
  prompts/        → prompt construction
  services/       → OpenAI interaction
  parsing/        → response parsing & validation
  domain/         → scoring & flags logic
  schemas/        → data contracts (Zod + TS)
  evaluation/     → orchestration
  fixtures/       → demo candidates

- src/prompts — prompt construction
- src/services — OpenAI interaction
- src/parsing — parsing and validation
- src/domain — scoring and flags logic
- src/schemas — contracts (Zod + TS)
- src/evaluation — orchestration
- src/fixtures — demo data

---

## How It Works

1. Candidate input is validated
2. Prompt is constructed
3. Model generates JSON output
4. Response is parsed and validated
5. Scores are aggregated into overallScore
6. Flags are computed
7. Final structured result is returned

---

## Baseline Comparison

To validate effectiveness, the AI system is compared against a simple deterministic baseline.

Baseline approach:
- essay length
- number of short answers
- keyword presence (e.g. "team", "leader", "motivated")

Example:

Strong → Baseline: 6.2 | AI: 8.12  
Average → Baseline: 5.9 | AI: 5.88  
Weak → Baseline: 5.8 | AI: 3.94  

The AI produces more calibrated results, especially for weak candidates.

---

## Demo Scenario

The demo evaluates:
- strong candidate
- average candidate
- weak candidate

This shows how the system differentiates and explains decisions.

---

## How To Run

npm install  
cp .env.example .env  
npm run demo  

---

## Environment Variables

OPENAI_API_KEY  
OPENAI_MODEL  

---

## Limitations

- depends on model behavior  
- no external verification of claims  
- confidence is model-generated  
- demo uses synthetic data  

---

## Ethical Considerations

- not an autonomous decision system  
- no sensitive attributes used  
- explainable reasoning  
- human decision required  

---

## Future Improvements

- better calibration  
- UI dashboard  
- resume + interview support  
- evaluation benchmarking  