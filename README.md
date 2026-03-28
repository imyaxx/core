# Admissions Evaluation Engine

AI-powered evaluation engine for structured assessment of candidate essays and short answers.

Transforms unstructured input into a consistent, explainable evaluation including:
- dimension-level scoring
- summary reasoning
- positives and concerns
- confidence signal
- review flags

Designed for human-in-the-loop admissions workflows.  
This system does not make decisions — it supports them.

---

## Overview

This engine provides a deterministic and explainable layer on top of LLM output.

It combines:
- structured prompting
- strict schema validation
- deterministic aggregation logic
- explicit review signals

The result is a stable and inspectable evaluation pipeline suitable for real-world usage.

---

## Repositories

- Core (this repo): https://github.com/imyaxx/core  
- Server API: https://github.com/imyaxx/server  
- Web client: https://github.com/imyaxx/web  

---

## Responsibilities

- generate structured evaluation via LLM
- validate model output (Zod)
- compute deterministic scores
- construct review signals (flags)
- return normalized evaluation result

No transport, UI, or API concerns are handled here.

---

## Evaluation Dimensions

Each candidate is evaluated across six dimensions:

- motivation
- leadership
- growthPotential
- initiative
- communication
- authenticity

Each dimension includes:
- score (numeric)
- reasoning (text)

---

## Output Structure

```json
{
  "overallScore": 8.1,
  "summary": "Clear motivation with strong communication ability.",
  "positives": ["Strong initiative", "Clear goals"],
  "concerns": ["Limited leadership depth"],
  "confidence": 0.92,
  "flags": {
    "highPotential": true,
    "needsReview": false,
    "lowData": false
  },
  "scores": {
    "motivation": 9,
    "leadership": 7,
    "growthPotential": 8,
    "initiative": 9,
    "communication": 8,
    "authenticity": 8
  }
}
```

---

## How It Works

1. Input validation  
2. Prompt construction  
3. LLM call (OpenAI)  
4. JSON parsing + schema validation  
5. Score aggregation  
6. Flag computation  
7. Structured result returned  

---

## Architecture

```
src/
  prompts/        → prompt construction
  services/       → OpenAI client
  parsing/        → response parsing & validation
  domain/         → scoring + flags logic
  schemas/        → Zod contracts
  evaluation/     → orchestration pipeline
  fixtures/       → demo data
```

---

## Getting Started

### 1. Install dependencies

```bash
cd core
npm install
```

---

### 2. Configure environment

Create `.env`:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

---

### 3. Run demo

```bash
npm run demo
```

---

## Integration

This package is consumed by the server:

```
server → core → OpenAI
```

- server handles validation + routing  
- core handles evaluation logic  
- web consumes server API  

---

## Design Principles

- deterministic outputs where possible  
- strict schema validation  
- separation of concerns  
- explainability over raw accuracy  
- composable pipeline  

---

## Baseline Comparison

A simple deterministic baseline is used for comparison:

Baseline signals:
- essay length
- number of responses
- keyword presence

Example:

```
Strong → Baseline: 6.2 | AI: 8.12  
Average → Baseline: 5.9 | AI: 5.88  
Weak → Baseline: 5.8 | AI: 3.94  
```

AI evaluation provides better separation, especially for weak candidates.

---

## Limitations

- dependent on LLM behavior  
- no external fact verification  
- confidence is model-derived  
- demo uses synthetic data  

---

## Ethical Considerations

- not an autonomous decision system  
- no sensitive attributes used  
- transparent reasoning output  
- requires human oversight  

---

## Future Improvements

- score calibration improvements  
- evaluation benchmarking dataset  
- multi-modal input (CV, interview)  
- batch evaluation pipeline  
- UI tooling for reviewers  

---

## Environment Variables

| Variable           | Description                         |
|------------------|-------------------------------------|
| OPENAI_API_KEY   | API key for model access            |
| OPENAI_MODEL     | Model used for evaluation           |

---

## Status

Production-ready evaluation engine for structured admissions workflows.