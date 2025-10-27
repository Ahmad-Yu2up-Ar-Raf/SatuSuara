"use client";


import About from "@/components/ui/core/section/About";

import{ Hero} from "@/components/ui/core/section/Hero";
import Bento from "@/components/ui/core/section/Bento";
import MarqueeAlongSvgPathDemo from "@/components/ui/core/section/marquee-along-svg-path";



export default function HomePage() {
  return (
    <>
   

        <Hero />
    <About/>
        {/* <MarqueeAlongSvgPathDemo/> */}
 <Bento/>
    </>
  );
}
