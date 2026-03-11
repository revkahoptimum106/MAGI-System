# MAGI システム

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

『新世紀エヴァンゲリオン』に登場する超高性能コンピュータ「MAGI」のウェブ版シミュレーションです。3つのAI APIが並列で審議を行います。

各AIはMAGIの1ユニットとして機能し、入力された議題に対して独立して投票（合意／否決／棄権）します。最終決定は多数決で決まります。

## MAGI ユニット

| ユニット  | 番号 | AI モデル        | 人格                     |
| --------- | ---- | ---------------- | ------------------------ |
| MELCHIOR  | 1    | OpenAI GPT-4o    | 科学者——論理的・分析的   |
| BALTHASAR | 2    | Anthropic Claude | 母親——保護・思いやり重視 |
| CASPER    | 3    | Google Gemini    | 女性——直感・感情的洞察   |

## 技術スタック

- **Next.js 15**（App Router、TypeScript）
- **Tailwind CSS v4**
- OpenAI SDK、Anthropic SDK、Google Generative AI SDK
- `Promise.allSettled` による3AI並列呼び出し

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. APIキーの設定

環境変数ファイルのサンプルをコピーし、APIキーを入力してください：

```bash
cp .env.local.example .env.local
```

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

- OpenAI APIキー：https://platform.openai.com/api-keys
- Anthropic APIキー：https://console.anthropic.com/settings/keys
- Google AI APIキー：https://aistudio.google.com/apikey

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 動作の仕組み

1. 画面下部のターミナル入力欄に議題や質問を入力し、Enterキーで送信します。
2. 3つのMAGIユニットがそれぞれのAI APIを通じて同時に審議を開始します。
3. 各ユニットが独立して投票結果（合意／否決／棄権）と判断理由を返します。
4. 最終決定は多数決で計算されます：
   - 合意が否決より多い → **合意**
   - 否決が合意より多い → **否決**
   - 同数 → **膠着**
5. 審議終了後、いずれかのMAGIユニットをクリックすると詳細な判断理由を確認できます。

## 決定結果の一覧

| 表示  | 意味                   |
| ----- | ---------------------- |
| 合 意 | 承認                   |
| 拒 絶 | 否決                   |
| 棄 権 | 棄権                   |
| 膠 着 | 膠着状態               |
| 情 報 | 待機中（まだ決定なし） |

## ライセンス

本プロジェクトは庵野秀明 / GAINAX / khara による『新世紀エヴァンゲリオン』へのファン向けトリビュート作品です。エヴァンゲリオンに関連するすべての名称および概念は各著作権者に帰属します。
