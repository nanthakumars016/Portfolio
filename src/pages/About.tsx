import { Code2, Database, Globe, Palette, Server, Smartphone, Briefcase, Rocket, Star, Calendar } from "lucide-react";
import { SkillCard } from "@/components/SkillCard";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";
import { CardCanvas, GlowCard } from "@/components/ui/animated-glow-card";
import { PortfolioHighlightCard } from "@/components/ui/x-gradient-card";
import { ShinyButton } from "@/components/ui/shiny-button";

const skills = [
  { name: "React.js", icon: Code2, level: 95, color: "#61DAFB" },
  { name: "Nuxt.js", icon: Smartphone, level: 85, color: "#00DC82" },
  { name: "Node.js", icon: Server, level: 90, color: "#339933" },
  { name: "MySQL", icon: Database, level: 90, color: "#4479A1" },
  { name: "MongoDB", icon: Database, level: 85, color: "#47A248" },
  { name: "Tailwind CSS", icon: Palette, level: 95, color: "#06B6D4" },
  { name: "Java/Spring Boot", icon: Code2, level: 82, color: "#007396" },
  { name: "TypeScript", icon: Code2, level: 88, color: "#3178C6" },
];

const orbitalTimeline = [
  {
    id: 1,
    title: "Java Full-Stack Intern",
    date: "Jun 2024",
    content: "Interned at IZEON Innovative, developing REST APIs using Spring Boot, Java, and MySQL, with React frontends.",
    category: "Internship",
    icon: Briefcase,
    relatedIds: [2],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    date: "Nov 2024",
    content: "Joined RX Square to build dynamic POS Billing, CRM, and E-Commerce modules using React, Node.js, and MySQL.",
    category: "Work",
    icon: Code2,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Team Lead — Full-Stack Developer",
    date: "Nov 2025",
    content: "Promoted to Team Lead at RX Square. Oversaw feature development, pull requests, and maintained 99.9% platform uptime.",
    category: "Leadership",
    icon: Star,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Team Lead — Full-Stack Developer",
    date: "Jan 2026",
    content: "Joined Virtua Portal to lead a 5+ member team building a multi-tenant business web app marketplace.",
    category: "Work",
    icon: Rocket,
    relatedIds: [3],
    status: "in-progress" as const,
    energy: 100,
  },
];

const tools = ["VS Code", "Git", "GitHub", "Postman", "JIRA", "Agile", "Scrum", "Sprint Planning"];

export default function About() {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href =
      "/resume/Nanthakumar-Full Stack Developer-2 Years Experience.pdf";
    link.download = "Nanthakumar-Full Stack Developer-2 Years Experience.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <PageTransition>
      <SEO
        title="About Me"
        description="Learn about Nanthakumar S, a Full-Stack Developer and Team Lead with 2+ years of experience in React, Node.js, Spring Boot, and SaaS platforms."
        keywords="About Nanthakumar S, Full-Stack Developer, Team Lead, React Developer, Nuxt.js, Salem, Chennai, India"
        url="https://nanthakumar.vercel.app/about"
      />
      <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container px-4 relative">
          <ScrollAnimation animation="fadeUp" className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate Full-Stack Developer and Team Lead with 2+ years of
              experience building high-performance SaaS applications and
              multi-tenant platforms.
            </p>
          </ScrollAnimation>

          <ScrollAnimation
            animation="scale"
            delay={0.2}
            className="max-w-3xl mx-auto mb-20"
          >
            <CardCanvas className="max-w-xl mx-auto">
              <GlowCard>
                <PortfolioHighlightCard
                  link="/contact"
                  authorName="Nanthakumar S"
                  authorHandle="nanthakumars016"
                  authorImage="/nanthakumar.jpeg"
                  content={[
                    "Full-Stack Developer & Team Lead based in Salem, Tamil Nadu, India.",
                    "I specialize in React.js, Nuxt.js, Node.js, Spring Boot, and MySQL — turning complex SaaS requirements into polished digital products.",
                  ]}
                  timestamp="Available for opportunities"
                  // reply={{
                  //   authorName: "Virtua Portal / RX Square Team",
                  //   authorHandle: "engineering",
                  //   authorImage:
                  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
                  //   content:
                  //     "Proven track record of leading development, optimizing SQL queries, and architecting robust SaaS infrastructure.",
                  //   isVerified: true,
                  //   timestamp: "Team review",
                  // }}
                />
              </GlowCard>
            </CardCanvas>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.3} className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              My{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <StaggerItem key={skill.name}>
                  <SkillCard {...skill} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.4} className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
              An interactive timeline of my career milestones and growth.
            </p>
            <RadialOrbitalTimeline timelineData={orbitalTimeline} />
          </ScrollAnimation>

          <ScrollAnimation
            animation="scale"
            delay={0.5}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Tools I Use</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm border border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  {tool}
                </span>
              ))}
            </div>
            <ShinyButton onClick={handleDownloadCV}>Download CV</ShinyButton>
          </ScrollAnimation>
        </div>
      </main>
    </PageTransition>
  );
}