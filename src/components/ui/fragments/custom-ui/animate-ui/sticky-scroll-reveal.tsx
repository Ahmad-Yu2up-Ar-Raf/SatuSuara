'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import animationData1 from "@/config/assets/animations/Cute Boy Running.json";
import animationData3 from "@/config/assets/animations/communication.json";
import animationData2 from "@/config/assets/animations/First Place.json";

import { useLottie } from "lottie-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../shadcn-ui/button";
import { TextAnimate } from "./text-animate";
import { BlurFade } from "./blur-fade";

export const StickyScroll = () => {
    // Array of section data
    const sections = [
        {
          id: 1,
          title: "Bagikan & Ajukan Ide",
          description:
            "Unggah ide atau prototipmu dengan cepat — lengkapi ringkasan, gambar, dan kategori supaya komunitas bisa menemukan dan mendukungnya.",
          LottieFilesData: animationData1,
          reverse: true,
          className : null
        },
      
        {
          id: 2,
          title: "Kolaborasi Komunitas",
          description:
            "Diskusikan, beri masukan, dan jalin tim dengan pembuat lain — fitur komentar dan kolaborasi untuk membuat ide jadi lebih matang.",
          LottieFilesData: animationData3,
          reverse: true,
        className : "w-70   md:w-110"
        },
    {
          id: 3,
          title: "Leaderboard & Voting",
          description:
            "Lihat proyek dengan dukungan terbanyak — berikan suara untuk ide yang kamu nilai berdampak agar mendapat prioritas pengembangan.",
          LottieFilesData: animationData2,
          reverse: false  ,
                className : "w-90   md:mb-45 md:w-120"
        },
      ];
      
    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef(null));
    
    const scrollYProgress = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    // Create animations for each section
    const opacityContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgress.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );
    
    const translateContents = scrollYProgress.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <section className=" min-h-lvh content-center items-center container md:min-h-dvh ">
    
      {/* <ScrollSection /> */}
       <div className="flex flex-col  md:gap-0  md:px-0 px-10">
            {sections.map((section, index) => {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: section.LottieFilesData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    const delay = 0.25
      const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
  const { View } = useLottie(lottieOptions, style);
                return(
                    <div 
                        key={section.id}
                        ref={sectionRefs[index]} 
                        className={cn(`  min-h-[70lvh]  flex-col md:flex-row flex items-center justify-center md:gap-30 gap-10 ${section.reverse ? 'md:flex-row-reverse' : ''}`,
                            section.id == 3 ?  'md:min-h-[30lvh]' : "md:min-h-dvh"

                        )}
                    >
                    
                        <motion.div 
                            style={{ 
                                opacity: opacityContents[index],
                                clipPath: clipProgresses[index],
                            }}
                            className="relative"
                        >
                           <div className={cn("h-full md:order-2" ,
                            section.className ? section.className : " w-40 md:w-60"

                           )}>
                           {View}
                           </div>
                        </motion.div>
                            <motion.div style={{ y: translateContents[index] }} 
                        className=" md:order-1 max-w-sm space-y-4"
                        >
                            <TextAnimate delay={delay} as={"h3"} className="text-2xl  md:text-4xl ">{section.title}</TextAnimate>
                            <TextAnimate
                            as={"p"} 
                                delay={delay * 2}
                                className=" md:text-lg text-xs line-clamp-3 text-muted-foreground  "
                            >
                                {section.description}
                            </TextAnimate>
                            <Link href={"#"}
                            className={cn(buttonVariants({variant: "link"}) , "p-0 has-[>svg]:px-0 cursor-target underline px-0 text-xs md:text-sm")}
                            >
                           <TextAnimate as={"span"}
                           delay={delay * 3}
                           className=" underline-offset-2  underline"
                           >
                           Pelajari Lebih Lanjut
                            </TextAnimate>  
                            <BlurFade direction="up" delay={delay * 4} inView>

                            <ArrowUpRight/>
                            </BlurFade>
                            </Link>
                        </motion.div>
                    </div>
                )
            }
            )}
        </div>
   
    </section>
  );
};
