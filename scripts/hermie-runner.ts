#!/usr/bin/env tsx
/**
 * HERMIE RUNNER SCRIPT
 *
 * Executed by Railway Cron Job (recommended: every 6-12 hours)
 * Scrapes peer-reviewed journals for relevant health studies
 * Inserts raw data into science_ingest table
 */

import { db, scienceIngest } from "../packages/db";
import { hermieConfig, type HermieResult } from "../packages/agents";
import axios from "axios";

// PubMed API helpers
const PUBMED_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/";
const SEARCH_ENDPOINT = "esearch.fcgi";
const FETCH_ENDPOINT = "efetch.fcgi";

async function searchPubMed(
  keyword: string,
  maxResults: number = 5,
): Promise<string[]> {
  try {
    const searchUrl = `${PUBMED_BASE}${SEARCH_ENDPOINT}?db=pubmed&term=${encodeURIComponent(keyword)}&retmode=json&retmax=${maxResults}&sort=relevance`;

    const response = await axios.get(searchUrl);
    const idList = response.data.esearchresult?.idlist || [];

    return idList;
  } catch (error) {
    console.error(`Error searching PubMed for "${keyword}":`, error);
    return [];
  }
}

async function fetchPubMedDetails(pmids: string[]): Promise<HermieResult[]> {
  if (pmids.length === 0) return [];

  try {
    const fetchUrl = `${PUBMED_BASE}${FETCH_ENDPOINT}?db=pubmed&id=${pmids.join(",")}&retmode=xml`;
    const response = await axios.get(fetchUrl);

    // Parse XML response (simplified - in production use proper XML parser)
    const results: HermieResult[] = [];

    // For each PMID, extract structured data
    for (const pmid of pmids) {
      // This is a simplified placeholder - implement proper XML parsing
      results.push({
        title: `Study PMID:${pmid}`, // Extract from XML
        doi: `10.1234/pmid${pmid}`, // Extract from XML
        abstract: "Abstract text would be extracted from XML response",
        sourceUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
        keywords: ["extracted", "keywords"],
        biomarkers: ["cortisol", "hrv"], // Extract based on content analysis
      });
    }

    return results;
  } catch (error) {
    console.error("Error fetching PubMed details:", error);
    return [];
  }
}

async function runHermie() {
  console.log("🔍 Hermie Scout starting research sweep...\n");

  let totalIngested = 0;

  for (const keyword of hermieConfig.searchKeywords) {
    console.log(`Searching: "${keyword}"`);

    try {
      // Search for studies
      const pmids = await searchPubMed(keyword, 3);

      if (pmids.length === 0) {
        console.log(`  ⚠️  No results found\n`);
        continue;
      }

      console.log(`  ✓ Found ${pmids.length} studies`);

      // Fetch details
      const studies = await fetchPubMedDetails(pmids);

      // Insert into database
      for (const study of studies) {
        try {
          await db.insert(scienceIngest).values({
            title: study.title,
            doi: study.doi,
            abstract: study.abstract,
            sourceUrl: study.sourceUrl,
            keywords: JSON.stringify(study.keywords),
            biomarkers: JSON.stringify(study.biomarkers),
            processed: false,
          });

          totalIngested++;
          console.log(`  ✓ Ingested: ${study.title.substring(0, 50)}...`);
        } catch (error) {
          console.error(`  ✗ Failed to ingest study:`, error);
        }
      }

      console.log("");

      // Rate limiting - respect API limits
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 / hermieConfig.sources[0].rateLimit),
      );
    } catch (error) {
      console.error(`Error processing keyword "${keyword}":`, error);
    }
  }

  console.log(
    `\n✅ Hermie Scout completed: ${totalIngested} new studies ingested`,
  );
}

// Execute
runHermie()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
