"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Vibe Coding Projects",
    description:
      "We translate raw creative energy into working code. From aesthetic experiments to production-grade creative tools — if it has a vibe, we ship it.",
    icon: "⚡",
    tags: ["Creative Dev", "Interactive", "Generative"],
    accent: "from-violet-600 to-fuchsia-600",
  },
  {
    title: "Art & Craft Work",
    description:
      "Blending physical craft with digital technology. Installations, generative art, and experiences that live at the intersection of code and culture.",
    icon: "🎨",
    tags: ["Generative Art", "Installations", "Digital Craft"],
    accent: "from-fuchsia-600 to-pink-600",
  },
  {
    title: "Mobile Apps",
    description:
      "Native-quality iOS and Android apps built with React Native and Expo. Performant, polished, and shipped with care.",
    icon: "📱",
    tags: ["React Native", "Expo", "iOS / Android"],
    accent: "from-cyan-600 to-blue-600",
  },
  {
    title: "Software Development",
    description:
      "Full-stack web applications, APIs, and platform engineering. We own the architecture, write the tests, and stay until it's fast.",
    icon: "🖥",
    tags: ["Next.js", "Node.js", "TypeScript"],
    accent: "from-blue-600 to-violet-600",
  },
  {
    title: "Scrum Management",
    description:
      "Certified Scrum facilitation for teams that need structure without the overhead. Sprint planning, retrospectives, and delivery coaching built into every engagement.",
    icon: "🔄",
    tags: ["Agile", "Scrum", "Delivery Coaching"],
    accent: "from-emerald-600 to-cyan-600",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headingRef.current) return;
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#050508] py-28 px-6"
      aria-labelledby="services-heading"
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(to right, #7c3aed 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <header className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
            What We Do
          </p>
          <h2
            id="services-heading"
            ref={headingRef}
            className="text-4xl font-black text-white md:text-5xl"
          >
            Services
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-violet-600 to-cyan-400" />
        </header>

        {/* Cards grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={cardVariants}
              className="card-glitch"
            >
              <Card className="h-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-100">
                <CardHeader className="pb-3">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.accent} text-2xl shadow-lg`}
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg font-bold text-white">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-slate-800 text-slate-300 hover:bg-slate-700 border-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
