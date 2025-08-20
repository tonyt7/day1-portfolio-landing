import React from "react";
import "./JourneyTimeline.css";
type Stop = { id: number; year: string; title: string; detail: string };

const STOPS: Stop[] = [
  {
    id: 1,
    year: "2018–2020",
    title: "A‑Levels",
    detail:
      "First steps into programming with C++. Learned fundamentals and problem‑solving.",
  },
  {
    id: 2,
    year: "2020–2021",
    title: "Year 1 — Web Programming",
    detail:
      "HTML, CSS, JavaScript, PHP, MySQL. Built responsive sites and small full‑stack demos.",
  },
  {
    id: 3,
    year: "2021–2022",
    title: "Year 2 — Group Project",
    detail:
      "Team project using Express.js, Node.js, GitHub, GCP. Focused on collaboration & delivery.",
  },
  {
    id: 4,
    year: "2022–2023",
    title: "Year 3 — Bachelor’s Project",
    detail:
      "Built with Laravel + Bootstrap + MySQL. Emphasis on data modelling and UX polish.",
  },
  {
    id: 5,
    year: "2023–2024",
    title: "Placement — Council",
    detail:
      "Worked with Drupal CMS and Tailwind. Accessibility, content workflows, production rollouts.Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  },
  {
    id: 6,
    year: "2024–2025",
    title: "Year 5 — Master’s Thesis",
    detail:
      "React, Node.js, Express.js, MySQL. Integrated Master’s (MSci) completed July 2025.",
  },

  
  { id: 7, 
    year: "2025–", 
    title: "Web Full-Stack Upskilling (Self-taught)",
    detail: 
    "Focused deep-dive: TypeScript, React Router, Zustand, Prisma, testing (Vitest/Playwright), Docker, CI/CD, cloud basics (Vercel/Fly/Render), and patterns for scalable Node/Express APIs."
 },
];

function chunk<T>(arr: T[], size = 3): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function JourneyNeonMap() {
  const [active, setActive] = React.useState(0);
  const rows = chunk(STOPS, 3);

  // keyboard nav
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => Math.min(i + 1, STOPS.length - 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () => setActive((i) => Math.max(i - 1, 0));
  const next = () => setActive((i) => Math.min(i + 1, STOPS.length - 1));
  const go = (i: number) => setActive(i);

  return (
    <section className="mapWrapNeon" aria-label="Programming Journey">
      <h2 className="jnm-title">My Programming Journey</h2>

      {/* ==== Timeline (S curve via rows + side arcs) ==== */}
      <div className="jnm">
        {rows.map((row, r) => {
  // Reverse every even-indexed row (row 2, 4, …) for the S-flow
  const rowData = r % 2 === 1 ? [...row].reverse() : row;

  return (
    <div
      className={`row ${r === rows.length - 1 && row.length < 3 ? "center-last" : ""}`}
      key={`row-${r}`}
    >
      {rowData.map((s, idx) => {
        // Compute the original position inside the row so global index stays correct
        const origIdxInRow = r % 2 === 1 ? row.length - 1 - idx : idx;
        const globalIndex = r * 3 + origIdxInRow; // still 0..N in original order
        const isActive = active === globalIndex;

        return (
          <button
            key={s.id}
            className={`itemBar ${isActive ? "active" : ""}`}
            onClick={() => go(globalIndex)}
            aria-label={`${s.title} (${s.year})`}
          >
            <div className="itemInfo">
              <span className="pill-year">{s.year}</span>
              <span className="pill-title">{s.title}</span>
            </div>
            <div className="itemDate">
              <span className="dot">{s.id}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
})}
      </div>

      {/* ==== Carousel synced to timeline ==== */}
      <div className="jnm-carousel" role="region" aria-label="Project details">
        <button className="nav prev" onClick={prev} disabled={active === 0} aria-label="Previous">
          ‹
        </button>

        <div className="slides-window">
          <div
            className="slides-track"
            style={{ transform: `translateX(calc(-1 * ${active} * 100%))`,width: `calc(100% * ${STOPS.length})` }}
          >
            {STOPS.map((s, i) => (
              <div className="slide" key={s.id} aria-hidden={active !== i}>
                <div className="slide-card">
                  <div className="slide-head">
                    <span className="badge">{s.year}</span>
                    <h3>{s.title}</h3>
                  </div>
                  <p className="muted">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav next"
          onClick={next}
          disabled={active === STOPS.length - 1}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dots under carousel */}
      <div className="dotbar" role="tablist" aria-label="Slide selector">
        {STOPS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            className={`dot ${active === i ? "on" : ""}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}