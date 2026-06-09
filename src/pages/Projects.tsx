// import { AnimatedSection } from "@/components/AnimatedSection";
// import { ProjectCard } from "@/components/ProjectCard";
// import { PageTransition } from "@/components/PageTransition";
// import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
// import { SEO } from "@/components/SEO";

// const projects = [
//   { 
//     title: "Virtua Portal — Business App Marketplace", 
//     description: "A multi-tenant SaaS marketplace (Google Play Store style) where businesses register, browse, and subscribe to web apps like Billing Software, CRM, HR Management, and Inventory tools.", 
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", 
//     techStack: ["React.js", "Nuxt.js", "Node.js", "MySQL"], 
//     liveUrl: "#", 
//     githubUrl: "#" 
//   },
//   { 
//     title: "RX Square — POS, CRM & E-Commerce", 
//     description: "An end-to-end SaaS platform built from scratch. Handles retail invoicing, multi-branch inventory tracking, automated notifications, customer segmentation, and PDF invoice generation.", 
//     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", 
//     techStack: ["React.js", "Node.js", "MySQL", "REST APIs"], 
//     liveUrl: "#", 
//     githubUrl: "#" 
//   },
//   { 
//     title: "MERN E-Commerce Application", 
//     description: "A full-featured e-commerce system with dynamic product catalogs, a comprehensive cart manager, user login/accounts, and checkout flow.", 
//     image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop", 
//     techStack: ["MongoDB", "Express.js", "React.js", "Node.js"], 
//     liveUrl: "#", 
//     githubUrl: "#" 
//   },
//   { 
//     title: "IZEON Business Logic Portals", 
//     description: "High-performance REST APIs and business logic modules built for CRUD operations, integrated with dynamic React.js and Bootstrap dashboards.", 
//     image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop", 
//     techStack: ["Spring Boot", "Java", "MySQL", "React.js", "Bootstrap"], 
//     liveUrl: "#", 
//     githubUrl: "#" 
//   },
// ];

// export default function Projects() {
//   return (
//     <PageTransition>
//       <SEO
//         title="Projects"
//         description="Explore Nanthakumar's portfolio of web development projects including e-commerce platforms, healthcare portals, POS systems, and more."
//         keywords="Web Development Projects, Portfolio, React Projects, E-commerce, Healthcare Portal, POS System"
//         url="https://nanthakumar.vercel.app/projects"
//       />
//       <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
//         {/* Background effects */}
//         <div className="fixed inset-0 pointer-events-none">
//           <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
//           <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
//         </div>

//         <div className="container px-4 relative">
//           <ScrollAnimation animation="fadeUp" className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
//             </h1>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               A showcase of my recent work and personal projects.
//             </p>
//           </ScrollAnimation>

//           <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {projects.map((project) => (
//               <StaggerItem key={project.title}>
//                 <ProjectCard {...project} />
//               </StaggerItem>
//             ))}
//           </StaggerContainer>
//         </div>
//       </main>
//     </PageTransition>
//   );
// }



import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectCard } from "@/components/ProjectCard";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ScrollAnimations";
import { SEO } from "@/components/SEO";
import { Lock, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Virtua Portal — Business App Marketplace",
    description:
      "Built entirely from scratch. A multi-tenant SaaS marketplace where businesses register, browse, and subscribe to web apps — Billing, CRM, HR, and Inventory — from a single console. Architected the full frontend, subscription flow, and multi-tenant dashboard.",
    role: "Full-Stack Developer · Built from Scratch",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["React.js", "Nuxt.js", "Node.js", "MySQL"],
    isPrivate: true,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "RX Square — POS, CRM & E-Commerce",
    description:
      "Designed and built end-to-end from scratch. Handles retail invoicing, multi-branch inventory tracking, customer segmentation, automated notifications, and PDF invoice generation. A high-transaction production SaaS used by real businesses.",
    role: "Full-Stack Developer · Built from Scratch",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    techStack: ["React.js", "Node.js", "MySQL", "REST APIs"],
    isPrivate: true,
    liveUrl: null,
    githubUrl: null,
  },
  {
    title: "MERN E-Commerce Application",
    description:
      "Personal project built from scratch. A full-featured e-commerce system with dynamic product catalogs, cart management, user authentication, and a complete checkout flow.",
    role: "Solo Developer · Personal Project",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    isPrivate: false,
    liveUrl: "https://your-live-link.com",   // ← replace with real link
    githubUrl: "https://github.com/yourrepo", // ← replace with real link
  },
  {
    title: "IZEON Business Logic Portals",
    description:
      "Built REST APIs and business logic modules from scratch using Spring Boot and Java, integrated with React.js and Bootstrap dashboards. Focused on high-performance CRUD operations and clean architecture.",
    role: "Full-Stack Developer · Built from Scratch",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    techStack: ["Spring Boot", "Java", "MySQL", "React.js", "Bootstrap"],
    isPrivate: true,
    liveUrl: null,
    githubUrl: null,
  },
];

export default function Projects() {
  return (
    <PageTransition>
      <SEO
        title="Projects — Nanthakumar S"
        description="Real-world SaaS products, POS systems, CRM platforms, and full-stack apps built from scratch by Nanthakumar S, Full-Stack Developer from Salem, Tamil Nadu."
        keywords="SaaS Projects, POS System, CRM, Multi-tenant, React, Node.js, Full-Stack Portfolio"
        url="https://nanthakumar.vercel.app/projects"
      />

      <main className="pt-24 pb-16 bg-background w-full overflow-x-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 relative">

          {/* Header */}
          <ScrollAnimation animation="fadeUp" className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of real-world SaaS products and personal projects — all built from scratch.
            </p>
          </ScrollAnimation>

          {/* Disclaimer badge */}
          <ScrollAnimation animation="fadeUp" className="flex justify-center mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-4 py-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Company projects are marked Private — source code is confidential</span>
            </div>
          </ScrollAnimation>

          {/* Projects grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.title}>
                <div className="group relative flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Private overlay badge */}
                    {project.isPrivate && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full border border-border">
                        <Lock className="w-3 h-3" />
                        Private Project
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">

                    {/* Role badge */}
                    <span className="text-xs font-medium text-primary mb-2">
                      {project.role}
                    </span>

                    <h3 className="text-lg font-semibold mb-3 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto">
                      {project.isPrivate ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground border border-dashed border-border rounded-lg px-4 py-2">
                          <Lock className="w-3 h-3" />
                          Source code confidential
                        </span>
                      ) : (
                        <>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:opacity-90 transition"
                            >
                              Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-medium border border-border rounded-lg px-4 py-2 hover:bg-muted transition"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </main>
    </PageTransition>
  );
}