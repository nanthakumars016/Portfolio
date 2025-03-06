import React, { useState } from "react";
import "./Navbar.css";
import underline from "../../assets/nav_underline.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  return (
    <div className="Navbar" data-aos="fade-down">
      <a href="#">
        <h1>Nanthakumar</h1>
      </a>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Menu */}
      <ul className={menuOpen ? "nav-menu open" : "nav-menu"}>
        {[
          "home",
          "about",
          "experience",
          "education",
          "services",
          "skills",
          "projects",
          "contact",
        ].map((item) => (
          <li key={item}>
            <AnchorLink
              className="anchor-link"
              offset={50}
              href={`#${item}`}
              onClick={() => {
                setMenu(item);
                setMenuOpen(false); // Close menu on click (for mobile)
              }}
            >
              <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
            </AnchorLink>
            {menu === item ? <img src={underline} alt="underline" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
