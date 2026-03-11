# MAGI システム

**Language / 語言 / 言語:** [English](README.md) · [繁體中文](README.zh.md) · [日本語](README.ja.md)

---

『新世紀エヴァンゲリオン』に登場する超高性能コンピュータ「MAGI」のウェブ版シミュレーションです。3つのAI APIが並列で審議を行います。

各AIはMAGIの1ユニットとして機能し、入力された議題に対して独立して投票（合意／否決／棄権）します。各ユニットの結果は返ってきた順に即座に表示されます。最終決定は多数決で決まります。

## MAGI ユニット

| ユニット | 番号 | AI モデル | 人格 |
|----------|------|-----------|------|
| MELCHIOR | 1 | OpenAI GPT-4o | 科学者——論理的・分析的 |
| BALTHASAR | 2 | Anthropic Claude | 母親——保護・思いやり重視 |
| CASPER | 3 | Google Gemini | 女性——直感・感情的洞察 |

## 技術スタック

- **Next.js 16**（App Router、TypeScript）
- **Tailwind CSS v4**
- OpenAI SDK、Anthropic SDK、Google Generative AI SDK
- 3本の独立した並列 fetch — 各ユニットが応答した瞬間にUIを更新

## 起動方法

### 方法 A：Docker（推奨）

```bash
cp .env.local.example .env.local
# .env.local に APIキーを入力
docker compose up -d
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

```bash
# コード変更後の再ビルド
docker compose up -d --build

# 停止
docker compose down
```

### 方法 B：ローカル開発

**1. 依存関係のインストール**

```bash
npm install
```

**2. APIキーの設定**

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

**3. 開発サーバーの起動**

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## モデルのカスタマイズ

`.env.local` に以下の任意の変数を追加することで、各ユニットのモデルを変更できます：

```env
OPENAI_MODEL=gpt-4o              # デフォルト: gpt-4o
ANTHROPIC_MODEL=claude-opus-4-5  # デフォルト: claude-opus-4-5
GOOGLE_MODEL=gemini-2.5-flash    # デフォルト: gemini-2.5-flash
```

## 動作の仕組み

1. 画面下部のターミナル入力欄に議題や質問を入力し、Enterキーで送信します。
2. 3つのMAGIユニットがそれぞれ独立したAPIコールで同時に審議を開始します。
3. 各ユニットは応答が届いた瞬間にフリッカーが止まり結果が表示されます。他のユニットの完了を待ちません。
4. 全ユニットの応答が揃った時点で多数決により最終決定が計算されます：
   - 合意が否決より多い → **合意**
   - 否決が合意より多い → **否決**
   - 同数 → **膠着**
5. 審議終了後、いずれかのMAGIユニットをクリックすると詳細な判断理由を確認できます。

## 決定結果の一覧

| 表示 | 意味 |
|------|------|
| 合 意 | 承認 |
| 否 決 | 否決 |
| 棄 権 | 棄権 |
| 膠 着 | 膠着状態 |
| 情 報 | 待機中（まだ決定なし） |

## ライセンス

本プロジェクトは庵野秀明 / GAINAX / khara による『新世紀エヴァンゲリオン』へのファン向けトリビュート作品です。エヴァンゲリオンに関連するすべての名称および概念は各著作権者に帰属します。
