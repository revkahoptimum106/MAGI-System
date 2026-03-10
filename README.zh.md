# MAGI 系統

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

以網頁重現《新世紀福音戰士》中的 MAGI 超級電腦介面，串接三個真實 AI API 同時進行審議。

三台電腦各自扮演 MAGI 其中一個單元，針對輸入的議題獨立投票（合意／拒絶／棄権），最終裁決以多數決決定。

## MAGI 單元

| 單元 | 編號 | AI 模型 | 人格 |
|------|------|----------|------|
| MELCHIOR | 1 | OpenAI GPT-4o | 科學家——邏輯、理性分析 |
| BALTHASAR | 2 | Anthropic Claude | 母親——保護、關懷導向 |
| CASPER | 3 | Google Gemini | 女性——直覺、情感洞察 |

## 技術架構

- **Next.js 15**（App Router、TypeScript）
- **Tailwind CSS v4**
- OpenAI SDK、Anthropic SDK、Google Generative AI SDK
- 以 `Promise.allSettled` 同時呼叫三個 AI

## 安裝與設定

### 1. 安裝相依套件

```bash
npm install
```

### 2. 設定 API 金鑰

複製範本環境檔並填入你的 API 金鑰：

```bash
cp .env.local.example .env.local
```

```env
OPENAI_API_KEY=你的_openai_api_key
ANTHROPIC_API_KEY=你的_anthropic_api_key
GOOGLE_API_KEY=你的_google_api_key
```

- OpenAI API 金鑰：https://platform.openai.com/api-keys
- Anthropic API 金鑰：https://console.anthropic.com/settings/keys
- Google AI API 金鑰：https://aistudio.google.com/apikey

### 3. 啟動開發伺服器

```bash
npm run dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

## 運作方式

1. 在畫面底部的終端機輸入欄輸入議題或問題，按下 Enter 送出。
2. 三台 MAGI 同時透過各自的 AI API 進行審議。
3. 每台電腦獨立給出投票結果（合意／拒絶／棄権）及推理說明。
4. 最終裁決以多數決計算：
   - 合意多於拒絶 → **合意**
   - 拒絶多於合意 → **拒絶**
   - 票數相同 → **膠着**
5. 審議完成後點擊任一 MAGI 單元，可查看其完整推理內容。

## 裁決對照

| 顯示 | 含義 |
|------|------|
| 合 意 | 通過 |
| 拒 絶 | 否決 |
| 棄 権 | 棄權 |
| 膠 着 | 僵局 |
| 情 報 | 待機（尚無裁決） |

## 授權聲明

本專案為粉絲向作品，向庵野秀明 / GAINAX / khara 所創作的《新世紀福音戰士》致敬。所有福音戰士相關名稱與概念均屬各著作權人所有。
