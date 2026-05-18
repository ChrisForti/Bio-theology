import React from "react";
import type { Stats } from "@/types";

interface HeroProps {
  stats: Stats;
}

export default function Hero({ stats }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Main Headline */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-amber-100 tracking-tight">
            The Biological Blueprint of Wisdom
          </h1>

          <p className="text-xl lg:text-2xl text-zinc-300 max-w-3xl mx-auto">
            Where modern physiological data converges with ancient biblical
            principles
          </p>

          {/* Stats Display */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-emerald-400">
                {stats.totalCorrelations}
              </div>
              <div className="text-sm uppercase tracking-wider text-zinc-400 mt-2">
                Verified Correlations
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-amber-400">
                {stats.totalStudies}
              </div>
              <div className="text-sm uppercase tracking-wider text-zinc-400 mt-2">
                Scientific Studies
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-mono font-bold text-blue-400">
                {stats.totalReflections}
              </div>
              <div className="text-sm uppercase tracking-wider text-zinc-400 mt-2">
                Community Reflections
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <button className="group relative px-8 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/50 hover:border-amber-500 rounded-lg text-amber-100 font-mono text-sm uppercase tracking-wider transition-all">
              <span className="relative z-10">Explore the Nexus</span>
              <div className="absolute inset-0 bg-amber-500/5 rounded-lg blur-xl group-hover:blur-2xl transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
