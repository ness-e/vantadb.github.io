import { type ReactNode } from "react";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSubpageProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  titleAccent?: boolean;
  stats?: HeroStat[];
  children?: ReactNode;
}

export function HeroSubpage({ eyebrow, title, subtitle, titleAccent = true, stats, children }: HeroSubpageProps) {
  return (
    <header className="page-header-extended">
      {eyebrow && (
        <span className="section-eyebrow reveal">{eyebrow}</span>
      )}
      <h1 className={`${titleAccent ? "title-accent " : ""}reveal reveal-delay-1`}>
        {title}
      </h1>
      {subtitle && (
        <p className="section-sub reveal reveal-delay-2 desc-text">{subtitle}</p>
      )}
      {stats && (
        <div className="hero-stats reveal reveal-delay-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </header>
  );
}
