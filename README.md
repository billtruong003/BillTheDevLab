# BillTheDevLab

Game dev blog, devlog platform, and digital asset store — built as a production-grade monorepo.

**Frontend:** Next.js 14 (App Router) + Tailwind CSS + MDX + Framer Motion
**Backend:** NestJS + Fastify + TypeORM + BullMQ + Redis + Stripe
**Database:** PostgreSQL 16 + Redis 7

## Quick Start

### Prerequisites
- **Node.js** (v18+ recommended)
- **Docker Desktop** (ensure it is running)

### 1. Environment Setup

**MacOS / Linux:**
```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/backend/.env.example apps/backend/.env
```

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
Copy-Item apps/web/.env.example apps/web/.env
Copy-Item apps/backend/.env.example apps/backend/.env
```

*(Or manually copy & rename these files)*

### 2. Install & Run

```bash
# Install dependencies
npm install

# Start Infrastructure (PostgreSQL + Redis)
docker compose up -d

# Run Development Server (Both Frontend & Backend)
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/health

## Full Documentation

See **[SETUP.md](./SETUP.md)** for complete end-to-end setup instructions including:
- Auth configuration (GitHub + Google OAuth)
- Stripe payment integration
- AWS S3 file downloads
- Google Sheets analytics sync
- Blog post authoring guide
- Production deployment
- Design system reference
