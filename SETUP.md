# BillTheDevLab — Setup Guide

End-to-end instructions to get the full monorepo running locally from zero.

---

## Architecture Overview

```
billthedevlab/
├── apps/
│   ├── web/          → Next.js 14 (App Router) — port 3000
│   └── backend/      → NestJS + Fastify — port 3001
├── packages/
│   └── shared-types/ → TypeScript types shared across apps
├── docker-compose.yml → PostgreSQL 16 + Redis 7
├── turbo.json         → Turborepo task orchestration
└── .env.example       → All environment variables
```

**Tech Stack:**
- Frontend: Next.js 14, Tailwind CSS, MDX, Framer Motion, Zustand, Fuse.js, NextAuth.js v5
- Backend: NestJS, Fastify, TypeORM, BullMQ, Redis, Stripe, Google Sheets API
- Database: PostgreSQL 16 + Redis 7
- Auth: GitHub + Google OAuth via NextAuth.js → JWT for backend
- Payments: Stripe Checkout Sessions + Webhooks
- Storage: AWS S3 (private bucket) with pre-signed download URLs
- Analytics: Redis real-time counters → PostgreSQL hourly sync → Google Sheets daily sync

---

## Prerequisites

Install these before starting:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20.x | https://nodejs.org or `nvm install 20` |
| Docker | Latest | https://docs.docker.com/get-docker |
| Docker Compose | v2+ | Bundled with Docker Desktop |
| Git | Latest | https://git-scm.com |

Verify:

```bash
node -v    # v20.x.x or higher
npm -v     # 10.x.x or higher
docker -v  # Docker version 27.x.x
```

---

## Step 1: Clone & Install

```bash
git clone <your-repo-url> billthedevlab
cd billthedevlab

# Install all workspace dependencies
npm install
```

This installs dependencies for root, `apps/web`, `apps/backend`, and `packages/shared-types` in one command thanks to npm workspaces.

---

## Step 2: Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in **required** values:

### Minimum Required (local dev)

```env
# These work out of the box with docker-compose
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=billthedevlab
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=<generate-with: openssl rand -hex 32>
NEXTAUTH_SECRET=<generate-with: openssl rand -hex 32>
```

Generate secrets:

```bash
# Run this twice, paste each output into the corresponding env var
openssl rand -hex 32
```

### Optional (enable features)

```env
# GitHub OAuth (for login)
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Google OAuth (for login)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AWS S3 (for file downloads)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=billthedevlab-assets
AWS_S3_PRIVATE_BUCKET=billthedevlab-private

# Google Sheets (for analytics sync)
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_SPREADSHEET_ID=...
```

---

## Step 3: Start Database & Redis

```bash
docker compose up -d
```

Verify services are running:

```bash
docker compose ps

# Expected:
# billthedevlab-db      running   0.0.0.0:5432->5432/tcp
# billthedevlab-redis   running   0.0.0.0:6379->6379/tcp
```

Test connections:

```bash
# PostgreSQL
docker exec billthedevlab-db pg_isready -U postgres
# → accepting connections

# Redis
docker exec billthedevlab-redis redis-cli ping
# → PONG
```

---

## Step 4: Start Backend

```bash
npm run dev:backend
```

First run with `synchronize: true` (default in dev) auto-creates all database tables.

Verify:

```bash
curl http://localhost:3001/api/health
# → {"status":"ok","timestamp":"...","uptime":...}
```

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | Public | Health check |
| POST | `/api/auth/oauth/callback` | Public | OAuth login callback |
| GET | `/api/auth/me` | JWT | Current user profile |
| POST | `/api/analytics/view/:postId` | Public | Track page view |
| POST | `/api/analytics/buff-view` | Admin | Buff view count |
| GET | `/api/analytics/views/:postId` | Public | Get view count |
| GET | `/api/analytics/post/:postId` | Public | Full post analytics |
| POST | `/api/purchases/checkout` | JWT | Create Stripe checkout |
| POST | `/api/purchases/webhook` | Public | Stripe webhook |
| GET | `/api/purchases/my` | JWT | User's purchases |
| GET | `/api/assets/download/:fileKey` | Public* | Generate S3 signed URL |

*Free products are public; paid products require JWT + completed purchase.

---

## Step 5: Start Frontend

```bash
npm run dev:web
```

Open http://localhost:3000

You should see:
- Hero section with gradient text
- 3 sample blog posts (Welcome, Volumetric Fog, ECS Architecture)
- Dark theme by default with toggle

---

## Step 6: Writing Blog Posts

Create `.mdx` files in `apps/web/content/posts/`:

