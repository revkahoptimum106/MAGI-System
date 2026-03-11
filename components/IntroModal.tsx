"use client";

import { useEffect, useState } from "react";

interface Lang {
  units: [string, string, string];
  steps: string[];
  confirm: string;
}

const LANGS: Record<string, Lang> = {
  zh: {
    units: [
      "OpenAI GPT — 科學家的視角",
      "Anthropic Claude — 母親的視角",
      "Google Gemini — 女性的視角",
    ],
    steps: [
      "在下方輸入欄輸入是非題形式的議題，按下 Enter 送出",
      "三台電腦同時開始審議，各自獨立呼叫 AI",
      "率先完成的電腦立即停止閃爍並顯示結果",
      "三台全部完成後顯示最終多數決裁決",
      "點擊任一電腦可查看詳細推理說明",
    ],
    confirm: "CONFIRM — 開始審議",
  },
  en: {
    units: [
      "OpenAI GPT — Scientist's perspective",
      "Anthropic Claude — Mother's perspective",
      "Google Gemini — Woman's perspective",
    ],
    steps: [
      "Type a yes/no question in the input below and press Enter",
      "All three units begin deliberating simultaneously",
      "Each unit stops flickering and shows its result as soon as it responds",
      "The final verdict is computed by majority vote once all three finish",
      "Click any unit to read its full reasoning",
    ],
    confirm: "CONFIRM — BEGIN DELIBERATION",
  },
  ja: {
    units: [
      "OpenAI GPT — 科学者の視点",
      "Anthropic Claude — 母親の視点",
      "Google Gemini — 女性の視点",
    ],
    steps: [
      "賛否を問う形式の議題を入力し、Enter キーで送信",
      "3台のユニットが同時に独立して審議を開始",
      "応答が届いたユニットから順にフリッカーが止まり結果を表示",
      "全ユニットが完了した時点で多数決により最終決定を表示",
      "各ユニットをクリックすると詳細な判断理由を確認できます",
    ],
    confirm: "CONFIRM — 審議を開始",
  },
};

const STEP_PREFIXES = ["▸", "▸", "▸", "▸", "▸"];

interface Props {
  onClose: () => void;
}

export default function IntroModal({ onClose }: Props) {
  const [lang, setLang] = useState<Lang>(LANGS.en);

  useEffect(() => {
    const code = navigator.language || "";
    if (code.startsWith("zh")) setLang(LANGS.zh);
    else if (code.startsWith("ja")) setLang(LANGS.ja);
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-box intro-modal-box">
        <div className="modal-header">
          <span className="modal-title">MAGI SYSTEM — NERV</span>
        </div>
        <div className="modal-body">
          <table className="intro-table">
            <tbody>
              {(["MELCHIOR · 1", "BALTHASAR · 2", "CASPER · 3"] as const).map((unit, i) => (
                <tr key={unit}>
                  <td className="intro-unit">{unit.replace("·", "·\u00a0")}</td>
                  <td>{lang.units[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ol className="intro-steps">
            {lang.steps.map((step, i) => (
              <li key={i}>
                <span className="intro-step-prefix">{STEP_PREFIXES[i]}</span>
                {step.includes("Enter") ? (
                  <>
                    {step.split("Enter")[0]}
                    <kbd>Enter</kbd>
                    {step.split("Enter")[1]}
                  </>
                ) : step}
              </li>
            ))}
          </ol>

          <div className="intro-verdict-ref">
            <span style={{ color: "#52e691" }}>合意</span>
            <span style={{ color: "#a41413" }}>否決</span>
            <span style={{ color: "#3caee0" }}>棄権</span>
            <span style={{ color: "#ff8d00" }}>膠着</span>
          </div>

          <button className="intro-confirm" onClick={onClose}>
            {lang.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
