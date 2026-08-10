# Handoff: mosynthkey.github.io トップページ・リデザイン

## Overview
GitHub Pagesで公開しているポートフォリオトップページ（現行: `mosynthkey.github.io/index.html`）を、ダーク×すりガラス（グラスモーフィズム）×下部Dockナビの単一ビューUIに置き換える。スクロールなしの1画面構成で、下部Dockで6つのソフトウェアプロダクトを切り替えると、背面のフルブリード画像・見出し・説明文・リンクが差し替わる。

## About the Design Files
このパッケージのHTMLファイル（`reference/redesign.dc.html`）は **デザイン参照用のプロトタイプ** です。内部はこのプロトタイピング環境専用のテンプレート記法（`{{ }}` ホール、`<sc-for>` 等）とReactベースのランタイムを使っているため、**そのままコピーして使わないでください**。実装は、対象リポジトリ（静的HTML/CSS/JS、GitHub Pages、ビルドツールなしの想定）の既存の書き方に合わせて、Vanilla HTML/CSS/JSで作り直してください。ビルドツールやフレームワークが既にリポジトリにあるなら、それに従ってください。

## Fidelity
**High-fidelity。** 色・タイポグラフィ・レイアウト・寸法は below の値の通りに実装してください。文言は下記 Screens セクションの日本語/英語テキストをそのまま使用してください（プロダクト側の実サイトの原文から抽出済みです）。

## Screens / Views

### 唯一のビュー: フルスクリーン・シングルパネル
- ページ全体が `position: fixed; inset: 0;` で、`html, body { overflow: hidden; height: 100% }` — スクロールは一切発生しない。
- ビューポート全体を占める1枚のパネルの中に、背景レイヤー・上部ナビ・左下の情報パネル・下部中央のDockが重なって配置される。

#### レイヤー構成（z-index順）
1. **背景画像レイヤー (z-index: 0)** — プロダクトごとに1枚のフルブリード画像（`object-fit: cover`, 幅高さ100%）。6枚を同じ場所に重ねて配置し、選択中のプロダクトの画像だけ `opacity: 1`、他は `opacity: 0`（`transition: opacity 0.4s ease`）。
   - 現状、実画像があるのは「Melissa」のみ: `https://mosynthkey.github.io/Melissa/images/function/all.gif`。他5プロダクトは画像未定（プレースホルダー、後日差し込み予定）。
2. **グラデーション・オーバーレイ (z-index: 1)** — 画像の上に重ねる暗転グラデーション、クリック透過（`pointer-events: none`）:
   `background: linear-gradient(180deg, rgba(10,10,13,0.25) 0%, rgba(10,10,13,0.55) 55%, rgba(10,10,13,0.97) 100%);`
3. **上部ナビバー (z-index: 50)** — 画面上端に固定、幅100%。
   - `padding: 22px 44px`, `display:flex; justify-content:space-between; align-items:center`
   - 背景: `rgba(10,10,13,0.35)` + `backdrop-filter: blur(18px)` + 下線 `border-bottom: 1px solid rgba(255,255,255,0.06)`（すりガラス効果）
   - 左側: ロゴ画像（`https://mosynthkey.github.io/assets/melissa-audio-logo-BvWsNWe_.svg`、高さ22px） + 12px軽量グレーテキストで `© 2026 Melissa Audio`（`color:#7C7C84; font-size:12px`）、gap 14px
   - 右側: 言語切替ボタン（下記参照）
