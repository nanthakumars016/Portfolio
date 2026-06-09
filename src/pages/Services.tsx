import { Globe, ShoppingCart, Receipt, CreditCard, Plug, Search } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceCard } from "@/components/ServiceCard";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";

const services = [
  { title: "Custom Websites", description: "Beautiful, responsive websites tailored to your brand and business needs.", icon: Globe, features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"] },
  { title: "E-commerce", description: "Full-featured online stores with secure payments and inventory management.", icon: ShoppingCart, features: ["Product Management", "Payment Integration", "Order Tracking", "Analytics Dashboard"] },
  { title: "Billing & POS", description: "Streamlined billing systems for retail and service businesses.", icon: Receipt, features: ["Invoice Generation", "Inventory Tracking", "Sales Reports", "Multi-user Access"] },
  { title: "Subscription Systems", description: "Recurring payment solutions with Razorpay integration.", icon: CreditCard, features: ["Razorpay Integration", "Plan Management", "Auto-billing", "Usage Tracking"] },
  { title: "API Integrations", description: "Connect your applications with third-party services seamlessly.", icon: Plug, features: ["REST APIs", "Third-party Services", "Data Sync", "Webhooks"] },
  { title: "SEO Websites", description: "Search engine optimized websites that rank higher on Google.", icon: Search, features: ["Technical SEO", "Content Strategy", "Performance Audit", "Analytics Setup"] },
];

export default function Services() {
  return (
    <PageTransition>
      <SEO
        title="Services"
        description="Professional web development services including custom websites, e-commerce solutions, billing systems, subscription platforms, API integrations, and SEO optimization."
        keywords="Web Development Services, Custom Websites, E-commerce, POS Systems, API Integration, SEO Services, Chennai"
        url="https://nanthakumar.vercel.app/services"
      />
      <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container px-4 relative">
          <ScrollAnimation animation="fadeUp" className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive web development solutions to help your business grow online.
            </p>
          </ScrollAnimation>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
    </PageTransition>
  );
}