"use client";

import { useEffect, useState } from "react";

interface SystemStatusProps {
  isProcessing: boolean;
  hasResult: boolean;
}

export default function SystemStatus({ isProcessing, hasResult }: SystemStatusProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const status = isProcessing ? "PROCESSING" : hasResult ? "COMPLETE" : "ONLINE";

  return (
    <div className="system-status">
      <span className="status-item">
        <span className="status-dot" data-status={status} />
        MAGI SYSTEM {status}
      </span>
      <span className="status-sep">|</span>
      <span className="status-item">NERV HQ</span>
      <span className="status-sep">|</span>
      <span className="status-item">{time}</span>
      <span className="status-sep">|</span>
      <span className="status-item">SEC. LVL: AAA</span>
    </div>
  );
}
