import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";

const contactInfo = [
  { icon: Mail, label: "Email", value: "nanthakumar.s016@gmail.com", href: "mailto:nanthakumar.s016@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 86808 52478", href: "tel:+918680852478" },
  { icon: MapPin, label: "Location", value: "Salem, Tamil Nadu, India", href: "#" },
];

export default function Contact() {
  const whatsappUrl = "https://wa.me/918680852478?text=Hi%20Nanthakumar,%20I%20want%20to%20discuss%20a%20project";

  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Nanthakumar S for web development projects. Available for Full-Stack, SaaS platforms, and contract work in Salem, Tamil Nadu, India."
        keywords="Contact Nanthakumar S, Hire Web Developer, Full-Stack Developer Salem, SaaS Product Engineer India"
        url="https://nanthakumar.dev/contact"
      />
      <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-40 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 relative">
          <ScrollAnimation animation="fadeUp" className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project or opportunity in mind? Let's connect and build something impactful.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ScrollAnimation animation="fadeLeft" delay={0.2}>
              <div className="space-y-8">
                {/* Contact Info Card */}
                <div className="p-8 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-accent shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                          <info.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="font-medium group-hover:text-primary transition-colors">{info.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Button */}
                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] rounded-xl"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-white/10 h-64 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <iframe
                    src="https://maps.google.com/maps?q=Salem,%20Tamil%20Nadu,%20India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeRight" delay={0.3}>
              <div className="p-8 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}