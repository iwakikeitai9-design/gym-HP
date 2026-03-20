# Desafio Kickboxing Gym 公式ホームページ

北海道小樽市花園にあるキックボクシングジム「Desafio（デサフィオ）」の公式ホームページです。

## 使用技術

- HTML / CSS / JavaScript（バニラJS）
- Swiper.js v11（トレーナー紹介スライダー）
- Google Fonts（Noto Serif JP / Noto Sans JP）
- Vercel（自動デプロイ）

## ページ構成

| ファイル | 内容 |
|---|---|
| index.html | トップページ |
| about.html | ジム紹介・トレーナー紹介・FAQ |
| news.html | お知らせ一覧 |
| contact.html | お問い合わせ・無料体験申込 |

## フォルダ構成

```
gym-HP/
├── index.html
├── about.html
├── news.html
├── contact.html
├── css/
│   ├── style.css   （共通スタイル）
│   └── pages.css   （ページ固有スタイル）
├── js/
│   └── main.js     （共通JavaScript）
└── images/         （画像ファイル）
```

## デプロイ

GitHubの `main` ブランチにpushすると、Vercelが自動でサイトを更新します。
