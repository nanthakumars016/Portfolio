import { motion } from "framer-motion";
import { Sparkles, Code2, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GradientText } from "@/components/effects/GradientText";
import { NeonButton } from "@/components/effects/NeonButton";
import { Hero3DVisual } from "@/components/effects/Interactive3DShapes";
import { FloatingIcons } from "@/components/FloatingIcons";
import { ShinyButton } from "@/components/ui/shiny-button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <FloatingIcons />
      
      <div className="container relative z-10 px-4 lg:px-8 pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
          {/* Left side - Content with more spacing */}
          <div className="text-center lg:text-left max-w-2xl lg:pl-4 xl:pl-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Available for Freelance Projects</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-foreground mb-2">Hi, I'm</span>
                <GradientText 
                  className="py-2 text-5xl md:text-7xl lg:text-8xl font-bold"
                  colors={["#7C3AED", "#8B5CF6", "#A78BFA", "#8B5CF6", "#7C3AED"]}
                  animationSpeed={4}
                >
                  Nanthakumar S
                </GradientText>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">Full-Stack Developer</span>
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent/20">
                <Rocket className="h-4 w-4 text-accent" />
                <span className="text-foreground font-medium">Team Lead</span>
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">SaaS Product Engineer</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl leading-relaxed"
            >
              Specializing in building scalable web apps, POS systems, CRM platforms, and multi-tenant SaaS marketplaces.
              <br className="hidden sm:block" />
              Crafting modern web experiences with{" "}
              <span className="text-primary font-semibold">React.js</span>,{" "}
              <span className="text-accent font-semibold">Nuxt.js</span> &{" "}
              <span className="text-primary font-semibold">Node.js</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <ShinyButton onClick={() => navigate("/contact")}>
                <Rocket className="h-5 w-5" />
                Hire Me
              </ShinyButton>
              <Link to="/projects">
                <NeonButton size="lg" glowColor="hsl(var(--accent))" className="w-full sm:w-auto">
                  View My Work
                </NeonButton>
              </Link>
            </motion.div>
          </div>

          {/* Right side - Interactive 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:block w-full max-w-[550px]"
          >
            <Hero3DVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
