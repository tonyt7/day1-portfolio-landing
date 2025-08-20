import React, { useEffect, useState } from "react"; // ⬅️ add useEffect
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faUser, faBriefcase, faEnvelope,
  faBars, faXmark, faSun, faMoon            // ⬅️ add faMoon
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleMenu = () => setOpen(v => !v);
  const closeMenu  = () => setOpen(false);
  const toggleTheme = () => setIsDark(v => !v);

  return (
    <>
      <a className="skip-link" href="#intro">Skip to content</a>

      <motion.header
        className="navbar"
        role="navigation"
        aria-label="Main"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="navbar__inner">
          <div className="brand" title="Home">Tony Tomy</div>

          <button
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>

          <ul id="primary-menu" className={`menu ${open ? "menu--open" : ""}`}>
            <li><a href="#intro" onClick={closeMenu} aria-label="Home"><FontAwesomeIcon icon={faHome} /><span>Home</span></a></li>
            <li><a href="#about" onClick={closeMenu} aria-label="About"><FontAwesomeIcon icon={faUser} /><span>About</span></a></li>
            <li><a href="#projects" onClick={closeMenu} aria-label="Projects"><FontAwesomeIcon icon={faBriefcase} /><span>Projects</span></a></li>
            <li><a href="#contact" onClick={closeMenu} aria-label="Contact"><FontAwesomeIcon icon={faEnvelope} /><span>Contact</span></a></li>
            <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-pressed={isDark}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
                <span className="sr-only">{isDark ? "Light theme" : "Dark theme"}</span>
              </button>
            </li>
          </ul>
        </div>
      </motion.header>
      <div
  className={`menu-backdrop ${open ? "open" : ""}`}
  onClick={closeMenu}
  aria-hidden="true"
/>
    </>
  );
};

export default Navbar;
