# FootballIQ

FootballIQ is a football quiz web app with:
- League and category quizzes
- Player-specific AI quizzes
- AI football chat powered by a GenLayer Intelligent Contract

## Contents
1. Overview
2. Features
3. Architecture
4. Intelligent Contract Integration
5. API Reference
6. Environment Variables
7. Local Development
8. Deployment
9. Project Structure
10. Troubleshooting

## Overview
This project runs as a Hono + TypeScript backend with a vanilla JS SPA frontend.  
Quiz data is served from local datasets, while AI chat and AI quiz generation are routed through your GenLayer contract.

## Features
- 10+ football league quiz categories
- Difficulty modes: `easy`, `medium`, `hard`
- Player search and AI-generated player quizzes
- AI football chat with JSON-based dynamic rendering
- Transaction progress feedback for long-running contract consensus
- Dark/light/system theme support

## Architecture
### Frontend
- `public/static/app.js`: SPA rendering, navigation, quiz flow, AI chat UI
- `public/static/styles.css`: custom styles, animations, chat/markdown/JSON blocks

### Backend
- `src/index.tsx`: API routes and contract-backed AI endpoints
- `src/genlayer.ts`: GenLayer client singleton, consensus init, contract calls
- `src/data/questions.ts`: static quiz question bank and helpers

### Runtime Flow
1. Frontend sends chat/quiz request to `/api/...`
2. Backend initializes GenLayer client (singleton)
3. Backend writes to contract method
4. Backend waits for transaction receipt at status `ACCEPTED`
5. Backend reads contract state (`get_last_chat` / `get_last_quiz`)
6. Frontend renders dynamic JSON response

## Intelligent Contract Integration
Current contract address:
- `0x688AA322f581Db6677aa06B80c04C66Bc72E1102`

Expected contract call methods:
- `football_chat(message, history_json)`
- `generate_player_quiz(player_name, difficulty, count)`
- `generate_category_quiz(category, difficulty, count)`
- `get_last_chat(user_address)`
- `get_last_quiz(user_address)`

Network defaults:
- Chain: `studionet`
- Receipt wait config: `retries: 150`, `interval: 2000`, `status: ACCEPTED`

## API Reference
| Method | Path | Description |
|---|---|---|
| GET | `/api/leagues` | Return available leagues |
| GET | `/api/players/popular` | Return popular players |
| GET | `/api/quiz/:category/:difficulty?count=10` | Return static quiz questions |
| POST | `/api/ai/chat` | Contract-based football chat |
| POST | `/api/ai/player-quiz` | Contract-based player quiz generation |
| POST | `/api/ai/category-quiz` | Contract-based category quiz generation |

## Environment Variables
Create `.env.local` or `.env` with:

```bash
VITE_GENLAYER_KEY=0xYOUR_PRIVATE_KEY
GENLAYER_CONTRACT_ADDRESS=0x688AA322f581Db6677aa06B80c04C66Bc72E1102
```

Notes:
- `VITE_GENLAYER_KEY` is required for contract write calls.
- `GENLAYER_CONTRACT_ADDRESS` is optional in code (defaults to the address above).

## Local Development
### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure env
```bash
cp .env.example .env.local
```
Then set your real `VITE_GENLAYER_KEY`.

### 3. Run app
```bash
pnpm build
pnpm preview
```

Alternative local runtime (Cloudflare Pages emulation):
```bash
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

## Deployment
- Platform: Cloudflare Pages
- Build command: `pnpm build`
- Output directory: `dist`

Deploy example:
```bash
npx wrangler pages deploy dist --project-name footballiq
```

## Project Structure
```text
football-quizz/
├── contracts/
│   └── football_iq_brain.py
├── public/static/
│   ├── app.js
│   └── styles.css
├── src/
│   ├── data/questions.ts
│   ├── genlayer.ts
│   ├── index.tsx
│   └── renderer.tsx
├── .env.example
├── package.json
├── vite.config.ts
└── wrangler.jsonc
```

## Troubleshooting
- `VITE_GENLAYER_KEY is required for contract calls`:
  - Add key to `.env.local` and restart dev process.
- Contract calls hang for a while:
  - This is expected for consensus paths; UI shows transaction progress.
- Build fails with optional Rollup module error:
  - Reinstall dependencies (`pnpm install`) and retry build.
