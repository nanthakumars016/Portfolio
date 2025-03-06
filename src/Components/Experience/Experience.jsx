import React from "react";
import "./Experience.css";
import themepattern from "../../assets/theme_pattern.svg";

export const Experience = () => {
  return (
    <div id="experience" className="experience">
      <div className="experience-title" data-aos="flip-right">
        <h1>Experience</h1>
        <img src={themepattern} alt="theme-img" />
      </div>
      <div className="experience-section">
        <div className="experience-list" data-aos="fade-left">
          <div className="experience-left">
            <h2>Full Stack Developer</h2>
            <p>RX Square</p>
          </div>
          <div className="experience-right">
            <p>2024 - Present</p>
            <p>Salem, TN</p>
          </div>
        </div>
        <div className="experience-list" data-aos="fade-right">
          <div className="experience-left">
            <h2>Java Full Stack Developer (Internship)</h2>
            <p>Izeon Innovative Pvt Ltd</p>
          </div>
          <div className="experience-right">
            <p>6 months</p>
            <p>Chennai, TN</p>
          </div>
        </div>
      </div>
    </div>
  );
};
