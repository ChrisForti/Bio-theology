import React from "react";
import type { Correlation } from "@/types";

interface CorrelationCardProps {
  correlation: Correlation;
  onReflectionSubmit?: (correlationId: number, content: string) => void;
}

export default function CorrelationCard({
  correlation,
  onReflectionSubmit,
}: CorrelationCardProps) {
  const [reflection, setReflection] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim() || !onReflectionSubmit) return;

    setSubmitting(true);
    try {
      await onReflectionSubmit(correlation.id, reflection);
      setReflection("");
    } catch (error) {
      console.error("Failed to submit reflection:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="correlation-card">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-xs font-mono tracking-wider text-zinc-400">
        <span>{correlation.category}</span>
        {correlation.verified && (
          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-400 font-semibold">
            VERIFIED
          </span>
        )}
      </div>

      {/* Scriptural Component */}
      <div className="mt-4 space-y-2">
        <h3 className="font-serif text-xl font-bold text-amber-100">
          {correlation.bibleVerse}
        </h3>
        <p className="scripture-text">{correlation.scriptureText}</p>
      </div>

      {/* Scientific Component */}
      <div className="mt-4 space-y-2">
        <div className="mechanism-badge">
          <span className="text-xs">⏣</span>
          <span>Mechanism: {correlation.scientificMechanism}</span>
        </div>
        <p className="text-sm text-zinc-400">
          {correlation.physiologicalBenefit}
        </p>
      </div>

      {/* Community Social Hook */}
      <div className="social-hook-container">
        <p className="text-xs font-medium text-zinc-300 bg-zinc-950 p-3 rounded">
          <span className="text-amber-400 font-bold font-mono block mb-1">
            COMMUNITY PROMPT:
          </span>
          {correlation.socialHook}
        </p>

        {/* Quick Input */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your reflection..."
            disabled={submitting}
            className="w-full mt-3 px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded focus:outline-none focus:border-amber-500/50 text-zinc-200 disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  );
}
