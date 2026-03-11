"use client";

import { useState } from "react";
import MagiDiagram from "@/components/MagiDiagram";
import DeliberationInput from "@/components/DeliberationInput";
import IntroModal from "@/components/IntroModal";
import { MagiId, MagiResult, PartialResults, Vote } from "@/types/magi";
import { deliberateMelchior, deliberateBalthasar, deliberateCasper } from "@/app/actions";

const UNITS: MagiId[] = ["MELCHIOR", "BALTHASAR", "CASPER"];

function computeVerdict(results: PartialResults): (Vote | "DEADLOCK") | null {
  const all = UNITS.map((u) => results[u]).filter(Boolean) as MagiResult[];
  if (all.length < 3) return null;

  const isCritical = all.filter((r) => r.isCritical).length >= 2;
  if (isCritical) {
    return all.every((r) => r.vote === "APPROVE") ? "APPROVE" : "REJECT";
  }

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

    const actions = {
      MELCHIOR:  deliberateMelchior,
      BALTHASAR: deliberateBalthasar,
      CASPER:    deliberateCasper,
    };

    const runUnit = async (unit: MagiId) => {
      try {
        const result = await actions[unit](topic);
        setPartialResults((prev) => ({ ...prev, [unit]: result }));
      } finally {
        setProcessingUnits((prev) => {
          const next = new Set(prev);
          next.delete(unit);
          return next;
        });
      }
    };

    UNITS.forEach((unit) => runUnit(unit));
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
