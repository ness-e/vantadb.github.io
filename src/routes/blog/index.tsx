import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSubpage } from "../../components/HeroSubpage";
import { getAllPosts } from "../../lib/blog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "VantaDB Blog" },
      {
        name: "description",
        content:
          "Engineering blog, release notes, and deep dives into embedded vector databases, AI agents, and local RAG.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();

  useScrollReveal();

  return (
    <div className="page-wrapper">
      <HeroSubpage
        eyebrow="// Blog"
        title={
          <>
            Deep dives.
            <br />
            Release notes.
            <br />
            Ideas.
          </>
        }
        subtitle="Engineering blog about embedded vector databases, AI agents, local RAG, and the future of AI data infrastructure."
        stats={[
          { value: `${posts.length}`, label: "Posts" },
          { value: "Open", label: "Source" },
          { value: "MIT", label: "License" },
        ]}
      />

      <main className="main-content">
        <section style={{ padding: "4rem 0" }}>
          {posts.length === 0 && (
            <div className="reveal text-center reveal-centered">
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--steel)",
                }}
              >
                No posts yet. Check back soon or write one!
              </p>
            </div>
          )}
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="arch-card reveal"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div className="arch-title">{post.title}</div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--steel)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>
                <div className="arch-desc" style={{ marginBottom: "0.75rem" }}>
                  {post.description}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {post.author && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--amber)",
                        background: "var(--amber-dim)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {post.author}
                    </span>
                  )}
                  {post.tags?.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--steel)",
                        background: "var(--surface)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <nav className="bottom-nav">
          <Link to="/" className="back-link nav-cta">
            ← Back to Home
          </Link>
        </nav>
      </main>
    </div>
  );
}