```mdx
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: "2025-03-01"
tags: ["gamedev", "tutorial"]
coverImage: "/images/your-cover.jpg"
layout: "full-width"
featured: false
estimatedReadTime: 8
---

# Your Content Here

Regular markdown works. Plus custom components:

<Callout variant="tip" title="Pro Tip">
  Use callouts for important notes.
</Callout>

<CodeSnippet
  language="typescript"
  fileName="example.ts"
  code={`const hello = "world";`}
/>
```

### Available MDX Components

| Component | Usage |
|-----------|-------|
| `<Callout>` | Info/warning/tip/danger callout boxes |
| `<CodeSnippet>` | Syntax-highlighted code with copy button |
| `<BuyButton>` | Stripe checkout trigger |
| `<SecureDownloadButton>` | S3 signed URL download |
| `<Sketchfab>` | 3D model embed |
| `<ImageGallery>` | Grid gallery with lightbox |

### Callout Variants

```mdx
<Callout variant="info">Default blue info box</Callout>
<Callout variant="tip" title="Pro Tip">Green tip box</Callout>
<Callout variant="warning">Yellow warning box</Callout>
<Callout variant="danger">Red danger box</Callout>
```

---

## Step 7: Adding Projects

Edit `apps/web/lib/config/projects.config.ts`:

```typescript
export const projectsConfig: Record<string, ProjectConfig> = {
  'my-game': {
    slug: 'my-game',
    title: 'My Game',
    tagline: 'A description of your game',
    genre: 'Platformer',
    engine: 'Godot 4',
    status: 'In Development',
    heroImage: '/images/projects/my-game-hero.jpg',
    accentColor: '#FF8C42',
    sections: [
      {
        id: 'features',
        type: 'features',
        title: 'Key Features',
        items: [
          { title: 'Feature 1', description: 'Description here' },
        ],
      },
    ],
  },
};
```

---

## Step 8: Setting Up Auth (Optional)

### GitHub OAuth

1. Go to https://github.com/settings/developers
2. Create New OAuth App
3. Homepage URL: `http://localhost:3000`
4. Callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to `.env`

### Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID (Web application)
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Client Secret to `.env`

---

## Step 9: Setting Up Stripe (Optional)

### Test Mode

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy Secret Key → `STRIPE_SECRET_KEY`
3. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/purchases/webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`
4. Copy Webhook Signing Secret → `STRIPE_WEBHOOK_SECRET`

### Local Testing with Stripe CLI

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local backend
stripe listen --forward-to localhost:3001/api/purchases/webhook

# Copy the webhook signing secret it prints and add to .env
```

---

## Step 10: Setting Up AWS S3 (Optional)

### Create Buckets

1. Create two S3 buckets in AWS Console:
   - `billthedevlab-assets` (public bucket for thumbnails)
   - `billthedevlab-private` (private bucket for paid downloads)

2. Block all public access on the private bucket

3. Create an IAM user with S3 access policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:HeadObject"],
      "Resource": "arn:aws:s3:::billthedevlab-private/*"
    }
  ]
}
```

4. Copy Access Key ID and Secret to `.env`

---

## Step 11: Google Sheets Analytics (Optional)

1. Go to https://console.cloud.google.com
2. Enable Google Sheets API
3. Create a Service Account
4. Download JSON key file
5. Copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
6. Copy `private_key` → `GOOGLE_PRIVATE_KEY`
7. Create a Google Sheet and share it with the service account email
8. Copy Spreadsheet ID from the URL → `GOOGLE_SPREADSHEET_ID`

---

## Production Deployment

### Frontend (Vercel)

```bash
# From project root
cd apps/web
npx vercel --prod
```

Set environment variables in Vercel dashboard. Change `NEXT_PUBLIC_API_URL` to your backend URL.

### Backend (Railway / Render / VPS)

```bash
cd apps/backend
npm run build
npm run start:prod
```

Required environment variables in production:
- Set `NODE_ENV=production`
- Set `DB_*` to your production PostgreSQL
- Set `REDIS_*` to your production Redis
- Set `FRONTEND_URL` to your Vercel URL (for CORS)

### Database (Production)

Use a managed PostgreSQL service:
- **Supabase** (free tier available)
- **Railway** (built-in Postgres)
- **Neon** (serverless Postgres)

Use a managed Redis service:
- **Upstash** (free tier, serverless)
- **Railway** (built-in Redis)

---

## Common Commands

```bash
# Development
npm run dev              # Start both apps (Turborepo)
npm run dev:web          # Start frontend only
npm run dev:backend      # Start backend only

# Database
docker compose up -d     # Start PostgreSQL + Redis
docker compose down      # Stop services
docker compose down -v   # Stop + delete data

# Build
npm run build            # Build all apps

# Lint
npm run lint             # Lint all apps
```

---

## Troubleshooting

### Port already in use

```bash
# Find and kill process on port 3000/3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Database connection refused

```bash
# Check if Docker containers are running
docker compose ps

# Restart if needed
docker compose restart
```

