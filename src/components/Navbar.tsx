import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  // { name: "Testimonials", path: "/testimonials" },
  // { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 w-full z-50 flex justify-center px-4 sm:px-6 transition-all duration-500"
      style={{
        paddingTop: scrolled ? "1.25rem" : "0px",
      }}
    >
      <nav
        className={`w-full transition-all duration-500 relative ${
          scrolled
            ? "max-w-4xl bg-background/35 dark:bg-card/45 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : "max-w-7xl mx-auto px-4 py-4 sm:py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link to="/" className="relative group flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] hover:animate-shimmer">
              Nanthakumar
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 shadow-[0_0_10px_rgba(124,58,237,0.5)] ${
                    location.pathname === link.path ? "w-1/2" : "w-0 group-hover:w-1/2"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full w-9 h-9"
            >
              <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="glass"
              size="icon"
              className="md:hidden w-9 h-9"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden overflow-hidden bg-background/90 dark:bg-card/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] ${
                scrolled
                  ? "absolute left-0 right-0 top-18 w-full mt-2"
                  : "mt-4 mx-2"
              }`}
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-lg mx-3 transition-all duration-300 ${
                        location.pathname === link.path
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}