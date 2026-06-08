import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
}

export function GlassButton({
  children,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
  href,
}: GlassButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-white/10 hover:bg-white/20 border-white/20",
    secondary: "bg-primary/20 hover:bg-primary/30 border-primary/30",
    ghost: "bg-transparent hover:bg-white/10 border-transparent hover:border-white/10",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative group overflow-hidden rounded-xl font-medium backdrop-blur-xl border transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Rotating gradient border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
          padding: "1px",
          filter: "blur(8px)",
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Inner glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.3), transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div
          className="absolute w-[200%] h-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            left: "-100%",
          }}
          animate={{
            left: isHovered ? "100%" : "-100%",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-foreground">
        {children}
      </span>
    </Component>
  );
}

export default GlassButton;