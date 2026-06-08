import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  level: number;
  color?: string;
}

export function SkillCard({ name, icon: Icon, level, color }: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col items-center text-center space-y-3">
        <div
          className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300"
          style={{ color: color || "hsl(var(--primary))" }}
        >
          <Icon className="h-8 w-8" />
        </div>

        <h3 className="font-semibold text-foreground">{name}</h3>

        {/* Skill level bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full gradient-bg rounded-full"
          />
        </div>

        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
    </motion.div>
  );
}