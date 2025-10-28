"use client";


import About from "@/components/ui/core/section/About";

import { Hero } from "@/components/ui/core/section/Hero";
import Bento from "@/components/ui/core/section/Bento";
import Marque from "@/components/ui/core/section/Marque";
import Features from "@/components/ui/core/section/Features";
import InovasiCarousel from "@/components/ui/fragments/custom-ui/SectionCarosul";



export default function HomePage() {
  return (
    <>


      <Hero />

      <Marque />


      <About />
      <Features />
      <InovasiCarousel href="/jelajahi-inovasi" label="Inovasi Terbaru" />
      {/* <Bento/> */}
    </>
  );
}
