# Bio-Theology Engine - Complete File Structure

```
/Users/fortis/repos/truth/
│
├── 📄 Root Configuration Files
│   ├── package.json                 # Monorepo workspace configuration
│   ├── tsconfig.json               # TypeScript base config
│   ├── turbo.json                  # Turborepo pipeline
│   ├── drizzle.config.ts          # Database migration config
│   ├── .env.example               # Environment template
│   └── .gitignore                 # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                  # Main project documentation
│   ├── QUICKSTART.md             # 5-minute setup guide
│   ├── DEPLOYMENT.md             # Railway deployment guide
│   ├── EXAMPLES.md               # Sample correlation outputs
│   ├── CHECKLIST.md              # Project completion checklist
│   ├── STRUCTURE.md              # Directory structure (original)
│   ├── CONCEPT.md                # Original concept document
│   └── Tailwindmock.md           # UI mockup reference
│
├── 🎨 VS Code Configuration
│   └── .vscode/
│       ├── settings.json         # Editor settings
│       └── extensions.json       # Recommended extensions
│
├── 📦 Packages (Shared Libraries)
│   ├── /db                       # Database package
│   │   ├── package.json
│   │   ├── index.ts             # DB client & exports
│   │   └── schema.ts            # Drizzle tables:
│   │                            #   - science_ingest
│   │                            #   - correlations
│   │                            #   - reflections
│   │
│   └── /agents                   # AI Agents package
│       ├── package.json
│       ├── index.ts             # OpenRouter API client
│       ├── hermie-config.ts     # Research Scout config
│       └── jimmy-config.ts      # Scribe config & prompts
│
├── 🚀 Applications
│   ├── /api                      # Express Backend
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── railway.json         # Railway deployment config
│   │   └── src/
│   │       └── index.ts         # REST API endpoints:
│   │                            #   GET  /api/correlations
│   │                            #   GET  /api/correlations/:id
│   │                            #   POST /api/reflections
│   │                            #   GET  /api/stats
│   │                            #   GET  /health
│   │
│   └── /web                      # Next.js Frontend
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── railway.json
│       └── src/
│           ├── pages/
│           │   ├── _app.tsx     # Next.js app wrapper
│           │   ├── _document.tsx # HTML document
│           │   └── index.tsx    # Homepage
│           │
│           ├── components/
│           │   ├── Hero.tsx          # Hero section
│           │   └── CorrelationCard.tsx # Card component
│           │
│           ├── lib/
│           │   └── api.ts       # API client functions
│           │
│           ├── types/
│           │   └── index.ts     # TypeScript interfaces
│           │
│           └── styles/
│               └── globals.css  # Tailwind base styles
│
└── 🤖 Scripts (Agent Runners)
    ├── hermie-runner.ts          # Cron job script (PubMed scraper)
    └── jimmy-processor.ts        # Worker script (LLM processor)
```

## 📊 Package Dependencies

### Root Dependencies

- **turbo** - Monorepo task runner
- **tsx** - TypeScript executor
- **typescript** - TypeScript compiler

### Database Package (`@bio-theology/db`)

- **drizzle-orm** - TypeScript ORM
- **postgres** - PostgreSQL client
- **drizzle-kit** - Schema migrations

### Agents Package (`@bio-theology/agents`)

- **axios** - HTTP client for OpenRouter

### API Package (`@bio-theology/api`)

- **express** - Web server framework
- **cors** - CORS middleware
- **@bio-theology/db** - Internal package

### Web Package (`@bio-theology/web`)

- **next** - React framework
- **react** / **react-dom** - UI library
- **tailwindcss** - Utility-first CSS
- **axios** - API client

## 🔄 Data Flow

```
┌──────────────────┐
│  Hermie Scout    │ Scrapes PubMed/Semantic Scholar
│  (Cron Job)      │ Every 6-12 hours
└────────┬─────────┘
         │
         ▼ Inserts raw data
┌──────────────────┐
│  science_ingest  │ Table: Raw studies
│  processed=false │
└────────┬─────────┘
         │
         ▼ Reads unprocessed
┌──────────────────┐
│  Jimmy Scribe    │ OpenRouter API (Claude 3.5)
│  (Worker)        │ Matches science ↔ scripture
└────────┬─────────┘
         │
         ▼ Creates correlations
┌──────────────────┐
│  correlations    │ Table: Verified pairs
│  verified=true   │
└────────┬─────────┘
         │
         ▼ Exposed via API
┌──────────────────┐
│  Express API     │ REST endpoints
│  Port 3001       │
└────────┬─────────┘
         │
         ▼ Fetches data
┌──────────────────┐
│  Next.js Web     │ Tailwind UI
│  Port 3000       │ Correlation cards
└────────┬─────────┘
         │
         ▼ User interactions
┌──────────────────┐
│  reflections     │ Table: Community engagement
└──────────────────┘
```

## 🎯 Key Features Implemented

✅ **Monorepo Structure** - Turborepo + npm workspaces  
✅ **TypeScript Throughout** - Full type safety  
✅ **Database Layer** - Drizzle ORM with PostgreSQL  
✅ **AI Integration** - OpenRouter API (Claude 3.5 Sonnet)  
✅ **REST API** - Express with CORS  
✅ **Modern UI** - Next.js + Tailwind CSS  
✅ **Dark Theme** - Zinc backgrounds + Amber accents  
✅ **Autonomous Agents** - Hermie (scout) + Jimmy (scribe)  
✅ **Community Features** - Reflection submissions  
✅ **Railway Ready** - Deployment configs included  
✅ **Documentation** - Comprehensive guides

## 🚦 Getting Started Commands

```bash
# Install all dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Initialize database
npm run db:push

# Start development (2 terminals)
npm run api:dev   # Terminal 1
npm run web:dev   # Terminal 2

# Run agents manually
npm run hermie    # Collect studies
npm run jimmy     # Create correlations

# Open database GUI
npm run db:studio
```

## 📝 Files Created: 40+

- 6 root config files
- 8 documentation files
- 2 VS Code config files
- 7 database/agent package files
- 4 API backend files
- 13 web frontend files
- 2 agent runner scripts
- 2 Railway config files

**Total Lines of Code: ~3,000+**

---

**Your Bio-Theology Engine is complete and ready to deploy! 🎉**
