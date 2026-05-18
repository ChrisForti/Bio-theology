/**
 * HERMIE - The Research Scout
 *
 * Role: Autonomous data harvester that scrapes peer-reviewed journals
 * for physiological and health studies focusing on biomarkers like:
 * - Cortisol levels
 * - Heart Rate Variability (HRV)
 * - Inflammatory markers (CRP, cytokines)
 * - Nutritional impacts
 * - Behavioral health outcomes
 *
 * Hermie identifies studies that demonstrate measurable biological impacts
 * from lifestyle behaviors that may align with Biblical principles.
 */

export const hermieConfig = {
  name: "Hermie Scout",
  version: "1.0.0",
  role: "Research Data Harvester",

  // Data sources to scrape (expandable)
  sources: [
    {
      name: "PubMed",
      apiEndpoint: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
      rateLimit: 3, // requests per second
    },
    {
      name: "Semantic Scholar",
      apiEndpoint: "https://api.semanticscholar.org/graph/v1/",
      rateLimit: 5,
    },
  ],

  // Search focus areas
  searchKeywords: [
    // Stress & Forgiveness
    "forgiveness cortisol",
    "grudge holding inflammation",
    "stress cardiovascular health",

    // Community & Social Connection
    "social isolation mortality",
    "community engagement wellbeing",
    "loneliness inflammation",

    // Dietary Practices
    "intermittent fasting autophagy",
    "plant-based diet inflammation",
    "dietary restriction longevity",
    "fasting HRV",

    // Rest & Recovery
    "sleep deprivation cortisol",
    "sabbath rest recovery",
    "chronic stress telomeres",

    // Moral Behavior & Health
    "altruism health outcomes",
    "gratitude physiological",
    "compassion vagus nerve",
  ],

  // Biomarkers to track
  biomarkers: [
    "cortisol",
    "hrv",
    "crp",
    "il6",
    "tnf-alpha",
    "blood_pressure",
    "telomere_length",
    "autophagy_markers",
  ],
};

export default hermieConfig;
