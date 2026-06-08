import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHoveredWhatsApp, setIsHoveredWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const phoneNumber = "918680852478"; // Replace with actual number
    const message = encodeURIComponent("Hi! I'm interested in your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="relative p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-foreground shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all duration-300 group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <ArrowUp className="h-6 w-6 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openWhatsApp}
        onHoverStart={() => setIsHoveredWhatsApp(true)}
        onHoverEnd={() => setIsHoveredWhatsApp(false)}
        className="relative p-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all duration-300"
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        {/* Second pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        <FaWhatsapp className="h-7 w-7 relative z-10" />

        {/* Tooltip */}
        <AnimatePresence>
          {isHoveredWhatsApp && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.8 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 text-foreground text-sm font-medium shadow-lg"
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}