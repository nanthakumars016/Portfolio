import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassIconProps {
  icon: ReactNode;
  label: string;
  color: string;
  className?: string;
}

export function GlassIcon({ icon, label, color, className = "" }: GlassIconProps) {
  return (
    <motion.div
      className={`group flex flex-col items-center gap-2 ${className}`}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div
        className="relative p-4 rounded-2xl backdrop-blur-xl border border-border/30 overflow-hidden cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}30 0%, transparent 70%)`,
          }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%", rotate: -45 }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            width: "50%",
          }}
        />

        {/* Icon */}
        <div
          className="relative z-10 text-3xl"
          style={{ color }}
        >
          {icon}
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-xl"
          style={{ background: color }}
        />
      </div>

      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

interface GlassIconsProps {
  items: Array<{
    icon: ReactNode;
    label: string;
    color: string;
  }>;
  className?: string;
}

export function GlassIcons({ items, className = "" }: GlassIconsProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {items.map((item, index) => (
        <GlassIcon
          key={index}
          icon={item.icon}
          label={item.label}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default GlassIcons;
