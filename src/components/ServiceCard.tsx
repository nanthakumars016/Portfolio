import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export function ServiceCard({ title, description, icon: Icon, features }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(124,58,237,0.3)] overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Rotating glow effect */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse" />
      
      {/* Bottom glow */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative space-y-4">
        {/* Icon with glass effect */}
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_rgba(124,58,237,0.4)]">
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 pt-4">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}