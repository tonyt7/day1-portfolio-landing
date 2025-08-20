import React, { useMemo, useState } from "react";
import "./ProjectGallery.css";

export type ProjectLink = {
  type: "live" | "github" | "caseStudy" | "demo";
  url: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  stacks: string[]; // ["React", "TypeScript", "Node", ...]
  image?: string; // cover image (optional)
  links: ProjectLink[];
  year?: number;
  featured?: boolean;
};

export type ProjectGalleryProps = {
  heading?: string;
  projects: Project[];
};

const LINK_LABEL: Record<ProjectLink["type"], string> = {
  live: "Live Site",
  github: "GitHub",
  caseStudy: "Case Study",
  demo: "Demo",
};

const iconClass: Record<ProjectLink["type"], string> = {
  live: "fa-solid fa-arrow-up-right-from-square",
  github: "fa-brands fa-github",
  caseStudy: "fa-regular fa-file-lines",
  demo: "fa-solid fa-play",
};

const uniqueStacks = (items: Project[]) =>
  [...new Set(items.flatMap(p => p.stacks.map(s => s.toLowerCase())))]
    .sort((a, b) => a.localeCompare(b));

const ProjectCard: React.FC<{ p: Project; layout: "grid" | "list" }> = ({ p, layout }) => (
  <article className={`proj-card ${layout === "list" ? "list" : ""}`}>
    <div className="media">
      {p.image ? (
        <img src={p.image} alt="" loading="lazy" />
      ) : (
        <div className="placeholder" aria-hidden="true" />
      )}
    </div>
    <div className="body">
      <header className="title-row">
        <h3 className="title">{p.title}</h3>
        {p.year && <span className="year" aria-label={`Year ${p.year}`}>{p.year}</span>}
      </header>
      <p className="summary">{p.summary}</p>
      <ul className="stacks" aria-label="Tech stack">
        {p.stacks.map((s, i) => (
          <li className="badge" key={i}>{s}</li>
        ))}
      </ul>
      <div className="links">
        {p.links.map((l, i) => (
          <a
            key={i}
            className={`btn link-${l.type}`}
            href={l.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${LINK_LABEL[l.type]}: ${p.title}`}
          >
            <i className={iconClass[l.type]} aria-hidden="true" />
            <span>{LINK_LABEL[l.type]}</span>
          </a>
        ))}
      </div>
    </div>
  </article>
);

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ heading = "Projects", projects }) => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [stackFilter, setStackFilter] = useState<string>("");

  const stacks = useMemo(() => uniqueStacks(projects), [projects]);

  const filtered = useMemo(() =>
    projects.filter(p => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.stacks.some(s => s.toLowerCase().includes(q));
      const matchesStack = !stackFilter || p.stacks.map(s => s.toLowerCase()).includes(stackFilter);
      return matchesQuery && matchesStack;
    }), [projects, query, stackFilter]
  );

  return (
    <section className="project-gallery" aria-label={heading}>
      <div className="gallery-head">
        <h2>{heading}</h2>
        <div className="controls">
          <label className="visually-hidden" htmlFor="proj-search">Search projects</label>
          <input
            id="proj-search"
            type="search"
            placeholder="Search by name, tech, description…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            inputMode="search"
          />

          <label className="visually-hidden" htmlFor="stack-filter">Filter by stack</label>
          <select
            id="stack-filter"
            value={stackFilter}
            onChange={e => setStackFilter(e.target.value)}
          >
            <option value="">All stacks</option>
            {stacks.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="layout-toggle" role="group" aria-label="Layout">
            <button
              type="button"
              className={layout === "grid" ? "active" : ""}
              onClick={() => setLayout("grid")}
              aria-pressed={layout === "grid"}
              title="Grid"
            >
              <i className="fa-solid fa-table-cells" aria-hidden="true"/>
              <span className="visually-hidden">Grid view</span>
            </button>
            <button
              type="button"
              className={layout === "list" ? "active" : ""}
              onClick={() => setLayout("list")}
              aria-pressed={layout === "list"}
              title="List"
            >
              <i className="fa-solid fa-list" aria-hidden="true"/>
              <span className="visually-hidden">List view</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${layout}`}>
        {filtered.map(p => (
          <ProjectCard key={p.id} p={p} layout={layout} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty">No projects match your filters.</p>
      )}
    </section>
  );
};

export default ProjectGallery;
