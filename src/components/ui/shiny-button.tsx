import type React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({
  children,
  className = "",
  type = "button",
  ...props
}: ShinyButtonProps) {
  return (
    <button type={type} className={cn("shiny-cta", className)} {...props}>
      <span>{children}</span>
    </button>
  );
}
