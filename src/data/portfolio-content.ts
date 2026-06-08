import type { PricingPlan } from "@/components/ui/pricing";

export const portfolioPricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "15000",
    yearlyPrice: "12000",
    period: "project",
    features: [
      "Single page responsive website",
      "Mobile-friendly design",
      "Basic SEO optimization",
      "Contact form integration",
      "Social media links",
      "1 month support",
      "Delivery in 5-7 days",
    ],
    description: "Perfect for small businesses & startups",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: false,
  },
  {
    name: "Professional",
    price: "35000",
    yearlyPrice: "28000",
    period: "project",
    features: [
      "Multi-page website (up to 5 pages)",
      "Custom UI/UX design",
      "Advanced SEO optimization",
      "Blog integration",
      "Admin dashboard",
      "Payment gateway integration",
      "3 months support",
      "Delivery in 10-14 days",
    ],
    description: "Ideal for growing businesses",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "75000",
    yearlyPrice: "60000",
    period: "project",
    features: [
      "Full-stack web application",
      "Unlimited pages",
      "Custom features & integrations",
      "E-commerce functionality",
      "Real-time features",
      "API development",
      "Database design & optimization",
      "6 months support",
      "Priority delivery",
    ],
    description: "For large scale applications",
    buttonText: "Contact Me",
    href: "/contact",
    isPopular: false,
  },
];

export const shuffleTestimonials = [
  {
    id: 1,
    testimonial:
      "Nanthakumar delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the project a huge success.",
    author: "Rajesh Kumar",
    role: "CEO, TechStart India",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    testimonial:
      "Working with Nanthakumar was a pleasure. He understood our requirements perfectly and built a robust healthcare portal that our patients love.",
    author: "Priya Sharma",
    role: "Founder, HealthFirst",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    testimonial:
      "The POS system Nanthakumar built has transformed our restaurant operations. It's intuitive, fast, and exactly what we needed.",
    author: "Anitha Rajan",
    role: "Owner, Spice Garden Restaurant",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face",
    rating: 5,
  },
];
