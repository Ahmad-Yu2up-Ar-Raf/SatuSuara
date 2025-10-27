"use client";


import About from "@/components/ui/core/section/About";

import{ Hero} from "@/components/ui/core/section/Hero";
import Bento from "@/components/ui/core/section/Bento";
import Marque from "@/components/ui/core/section/Marque";
import Features from "@/components/ui/core/section/Features";



export default function HomePage() {
  return (
    <>
   

        <Hero />

  <Marque/>


    {/* <About/> */}
 <Features/>
 <Bento/>
    </>
  );
}
