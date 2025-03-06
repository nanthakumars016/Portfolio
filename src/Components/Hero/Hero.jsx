import React from "react";
import "./Hero.css";
import myImg from "../../assets/myImg.jpg";
import resume from "../../assets/Nanthakumar(FSD).pdf";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Typewriter } from "react-simple-typewriter";

export const Hero = () => {
  return (
    <div id="home" className="hero" data-aos="fade-up">
      <img src={myImg} alt="MyImg" />
      <h1>
        <span>I'm Nanthakumar,</span>{" "}
        <span className="typewriter">
          <Typewriter
            words={[
              "Full Stack Developer",
              "Web Developer",
              "Software Developer",
            ]}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      <p>
        A Passionate Full Stack Web Developer, Crafting Engaging and Intuitive
        User Experiences for Web Applications and Websites.
      </p>
      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            Connect with me
          </AnchorLink>
        </div>
        <div className="hero-resume">
          <a href={resume} download>
            My Resume
          </a>
        </div>
      </div>
    </div>
  );
};
