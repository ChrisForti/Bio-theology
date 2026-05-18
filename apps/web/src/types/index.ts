export interface Correlation {
  id: number;
  title: string;
  category: string;
  bibleVerse: string;
  scriptureText: string;
  scientificMechanism: string;
  physiologicalBenefit: string;
  socialHook: string;
  verified: boolean;
  createdAt: Date;
}

export interface Stats {
  totalCorrelations: number;
  totalStudies: number;
  totalReflections: number;
}

export interface Reflection {
  id: number;
  correlationId: number;
  userId: string | null;
  content: string;
  isPublic: boolean;
  createdAt: Date;
}
