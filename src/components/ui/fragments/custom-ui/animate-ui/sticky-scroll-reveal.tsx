'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import animationData1 from "@/config/assets/animations/Cute Boy Running.json";
import animationData2 from "@/config/assets/animations/Businessman looking for career opportunities.json";
import animationData3 from "@/config/assets/animations/GO TO SCHOOL ANIMATION.json";

import { useLottie } from "lottie-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../shadcn-ui/button";
import { TextAnimate } from "./text-animate";

export const StickyScroll = () => {
    // Array of section data
    const sections = [
        {
          id: 1,
          title: "Bagikan & Ajukan Ide",
          description:
            "Unggah ide atau prototipmu dengan cepat — lengkapi ringkasan, gambar, dan kategori supaya komunitas bisa menemukan dan mendukungnya.",
          LottieFilesData: animationData1,
          reverse: false,
          className : null
        },
        {
          id: 2,
          title: "Leaderboard & Voting",
          description:
            "Lihat proyek dengan dukungan terbanyak — berikan suara untuk ide yang kamu nilai berdampak agar mendapat prioritas pengembangan.",
          LottieFilesData: animationData2,
          reverse: true,
                className : "w-70  md:w-100"
        },
        {
          id: 3,
          title: "Kolaborasi Komunitas",
          description:
            "Diskusikan, beri masukan, dan jalin tim dengan pembuat lain — fitur komentar dan kolaborasi untuk membuat ide jadi lebih matang.",
          LottieFilesData: animationData3,
          reverse: false,
        className : "w-70  md:w-100"
        },
        // {
        //   id: 4,
        //   title: "Inkubator & Pendanaan",
        //   description:
        //     "Ajukan ide ke program inkubasi dan cari pendanaan; dashboard membantu tracking progres, milestone, dan alokasi dukungan.",
        //   LottieFilesData: animationData4,
        //   reverse: true,
        // },
        // {
        //   id: 5,
        //   title: "Pelaporan Dampak",
        //   description:
        //     "Laporkan hasil dan metrik dampak proyek sehingga komunitas dan pemberi dana bisa melihat bukti nyata dari dukungan mereka.",
        //   LottieFilesData: animationData5,
        //   reverse: false,
        // },
        // {
        //   id: 6,
        //   title: "Integrasi & API",
        //   description:
        //     "Integrasikan data dan proses lewat API — tarik data proyek, statistik voting, atau embed leaderboard ke situs/portal lain.",
        //   LottieFilesData: animationData6,
        //   reverse: true,
        // },
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
       <div className="flex flex-col  md:px-0 px-10">
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
                        className={` min-h-[70svh] md:min-h-[70dvh]  flex-col md:flex-row flex items-center justify-center md:gap-40 gap-0 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                    >
                        <motion.div style={{ y: translateContents[index] }} 
                        className=" max-w-xl space-y-4"
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
                            className={cn(buttonVariants({variant: "link"}) , "p-0 has-[>svg]:px-0 px-0 text-xs md:text-sm")}
                            >
                           <TextAnimate as={"span"}
                           delay={delay * 3}
                       
                           >
                           Pelajari Lebih Lanjut
                            </TextAnimate>  
                            <ArrowUpRight/>
                            </Link>
                        </motion.div>
                        <motion.div 
                            style={{ 
                                opacity: opacityContents[index],
                                clipPath: clipProgresses[index],
                            }}
                            className="relative"
                        >
                           <div className={cn("h-full" ,
                            section.className ? section.className : " w-40 md:w-70"

                           )}>
                           {View}
                           </div>
                        </motion.div>
                    </div>
                )
            }
            )}
        </div>
   
    </section>
  );
};
