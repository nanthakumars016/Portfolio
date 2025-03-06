import React from "react";
import "./About.css";
import themepattern from "../../assets/theme_pattern.svg";
import aboutImg from "../../assets/about.png";

export const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title" data-aos="flip-left">
        <h1>About Me</h1>
        <img src={themepattern} alt="theme-img" />
      </div>
      <div className="about-section">
        <div className="about-left">
          <img src={aboutImg} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p data-aos="fade-right">
              🟡 I am a passionate and enthusiastic
              <span> Full Stack Web Developer </span>
              with a strong foundation in both front-end and back-end
              technologies. I have a keen interest in building dynamic and
              responsive web applications that solve real-world problems. As a
              recent graduate with hands-on experience in web development
              projects, I am eager to apply my knowledge and grow in the field
              of software development.
            </p>
            <p data-aos="fade-left">
              🟡 I am proficient in technologies such as{" "}
              <span>
                {" "}
                HTML, CSS, Bootstrap, Javascript, React.js, Node.js, Express.js
                and MongoDB,
              </span>
              and I enjoy creating seamless user experiences through efficient
              and scalable code. My journey into web development has equipped me
              with a strong problem-solving mindset and a dedication to
              continuously improving my skills.
            </p>
            <p data-aos="fade-right">
              🟡 I am excited to start my professional journey in full-stack
              development and look forward to opportunities where I can apply my
              skills, learn from experienced professionals, and grow as a
              developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
