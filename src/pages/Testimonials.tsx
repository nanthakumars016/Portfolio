import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { ShuffleTestimonials } from "@/components/home/ShuffleTestimonials";
import { Button } from "@/components/ui/button";
import { shuffleTestimonials } from "@/data/portfolio-content";

export default function Testimonials() {
  return (
    <PageTransition>
      <SEO
        title="Testimonials"
        description="Read what clients say about working with Nanthakumar. Trusted by businesses across India for web development, e-commerce, and custom software solutions."
        keywords="Client Testimonials, Reviews, Web Developer Reviews, Freelancer Reviews, Chennai Developer"
        url="https://nanthakumar.vercel.app/testimonials"
      />
      <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 relative">
          <ScrollAnimation animation="fadeUp" className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Client{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Testimonials
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Swipe through reviews from people I&apos;ve worked with.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="scale" delay={0.2}>
            <ShuffleTestimonials testimonials={shuffleTestimonials} />
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" className="text-center mt-12">
            <Button asChild size="lg" className="gradient-bg glow group">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </main>
    </PageTransition>
  );
}
