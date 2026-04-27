"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Icosahedron, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── 3D scene (runs inside Canvas only) ──────────────────────────── */

function GlitchMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return;
    t.current = clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(t.current * 0.3) * 0.4;
    mesh.current.rotation.y = t.current * 0.25 + mouse.x * 0.5;
    mesh.current.rotation.z = Math.cos(t.current * 0.2) * 0.2;
    // Periodic "glitch" scale spike
    const spike = Math.sin(t.current * 8) > 0.97 ? 1.08 : 1;
    mesh.current.scale.setScalar(spike);
  });

  return (
    <Icosahedron ref={mesh} args={[1.6, 4]}>
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#3b0764"
        distort={0.45}
        speed={2.5}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
      />
    </Icosahedron>
  );
}

/* Dynamic import keeps Three.js out of the initial JS bundle */
const Scene = dynamic(
  () =>
    import("@react-three/fiber").then(({ Canvas }) => {
      function SceneInner() {
        return (
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 55 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={120} color="#7c3aed" />
            <pointLight
              position={[-5, -5, -5]}
              intensity={80}
              color="#06b6d4"
            />
            <Stars
              radius={60}
              depth={40}
              count={3000}
              factor={3}
              fade
              speed={0.6}
            />
            <Suspense fallback={null}>
              <GlitchMesh />
            </Suspense>
          </Canvas>
        );
      }
      return SceneInner;
    }),
  { ssr: false }
);

/* ── Overlay text (semantic HTML, crawlable) ─────────────────────── */

export default function Hero3D() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* 3D background canvas */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <Scene />
      </div>

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_80%)]"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      {/* Semantic content overlay */}
      <div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ zIndex: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
            Creative Software Agency
          </p>

          {/* H1 — stays in HTML, indexed by Google */}
          <h1
            className="glitch-text mb-6 text-6xl font-black leading-none tracking-tight text-white md:text-8xl"
            data-text="GlitchSync"
          >
            GlitchSync
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-slate-300 md:text-xl">
            We build software that{" "}
            <span className="text-violet-400">feels alive</span> — vibe coding,
            mobile apps, agile delivery, and art-driven experiences.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <a
            href="#services"
            className="rounded-lg bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            See Our Services
          </a>
          <a
            href="mailto:hello@glitchsync.com"
            className="rounded-lg border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            Work With Us
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 2 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="h-10 w-6 rounded-full border-2 border-slate-600 p-1">
          <div className="h-2 w-2 rounded-full bg-cyan-400 mx-auto" />
        </div>
      </motion.div>
    </section>
  );
}
