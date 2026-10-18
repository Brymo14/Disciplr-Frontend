# Disciplr Frontend

[![CI](https://github.com/Disciplr-Org/Disciplr-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/Disciplr-Org/Disciplr-Frontend/actions/workflows/ci.yml)
[![API](https://img.shields.io/badge/API-live-3ddc97)](https://disciplr-api.vercel.app)

Web app for **Disciplr**: commitment vaults on Stellar. Lock USDC against milestones, have a verifier confirm progress, and release funds on success or redirect them on failure.

- **Live API (used by this app):** https://disciplr-api.vercel.app ([backend repo](https://github.com/Disciplr-Org/Disciplr-backend))
- **Live site:** not yet published. The Vercel deployment is blocked by the free-plan upload limit (`api-upload-free`, resets 24 hours after it was hit); see Deployment below.

## Features

- Landing page, dashboard (totals, deadlines, at-risk vaults, activity)
- Vault list with status filters, vault detail with milestones, timeline and actions (validate milestone, cancel)
- Vault creation with review step and validation
- Transactions feed (create, validate, release, redirect)
- Verifier queue and history, analytics, help center, in-app docs at `/docs`
- Wallet: Freighter on testnet, or a built-in **Demo account** (no wallet needed)
- Light/dark theme, responsive layout

## Architecture

```
React 18 + Vite + Tailwind 4 + Zustand
  src/pages        routes (Home, Dashboard, Vaults, VaultDetail, CreateVault, Transactions, Docs, Verifier*, Analytics, ...)
  src/services     vaultService.ts (data seam), api.ts (Disciplr API client + mappers)
  src/context      Wallet (Freighter + demo), Theme, AppConfig
  src/fixtures     offline sample data used when VITE_API is unset
```

`vaultService` calls the API when `VITE_API` is set and otherwise serves bundled fixtures.

## Setup

```bash
npm install
cp .env.example .env     # VITE_API=https://disciplr-api.vercel.app/api
npm run dev              # http://localhost:5173
npm run build            # production build in dist/
npm test                 # vitest
```

## Environment variables

| Name | Description |
| --- | --- |
| `VITE_API` | Base URL of the Disciplr API including `/api`. Unset = offline fixtures |
| `VITE_API_TARGET` | Dev-server proxy target for `/api` (default `http://localhost:3000`) |
| `VITE_DEV_PORT` | Dev server port (default 5173) |

## Deployment

Configured for Vercel (`vercel.json`: Vite build, SPA rewrite). The project `disciplr-frontend` exists with `VITE_API` set for production. To publish:

```bash
vercel --prod --yes          # or: vercel build --prod && vercel deploy --prebuilt --prod
```

## Demo limitations

Settlement is simulated by the API (no real funds move). In demo mode you are your own verifier so the full flow can be tried alone. Extending a deadline is not supported by the API.

Earlier detailed notes remain in `docs/` and git history.
