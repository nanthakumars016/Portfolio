import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  id: number;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-start gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
              <div className="p-2 rounded-full gradient-bg shadow-lg">
                {item.type === "work" ? (
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <GraduationCap className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
            </div>

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
              }`}
            >
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full gradient-bg text-primary-foreground mb-3">
                  {item.period}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {item.organization}
                </p>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}