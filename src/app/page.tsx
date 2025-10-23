"use client";

import { Hero } from "@/components/ui/core/section/Hero";
import About from "@/components/ui/core/section/About";
import Features from "@/components/ui/core/section/Features";
import Preload from "@/components/ui/fragments/custom-ui/animate-ui/Preload";

export default function HomePage() {
  return (
    <>
      <Preload />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Features />
      </main>
    </>
  );
}