4. **左下・情報パネル (z-index: 2)** — 画面左下、`padding: 0 60px 150px`（下は Dock の高さを避けるため150px確保）、`max-width: 900px`。
   - **プラットフォーム・バッジ**: 選択中プロダクトのプラットフォーム名（例 "Windows / macOS"）。すりガラスの角丸ピル: `padding:7px 14px; border-radius:20px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); backdrop-filter:blur(10px);` 文字色 `#82ABE3`, `font-size:13px; font-weight:600;`
   - **プロダクト名（見出し）**: `font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:clamp(32px, 5.2vw, 72px); line-height:1.1; letter-spacing:-0.02em;` 色は白系 `#F2F2ED`
   - **説明文**: `font-size:18px; line-height:1.7; color:#C7C7CE; max-width:520px;`
   - **CTAボタン**「開く ↗ / Open ↗」: 選択中プロダクトの外部URLへ新規タブで遷移。背景 `#82ABE3`、文字色 `#0a0a0d`（黒に近いダーク）、`font-family:'Space Grotesk'; font-weight:700; font-size:15px; padding:15px 26px; border-radius:14px;` ホバーで背景 `#b0cbf0`
5. **下部Dock (z-index: 60)** — 画面下部中央に固定、`bottom:22px; left:50%; transform:translateX(-50%);`
   - すりガラスのピル型コンテナ: `padding:12px 18px; border-radius:26px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.16); backdrop-filter:blur(24px); box-shadow:0 20px 50px rgba(0,0,0,0.5);` 内部は `display:flex; align-items:flex-end; gap:14px;`
   - Dockアイコンは6個（プロダクト数と一致）。各アイコンは角丸スクエア（`border-radius:13px`）。
     - 通常サイズ: 52×52px。ホバー時: 62×62px（`transition: width/height 0.15s`）
     - 選択中のアイコンには `box-shadow: 0 0 0 2px #82ABE3` のリングを表示
     - ホバー時、アイコン上部に吹き出しツールチップ（プロダクト名）を表示: 濃色背景 `rgba(20,20,24,0.95)`, 枠線 `1px solid rgba(255,255,255,0.14)`, `padding:6px 12px; border-radius:8px; font-size:12px; font-weight:600;`
     - クリックで、そのプロダクトを「選択中」にする（＝背景画像・情報パネルの内容が切り替わる。外部リンクへは飛ばない）

## Interactions & Behavior
- **Dockアイコンをクリック** → 選択中プロダクトの state を更新 → 背景画像がクロスフェード（0.4秒）、情報パネルの見出し・説明・プラットフォームバッジ・CTAリンク先が切り替わる。ページ内遷移のみ、ページ全体はリロードしない。
- **Dockアイコンにホバー** → サイズが52→62pxに拡大 + プロダクト名のツールチップ表示。マウスアウトで元に戻る。
- **CTAボタン「開く / Open」クリック** → 選択中プロダクトの実際のURL（下記データ参照）を新規タブで開く。
- **言語切替ボタン（右上、"EN" / "日本語"）** → クリックで全テキストを日本語⇄英語にトグル。ボタン自体のラベルは「今切り替えると表示される言語名」（日本語表示中は "EN"、英語表示中は "日本語"）。
- 初期表示時の選択中プロダクトは **Melissa**（インデックス1）。
- スクロールは発生しない。ウィンドウリサイズ時も1画面に収まるレイアウトを維持する（`clamp()` で見出しフォントサイズを画面幅に応じて可変）。

## State Management
- `lang`: `'ja' | 'en'`（初期値 `'ja'`）
- `selected`: 選択中プロダクトのインデックス（初期値 `1` = Melissa）
- `hoverDock`: 現在ホバー中のDockアイコンのインデックス、またはホバーなしなら `null`

## Design Tokens

### Colors
- 背景: `#0a0a0d`（ほぼ黒）
- 本文テキスト: `#F2F2ED`（オフホワイト）
- サブテキスト: `#C7C7CE`
- 補助テキスト（コピーライト等）: `#7C7C84`
- アクセント: `#82ABE3`（青系。CTA背景、バッジ文字、リンク、選択リング）
- アクセント・ホバー: `#b0cbf0`
- グラス面: `rgba(255,255,255,0.08)` 背景 + `rgba(255,255,255,0.16)` 枠線 が基本パターン（ナビは `rgba(255,255,255,0.06)` 枠線）

