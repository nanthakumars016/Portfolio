import { motion } from "framer-motion";
import { Code2, Database, Layout, GitBranch, Server, Palette, FileCode, Terminal } from "lucide-react";

const technologies = [
  { icon: Code2, name: "React", color: "text-cyan-400" },
  { icon: FileCode, name: "Next.js", color: "text-foreground" },
  { icon: Server, name: "Node.js", color: "text-green-500" },
  { icon: Terminal, name: "TypeScript", color: "text-blue-500" },
  { icon: Database, name: "MongoDB", color: "text-green-400" },
  { icon: Database, name: "MySQL", color: "text-orange-400" },
  { icon: Palette, name: "Tailwind", color: "text-cyan-500" },
  { icon: GitBranch, name: "Git", color: "text-orange-500" },
];

export function TechStack() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-border/50">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-8"
        >
          Technologies I work with
        </motion.p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-card flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-colors">
                <tech.icon className={`h-8 w-8 ${tech.color}`} />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
