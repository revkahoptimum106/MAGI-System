# MAGI System

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

A web-based simulation of the MAGI supercomputer from *Neon Genesis Evangelion*, powered by three real AI APIs deliberating in parallel.

Each AI embodies one of the three MAGI units and independently votes APPROVE, REJECT, or ABSTAIN on any question posed. Results appear progressively as each unit finishes — no waiting for all three. The final verdict is determined by majority rule.

## MAGI Units

| Unit | Number | AI Model | Persona |
|------|--------|----------|---------|
| MELCHIOR | 1 | OpenAI GPT-4o | Scientist — logical and analytical |
| BALTHASAR | 2 | Anthropic Claude | Mother — protective and caring |
| CASPER | 3 | Google Gemini | Woman — intuitive and emotional |

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- OpenAI SDK, Anthropic SDK, Google Generative AI SDK
- Three parallel independent fetches — each unit updates the UI as soon as it responds

## Setup

### Option A: Docker (recommended)

```bash
cp .env.local.example .env.local
# Fill in your API keys in .env.local
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Rebuild after code changes
docker compose up -d --build

# Stop
docker compose down
```

### Option B: Local development

**1. Install dependencies**

```bash
npm install
```

**2. Configure API keys**

```bash
cp .env.local.example .env.local
```

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

- OpenAI API key: https://platform.openai.com/api-keys
- Anthropic API key: https://console.anthropic.com/settings/keys
- Google AI API key: https://aistudio.google.com/apikey

**3. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Model Customization

Override the default model for any unit by adding these optional variables to `.env.local`:

```env
OPENAI_MODEL=gpt-4o          # default: gpt-4o
ANTHROPIC_MODEL=claude-opus-4-5  # default: claude-opus-4-5
GOOGLE_MODEL=gemini-2.5-flash    # default: gemini-2.5-flash
```

## How It Works

1. Enter a question or proposal in the terminal input at the bottom of the screen and press Enter.
2. All three MAGI units are queried simultaneously, each via its own independent API call.
3. Each unit's result appears as soon as it arrives — the flicker animation stops and the vote is revealed.
4. The final verdict is computed once all three units have responded:
   - More APPROVE than REJECT → **合意 (APPROVE)**
   - More REJECT than APPROVE → **否決 (REJECT)**
   - Tie → **膠着 (DEADLOCK)**
5. Click any MAGI unit to read its full reasoning.

## Verdict Reference

| Display | Meaning |
|---------|---------|
| 合 意 | Approved |
| 否 決 | Rejected |
| 棄 権 | Abstained |
| 膠 着 | Deadlock |
| 情 報 | Standby (no verdict yet) |

## License

This project is a fan-made tribute to *Neon Genesis Evangelion* by Hideaki Anno / GAINAX / khara. All Evangelion-related names and concepts belong to their respective copyright holders.
