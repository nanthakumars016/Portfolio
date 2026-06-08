import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Virtua Portal — Business App Marketplace",
    description: "A multi-tenant SaaS marketplace (Google Play Store style) where businesses register and subscribe to web apps (Billing, CRM, HR, Inventory tools) from one console.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tech: ["React.js", "Nuxt.js", "Node.js", "MySQL"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "RX Square — POS Billing, CRM & E-Commerce",
    description: "A comprehensive, high-transaction SaaS platform. Features real-time invoicing, inventory tracking, multi-branch support, segmentation, and automated reminders.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tech: ["React.js", "Node.js", "MySQL", "REST APIs"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "MERN E-Commerce Application",
    description: "A modern full-stack e-commerce system featuring a complete product catalog, shopping cart management, user accounts, and checkout flow.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

export function FeaturedProjects() {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and the solutions I've built for clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      <a
                        href={project.liveUrl}
                        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="View live project"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background hover:scale-110 transition-transform"
                        aria-label="View GitHub repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="gradient-bg glow group">
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
