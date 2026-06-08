import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Sparkles } from "lucide-react";

interface ProfileCardProps {
  avatarUrl?: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
  className?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
}

export function ProfileCard({
  avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  name,
  title,
  handle,
  status = "Available",
  contactText = "Contact",
  onContactClick,
  className = "",
  behindGlowEnabled = true,
  behindGlowColor = "rgba(139, 92, 246, 0.5)",
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);
  const glowX = useTransform(mouseX, [-200, 200], [0, 100]);
  const glowY = useTransform(mouseY, [-200, 200], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`relative perspective-1000 ${className}`} style={{ perspective: "1000px" }}>
      {/* Ambient glow effects */}
      {behindGlowEnabled && (
        <>
          <motion.div
            className="absolute -inset-8 rounded-[40px] blur-3xl opacity-60"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${behindGlowColor} 0%, transparent 60%)`,
            }}
          />
          <motion.div
            className="absolute -inset-4 rounded-[40px] blur-2xl opacity-40"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, hsl(var(--accent)) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 70%, hsl(var(--primary)) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 30%, hsl(var(--accent)) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <motion.div
        ref={cardRef}
        className="relative w-[340px] rounded-[32px] overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-[32px] p-[2px]"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner card */}
        <div className="relative m-[2px] rounded-[30px] overflow-hidden bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-2xl">
          {/* Holographic overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, transparent 0%, hsl(var(--primary)) 25%, transparent 50%, hsl(var(--accent)) 75%, transparent 100%)`,
              backgroundSize: "400% 400%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          />

          {/* Content */}
          <div className="relative p-8" style={{ transform: "translateZ(50px)" }}>
            {/* Top badge */}
            <div className="flex justify-between items-start mb-6">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                animate={{ boxShadow: ["0 0 10px rgba(16,185,129,0.2)", "0 0 20px rgba(16,185,129,0.4)", "0 0 10px rgba(16,185,129,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">{status}</span>
              </motion.div>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </div>

            {/* Avatar with rings */}
            <div className="relative flex justify-center mb-6">
              <div className="relative">
                {/* Animated rings */}
                <motion.div
                  className="absolute -inset-3 rounded-full border-2 border-primary/30"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-6 rounded-full border border-accent/20"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                
                {/* Rotating gradient ring */}
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                    padding: "3px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-background"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg, transparent 50%, hsl(var(--primary) / 0.2) 100%)" }}
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="text-center mb-6 space-y-2">
              <h3 className="text-2xl font-bold gradient-text">{name}</h3>
              <p className="text-muted-foreground font-medium">{title}</p>
              {handle && (
                <p className="text-sm text-primary/80">@{handle}</p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { label: "Projects", value: "50+" },
                { label: "Experience", value: "2+ Yrs" },
                { label: "Clients", value: "30+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-2xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact button */}
            <motion.button
              onClick={onContactClick}
              className="w-full py-4 rounded-2xl font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at center, white 0%, transparent 70%)", opacity: 0.1 }}
              />
              <span className="relative text-white font-medium flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {contactText}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileCard;