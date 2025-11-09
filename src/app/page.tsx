"use client";



import Hero from "@/components/ui/core/section/Hero";
import Bento from "@/components/ui/core/section/Bento";
import Marque from "@/components/ui/core/section/Marque";
import Features from "@/components/ui/core/section/Features";
import InovasiCarousel from "@/components/ui/fragments/custom-ui/SectionCarosul";
import Neslatter from "@/components/ui/core/section/Neslatter";
import CategoryCarousel from "@/components/ui/core/section/Category";
import AppSponsor from "@/components/ui/core/section/AppSponsor";



export default function HomePage() {
  return (
    <>

<section className=" w-full   h-full">

      <Hero />

      <Marque />
  
</section>


      <Features />
      <Bento/>

<section className=" w-full space-y-19">

      <InovasiCarousel href="/jelajahi-inovasi"  label="Wajib Tahu!" title="Inovasi Terbaru!" />
      <CategoryCarousel />
      <AppSponsor/>
      <InovasiCarousel href="/jelajahi-inovasi"  label="Ayo Dukung!"/>
     
      <Neslatter/>
</section>

    </>
  );
}
