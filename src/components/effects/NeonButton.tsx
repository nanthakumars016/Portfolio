import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
  size?: "sm" | "md" | "lg";
}

export function NeonButton({
  children,
  onClick,
  className = "",
  glowColor = "hsl(var(--primary))",
  size = "md",
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative group overflow-hidden rounded-xl font-medium ${sizeClasses[size]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg, ${glowColor}, hsl(var(--accent)), hsl(var(--primary)), ${glowColor})`,
          padding: "2px",
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, hsl(var(--accent)))`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner background */}
      <div className="absolute inset-[2px] rounded-[10px] bg-background/90 backdrop-blur-sm" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{
          animation: isHovered ? "shimmer 2s linear infinite" : "none",
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </motion.button>
  );
}

export default NeonButton;
