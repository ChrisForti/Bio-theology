import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db, correlations, reflections, scienceIngest } from "@bio-theology/db";
import { desc, eq, count } from "drizzle-orm";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "Bio-Theology Engine API" });
});

/**
 * GET /api/correlations
 * Fetch all verified correlations for display on the homepage
 */
app.get("/api/correlations", async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const results = await db
      .select()
      .from(correlations)
      .where(eq(correlations.verified, true))
      .orderBy(desc(correlations.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching correlations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch correlations",
    });
  }
});

/**
 * GET /api/correlations/:id
 * Fetch a single correlation with its reflections
 */
app.get("/api/correlations/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const [correlation] = await db
      .select()
      .from(correlations)
      .where(eq(correlations.id, id));

    if (!correlation) {
      return res.status(404).json({
        success: false,
        error: "Correlation not found",
      });
    }

    // Fetch associated reflections
    const correlationReflections = await db
      .select()
      .from(reflections)
      .where(eq(reflections.correlationId, id))
      .orderBy(desc(reflections.createdAt));

    res.json({
      success: true,
      data: {
        ...correlation,
        reflections: correlationReflections,
      },
    });
  } catch (error) {
    console.error("Error fetching correlation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch correlation",
    });
  }
});

/**
 * POST /api/reflections
 * Submit a new user reflection on a correlation
 */
app.post("/api/reflections", async (req: Request, res: Response) => {
  try {
    const { correlationId, userId, content, isPublic } = req.body;

    if (!correlationId || !content) {
      return res.status(400).json({
        success: false,
        error: "correlationId and content are required",
      });
    }

    const [newReflection] = await db
      .insert(reflections)
      .values({
        correlationId: parseInt(correlationId),
        userId: userId || null,
        content,
        isPublic: isPublic !== false, // Default to public
      })
      .returning();

    res.status(201).json({
      success: true,
      data: newReflection,
    });
  } catch (error) {
    console.error("Error creating reflection:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create reflection",
    });
  }
});

/**
 * GET /api/stats
 * Get system statistics for the hero section
 */
app.get("/api/stats", async (req: Request, res: Response) => {
  try {
    const [correlationCount] = await db
      .select({ count: count() })
      .from(correlations)
      .where(eq(correlations.verified, true));

    const [studyCount] = await db
      .select({ count: count() })
      .from(scienceIngest);

    const [reflectionCount] = await db
      .select({ count: count() })
      .from(reflections);

    res.json({
      success: true,
      data: {
        totalCorrelations: correlationCount.count,
        totalStudies: studyCount.count,
        totalReflections: reflectionCount.count,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bio-Theology Engine API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Correlations: http://localhost:${PORT}/api/correlations`);
});

export default app;
