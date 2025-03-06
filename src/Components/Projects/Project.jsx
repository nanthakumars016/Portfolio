import React from "react";
import "./Project.css";
import themepattern from "../../assets/theme_pattern.svg";
import ecommerce from "../../assets/E-Commerce.png";

export const Project = () => {
  const projects = [
    {
      title: "E-Commerce",
      description:
        "I developed a responsive E-commerce website using React for the front-end and Node.js, Express.js for the back-end, ensuring a seamless user experience.",
      technologies:
        "HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB",
      image: ecommerce,
    },
    {
      title: "Portfolio Website",
      description:
        "Designed and developed a personal portfolio website to showcase my projects and skills.",
      technologies: "React.js, CSS, JavaScript",
      image: ecommerce,
    },
    {
      title: "Blog Website",
      description:
        "Developed a dynamic blog website with user authentication and article management.",
      technologies: "React.js, Node.js, Express.js, MongoDB",
      image: ecommerce,
    },
  ];

  return (
    <div id="projects" className="projects">
      <div className="project-title" data-aos="flip-right">
        <h1>Projects</h1>
        <img src={themepattern} alt="theme-img" />
      </div>
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-card" key={index} data-aos="flip-left">
            <img
              src={project.image}
              alt={project.title}
              className="project-img"
            />
            <div className="project-details">
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <h3>Technologies used</h3>
              <p>{project.technologies}</p>
              <button className="view-btn">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
