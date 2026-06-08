import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export function GradientText({
  children,
  className = "",
  colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#3B82F6"],
  animationSpeed = 3,
  showBorder = false,
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const gradientStops = colors.join(", ");
    
    gsap.to(textRef.current, {
      backgroundPosition: "200% center",
      duration: animationSpeed,
      repeat: -1,
      ease: "none",
    });
  }, [colors, animationSpeed]);

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
}

export default GradientText;
