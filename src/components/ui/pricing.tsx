import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Fair Pricing",
  description = "Choose the perfect plan for your project.\nAll plans include quality code, responsive design, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: [
          "hsl(263 84% 58%)",
          "hsl(239 76% 59%)",
          "hsl(263 66% 35%)",
          "hsl(215 20% 65%)",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="py-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
        <p className="text-muted-foreground text-lg whitespace-pre-line max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="flex justify-center items-center mb-10 gap-3">
        <span className={cn("text-sm font-medium", isMonthly && "text-foreground")}>
          Project pricing
        </span>
        <Label htmlFor="billing-toggle" className="cursor-pointer">
          <Switch
            id="billing-toggle"
            ref={switchRef}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
          />
        </Label>
        <span className="text-sm font-semibold">
          Annual retainer{" "}
          <span className="text-primary">(Save 20%)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.2,
            }}
            className={cn(
              "rounded-2xl border p-6 bg-background text-center lg:flex lg:flex-col lg:justify-center relative flex flex-col",
              plan.isPopular ? "border-primary border-2 shadow-[0_0_40px_rgba(124,58,237,0.15)]" : "border-border",
              !plan.isPopular && "md:mt-5",
              index === 0 || index === 2 ? "z-0 md:-translate-z-[50px]" : "z-10",
              index === 0 && "md:origin-right",
              index === 2 && "md:origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
                {plan.name}
              </p>

              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-foreground tabular-nums">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "decimal",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    prefix="₹"
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                  />
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  / {plan.period}
                </span>
              </div>

              <p className="text-xs leading-5 text-muted-foreground mt-1">
                {isMonthly ? "one-time project" : "annual support plan"}
              </p>

              <ul className="mt-5 gap-2 flex flex-col text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-left text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-4 border-border" />

              <Link
                to={plan.href}
                className={cn(
                  buttonVariants({ variant: plan.isPopular ? "default" : "outline", size: "lg" }),
                  "group relative w-full gap-2 overflow-hidden font-semibold tracking-tight transition-all duration-300",
                  plan.isPopular
                    ? "bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                    : "hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:ring-offset-background"
                )}
              >
                {plan.buttonText}
              </Link>

              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
