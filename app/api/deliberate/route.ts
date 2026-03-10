import { NextRequest, NextResponse } from "next/server";
import { queryMelchior, queryBalthasar, queryCasper } from "@/lib/ai-clients";
import { DeliberationRequest, DeliberationResponse, MagiResult, Vote } from "@/types/magi";

function computeVerdict(results: MagiResult[]): Vote | "DEADLOCK" {
  const votes = results.map((r) => r.vote);
  const approveCount = votes.filter((v) => v === "APPROVE").length;
  const rejectCount = votes.filter((v) => v === "REJECT").length;
  if (approveCount > rejectCount) return "APPROVE";
  if (rejectCount > approveCount) return "REJECT";
  const abstainCount = votes.filter((v) => v === "ABSTAIN").length;
  if (abstainCount >= 2) return "ABSTAIN";
  return "DEADLOCK";
}

export async function POST(req: NextRequest) {
  const body: DeliberationRequest = await req.json();
  const { topic } = body;

  if (!topic?.trim()) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const [melchiorResult, balthasarResult, casperResult] = await Promise.allSettled([
    queryMelchior(topic),
    queryBalthasar(topic),
    queryCasper(topic),
  ]);

  const results: MagiResult[] = [
    {
      id: "MELCHIOR",
      number: 1,
      reasoning:
        melchiorResult.status === "fulfilled"
          ? melchiorResult.value.reasoning
          : "SYSTEM ERROR: Connection lost",
      vote:
        melchiorResult.status === "fulfilled" ? melchiorResult.value.vote : "ABSTAIN",
      error: melchiorResult.status === "rejected" ? String(melchiorResult.reason) : undefined,
    },
    {
      id: "BALTHASAR",
      number: 2,
      reasoning:
        balthasarResult.status === "fulfilled"
          ? balthasarResult.value.reasoning
          : "SYSTEM ERROR: Connection lost",
      vote:
        balthasarResult.status === "fulfilled" ? balthasarResult.value.vote : "ABSTAIN",
      error: balthasarResult.status === "rejected" ? String(balthasarResult.reason) : undefined,
    },
    {
      id: "CASPER",
      number: 3,
      reasoning:
        casperResult.status === "fulfilled"
          ? casperResult.value.reasoning
          : "SYSTEM ERROR: Connection lost",
      vote: casperResult.status === "fulfilled" ? casperResult.value.vote : "ABSTAIN",
      error: casperResult.status === "rejected" ? String(casperResult.reason) : undefined,
    },
  ];

  const response: DeliberationResponse = {
    results,
    finalVerdict: computeVerdict(results),
    topic,
  };

  return NextResponse.json(response);
}
