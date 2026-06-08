import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, ShoppingCart, CreditCard, RefreshCw, Code, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    description: "Modern, responsive websites tailored to your brand",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Full-featured online stores that drive sales",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: CreditCard,
    title: "Billing & POS",
    description: "Streamlined payment and point-of-sale systems",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: RefreshCw,
    title: "Subscriptions",
    description: "Recurring payment systems with Razorpay",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Code,
    title: "API Integration",
    description: "Connect your systems seamlessly",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Search,
    title: "SEO Websites",
    description: "Search optimized sites that rank high",
    gradient: "from-pink-500 to-rose-500"
  }
];

export function ServicesPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Services That <span className="gradient-text">Transform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, I provide end-to-end solutions for your digital needs
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover:bg-card/90 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-5`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-foreground" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="group">
            <Link to="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
