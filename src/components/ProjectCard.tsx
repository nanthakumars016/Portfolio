import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  techStack,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.3)] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {liveUrl && (
            <Button
              size="sm"
              variant="glass"
              onClick={() => window.open(liveUrl, "_blank")}
              className="shadow-[0_0_20px_rgba(124,58,237,0.4)]"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live
            </Button>
          )}
          {githubUrl && (
            <Button
              size="sm"
              variant="glass"
              onClick={() => window.open(githubUrl, "_blank")}
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 relative">
        {/* Glow effect on hover */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 relative">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 relative">
          {description}
        </p>

        {/* Tech Stack with glass effect */}
        <div className="flex flex-wrap gap-2 relative">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-foreground/80 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}