# MAGI System

A fan-made web application inspired by the MAGI supercomputer from _Neon Genesis Evangelion_. Enter a yes/no question and watch three AI units deliberate simultaneously, then reach a verdict by majority vote.

**[繁體中文](README.zh.md) | [日本語](README.ja.md)**

---

## The Three Units

| Unit          | AI Model         | Perspective                             |
| ------------- | ---------------- | --------------------------------------- |
| MELCHIOR • 1  | OpenAI GPT       | Scientist — logic and rational analysis |
| BALTHASAR • 2 | Anthropic Claude | Mother — protection and care-oriented   |
| CASPER • 3    | Google Gemini    | Woman — intuition and emotional insight |

## Verdicts

| Result       | Meaning                   |
| ------------ | ------------------------- |
| **APPROVE**  | Majority voted yes        |
| **REJECT**   | Majority voted no         |
| **ABSTAIN**  | All three units abstained |
| **DEADLOCK** | No majority reached       |

## Getting Started

### Prerequisites

You will need API keys for the following services:

- [OpenAI](https://platform.openai.com/api-keys) — for MELCHIOR-1
- [Anthropic](https://console.anthropic.com/settings/keys) — for BALTHASAR-2
- [Google AI Studio](https://aistudio.google.com/apikey) — for CASPER-3

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/hirakujira/MAGI.git
cd MAGI

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and fill in your API keys

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker

```bash
# Copy and configure your environment variables first
cp .env.local.example .env.local

docker compose up
```

## Environment Variables

| Variable            | Description                     | Default            |
| ------------------- | ------------------------------- | ------------------ |
| `OPENAI_API_KEY`    | OpenAI API key (MELCHIOR-1)     | —                  |
| `OPENAI_MODEL`      | OpenAI model name               | `gpt-4o-mini`      |
| `ANTHROPIC_API_KEY` | Anthropic API key (BALTHASAR-2) | —                  |
| `ANTHROPIC_MODEL`   | Anthropic model name            | `claude-haiku-4-5` |
| `GOOGLE_API_KEY`    | Google AI API key (CASPER-3)    | —                  |
| `GOOGLE_MODEL`      | Google model name               | `gemini-2.5-flash` |

## How to Use

1. Type a yes/no question in the input field and press **Enter**
2. All three units begin deliberating simultaneously and independently
3. Each unit stops flickering and shows its result as soon as it finishes
4. The final verdict is determined by majority vote once all three complete
5. Click any unit to read its detailed reasoning

## Copyright Notice

This project is a fan work created as a tribute to _Neon Genesis Evangelion_ by Hideaki Anno / GAINAX / khara. All Evangelion-related names and concepts are the property of their respective copyright holders.

## Acknowledgements

### Sponsors

Special thanks to the following for sponsoring API token costs:

- 天上天下唯我翻車大皮粉
