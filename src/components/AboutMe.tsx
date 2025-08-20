import { motion } from "framer-motion";
import "../components/AboutMe.css";
import profileImage from "../assets/Aboutme.png"; // your illustration
import profileLight from "../assets/Aboutme-light.png";


export default function AboutFlipCard() {
  // even distribution along the curve (tweak if you want different spacing)
    return (
    <section className="flip-wrap">
      <motion.div
  className={`flip-scene `}
  initial={false}
  transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
  aria-live="polite"
>

        {/* FRONT */}
<article className="flip-face flip-front" >
  <div className="front-grid simple">
    {/* Avatar (left) */}
    <div className="avatar">
  <img className="avatar-img img-dark" src={profileImage /* dark */} alt="Portrait" />
  <img className="avatar-img img-light" src={profileLight /* light */} alt="Portrait" />
</div>

    {/* Centered title + statement */}
    <div className="right-content">
    <div className="front-center">
      <h2 className="title-cyan about-title">About Me</h2>
      <p className="statement">
        Creative and adaptable web developer with a strong academic foundation in
        Computer Science (MSci, Loughborough University) and practical experience
        across the full stack. Proven ability to build responsive websites,
        develop backend logic, and manage accessibility and content workflows.
        Proficient in HTML5, CSS/SCSS, JavaScript (including modern frameworks),
        PHP, Node.js, and MySQL. Previously contributed to public-facing
        microsites and internal systems at Leicestershire County Council and
        actively participated in building user-centred applications through
        university-led projects, and looking to bring collaborative
        problem-solving, innovation, and continuous improvement to a
        forward-thinking development team
      </p>
    </div>

      </div>
  </div>
</article>

        </motion.div>
    </section>
  );
}
