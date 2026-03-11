"use server";

import { queryMelchior, queryBalthasar, queryCasper } from "@/lib/ai-clients";
import { MagiResult } from "@/types/magi";

export async function deliberateMelchior(topic: string): Promise<MagiResult> {
  try {
    const { reasoning, vote, isCritical } = await queryMelchior(topic);
    return { id: "MELCHIOR", number: 1, reasoning, vote, isCritical };
  } catch (err) {
    return { id: "MELCHIOR", number: 1, reasoning: "SYSTEM ERROR: Connection lost", vote: "ABSTAIN", error: String(err) };
  }
}

export async function deliberateBalthasar(topic: string): Promise<MagiResult> {
  try {
    const { reasoning, vote, isCritical } = await queryBalthasar(topic);
    return { id: "BALTHASAR", number: 2, reasoning, vote, isCritical };
  } catch (err) {
    return { id: "BALTHASAR", number: 2, reasoning: "SYSTEM ERROR: Connection lost", vote: "ABSTAIN", error: String(err) };
  }
}

export async function deliberateCasper(topic: string): Promise<MagiResult> {
  try {
    const { reasoning, vote, isCritical } = await queryCasper(topic);
    return { id: "CASPER", number: 3, reasoning, vote, isCritical };
  } catch (err) {
    return { id: "CASPER", number: 3, reasoning: "SYSTEM ERROR: Connection lost", vote: "ABSTAIN", error: String(err) };
  }
}
