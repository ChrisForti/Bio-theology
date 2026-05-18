# Bio-Theology Engine: System Architecture & Outline

The Bio-Theology Engine is a cloud-native, autonomous data pipeline that cross-references peer-reviewed physiological, biological, and medical research with ancient Biblical wisdom (proverbs, dietary mandates, moral frameworks, and lifestyle laws).

The goal is to provide a structured, data-backed foundation demonstrating that Biblical principles serve as a physical and psychological "blueprint" for an optimal life, while creating an interactive platform for community bonding.

---

## 1. System Architecture

The entire platform is deployed in a cloud-only environment to eliminate local hardware bottlenecks and ensure seamless interaction between background workers and the database.

```text
[ Hermie: Research Scout ] (Railway Cron Job)
           │
           ▼ (Inserts Raw Scientific Data)
    [ Railway Postgres DB ] ◄───► [ Drizzle ORM ]
           ▲
           │ (Processes, Translates & Maps)
[ Jimmy: Scribe & Orchestrator ] (Railway Worker + OpenRouter API)
           │
           ▼ (Exposes Structured API)
    [ Web Testing Dashboard ] (Next.js / Vite + Tailwind CSS)
```
