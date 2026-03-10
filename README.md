# MAGI System

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

A web-based simulation of the MAGI supercomputer from *Neon Genesis Evangelion*, powered by three real AI APIs deliberating in parallel.

Each AI embodies one of the three MAGI units and independently votes APPROVE, REJECT, or ABSTAIN on any question posed. The final verdict is determined by majority rule.

## MAGI Units

| Unit | Number | AI Model | Persona |
|------|--------|----------|---------|
| MELCHIOR | 1 | OpenAI GPT-4o | Scientist — logical and analytical |
| BALTHASAR | 2 | Anthropic Claude | Mother — protective and caring |
| CASPER | 3 | Google Gemini | Woman — intuitive and emotional |

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4**
- OpenAI SDK, Anthropic SDK, Google Generative AI SDK
- Parallel deliberation via `Promise.allSettled`

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure API keys

Copy the example environment file and fill in your API keys:

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

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Enter a question or proposal in the terminal input at the bottom of the screen.
2. All three MAGI units are queried simultaneously via their respective AI APIs.
3. Each unit independently responds with a vote (APPROVE / REJECT / ABSTAIN) and reasoning.
4. The final verdict is computed by majority rule:
   - More APPROVE than REJECT → **合意 (APPROVE)**
   - More REJECT than APPROVE → **拒絶 (REJECT)**
   - Tie → **膠着 (DEADLOCK)**
5. Click any MAGI unit after deliberation to read its full reasoning.

## Verdict Reference

| Display | Meaning |
|---------|---------|
| 合 意 | Approved |
| 拒 絶 | Rejected |
| 棄 権 | Abstained |
| 膠 着 | Deadlock |
| 情 報 | Standby (no verdict yet) |

## License

This project is a fan-made tribute to *Neon Genesis Evangelion* by Hideaki Anno / GAINAX / khara. All Evangelion-related names and concepts belong to their respective copyright holders.
