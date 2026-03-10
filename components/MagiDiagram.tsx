"use client";

import { useEffect, useState } from "react";
import { DeliberationResponse, MagiId, Vote } from "@/types/magi";

function voteBackground(vote: Vote | null): string {
  if (vote === "APPROVE") return "#52e691";
  if (vote === "REJECT") return "#a41413";
  if (vote === "ABSTAIN") return "#3caee0";
  return "#3caee0"; // default: info blue (matches reference)
}

function verdictText(v: string): string {
  const map: Record<string, string> = {
    APPROVE: "合 意",
    REJECT: "拒 絶",
    ABSTAIN: "棄 権",
    DEADLOCK: "膠 着",
  };
  return map[v] ?? "---";
}

function verdictColor(v: string): string {
  if (v === "APPROVE") return "#52e691";
  if (v === "REJECT") return "#a41413";
  if (v === "ABSTAIN") return "#3caee0";
  return "#ff8d00";
}

interface Props {
  response: DeliberationResponse | null;
  isProcessing: boolean;
}

const SHAPES: Array<{ id: MagiId; label: string; cls: string }> = [
  { id: "BALTHASAR", label: "BALTHASAR • 2", cls: "wise-balthasar" },
  { id: "CASPER", label: "CASPER • 3", cls: "wise-casper" },
  { id: "MELCHIOR", label: "MELCHIOR • 1", cls: "wise-melchior" },
];

function rand(digits: number) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export default function MagiDiagram({ response, isProcessing }: Props) {
  const [modalId, setModalId] = useState<MagiId | null>(null);
  const [flickerDelays, setFlickerDelays] = useState<Record<MagiId, string>>({
    BALTHASAR: "0ms", CASPER: "0ms", MELCHIOR: "0ms",
  });
  const [code, setCode] = useState("473");
  const [ext, setExt] = useState("STBY");

  useEffect(() => {
    if (isProcessing) {
      setFlickerDelays({
        BALTHASAR: `${Math.floor(Math.random() * 180)}ms`,
        CASPER: `${Math.floor(Math.random() * 180)}ms`,
        MELCHIOR: `${Math.floor(Math.random() * 180)}ms`,
      });
      setCode(rand(3));
      setExt(rand(4));
    }
  }, [isProcessing]);

  const getResult = (id: MagiId) => response?.results.find((r) => r.id === id);
  const verdict = response?.finalVerdict;
  const modalResult = modalId ? getResult(modalId) : null;

  return (
    <>
      <div className="magi-grid">
        {/* Connection bars between the three shapes */}
        <div className="magi-conn conn-cb" />
        <div className="magi-conn conn-bm" />
        <div className="magi-conn conn-cm" />

        {/* System status — left column */}
        <div className="magi-sys-status">
          <div>CODE:{code}</div>
          <div className="magi-sys-status-inner">
            <div>FILE:MAGI_SYS</div>
            <div>EXT:{ext}</div>
            <div>EX_MODE:OFF</div>
            <div>PRIORITY:AAA</div>
          </div>
        </div>

        {/* Verdict badge — right column */}
        <div
          className={`magi-verdict${isProcessing ? " flicker" : ""}`}
          style={{
            color: isProcessing ? "#eec059" : verdict ? verdictColor(verdict) : "#3caee0",
            borderColor: isProcessing ? "#eec059" : verdict ? verdictColor(verdict) : "#3caee0",
          }}
        >
          <div className="magi-verdict-inner">
            {isProcessing ? "審議中" : verdict ? verdictText(verdict) : "情 報"}
          </div>
        </div>

        {/* Decorative header panels flanking BALTHASAR */}
        <div className="magi-header-deco left">
          <hr /><hr />
          <span>提 訴</span>
          <hr /><hr />
        </div>
        <div className="magi-header-deco right">
          <hr /><hr />
          <span>決 議</span>
          <hr /><hr />
        </div>

        {/* Three MAGI units */}
        {SHAPES.map(({ id, label, cls }) => {
          const result = getResult(id);
          const bg = voteBackground(result?.vote ?? null);
          return (
            <div
              key={id}
              className={`wise-man ${cls}`}
              onClick={() => result && setModalId(id)}
              style={{ cursor: result ? "pointer" : "default" }}
            >
              <div
                className={`wise-inner${isProcessing ? " flicker" : ""}`}
                style={{
                  "--wise-bg": bg,
                  animationDelay: isProcessing ? flickerDelays[id] : "0ms",
                } as React.CSSProperties}
              >
                {label}
              </div>
            </div>
          );
        })}

        {/* Center title */}
        <div className="magi-center-title">MAGI</div>
      </div>

      {/* Reasoning modal */}
      {modalResult && (
        <div className="modal-overlay" onClick={() => setModalId(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                {modalResult.id} • {modalResult.number}
              </span>
              <button className="modal-close" onClick={() => setModalId(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div
                className="modal-vote"
                style={{
                  color: voteBackground(modalResult.vote),
                  borderColor: voteBackground(modalResult.vote),
                }}
              >
                {verdictText(modalResult.vote)}
              </div>
              <p className="modal-reasoning">{modalResult.reasoning}</p>
              {modalResult.error && (
                <p className="modal-error">ERR: {modalResult.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
