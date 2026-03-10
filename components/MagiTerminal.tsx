"use client";

import { MagiResult, Vote } from "@/types/magi";

interface MagiTerminalProps {
  id: "MELCHIOR" | "BALTHASAR" | "CASPER";
  number: 1 | 2 | 3;
  result?: MagiResult;
  isProcessing: boolean;
}

const MAGI_LABELS = {
  MELCHIOR: { subtitle: "SCIENTIST", color: "#ff6600", glow: "0 0 20px #ff6600" },
  BALTHASAR: { subtitle: "MOTHER", color: "#ff4400", glow: "0 0 20px #ff4400" },
  CASPER: { subtitle: "WOMAN", color: "#ff8800", glow: "0 0 20px #ff8800" },
};

const VOTE_STYLES: Record<Vote, { label: string; className: string }> = {
  APPROVE: { label: "賛成", className: "vote-approve" },
  REJECT: { label: "反対", className: "vote-reject" },
  ABSTAIN: { label: "棄権", className: "vote-abstain" },
};

export default function MagiTerminal({ id, number, result, isProcessing }: MagiTerminalProps) {
  const meta = MAGI_LABELS[id];
  const voteStyle = result ? VOTE_STYLES[result.vote] : null;

  return (
    <div className="magi-terminal" style={{ "--magi-color": meta.color, "--magi-glow": meta.glow } as React.CSSProperties}>
      <div className="magi-header">
        <span className="magi-name">{id}-{number}</span>
        <span className="magi-subtitle">{meta.subtitle}</span>
      </div>

      <div className="magi-screen">
        <div className="scanlines" />

        {!result && !isProcessing && (
          <div className="magi-idle">
            <span className="blink">█</span>
            <span className="magi-status-text">STANDBY</span>
          </div>
        )}

        {isProcessing && (
          <div className="magi-processing">
            <div className="processing-bar">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="bar-segment" style={{ animationDelay: `${i * 0.05}s` }}>▓</span>
              ))}
            </div>
            <span className="processing-text">DELIBERATING...</span>
          </div>
        )}

        {result && (
          <div className="magi-result">
            <div className="result-label">// ANALYSIS</div>
            <p className="result-reasoning">{result.reasoning}</p>
            {result.error && (
              <p className="result-error">ERR: {result.error.slice(0, 80)}</p>
            )}
          </div>
        )}
      </div>

      <div className="magi-footer">
        {voteStyle ? (
          <div className={`vote-badge ${voteStyle.className}`}>
            <span className="vote-label-jp">{voteStyle.label}</span>
            <span className="vote-label-en">{result?.vote}</span>
          </div>
        ) : (
          <div className="vote-badge vote-pending">
            <span>---</span>
          </div>
        )}
      </div>
    </div>
  );
}
