import { useState, useEffect } from 'react';
import { SplashCursor } from "@/components/effects/SplashCursor";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { CTASection } from "@/components/home/CTASection";
import { TechStack } from "@/components/home/TechStack";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";

export default function Home() {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  return (
    <PageTransition>
      <SEO
        title="Nanthakumar S | Full-Stack Developer & Team Lead"
        description="Nanthakumar S is a Full-Stack Developer, Team Lead and SaaS Product Engineer specializing in React.js, Nuxt.js, Node.js, and MySQL. Developer of POS, CRM, and multi-tenant SaaS platforms."
        keywords="Full-Stack Developer, Team Lead, SaaS Product Engineer, React.js, Nuxt.js, Node.js, MySQL, POS, CRM, E-Commerce, Salem, Tamil Nadu, India"
        url="https://nanthakumar.dev"
      />
      <main className="relative bg-background">
        {/* Splash Cursor Effect */}
        {/* {isMounted && <SplashCursor />} */}
        
        {/* Hero Background - Fixed for light mode */}
        <div className="absolute inset-0 h-screen overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20 dark:from-primary/10 dark:via-background dark:to-accent/10" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 dark:bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/30 dark:bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Bottom fade to content */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Tech Stack with Glass Icons */}
        <TechStack />

        {/* About Preview */}
        <AboutPreview />

        {/* Services Preview */}
        <ServicesPreview />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Testimonials Preview */}
        {/* <TestimonialsPreview /> */}

        {/* CTA Section */}
        <CTASection />
      </main>
    </PageTransition>
  );
}