import React from "react";
import "./Skills.css";
import { skillsArr } from "../../utils/constants";
import themepattern from "../../assets/theme_pattern.svg";

function Skills() {
  return (
    <div id="skills" className="Skills">
      <div className="skills-title" data-aos="flip-right">
        <h1>Skills</h1>
        <img src={themepattern} alt="theme-img" />
      </div>
      <div className="skills-content">
        {skillsArr.map((icon, i) => {
          return (
            <div className="skills" data-aos="flip-down" key={i}>
              <img
                src={icon.imgurl}
                alt="skill icon"
                key={i}
                className="skill-icon-img"
              />
              <div className="skill-icon-name">{icon.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
