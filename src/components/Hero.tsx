import { useRef, useEffect } from "react";
import Typed from "typed.js";
import colorAvatar from "../assets/Avatarimage.png";
import bwAvatar from "../assets/AvatarimageWhite.png"
import "./Hero.css";

const Hero = () => {
  const typedEl = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current!, {
      strings: ["Frontend Developer", "React Enthusiast", "UI Engineer"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
  <div className="hero">
    <div className="hero-left">
      <p>Hello,</p>
      <h1>I'm Tony</h1>
      <h2><span ref={typedEl} className="typed-text" /></h2>
      <div className="hero-buttons">
        <button className="hero-button">Got a project?</button>
        <button className="hero-button">My Resume</button>
      </div>
    </div>

    <div className="hero-right">
      <div className="avatar-container">
      <img src={colorAvatar} alt="Tony Avatar" className="avatar dark-img" />
      <img src={bwAvatar} alt="Tony Avatar" className="avatar light-img" />
      </div>
    </div>
  </div>
);
};

export default Hero;