### Typography
- 見出し/ボタン/UI強調: **Space Grotesk**（weight 500/600/700）
- 本文: **Manrope**（weight 400/500/600/700）
- Google Fonts: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap`

### Spacing / Radius
- ナビ padding: `22px 44px`
- 情報パネル padding: `0 60px 150px`
- グラスピル radius: バッジ `20px`、CTAボタン `14px`、Dockコンテナ `26px`、Dockアイコン `13px`

### Effects
- すりガラス: `backdrop-filter: blur(18px)`（ナビ）/ `blur(10px)`（バッジ）/ `blur(24px)`（Dock）
- Dockの外側シャドウ: `box-shadow: 0 20px 50px rgba(0,0,0,0.5)`

## Assets
- ロゴ: `https://mosynthkey.github.io/assets/melissa-audio-logo-BvWsNWe_.svg`（既存サイトのロゴをそのまま再利用）
- Melissaの背景画像: `https://mosynthkey.github.io/Melissa/images/function/all.gif`（既存サイトの画面GIFを再利用）
- 他5プロダクトの背景画像・Dockアイコン画像は未定。実装時はプレースホルダー（単色 or 各プロダクトのロゴ）にしておき、後で差し替え可能な構造にすること。

## Product data（Dockの並び順 = 配列順）

```js
const PRODUCTS = [
  {
    key: 'wavy', name: 'Wavy', platforms: ['iOS'],
    url: 'https://apps.apple.com/jp/app/wavy-music-video-studio/id6753092962',
    bgImage: null,
    ja: '音源とジャケット画像からかっこいい動画を作成するiOSアプリ。',
    en: 'Create a great-looking music video from a track and its artwork, right on iOS.'
  },
  {
    key: 'melissa', name: 'Melissa', platforms: ['Windows', 'macOS'],
    url: 'https://mosynthkey.github.io/Melissa/',
    bgImage: 'https://mosynthkey.github.io/Melissa/images/function/all.gif',
    ja: 'AI音源分離機能搭載の楽器練習/耳コピ用のミュージックプレイヤー。',
    en: 'A music player for instrument practice and ear-training, with AI-powered stem separation.'
  },
  {
    key: 'screendesc', name: 'ScreenDesc', platforms: ['Web', 'Windows', 'macOS'],
    url: 'https://mosynthkey.github.io/ScreenDesc/landing/',
    bgImage: null,
    ja: 'AIによるUI認識とOCRを搭載した、アプリやソフトの説明画像制作のためのスクリーンショット注釈ツール。',
    en: 'A screenshot annotation tool for app/software documentation, powered by AI UI recognition and OCR.'
  },
  {
    key: 'volcafm2', name: 'volca fm2 Utility', platforms: ['Web App'],
    url: 'https://mosynthkey.github.io/volcafm2-dx7/',
    bgImage: null,
    ja: 'KORG volca fm2 プログラムを受信して DX7 SysEx として保存するユーティリティ。',
    en: 'Receives KORG volca fm2 programs and saves them as DX7 SysEx.'
  },
  {
    key: 'modx', name: 'MODX Liveset Utility', platforms: ['Web App'],
    url: 'https://mosynthkey.github.io/MODX_Liveset_Utility/',
    bgImage: null,
    ja: 'YAMAHA MODX LiveSet マネージャ。',
    en: 'A LiveSet manager for the YAMAHA MODX.'
  },
  {
    key: 'fastudio', name: 'FA StudioSetEditor', platforms: ['Web App'],
    url: 'https://mosynthkey.github.io/FA-StudioSetEditor/index.html',
    bgImage: null,
    ja: 'Roland FAシリーズ用 Studio Set エディタ。',
    en: 'A Studio Set editor for the Roland FA series.'
  },
];
```

UI文言（プロダクト以外）:
- 言語ボタンラベル: ja表示中 → `EN` / en表示中 → `日本語`
- CTAボタン: ja → `開く` / en → `Open`
- コピーライト: `© 2026 Melissa Audio`（両言語共通）

## Files
- `reference/redesign.dc.html` — このデザインの参照実装（プロトタイピング専用フォーマット。上記スペックに従って書き直してください）
