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

<section className=" w-full   h-full">

      <Hero />

      <Marque />
      <About />
</section>


      <Features />
      <InovasiCarousel href="/jelajahi-inovasi" label="Terpopuler" />
      <Bento/>
    </>
  );
}
