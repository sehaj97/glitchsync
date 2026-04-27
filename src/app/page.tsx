import { Suspense } from "react";
import Hero3D from "@/components/Hero3D";
import ServicesGrid from "@/components/ServicesGrid";

export default function Home() {
  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-slate-800/50"
        aria-label="Primary navigation"
      >
        <a href="/" className="font-mono text-sm font-bold tracking-wider text-white">
          GLITCH<span className="text-violet-400">SYNC</span>
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#services"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Services
          </a>
          <a
            href="mailto:hello@glitchsync.com"
            className="rounded-md bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      <main>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
        <ServicesGrid />
      </main>

      <footer className="border-t border-slate-800 bg-[#050508] py-10 px-6 text-center">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} GlitchSync. All rights reserved.
        </p>
        <p className="mt-2 font-mono text-xs text-slate-700">
          glitchsync.com
        </p>
      </footer>
    </>
  );
}
