import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Heart, Code2, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { About3DVisual } from "@/components/effects/Interactive3DShapes";

const highlights = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick turnaround without compromising quality"
  },
  {
    icon: Target,
    title: "Result Focused",
    description: "Building solutions that drive real business value"
  },
  {
    icon: Heart,
    title: "Passionate",
    description: "Genuinely love what I do and it shows in my work"
  }
];

const techStack = [
  { icon: Code2, label: "React.js" },
  { icon: Layers, label: "Nuxt.js" },
  { icon: Database, label: "Node.js" },
];

export function AboutPreview() {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Interactive 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center w-full max-w-md mx-auto"
          >
            <About3DVisual />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 border border-accent/20">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Building Digital <br />
              <span className="gradient-text">Experiences</span> That Matter
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm a passionate Full-Stack Developer and Team Lead with 2+ years of experience crafting 
              scalable, functional web applications and SaaS platforms. Currently serving as Team Lead at Virtua Portal, 
              I specialize in architecting multi-tenant platforms, POS billing, and custom CRM systems.
            </p>

            <div className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 group-hover:shadow-glow transition-all duration-300">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button asChild size="lg" variant="glass" className="group">
              <Link to="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}