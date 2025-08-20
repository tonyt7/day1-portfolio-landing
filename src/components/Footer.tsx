import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../components/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <h2 className="footer-name">Tony Tomy</h2>
      <p className="footer-caption">Building creative & accessible web experiences</p>

      <div className="footer-links">
        <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://linkedin.com/in/yourlinkedin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="mailto:your@email.com" aria-label="Email">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>

      <p className="footer-year">© {new Date().getFullYear()} All rights reserved</p>
    </footer>
  );
};

export default Footer;
