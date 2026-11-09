# Ibrahim Laref Portfolio

Personal portfolio built with React, TypeScript, and Vite.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm ci
npm run dev
```

Vite prints the local URL after the development server starts.

## Build and preview

```bash
npm run build
npm run preview
```

Run the linter with `npm run lint`.

## Optional contact API

The contact form sends a `POST` request to `/contact/`. To use a separate API, copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the API base URL. Keep credentials and private environment files out of Git.
