import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Vote } from "@/types/magi";
import { MELCHIOR_PROMPT, BALTHASAR_PROMPT, CASPER_PROMPT } from "./prompts";

function parseVoteResponse(text: string): { reasoning: string; vote: Vote; isCritical: boolean } {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned);
  const vote = (["APPROVE", "REJECT", "ABSTAIN"].includes(parsed.vote)
    ? parsed.vote
    : "ABSTAIN") as Vote;
  return { reasoning: parsed.reasoning || "", vote, isCritical: parsed.isCritical === true };
}

export async function queryMelchior(topic: string): Promise<{ reasoning: string; vote: Vote; isCritical: boolean }> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: MELCHIOR_PROMPT },
      { role: "user", content: topic },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });
  const text = response.choices[0]?.message?.content ?? "";
  return parseVoteResponse(text);
}

export async function queryBalthasar(topic: string): Promise<{ reasoning: string; vote: Vote; isCritical: boolean }> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5",
    max_tokens: 300,
    system: BALTHASAR_PROMPT,
    messages: [{ role: "user", content: topic }],
  });
  const text = response.content[0]?.type === "text" ? response.content[0].text : "";
  return parseVoteResponse(text);
}

export async function queryCasper(topic: string): Promise<{ reasoning: string; vote: Vote; isCritical: boolean }> {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? "");
  const model = genAI.getGenerativeModel({
    model: process.env.GOOGLE_MODEL ?? "gemini-2.5-flash",
    systemInstruction: CASPER_PROMPT,
  });
  const result = await model.generateContent(topic);
  const text = result.response.text();
  return parseVoteResponse(text);
}
