# Toph's Tissues (Video Prototype)

Video-state-machine version of **Toph's Tissues** — a weird, premium-feeling NFT claim mini-game built with pre-rendered clips instead of real-time 3D.

- **Live site:** https://tophs-tissues-video.vercel.app
- **GitHub:** https://github.com/Morgen33/tophs-tissues-video

The separate 3D prototype remains at [tophs-tissues.vercel.app](https://tophs-tissues.vercel.app).

## Stack

- React + Vite + TypeScript
- Plain CSS
- HTML video state machine

## Run locally

```bash
npm install
npm run dev
```

## Video workflow

Placeholder MP4s live in `public/videos/`. Replace them with Grok-generated assets:

1. Generate on pure white background
2. Remove background externally
3. Export transparent WebM
4. Drop files into `public/videos/`

See `public/videos/README.md` for details.

## States

`idle` → `pulling` → `win` / `lose` → optional `resetting` → `idle`

Win chance defaults to `0.2` in `src/utils/random.ts`.
