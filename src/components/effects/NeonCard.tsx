import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

export function NeonCard({
  children,
  className = "",
  glowColor = "hsl(var(--primary))",
  borderRadius = "1rem",
}: NeonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        borderRadius,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 50%)`,
          filter: "blur(20px)",
          transform: "translateZ(-10px)",
        }}
      />
      
      {/* Rotating neon border */}
      <div
        className="absolute inset-[-2px] rounded-[inherit] opacity-60"
        style={{
          background: `conic-gradient(from 0deg, ${glowColor}, hsl(var(--accent)), ${glowColor})`,
          animation: "spin 4s linear infinite",
        }}
      />
      
      {/* Inner content with glass effect */}
      <div
        className="relative bg-card/90 backdrop-blur-xl m-[2px] rounded-[inherit] h-[calc(100%-4px)]"
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default NeonCard;
