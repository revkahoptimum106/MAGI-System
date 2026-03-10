"use client";

import { DeliberationResponse } from "@/types/magi";

interface VoteResultProps {
  response: DeliberationResponse;
}

const VERDICT_CONFIG = {
  APPROVE: {
    label: "承認",
    sublabel: "APPROVED",
    className: "verdict-approve",
    symbol: "◆",
  },
  REJECT: {
    label: "却下",
    sublabel: "REJECTED",
    className: "verdict-reject",
    symbol: "✕",
  },
  ABSTAIN: {
    label: "棄権",
    sublabel: "ABSTAINED",
    className: "verdict-abstain",
    symbol: "◇",
  },
  DEADLOCK: {
    label: "膠着",
    sublabel: "DEADLOCK",
    className: "verdict-deadlock",
    symbol: "⚠",
  },
};

export default function VoteResult({ response }: VoteResultProps) {
  const config = VERDICT_CONFIG[response.finalVerdict];
  const approveCount = response.results.filter((r) => r.vote === "APPROVE").length;
  const rejectCount = response.results.filter((r) => r.vote === "REJECT").length;
  const abstainCount = response.results.filter((r) => r.vote === "ABSTAIN").length;

  return (
    <div className={`verdict-panel ${config.className}`}>
      <div className="verdict-header">
        <span className="verdict-line">MAGI SYSTEM — FINAL VERDICT</span>
      </div>
      <div className="verdict-main">
        <span className="verdict-symbol">{config.symbol}</span>
        <div className="verdict-text">
          <span className="verdict-jp">{config.label}</span>
          <span className="verdict-en">{config.sublabel}</span>
        </div>
      </div>
      <div className="verdict-tally">
        <span className="tally-item tally-approve">賛成 {approveCount}</span>
        <span className="tally-sep">/</span>
        <span className="tally-item tally-reject">反対 {rejectCount}</span>
        <span className="tally-sep">/</span>
        <span className="tally-item tally-abstain">棄権 {abstainCount}</span>
      </div>
    </div>
  );
}
