"use client";

import { useState } from "react";
import MagiDiagram from "@/components/MagiDiagram";
import DeliberationInput from "@/components/DeliberationInput";
import IntroModal from "@/components/IntroModal";
import { MagiId, MagiResult, PartialResults, Vote } from "@/types/magi";

const UNITS: MagiId[] = ["MELCHIOR", "BALTHASAR", "CASPER"];

function computeVerdict(results: PartialResults): (Vote | "DEADLOCK") | null {
  const all = UNITS.map((u) => results[u]).filter(Boolean) as MagiResult[];
  if (all.length < 3) return null;
  const approveCount = all.filter((r) => r.vote === "APPROVE").length;
  const rejectCount  = all.filter((r) => r.vote === "REJECT").length;
  const abstainCount = all.filter((r) => r.vote === "ABSTAIN").length;
  if (abstainCount >= 2) return "ABSTAIN";
  if (approveCount > rejectCount) return "APPROVE";
  if (rejectCount  > approveCount) return "REJECT";
  return "DEADLOCK";
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [topic, setTopic] = useState("");
  const [processingUnits, setProcessingUnits] = useState<Set<MagiId>>(new Set());
  const [partialResults, setPartialResults] = useState<PartialResults>({});
  const [error, setError] = useState<string | null>(null);

  const isProcessing = processingUnits.size > 0;
  const finalVerdict = computeVerdict(partialResults);

  const handleDeliberate = async () => {
    if (!topic.trim() || isProcessing) return;

    setProcessingUnits(new Set(UNITS));
    setPartialResults({});
    setError(null);

    const fetchUnit = async (unit: MagiId) => {
      try {
        const res = await fetch("/api/deliberate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, unit }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Unknown error");
        }
        const result: MagiResult = await res.json();
        setPartialResults((prev) => ({ ...prev, [unit]: result }));
      } catch (err) {
        const fallback: MagiResult = {
          id: unit,
          number: unit === "MELCHIOR" ? 1 : unit === "BALTHASAR" ? 2 : 3,
          reasoning: "SYSTEM ERROR: Connection lost",
          vote: "ABSTAIN",
          error: err instanceof Error ? err.message : "Unknown error",
        };
        setPartialResults((prev) => ({ ...prev, [unit]: fallback }));
      } finally {
        setProcessingUnits((prev) => {
          const next = new Set(prev);
          next.delete(unit);
          return next;
        });
      }
    };

    UNITS.forEach((unit) => fetchUnit(unit));
  };

  return (
    <>
      {showIntro && <IntroModal onClose={() => setShowIntro(false)} />}
    <main className="magi-main">
      <div className="system-border">
        <MagiDiagram
          partialResults={partialResults}
          processingUnits={processingUnits}
          finalVerdict={finalVerdict}
        />

        {error && (
          <div className="error-panel">
            <span className="error-icon">⚠</span>
            <span>SYSTEM ERROR: {error}</span>
          </div>
        )}

        <DeliberationInput
          topic={topic}
          onTopicChange={setTopic}
          onSubmit={handleDeliberate}
          isProcessing={isProcessing}
        />
      </div>
      <a
        href="https://github.com/hirakujira/MAGI/"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        ⌥ GitHub
      </a>
    </main>
    </>
  );
}
