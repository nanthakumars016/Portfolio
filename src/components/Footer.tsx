import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, Instagram, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  { icon: Github, href: "https://github.com/nanthakumars016", label: "GitHub", color: "#333" },
  { icon: Linkedin, href: "https://linkedin.com/in/nanthakumars016", label: "LinkedIn", color: "#0077B5" },
  { icon: Mail, href: "mailto:nanthakumar.s016@gmail.com", label: "Email", color: "#EA4335" },
];

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  // { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Glass background */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-2xl" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-shimmer">
                Nanthakumar S
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Full-Stack Developer & Team Lead crafting modern web experiences with clean code
              and beautiful designs. Let's build something amazing together.
            </p>
            
            {/* Social Links with glow effects */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-muted-foreground hover:text-foreground transition-all duration-300 group overflow-hidden"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{ background: `radial-gradient(circle, ${social.color}40, transparent 70%)` }}
                  />
                  <social.icon className="h-5 w-5 relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-6 text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-6 text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:nanthakumar.s016@gmail.com"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  nanthakumar.s016@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="h-4 w-4" />
                +91 86808 52478
              </li>
              <li>📍 Salem, Tamil Nadu, India</li>
              <li className="pt-2">
                <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  ✓ Available for freelance work
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {new Date().getFullYear()} Nanthakumar. Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </motion.span>{" "}
            in India
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Full-Stack Developer</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}