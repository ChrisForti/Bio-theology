#!/usr/bin/env tsx
/**
 * JIMMY PROCESSOR SCRIPT
 *
 * Executed by Railway Worker (continuous or cron-based)
 * Processes unverified science_ingest records
 * Uses OpenRouter API to match studies with Biblical wisdom
 * Creates correlation records for the UI
 */

import { db, scienceIngest, correlations } from "../packages/db";
import { eq } from "drizzle-orm";
import {
  OpenRouterClient,
  jimmySystemPrompt,
  type JimmyResult,
} from "../packages/agents";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

const openRouter = new OpenRouterClient(process.env.OPENROUTER_API_KEY);

async function processStudy(study: any): Promise<JimmyResult | null> {
  try {
    console.log(`\n📖 Processing: ${study.title.substring(0, 60)}...`);

    // Create user prompt with study details
    const userPrompt = `Analyze this scientific study and create a correlation with Biblical wisdom:

Title: ${study.title}
Abstract: ${study.abstract}
Biomarkers: ${study.biomarkers || "Not specified"}

Create a meaningful connection between this scientific finding and a relevant Biblical principle. Return ONLY valid JSON in the specified format.`;

    // Call OpenRouter API
    const response = await openRouter.chat(jimmySystemPrompt, userPrompt);

    // Parse JSON response
    let result: JimmyResult;
    try {
      // Extract JSON from response (may be wrapped in markdown)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      result = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("  ✗ Failed to parse LLM response:", parseError);
      return null;
    }

    // Validate required fields
    if (!result.title || !result.bibleVerse || !result.scientificMechanism) {
      console.error("  ✗ Invalid result structure");
      return null;
    }

    console.log(`  ✓ Created correlation: ${result.category}`);
    console.log(`    Scripture: ${result.bibleVerse}`);
    console.log(`    Mechanism: ${result.scientificMechanism}`);

    return result;
  } catch (error) {
    console.error("  ✗ Error processing study:", error);
    return null;
  }
}

async function runJimmy() {
  console.log("✍️  Jimmy Scribe starting correlation generation...\n");

  // Fetch unprocessed studies (limit batch size to control API costs)
  const unprocessedStudies = await db
    .select()
    .from(scienceIngest)
    .where(eq(scienceIngest.processed, false))
    .limit(10);

  if (unprocessedStudies.length === 0) {
    console.log("✅ No unprocessed studies found. Jimmy is up to date!");
    return;
  }

  console.log(`Found ${unprocessedStudies.length} unprocessed studies\n`);

  let successCount = 0;

  for (const study of unprocessedStudies) {
    try {
      // Process the study
      const correlation = await processStudy(study);

      if (correlation) {
        // Insert correlation into database
        await db.insert(correlations).values({
          scienceIngestId: study.id,
          title: correlation.title,
          category: correlation.category,
          bibleVerse: correlation.bibleVerse,
          scriptureText: correlation.scriptureText,
          scientificMechanism: correlation.scientificMechanism,
          physiologicalBenefit: correlation.physiologicalBenefit,
          socialHook: correlation.socialHook,
          verified: true,
        });

        // Mark study as processed
        await db
          .update(scienceIngest)
          .set({ processed: true, updatedAt: new Date() })
          .where(eq(scienceIngest.id, study.id));

        successCount++;
      } else {
        console.log("  ⚠️  Skipping study due to processing errors");
      }

      // Rate limiting to avoid overwhelming OpenRouter
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error processing study ID ${study.id}:`, error);
    }
  }

  console.log(
    `\n✅ Jimmy Scribe completed: ${successCount}/${unprocessedStudies.length} correlations created`,
  );
}

// Execute
runJimmy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
