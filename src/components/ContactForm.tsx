import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div 
          className="p-6 rounded-full bg-gradient-to-r from-primary to-accent mb-6 shadow-[0_0_40px_rgba(124,58,237,0.5)]"
          animate={{ 
            boxShadow: [
              "0 0 40px rgba(124, 58, 237, 0.5)",
              "0 0 60px rgba(124, 58, 237, 0.7)",
              "0 0 40px rgba(124, 58, 237, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle className="h-16 w-16 text-white" />
        </motion.div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">Thank You!</h3>
        <p className="text-muted-foreground text-lg">
          Your message has been sent. I'll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Label htmlFor="name" className="text-foreground font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Your Name
          </Label>
          <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'shadow-[0_0_30px_rgba(124,58,237,0.3)]' : ''}`}>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className="bg-white/5 backdrop-blur-xl border-white/10 focus:border-primary/50 transition-all duration-300 rounded-xl h-12"
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Email Address
          </Label>
          <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'shadow-[0_0_30px_rgba(124,58,237,0.3)]' : ''}`}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className="bg-white/5 backdrop-blur-xl border-white/10 focus:border-primary/50 transition-all duration-300 rounded-xl h-12"
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="space-y-2"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Label htmlFor="subject" className="text-foreground font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Subject
        </Label>
        <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'subject' ? 'shadow-[0_0_30px_rgba(124,58,237,0.3)]' : ''}`}>
          <Input
            id="subject"
            name="subject"
            placeholder="Project Inquiry"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            required
            className="bg-white/5 backdrop-blur-xl border-white/10 focus:border-primary/50 transition-all duration-300 rounded-xl h-12"
          />
        </div>
      </motion.div>

      <motion.div 
        className="space-y-2"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <Label htmlFor="message" className="text-foreground font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Message
        </Label>
        <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'message' ? 'shadow-[0_0_30px_rgba(124,58,237,0.3)]' : ''}`}>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            rows={6}
            className="bg-white/5 backdrop-blur-xl border-white/10 focus:border-primary/50 transition-all duration-300 resize-none rounded-xl"
          />
        </div>
      </motion.div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}