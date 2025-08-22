import { motion } from "framer-motion";
import "../components/AboutMe.css";
import profileImage from "../assets/Aboutme.png"; // your illustration
import profileLight from "../assets/Aboutme-light.png";


export default function AboutFlipCard() {
  // even distribution along the curve (tweak if you want different spacing)
    return (
    <section className="flip-wrap" id="about">
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
        Hi, I’m a creative and adaptable web developer with a strong academic foundation in Computer Science (MSci, Loughborough University). Over the years, I’ve worked across the full stack — from building responsive websites to developing backend logic and streamlining accessibility and content workflows.

I enjoy working with HTML5, CSS/SCSS, JavaScript (and modern frameworks), PHP, Node.js, and MySQL, and I’ve had hands-on experience with both public-facing microsites and internal systems during my time at Leicestershire County Council. Alongside that, I’ve collaborated on user-centred applications through university projects, where teamwork and problem-solving were key.

I’m now looking to bring that same mix of collaboration, innovation, and continuous improvement to a forward-thinking development team.
      </p>
    </div>

      </div>
  </div>
</article>

        </motion.div>
    </section>
  );
}
