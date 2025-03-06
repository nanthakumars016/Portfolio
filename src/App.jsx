import React from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Hero } from "./Components/Hero/Hero";
import { About } from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import { Contact } from "./Components/Contact/Contact";
import { Footer } from "./Components/Footer/Footer";
import { Education } from "./Components/Education/Education";
import { Project } from "./Components/Projects/Project";
import { Services } from "./Components/Services/Services";
import { Experience } from "./Components/Experience/Experience";
import { ScrollToTop } from "./Components/Scroll/ScrollToTop";
import { SocialMediaIcons } from "./Components/SocialMediaIcons/SocialMediaIcons";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Services />
      <Education />
      <Skills />
      <Project />
      <Contact />
      <Footer />
      <ScrollToTop />
      <SocialMediaIcons />
    </div>
  );
}

export default App;
