"use client";

interface DeliberationInputProps {
  topic: string;
  onTopicChange: (v: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export default function DeliberationInput({
  topic,
  onTopicChange,
  onSubmit,
  isProcessing,
}: DeliberationInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing && topic.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="input-container">
      <span className="input-row-label">access code:</span>
      <div className="input-access-code" />

      <span className="input-row-label">question:</span>
      <input
        className="input-question"
        type="text"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="type question and press Enter..."
        disabled={isProcessing}
        maxLength={500}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