### Redis connection refused

Same as database — ensure Docker is running. Redis runs on port 6379.

### TypeORM sync issues

If schema gets out of sync in development:

```bash
# Nuclear option: drop and recreate
docker compose down -v
docker compose up -d
npm run dev:backend  # synchronize: true recreates tables
```

### Next.js build errors with MDX

Ensure all MDX files have valid frontmatter (YAML between `---` markers at the top).
Every field in the frontmatter schema must be present.

### Images not loading

Replace placeholder SVG files in `apps/web/public/images/` with actual JPG/PNG images.
The default placeholders are SVGs with incorrect extensions — they work for layout but won't render in `next/image`.

---

## File Structure Reference

```
billthedevlab/
├── apps/
│   ├── backend/
│   │   └── src/
│   │       ├── common/
│   │       │   ├── constants/     → Redis keys, rate limits, queue names
│   │       │   ├── decorators/    → @Public, @Roles, @CurrentUser, @ClientIp
│   │       │   ├── guards/        → JwtAuthGuard, RolesGuard
│   │       │   ├── interfaces/    → JwtPayload, RedisViewData
│   │       │   ├── pipes/         → ValidationPipe config
│   │       │   └── providers/     → RedisModule (global)
│   │       ├── config/            → Environment config loader
│   │       ├── database/
│   │       │   ├── entities/      → User, Post, Product, Purchase, ViewLog
│   │       │   └── data-source.ts → TypeORM CLI config
│   │       ├── modules/
│   │       │   ├── analytics/     → View tracking, buff, Redis↔PG sync, Google Sheets
│   │       │   ├── asset/         → S3 signed URLs, access control
│   │       │   ├── auth/          → JWT generation, OAuth callback
│   │       │   ├── health/        → Health check endpoint
│   │       │   └── purchase/      → Stripe checkout, webhooks
│   │       ├── app.module.ts      → Root module wiring
│   │       └── main.ts            → Bootstrap with Fastify
│   │
│   └── web/
│       ├── app/
│       │   ├── (blog)/blog/       → Blog listing + post detail
│       │   ├── (marketing)/       → Projects, About pages
│       │   ├── (shop)/shop/       → Shop listing + product detail
│       │   ├── _components/
│       │   │   ├── cards/         → CozyCard, ProductCard
│       │   │   ├── layout/        → Header, Footer, HeroSection
│       │   │   ├── mdx/           → Callout, CodeSnippet, BuyButton, etc.
│       │   │   ├── search/        → SearchModal, SearchTrigger
│       │   │   ├── theme/         → ThemeToggle
│       │   │   └── ui/            → ViewCounter, TagList
│       │   ├── api/               → NextAuth, Search API routes
│       │   ├── layout.tsx         → Root layout with metadata
│       │   ├── page.tsx           → Homepage
│       │   ├── not-found.tsx      → 404 page
│       │   ├── sitemap.ts         → Dynamic sitemap
│       │   └── robots.ts          → Robots.txt
│       ├── content/posts/         → MDX blog posts
│       ├── lib/
│       │   ├── config/            → Site config, projects config
│       │   ├── hooks/             → useViewTracker, useSearch
│       │   ├── mdx/               → MDX compilation service
│       │   ├── store/             → Zustand stores (theme, UI)
│       │   └── utils/             → API client, fingerprint, formatters
│       ├── styles/globals.css     → Design system (CSS variables, glass, prose)
│       └── tailwind.config.ts     → Extended color palette, fluid typography
│
├── packages/
│   └── shared-types/              → Enums, DTOs, interfaces
│
├── docker-compose.yml             → PostgreSQL + Redis
├── turbo.json                     → Task orchestration
└── .env.example                   → All environment variables
```

---

## Design System Quick Reference

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-orange` | `#FF8C42` | Primary CTA, links, highlights |
| `brand-violet` | `#A78BFA` | Secondary accent, code, gradients |
| `brand-emerald` | `#34D399` | Success states, free badges |
| `brand-amber` | `#FBBF24` | Warnings, price alerts |
| `brand-red` | `#F87171` | Errors, danger callouts |

### Fonts

| Family | Token | Usage |
|--------|-------|-------|
| Satoshi | `font-display` | Headings, brand text, buttons |
| General Sans | `font-body` | Body text, descriptions |
| JetBrains Mono | `font-mono` | Code, technical values |

### CSS Utility Classes

| Class | Effect |
|-------|--------|
| `gradient-text` | Orange→Violet gradient text |
| `glass-surface` | Glassmorphism backdrop blur |
| `cozy-card` | Card with hover lift + glow border |
| `cozy-button-primary` | Gradient button |
| `cozy-button-secondary` | Outlined button |
| `prose-custom` | MDX article typography |
