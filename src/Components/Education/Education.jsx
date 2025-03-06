import React from "react";
import "./Education.css";
import themepattern from "../../assets/theme_pattern.svg";
import educationImg from "../../assets/education.png";

export const Education = () => {
  return (
    <div id="education" className="education">
      <div className="Education-title" data-aos="flip-right">
        <h1>Education</h1>
        <img src={themepattern} alt="theme-img" />
      </div>
      <div className="education-section">
        {/* <div className="education-img">
          <img src={educationImg} alt="" />
        </div> */}

        <div className="education-list" data-aos="fade-right">
          <div className="education-left">
            <h2>Bachelor of Science (Computer Science)</h2>
            <p>Vysysa College</p>
          </div>
          <div className="education-right">
            <p>2019-2022</p>
            <p>Salem, TN</p>
          </div>
        </div>
        <div className="education-list" data-aos="fade-left">
          <div className="education-left">
            <h2>HSLC (12th)</h2>
            <p>Government Higher Secondary School</p>
          </div>
          <div className="education-right">
            <p>2018-2019</p>
            <p>Salem, TN</p>
          </div>
        </div>
        <div className="education-list" data-aos="fade-right">
          <div className="education-left">
            <h2>SSLC (10th)</h2>
            <p>Government Higher Secondary School</p>
          </div>
          <div className="education-right">
            <p>2016-2017</p>
            <p>Salem, TN</p>
          </div>
        </div>
      </div>
    </div>
  );
};
