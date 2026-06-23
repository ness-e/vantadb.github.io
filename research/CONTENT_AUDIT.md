# Content Audit — VantaDB Corporate Site

---

## 1. Current Inventory (12 Routes)

| Route | Lines | Type | Quality | Completeness |
|---|---|---|---|---|
| `/` (Landing) | 712 | Full page | High — 8 sections, GSAP animations, all visuals | Complete, keep as-is (hero + core sections) |
| `/engine` | 429 | Feature deep-dive | High — interactive RRF, GraphRAG, WAL crash sim | Complete |
| `/architecture` | 226 | Technical deep-dive | High — isometric stack, spec table | Complete |
| `/integrations` | 286 | Ecosystem page | High — orbital visual, code panels | Complete |
| `/use-cases` | 262 | Use cases | Medium — accordion + code blocks | Expand (only 4 use cases, add 3 more) |
| `/docs` | 428 | Design system guide | **Wrong content** — should be user docs, not component API | Replace with user documentation |
| `/cost` | 82 | Mini comparison | Low — barebones text | Expand to full page (hero + charts + calc) |
| `/latency` | 84 | Mini comparison | Low — barebones text | Expand to full page (hero + charts + benchmarks) |
| `/storage` | 84 | Mini comparison | Low — barebones text | Expand to full page (hero + architecture + stats) |
| `/config` | 84 | Mini comparison | Low — barebones text | Expand to full page (hero + comparison + guide) |
| `/maint` | 85 | Mini comparison | Low — barebones text | Expand to full page (hero + comparison + ops guide) |

---

## 2. Missing Pages (Required)

| Page | Priority | Justification |
|---|---|---|
| `/product/benchmarks` | High | Performance data exists in MPTS (Recall@10 0.998, 1.2ms p50, 8,500 QPS) |
| `/solutions/ai-agents` | High | GTM Vertical #1 — memory/state management for AI agents |
| `/solutions/local-rag` | High | GTM Vertical #2 — local-first document Q&A |
| `/solutions/ai-ide-tooling` | Medium | GTM Vertical #3 — augmented coding workflows |
| `/pricing` | High | Existing pricing model (free/pro/enterprise) needs a dedicated page |
| `/about/company` | Medium | Company info, team, story |
| `/about/roadmap` | Medium | Engineering roadmap from MPTS |
| `/about/community` | Medium | Community resources, Discord, GitHub, contribution |
| `/about/contact` | Low | Contact form + enterprise inquiry |
| `/security` | Medium | Security posture, SOC 2, air-gapped deployment |
| `/legal` | Low | Terms, privacy, license info |
| `/blog` | Medium | Blog index (Decap CMS) |
| `/blog/*` | Medium | Individual blog posts |
| `/changelog` | Low | Release notes from MPTS version history |

---

## 3. Content Quality Assessment

### What works well
- Landing page is production-grade with strong visual identity
- Engine page interactivity (RRF slider, crash sim) is genuinely impressive
- Architecture page is clear and technically accurate
- Verbal identity is consistent: "one binary, zero servers" throughout
- SingularityHero (Three.js black hole) is a strong differentiator

### What needs work
- **5 comparison pages** are clearly placeholders — 82-85 lines each, no hero, no visuals, no interactivity. They look like v0.1 MVP content. They need full-page treatment.
- **`/docs` page** is a design system reference, not user documentation. It documents VantaDB's `--amber` and component props instead of teaching users how to use the database.
- **`/use-cases`** has only 4 panels. Should expand to at least 7 (adding: local RAG, IDE tooling, multi-agent orchestration, hybrid search in e-commerce).
- **No blog** — zero content, no content directory, no MDX files.
- **No pricing page** — pricing model exists in MPTS but nowhere on the site.
- **No about/company page** — no team, no story, no contact.
- **No solutions pages** — three GTM verticals exist in MPTS strategy but have zero web presence.
- **No blog, no changelog, no security/legal pages.**
- **Root layout nav** only links 4 pages (Engine, Architecture, Integrations, Use Cases). The 5 comparison pages are orphans — only reachable via the landing page bottom nav.

---

## 4. Navigation Architecture (Current)

```
Home (/)
├── Engine (/engine)
├── Architecture (/architecture)
├── Integrations (/integrations)
├── Use Cases (/use-cases)
├── Docs (/docs) [currently wrong content]
└── Comparison (bottom nav) →
    ├── /cost
    ├── /latency
    ├── /storage
    ├── /config
    └── /maint
```

### Navigation Architecture (Target)

```
Home (/)
├── Product
│   ├── Engine (/engine)
│   ├── Architecture (/architecture)
│   ├── Benchmarks (/product/benchmarks)
│   └── Integrations (/integrations)
├── Solutions
│   ├── AI Agents (/solutions/ai-agents)
│   ├── Local RAG (/solutions/local-rag)
│   └── AI IDE Tooling (/solutions/ai-ide-tooling)
├── Use Cases (/use-cases)
├── Pricing (/pricing)
├── Docs (/docs)
├── Blog (/blog)
└── About
    ├── Company (/about/company)
    ├── Roadmap (/about/roadmap)
    ├── Community (/about/community)
    └── Contact (/about/contact)
```

Footer links: Security, Legal, Changelog, Comparison pages (cost, latency, storage, config, maint).

---

## 5. Content Migration Path

| Phase | Pages |
|---|---|
| **Phase 1.3** — Expand 5 comparison pages | cost, latency, storage, config, maint (each → 200+ lines with hero, charts, interactivity) |
| **Phase 1.4** — Fix docs | Replace `/docs` content with real user documentation (getting started, SDK reference, guides) |
| **Phase 1.5** — New solution pages | `/solutions/ai-agents`, `/solutions/local-rag`, `/solutions/ai-ide-tooling` |
| **Phase 1.6** — Blog setup | Decap CMS + `/blog` index + `/blog/[slug]` template |
| **Phase 1.7** — Pricing + Changelog | `/pricing`, `/changelog` |
| **Phase 1.8** — About section | `/about/company`, `/about/roadmap`, `/about/community`, `/about/contact` |
| **Phase 2** — Product benchmark, Security, Legal | `/product/benchmarks`, `/security`, `/legal` |
