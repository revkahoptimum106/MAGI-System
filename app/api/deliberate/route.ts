import { NextRequest, NextResponse } from "next/server";
import { queryMelchior, queryBalthasar, queryCasper } from "@/lib/ai-clients";
import { MagiId, MagiResult } from "@/types/magi";

const UNITS: Record<MagiId, { number: 1 | 2 | 3; query: (t: string) => Promise<{ reasoning: string; vote: import("@/types/magi").Vote }> }> = {
  MELCHIOR:  { number: 1, query: queryMelchior  },
  BALTHASAR: { number: 2, query: queryBalthasar },
  CASPER:    { number: 3, query: queryCasper    },
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic, unit } = body as { topic: string; unit: MagiId };

  if (!topic?.trim()) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }
  if (!unit || !(unit in UNITS)) {
    return NextResponse.json({ error: "Invalid unit" }, { status: 400 });
  }

  const { number, query } = UNITS[unit];

  try {
    const { reasoning, vote } = await query(topic);
    const result: MagiResult = { id: unit, number, reasoning, vote };
    return NextResponse.json(result);
  } catch (err) {
    const result: MagiResult = {
      id: unit,
      number,
      reasoning: "SYSTEM ERROR: Connection lost",
      vote: "ABSTAIN",
      error: String(err),
    };
    return NextResponse.json(result);
  }
}
