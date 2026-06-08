import React from "react";
import { cn } from "@/lib/utils";

interface CardCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export function CardCanvas({ children, className = "" }: CardCanvasProps) {
  return (
    <div className={cn("card-canvas", className)}>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
      </svg>
      <div className="card-backdrop" />
      {children}
    </div>
  );
}

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  return (
    <div className={cn("glow-card", className)}>
      <div className="border-element border-left" />
      <div className="border-element border-right" />
      <div className="border-element border-top" />
      <div className="border-element border-bottom" />
      <div className="card-content">{children}</div>
    </div>
  );
}
