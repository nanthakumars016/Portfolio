import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Code2, Layers, Sparkles } from "lucide-react";

const showcaseImage =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=720&fit=crop&q=80";

export function ContainerScrollSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Cinematic Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Crafting Digital Products
              <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-2 leading-none gradient-text block">
                That Stand Out
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              Scroll to see how modern interfaces come to life — from concept to
              polished, production-ready experiences.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                React & TypeScript
              </span>
              <span className="inline-flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                3D Scroll Animations
              </span>
            </div>
          </>
        }
      >
        <img
          src={showcaseImage}
          alt="Modern web dashboard and analytics interface"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
          draggable={false}
          loading="lazy"
        />
      </ContainerScroll>
    </section>
  );
}
