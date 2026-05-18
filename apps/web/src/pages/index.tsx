import React, { useEffect, useState } from "react";
import Head from "next/head";
import Hero from "@/components/Hero";
import CorrelationCard from "@/components/CorrelationCard";
import { api } from "@/lib/api";
import type { Correlation, Stats } from "@/types";

export default function Home() {
  const [correlations, setCorrelations] = useState<Correlation[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCorrelations: 0,
    totalStudies: 0,
    totalReflections: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [correlationsData, statsData] = await Promise.all([
          api.getCorrelations(50),
          api.getStats(),
        ]);

        setCorrelations(correlationsData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleReflectionSubmit = async (
    correlationId: number,
    content: string,
  ) => {
    try {
      await api.submitReflection(correlationId, content);
      // Refresh stats after submission
      const newStats = await api.getStats();
      setStats(newStats);
    } catch (error) {
      console.error("Failed to submit reflection:", error);
      throw error;
    }
  };

  return (
    <>
      <Head>
        <title>Bio-Theology Engine | The Biological Blueprint of Wisdom</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero stats={stats} />

        {/* Correlations Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              <p className="mt-4 text-zinc-400">Loading correlations...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && correlations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-400">
                No correlations found. Hermie and Jimmy are working on it!
              </p>
            </div>
          )}

          {!loading && !error && correlations.length > 0 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-amber-100 mb-2">
                  Verified Correlations
                </h2>
                <p className="text-zinc-400">
                  Discover the intersection of ancient wisdom and modern science
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {correlations.map((correlation) => (
                  <CorrelationCard
                    key={correlation.id}
                    correlation={correlation}
                    onReflectionSubmit={handleReflectionSubmit}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-800 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-center text-sm text-zinc-500 font-mono">
              Bio-Theology Engine &copy; {new Date().getFullYear()} | Powered by
              Hermie & Jimmy
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
