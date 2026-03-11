# MAGI 系統

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

以網頁重現《新世紀福音戰士》中的 MAGI 超級電腦介面，串接三個真實 AI API 同時進行審議。

三台電腦各自扮演 MAGI 其中一個單元，針對輸入的議題獨立投票（合意／否決／棄権），每台電腦的結果在收到後立即顯示，不需等待全部完成。最終裁決以多數決決定。

## MAGI 單元

| 單元 | 編號 | AI 模型 | 人格 |
|------|------|---------|------|
| MELCHIOR | 1 | OpenAI GPT-4o | 科學家——邏輯、理性分析 |
| BALTHASAR | 2 | Anthropic Claude | 母親——保護、關懷導向 |
| CASPER | 3 | Google Gemini | 女性——直覺、情感洞察 |

## 技術架構

- **Next.js 16**（App Router、TypeScript）
- **Tailwind CSS v4**
- OpenAI SDK、Anthropic SDK、Google Generative AI SDK
- 三組獨立並行 fetch，每台電腦回應後立即更新 UI

## 啟動方式

### 方式 A：Docker（推薦）

```bash
cp .env.local.example .env.local
# 在 .env.local 填入 API 金鑰
docker compose up -d
```

開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)。

```bash
# 程式碼修改後重新建置
docker compose up -d --build

# 停止服務
docker compose down
```

### 方式 B：本地開發

**1. 安裝相依套件**

```bash
npm install
```

**2. 設定 API 金鑰**

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

**3. 啟動開發伺服器**

```bash
npm run dev
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

## 自訂模型

在 `.env.local` 加入以下選填變數可覆蓋預設模型：

```env
OPENAI_MODEL=gpt-4o              # 預設：gpt-4o
ANTHROPIC_MODEL=claude-opus-4-5  # 預設：claude-opus-4-5
GOOGLE_MODEL=gemini-2.5-flash    # 預設：gemini-2.5-flash
```

## 運作方式

1. 在畫面底部的終端機輸入欄輸入議題或問題，按下 Enter 送出。
2. 三台 MAGI 各自透過獨立的 API 呼叫同時開始審議。
3. 每台電腦回應後立即停止閃爍並顯示結果，不等其他電腦。
4. 三台全部完成後以多數決計算最終裁決：
   - 合意多於否決 → **合意**
   - 否決多於合意 → **否決**
   - 票數相同 → **膠着**
5. 點擊任一 MAGI 單元可查看其完整推理內容。

## 裁決對照

| 顯示 | 含義 |
|------|------|
| 合 意 | 通過 |
| 否 決 | 否決 |
| 棄 権 | 棄權 |
| 膠 着 | 僵局 |
| 情 報 | 待機（尚無裁決） |

## 授權聲明

本專案為粉絲向作品，向庵野秀明 / GAINAX / khara 所創作的《新世紀福音戰士》致敬。所有福音戰士相關名稱與概念均屬各著作權人所有。
