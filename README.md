# Bio-Theology Engine

> **The Biological Blueprint of Wisdom**  
> Cross-referencing peer-reviewed physiological/health studies with Biblical wisdom to demonstrate alignment on structural frameworks for optimal life.

## 🌟 System Overview

The Bio-Theology Engine is a cloud-native, autonomous data pipeline that:

1. **Harvests** peer-reviewed scientific studies (via Hermie Scout)
2. **Correlates** biological mechanisms with Biblical principles (via Jimmy Scribe)
3. **Presents** verified correlations through an interactive web dashboard
4. **Engages** community through reflection prompts

## 🏗️ Architecture

```
┌─────────────────┐
│  Hermie Scout   │ ──► Scrapes PubMed, Semantic Scholar
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PostgreSQL DB   │ ◄─── Drizzle ORM
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Jimmy Scribe   │ ──► OpenRouter API (Claude 3.5 Sonnet)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Express API     │ ──► REST endpoints
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js Web App │ ──► Tailwind UI
└─────────────────┘
```

## 📂 Monorepo Structure

```
/root
├── /apps
│   ├── /web                 # Next.js frontend with Tailwind CSS
│   │   └── /src
│   │       ├── /components  # React components
│   │       ├── /pages       # Next.js pages
│   │       ├── /lib         # API client
│   │       └── /types       # TypeScript types
│   └── /api                 # Express backend
│       └── /src
│           └── index.ts     # API endpoints
├── /packages
│   ├── /db                  # Drizzle ORM & schema
│   │   ├── schema.ts        # Database tables
│   │   └── index.ts         # DB client
│   └── /agents              # Agent configurations
│       ├── hermie-config.ts # Research Scout setup
│       ├── jimmy-config.ts  # Scribe & prompts
│       └── index.ts         # OpenRouter client
├── /scripts
│   ├── hermie-runner.ts     # Cron job script
│   └── jimmy-processor.ts   # Worker script
├── package.json             # Workspace root
└── drizzle.config.ts        # DB migrations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Railway recommended)
- OpenRouter API key

### Installation

1. **Clone and install dependencies:**

```bash
cd /Users/fortis/repos/truth
npm install
```

2. **Setup environment variables:**

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database (Railway PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database

# OpenRouter API
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# API Configuration
API_PORT=3001
NODE_ENV=development

# Web App
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Initialize database:**

```bash
npm run db:push
```

### Development

Run all services locally:

```bash
# Terminal 1: API Backend
npm run api:dev

# Terminal 2: Web Frontend
npm run web:dev

# Terminal 3: Run Hermie (manual trigger)
npm run hermie

# Terminal 4: Run Jimmy (manual trigger)
npm run jimmy
```

Access the app at `http://localhost:3000`

## 📊 Database Schema

### `science_ingest`

Raw data harvested by Hermie Scout

- `title`, `doi`, `abstract`, `sourceUrl`
- `keywords`, `biomarkers` (JSON)
- `processed` (boolean flag)

### `correlations`

High-value pairs created by Jimmy Scribe

- `category` (e.g., "NERVOUS SYSTEM // FORGIVENESS")
- `bibleVerse`, `scriptureText`
- `scientificMechanism`, `physiologicalBenefit`
- `socialHook` (community engagement question)

### `reflections`

User responses to social prompts

- `correlationId`, `userId`, `content`
- `isPublic` (boolean)

## 🤖 Agents

### Hermie Scout

**Role:** Research data harvester  
**Sources:** PubMed, Semantic Scholar  
**Focus:** Biomarkers (cortisol, HRV, inflammation)  
**Execution:** Railway Cron (every 6-12 hours)

### Jimmy Scribe

**Role:** Correlation architect  
**Engine:** OpenRouter API (Claude 3.5 Sonnet)  
**Process:** Match scientific mechanisms with Biblical verses  
**Execution:** Railway Worker (processes unverified data)

## 🎨 UI Design

**Theme:** Dark mode with slate/zinc backgrounds and amber/gold accents

**Components:**

- **Hero Section:** Stats display with animated gradients
- **Correlation Cards:** Grid layout showcasing scripture + science
- **Social Hooks:** Interactive reflection input fields
- **Responsive:** Mobile-first design with Tailwind CSS

## ☁️ Railway Deployment

### Services to Deploy:

1. **PostgreSQL Database** (Railway Addon)
2. **API Backend** (`apps/api`)
3. **Web Frontend** (`apps/web`)
4. **Hermie Cron Job** (runs `npm run hermie`)
5. **Jimmy Worker** (runs `npm run jimmy`)

### Environment Variables (Railway):

Set these in each service:

- `DATABASE_URL` (auto-provided by Railway)
- `OPENROUTER_API_KEY`
- `API_PORT=3001`
- `NEXT_PUBLIC_API_URL` (API service URL)

### Cron Configuration:

**Hermie:** `0 */6 * * *` (every 6 hours)  
**Jimmy:** `0 */1 * * *` (every hour, or continuous worker)

## 📡 API Endpoints

### GET `/api/correlations`

Fetch all verified correlations

- Query params: `limit`, `offset`

### GET `/api/correlations/:id`

Get single correlation with reflections

### POST `/api/reflections`

Submit user reflection

- Body: `{ correlationId, content, userId?, isPublic? }`

### GET `/api/stats`

Get system statistics for hero section

## 🛠️ Development Scripts

```bash
npm run dev          # Run all services (turbo)
npm run build        # Build all packages
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to DB
npm run db:studio    # Open Drizzle Studio
npm run hermie       # Run Hermie Scout
npm run jimmy        # Run Jimmy Scribe
npm run api:dev      # API only
npm run web:dev      # Web only
```

## 🎯 Key Features

✅ Autonomous data harvesting from peer-reviewed sources  
✅ AI-powered correlation matching (Claude 3.5 Sonnet)  
✅ Structured database with Drizzle ORM  
✅ Beautiful dark-mode UI with Tailwind CSS  
✅ Community engagement through reflection prompts  
✅ Railway-optimized for cloud-only deployment  
✅ Monorepo architecture with Turborepo

## 📦 Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Drizzle ORM
- **LLM:** OpenRouter API (Claude 3.5 Sonnet)
- **Hosting:** Railway (auto-scaling)
- **Monorepo:** Turborepo, npm workspaces

## 🔐 Security Notes

- Never commit `.env` files
- Store API keys in Railway environment variables
- Use Railway's secret management for production
- Enable CORS only for trusted domains in production

## 📈 Next Steps

1. Deploy to Railway and provision PostgreSQL
2. Configure cron jobs for Hermie
3. Setup continuous worker for Jimmy
4. Add authentication for user reflections
5. Implement pagination for correlation grid
6. Add search/filter functionality
7. Create admin dashboard for monitoring

## 📝 License

Private project - All rights reserved

---

**Built with ❤️ by the power of ancient wisdom and modern science**
