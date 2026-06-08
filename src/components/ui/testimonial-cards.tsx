import * as React from "react";
import { motion, PanInfo } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardPosition = "front" | "middle" | "back";

export interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: CardPosition;
  id: number;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
  role,
  avatar,
  rating = 5,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (dragRef.current - info.offset.x > 150) {
      handleShuffle();
    }
    dragRef.current = 0;
  };

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={isFront ? "x" : false}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_, info) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={handleDragEnd}
      transition={{ duration: 0.35 }}
      className={cn(
        "absolute left-0 top-0 grid h-[420px] w-[320px] md:w-[350px] select-none place-content-center space-y-5 rounded-2xl border-2 border-border bg-card/80 p-6 shadow-xl backdrop-blur-md",
        isFront && "cursor-grab active:cursor-grabbing"
      )}
    >
      <img
        src={
          avatar ??
          `https://images.unsplash.com/photo-${1507003211169 + id}?w=128&h=128&fit=crop&crop=face`
        }
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-24 w-24 rounded-full border-2 border-primary/30 object-cover"
      />

      <div className="flex justify-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <span className="text-center text-base italic text-muted-foreground leading-relaxed">
        &ldquo;{testimonial}&rdquo;
      </span>

      <div className="text-center">
        <span className="block text-sm font-semibold text-foreground">{author}</span>
        {role && (
          <span className="block text-xs text-primary mt-1">{role}</span>
        )}
      </div>

      {isFront && (
        <p className="text-center text-[10px] text-muted-foreground/70">
          Swipe left for next review
        </p>
      )}
    </motion.div>
  );
}
