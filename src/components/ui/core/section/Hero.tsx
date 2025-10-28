"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLottie } from "lottie-react";
import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "../../fragments/custom-ui/animate-ui/text-rotate"
import Floating , {FloatingElement} from "../../fragments/custom-ui/animate-ui/paralax-floating"
import MediaItem from "../../fragments/custom-ui/media/MediaItem";
import { BlurFade } from "../../fragments/custom-ui/animate-ui/blur-fade";
import { Pen, Telescope } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import animationData from "@/config/assets/animations/Businessman flies up with rocket.json";
import { useOnboardingStore } from "@/hooks/use-store-signup";

const exampleImages = [
  {
    url: "https://images.pexels.com/photos/7869139/pexels-photo-7869139.jpeg",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.pexels.com/photos/26767345/pexels-photo-26767345.jpeg?_gl=1*1h7y1yx*_ga*MTM4OTcyNDc4NS4xNzYxMzUxNzQ0*_ga_8JE65Q40S6*czE3NjEzNjExMjEkbzMkZzEkdDE3NjEzNjExNDMkajM4JGwwJGgw",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

function Hero() {
     const [show, setShow] = useState(true);
    
      // parameter animasi masuk di BlurFade (seconds)
    
      const duration = 0.4; // detik
    
      // Kita akan menunggu: enterDelay + duration + extraHold (detik) sebelum start exit
      const extraHold = 3; // beri sedikit waktu sebelum start fade-out
      useEffect(() => {
        const totalMs = (duration + extraHold) * 1000;
        const t = setTimeout(() => setShow(false), totalMs);
        return () => clearTimeout(t);
      }, []);
    
      const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const isMobile = useIsMobile()
     const style = { width:  isMobile ? 250 : 300, height: 150 , margin: "auto" }; // atur sesuai kebutuhan
  const { View } = useLottie(lottieOptions, style);
      const delay = 0.45
        const name = useOnboardingStore((state) => state.name);
       
  return (
    <section 
 
    className="w-full m-auto   overflow-hidden md:mb-25  lg:pt-20 min-h-lvh md:overflow-visible flex flex-col items-center justify-center relative">
      <Floating sensitivity={-0.5} className="h-full">
        {/* <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.div
        
            className="w-18 h-20 sm:w-24 relative overflow-hidden sm:h-16 md:w-28 md:h-20 lg:w-35 lg:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <MediaItem   webViewLink={exampleImages[0].url} />
            </motion.div>
        </FloatingElement> */}

        <FloatingElement
          depth={1}
          className="top-[0%] left-[3%]"
        >
            <BlurFade
delay={delay }

                   key={exampleImages[1].url}
            className="w-40 h-36 relative overflow-hidden sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-67 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            
          >
               <MediaItem   webViewLink={exampleImages[1].url} />
            </BlurFade>
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
               <BlurFade
delay={delay * 2}
          key={exampleImages[2].url}

            className="w-40 h-40 relative overflow-hidden sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-70 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
           
          >
            <MediaItem   webViewLink={exampleImages[2].url} />
          </BlurFade>
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <BlurFade
 delay={delay * 3}
          key={exampleImages[3].url}
            className="w-40 h-36 overflow-hidden sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-70 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
      
          >
             <MediaItem   webViewLink={exampleImages[3].url} />
            </BlurFade>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <BlurFade
          key={exampleImages[4].url}
delay={delay * 4}
   
            className="w-44 overflow-hidden h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
         
  
          >
             <MediaItem   webViewLink={exampleImages[4].url} /> 
            </BlurFade>
        </FloatingElement>
      </Floating>

      <div className="flex md:px-2 px-10 flex-col justify-center items-center w-full max-w-xl m-auto z-50 pointer-events-auto gap-10">
        <div className=" space-y-4">
        

 <BlurFade
delay={delay * 5}
     direction="up"
     duration={1}
    >

            {View}
    </BlurFade>
      
    
    <BlurFade
delay={delay * 6}
     direction="up"
    >
<motion.h1
  className="text-3xl sm:text-5xl  md:text-6xl  text-center w-full justify-center items-center flex-col flex whitespace-pre sm:leading-12  md:leading-16  font-bold tracking-tighter"
  animate={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
>
  <span>Jadikan inovasimu</span>
  <LayoutGroup>
    <motion.span layout className="flex whitespace-pre">
      <motion.span
        layout
        className="flex whitespace-pre"
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      >
        {" "}
      </motion.span>

      <TextRotate
       texts={[
          "terwujud",
          "nyata",
          "berdampak",
          "terdengar",
          "didukung",
          "dikenal",
          "berkembang",
          "diperhitungkan",
          "diapresiasi",
          "tersebar",
          "menginspirasi",
          "berpengaruh",
          "dimulai",
          "terlaksana",
          "bermakna",
          "tervalidasi",
          "dipercaya",
          "meluas",
          "berkelanjutan",
          "transformatif"
        ]}
        mainClassName="overflow-hidden bg-primary pr-3 text-primary-foreground py-0 pb-2 px-4 rounded-xl"
        staggerDuration={0.03}
        staggerFrom="last"
        rotationInterval={2800}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </motion.span>
  </LayoutGroup>
</motion.h1>
      </BlurFade>    

<BlurFade 
        direction="up"


delay={delay * 7}
  className=" text-base md:text-lg lg:text-xl   text-balance text-muted-foreground   text-center "

>
<p>
  Temukan dan dukung inovasi komunitas — gratis untuk semua.
  </p>
</BlurFade>



        </div>

        <BlurFade
delay={delay * 8}
        direction="up"
         className="flex w-full flex-col md:flex-row justify-center md:space-x-4  md:space-y-0 space-y-2.5 items-center ">
          <Link
            className=" cursor-target  hover:scale-110 transition-all duration-300 ease-out text-sm md:text-lg w-full  justify-center flex items-center  gap-5   font-semibold tracking-tight text-background bg-foreground px-4 py-3.5 sm:px-5  md:px-6 md:py-4 lg:px-8 rounded-full z-20 shadow-2xl "
            href="/jelajahi-inovasi"
          >
      
          <Telescope className=" size-4.5 sm:size-5.5"/>    Jelajahi Inovasi
       
          </Link>
          <Link
              href={name ? "/dashbord" : "/login"} 
            className={cn(
    
                "md:text-lg  cursor-target   hover:scale-110 transition-all duration-300 ease-out text-sm  justify-center flex items-center py-3.5   gap-5 w-full font-semibold tracking-tight text-white bg-primary px-4  sm:px-5  md:px-6 md:py-4 lg:px-8  rounded-full z-20 shadow-2xl font-calendas")}
            
          >
           
          <Pen className=" size-4.5 sm:size-5.5"/>  Daftarkan Inovasi
            
          </Link>
        </BlurFade>
      </div>
     
    </section>
  )
}

export { Hero }
