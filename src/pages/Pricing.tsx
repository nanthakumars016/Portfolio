import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { Pricing } from "@/components/ui/pricing";
import { motion } from "framer-motion";
import { portfolioPricingPlans } from "@/data/portfolio-content";

const addons = [
  { name: "Logo Design", price: "₹5,000" },
  { name: "Content Writing", price: "₹3,000/page" },
  { name: "Monthly Maintenance", price: "₹2,500/month" },
  { name: "SSL Certificate", price: "₹1,500/year" },
  { name: "Domain Registration", price: "₹800/year" },
  { name: "Hosting Setup", price: "₹2,000" },
];

export default function PricingPage() {
  return (
    <PageTransition>
      <SEO
        title="Pricing"
        description="Affordable web development pricing packages for startups, businesses, and enterprises. Get custom websites, e-commerce solutions, and full-stack applications."
        keywords="Web development pricing, website cost India, freelance developer rates, React developer pricing, custom website packages"
        url="https://nanthakumar.vercel.app/pricing"
      />

      <main className="min-h-screen pt-24 pb-20 relative bg-background w-full overflow-x-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollAnimation animation="fadeUp" className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Transparent Pricing
            </span>
          </ScrollAnimation>

          <Pricing
            plans={portfolioPricingPlans}
            title="Simple, Fair Pricing"
            description={
              "Choose the perfect plan for your project.\nAll plans include quality code, responsive design, and dedicated support."
            }
          />

          <ScrollAnimation animation="fadeUp" className="max-w-4xl mx-auto mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Add-on Services
                </span>
              </h2>
              <p className="text-muted-foreground">
                Enhance your project with these additional services
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {addons.map((addon, index) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300 text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {addon.name}
                  </h3>
                  <p className="text-primary font-bold">{addon.price}</p>
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" className="mt-20 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Need a custom solution? Let&apos;s talk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollAnimation>
        </div>
      </main>
    </PageTransition>
  );
}
