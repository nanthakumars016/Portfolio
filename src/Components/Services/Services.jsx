import React from "react";
import "./Services.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import { motion } from "framer-motion";

export const Services = () => {
  return (
    <div id="services" className="services">
      <div className="services-title" data-aos="flip-right">
        <h1>Services</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="services-section">
        <motion.div
          className="service"
          whileHover={{ scale: 1.1 }}
          data-aos="fade-right"
        >
          <h2>Frontend Development</h2>
          <p>Building modern, interactive, and responsive web applications.</p>
        </motion.div>
        <motion.div
          className="service"
          whileHover={{ scale: 1.1 }}
          data-aos="fade-left"
        >
          <h2>Backend Development</h2>
          <p>
            Creating secure, scalable, and high-performance server-side
            applications.
          </p>
        </motion.div>
        <motion.div
          className="service"
          whileHover={{ scale: 1.1 }}
          data-aos="fade-right"
        >
          <h2>Database Management</h2>
          <p>
            Optimizing data storage, security, and retrieval with MySQL &
            MongoDB.
          </p>
        </motion.div>
        <motion.div
          className="service"
          whileHover={{ scale: 1.1 }}
          data-aos="fade-left"
        >
          <h2>Cloud Deployment</h2>
          <p>
            Deploying applications with AWS, Azure, and Docker for seamless
            scalability.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
