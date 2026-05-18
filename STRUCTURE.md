/root
├── /apps
│ ├── /web # Next.js / Vite + Tailwind CSS testing landing page
│ │ └── /src
│ │ └── /components # UI Layout, Hero, CorrelationCard Grid
│ └── /api # Node.js + Express backend endpoint engine
├── /packages
│ ├── /db # Centralized Drizzle database configuration
│ │ └── schema.ts # Database table definitions
│ └── /agents # System prompt definitions and agent rules
├── /scripts
│ ├── hermie-runner.ts # Script executed by Railway Cron to ingest studies
│ └── jimmy-processor.ts # Script executed by Railway Worker to process data
├── package.json # Workspace root dependency configuration
└── drizzle.config.ts # Drizzle migration and connection configuration
