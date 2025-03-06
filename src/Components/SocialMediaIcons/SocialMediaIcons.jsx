import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaWhatsapp,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import "./SocialMediaIcons.css";

export const SocialMediaIcons = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArrow, setShowArrow] = useState(false); // Initially hidden

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);

      if (!mobileView) {
        setShowArrow(false);
        setIsExpanded(true); // Always show icons on larger screens
      } else {
        setShowArrow(false);
        setIsExpanded(false); // Reset on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`social-container ${isExpanded ? "expanded" : ""}`}
      onClick={() => !showArrow && setShowArrow(true)} // Show arrow on first click
    >
      {/* Arrow button (appears only after clicking the left side) */}
      {showArrow && (
        <button
          className="toggle-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent hiding on click
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <FaTimes /> : <FaChevronRight />}
        </button>
      )}

      {/* Show WhatsApp & LinkedIn only when expanded */}
      <div className={`icon-wrapper ${isExpanded ? "visible" : ""}`}>
        <a
          href="https://wa.me/918680852478" // Replace with your WhatsApp number
          className="social-icon whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://www.linkedin.com/in/nanthakumar" // Replace with your LinkedIn URL
          className="social-icon linkedin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};
