import React from "react";
import "../components/SkillCarousel.css";

export type Skill = {
  label: string;
  iconClass?: string; // e.g. "fa-brands fa-react"
  imgSrc?: string;    // use an SVG/logo instead of FA
  alt?: string;
};

export const DEFAULT_SKILLS: Skill[] = [
  { label: "HTML5", iconClass: "fa-brands fa-html5" },
  { label: "CSS3", iconClass: "fa-brands fa-css3-alt" },
  { label: "JavaScript", iconClass: "fa-brands fa-js" },
  { label: "GitHub", iconClass: "fa-brands fa-github" },
  { label: "PHP", iconClass: "fa-brands fa-php" },
  { label: "React", iconClass: "fa-brands fa-react" },
  { label: "MySQL", iconClass: "fa-solid fa-database" },     // fallback
  { label: "Laravel", iconClass: "fa-brands fa-laravel" },
  { label: "Express.js", iconClass: "fa-solid fa-code" },     // fallback
  { label: "Node.js", iconClass: "fa-brands fa-node-js" },    // safer class
  { label: "Git", iconClass: "fa-brands fa-git-alt" },
  { label: "jQuery", iconClass: "fa-solid fa-code" },         // fallback
  { label: "TypeScript", iconClass: "fa-solid fa-code" },     // fallback
];

export type SkillCarouselProps = {
  title?: string;
  skills?: Skill[];
  /** Lower = faster (default: 30s) */
  speedSeconds?: number;
  /** Item height in px (default: 72) */
  height?: number;
  className?: string;
};

const SkillCarousel: React.FC<SkillCarouselProps> = ({
  title = "Skills",
  skills = DEFAULT_SKILLS,
  speedSeconds = 30,
  height = 72, // give it a bit more room
  className = "",
}) => {
  const track = [...skills, ...skills];

  return (
    <section
      aria-label={title}
      className={`skill-carousel ${className}`}
      role="region"
      style={{ ["--sc-item-h" as any]: `${height}px` }} // pass height as CSS var
    >
      
      <div className="skill-carousel__viewport">
        <ul
          className="skill-carousel__track"
          aria-live="polite"
          aria-atomic={false}
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {track.map((s, i) => (
            <li
              className="skill-item"
              key={`${s.label}-${i}`}
              tabIndex={0}
              aria-label={s.label}
              title={s.label}
            >
              {s.iconClass ? (
                <i className={`skill-item__icon ${s.iconClass}`} aria-hidden="true" />
              ) : s.imgSrc ? (
                <img className="skill-item__img" src={s.imgSrc} alt={s.alt || s.label} />
              ) : null}
              <span className="skill-item__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SkillCarousel;
