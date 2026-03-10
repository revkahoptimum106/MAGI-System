"use client";

import { useState } from "react";
import MagiDiagram from "@/components/MagiDiagram";
import DeliberationInput from "@/components/DeliberationInput";
import { DeliberationResponse } from "@/types/magi";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<DeliberationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeliberate = async () => {
    if (!topic.trim() || isProcessing) return;
    setIsProcessing(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/deliberate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Unknown error");
      }
      const data: DeliberationResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="magi-main">
      <div className="system-border">
        <MagiDiagram response={response} isProcessing={isProcessing} />

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
    </main>
  );
}
