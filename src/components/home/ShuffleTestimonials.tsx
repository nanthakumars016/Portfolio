import { useState } from "react";
import {
  TestimonialCard,
  type CardPosition,
} from "@/components/ui/testimonial-cards";

export interface ShuffleTestimonial {
  id: number;
  testimonial: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

interface ShuffleTestimonialsProps {
  testimonials: ShuffleTestimonial[];
  className?: string;
}

export function ShuffleTestimonials({
  testimonials,
  className = "",
}: ShuffleTestimonialsProps) {
  const [positions, setPositions] = useState<CardPosition[]>(
    testimonials.slice(0, 3).map((_, i) =>
      i === 0 ? "front" : i === 1 ? "middle" : "back"
    )
  );

  const visible = testimonials.slice(0, 3);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  };

  return (
    <div className={`grid place-content-center py-8 ${className}`}>
      <div className="relative -ml-[80px] h-[420px] w-[320px] md:-ml-[120px] md:w-[350px]">
        {visible.map((item, index) => (
          <TestimonialCard
            key={item.id}
            {...item}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
}
