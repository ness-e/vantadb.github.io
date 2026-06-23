import { createFileRoute } from "@tanstack/react-router";

import { SwissHero } from "@/components/SwissHero";
import { SwissBenchmarkGrid } from "@/components/SwissBenchmarkGrid";
import { SwissQuickstart } from "@/components/SwissQuickstart";
import { SwissCoreEngine } from "@/components/SwissCoreEngine";
import { SwissUseCases } from "@/components/SwissUseCases";
import { SwissEcosystem } from "@/components/SwissEcosystem";
import { SwissArchSection } from "@/components/SwissArchSection";
import { SwissMonolith } from "@/components/SwissMonolith";

// ── Page Route ─────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VantaDB — Embedded Vector Database for AI Agents" },
      {
        name: "description",
        content:
          "Open-source embedded vector database. SQL + vector + full-text search in one Rust binary. Sub-millisecond hybrid queries. Zero infrastructure. MIT licensed.",
      },
      { property: "og:title", content: "VantaDB — Embedded Vector Database for AI Agents" },
      {
        property: "og:description",
        content: "SQL + vector + full-text search in one Rust binary. Sub-millisecond hybrid queries.",
      },
    ],
  }),
  component: IndexPage,
});

// ── Index Page ─────────────────────────────────────────────────────────────
function IndexPage() {
  return (
    <main className="page-content" id="main-content">
      {/* 01 — Hero */}
      <SwissHero />

      {/* 02 — Benchmark Grid */}
      <SwissBenchmarkGrid />

      {/* 03 — Quickstart (dark) */}
      <SwissQuickstart />

      {/* 04 — Core Engine */}
      <SwissCoreEngine />

      {/* 05 — Use Cases */}
      <SwissUseCases />

      {/* 06 — Ecosystem (dark) */}
      <SwissEcosystem />

      {/* 07 — Architecture */}
      <SwissArchSection />

      {/* 08 — The Monolith CTA */}
      <SwissMonolith />
    </main>
  );
}

