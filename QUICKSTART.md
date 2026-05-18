# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

This installs all dependencies for the monorepo (API, Web, DB, Agents).

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
# Required: PostgreSQL Database URL
DATABASE_URL=postgresql://user:password@localhost:5432/biotheology

# Required: OpenRouter API Key
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Optional: Customize ports
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Get OpenRouter API Key:**

- Sign up at https://openrouter.ai
- Go to Keys section
- Create new key
- Add credits to account

### 3. Setup Database

If you don't have PostgreSQL locally, use Railway:

```bash
# Option A: Railway PostgreSQL (Recommended)
# 1. Create Railway account
# 2. Create new project → Add PostgreSQL
# 3. Copy DATABASE_URL to .env

# Option B: Local PostgreSQL
# Install PostgreSQL, create database "biotheology"
# Update DATABASE_URL in .env
```

Push schema to database:

```bash
npm run db:push
```

### 4. Start Development Servers

**Terminal 1: API Backend**

```bash
npm run api:dev
```

**Terminal 2: Web Frontend**

```bash
npm run web:dev
```

### 5. Seed Data (Optional)

Run Hermie to collect scientific studies:

```bash
npm run hermie
```

Run Jimmy to create correlations:

```bash
npm run jimmy
```

### 6. View Application

Open your browser:

- **Web App:** http://localhost:3000
- **API Health:** http://localhost:3001/health
- **Drizzle Studio:** `npm run db:studio` (GUI for database)

## 🎯 What You Should See

1. **Homepage Hero:** Displays stats (correlations, studies, reflections)
2. **Correlation Cards Grid:** Shows Bible verse + Science pairings
3. **Reflection Inputs:** Community engagement prompts

## 🐛 Troubleshooting

### "Database connection failed"

- Verify `DATABASE_URL` is correct in `.env`
- Ensure PostgreSQL is running
- Run `npm run db:push` to initialize schema

### "Cannot find module '@bio-theology/db'"

- Run `npm install` from root directory
- Turborepo handles workspace linking

### "OpenRouter API error"

- Check `OPENROUTER_API_KEY` is valid
- Ensure account has credits
- Verify model name is correct

### "No correlations displayed"

- Run `npm run hermie` to collect studies
- Run `npm run jimmy` to create correlations
- Check API logs for errors

## 📦 Project Commands

```bash
# Development
npm run dev          # All services with Turbo
npm run api:dev      # API only
npm run web:dev      # Web only

# Database
npm run db:push      # Push schema to DB
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio GUI

# Agents
npm run hermie       # Run Hermie Scout
npm run jimmy        # Run Jimmy Scribe

# Production
npm run build        # Build all packages
npm run start        # Start production server
```

## 🎨 Tech Stack Overview

- **Frontend:** Next.js + React + Tailwind CSS
- **Backend:** Express + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **AI:** OpenRouter (Claude 3.5 Sonnet)
- **Hosting:** Railway (Cloud)

## 📝 Next Steps

1. ✅ Get app running locally
2. 📚 Read [README.md](README.md) for architecture details
3. ☁️ Read [DEPLOYMENT.md](DEPLOYMENT.md) for Railway setup
4. 🎨 Customize UI colors in `apps/web/tailwind.config.js`
5. 🤖 Adjust agent prompts in `packages/agents/`
6. 🗄️ Extend schema in `packages/db/schema.ts`

## 🆘 Need Help?

- Check existing `.md` files (README, DEPLOYMENT, STRUCTURE)
- Review code comments in agent configs
- Inspect API endpoints in `apps/api/src/index.ts`
- Review component structure in `apps/web/src/`

---

**You're all set! Happy building! 🎉**
