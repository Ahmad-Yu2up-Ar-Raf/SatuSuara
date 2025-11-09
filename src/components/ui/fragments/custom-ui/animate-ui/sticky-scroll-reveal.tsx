'use client'

import animationData1 from "@/config/assets/animations/Cute Boy Running.json";
import animationData3 from "@/config/assets/animations/communication.json";
import animationData2 from "@/config/assets/animations/Winner Trophy Emoji.json";
import animationData4 from "@/config/assets/animations/First Place.json";

import { useLottie } from "lottie-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../shadcn-ui/button";
import { useIsMobile } from "@/hooks/use-mobile";


export const StickyScroll = () => {
       const isMobile = useIsMobile()

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
          reverse: false  ,
        className : "w-70   md:w-110"
        },
    {
          id: 3,
          title: "Leaderboard & Voting",
          description:
            "Lihat proyek dengan dukungan terbanyak — berikan suara untuk ide yang kamu nilai berdampak agar mendapat prioritas pengembangan.",
          LottieFilesData: isMobile ?  animationData2 : animationData4,
          reverse: true  ,
                className : "w-60   md:mb-45 md:w-120"
        },
      ];
      

  return (
   <section className=" min-h-lvh content-center items-center container max-w-[60em]">
    
      {/* <ScrollSection /> */}
       <div className="flex flex-col  md:gap-0  md:px-0 px-10">
            {sections.map((section, index) => {
  
         const lottieOptions = {
              loop: !isMobile,
              autoplay: !isMobile,
              animationData: section.LottieFilesData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            };

      const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
  const { View } = useLottie(lottieOptions, style);
                return(
                    <div 
                    className={cn(`  min-h-[80lvh]  flex-col md:flex-row flex items-center justify-center md:justify-between md:gap-30 gap-10 ${section.reverse ? 'md:flex-row-reverse' : ''}`,
                        section.id == 3 ?  'md:min-h-[30lvh]' : "md:min-h-lvh"

                    )}
                        key={index}
                      
                    >
                    
                        <div 
                    
                            className="relative"
                        >
                           <div className={cn("h-full md:order-2" ,
                            section.className ? section.className : " w-40 md:w-60"

                           )}>
                           {View}
                           </div>
                        </div>
                            <div
                        className=" md:order-1 max-w-sm space-y-4"
                        >
                            <h3 className="text-2xl  md:text-4xl ">{section.title}</h3>
                            <p  
                          
                                className=" md:text-lg text-xs line-clamp-3 text-muted-foreground  "
                            >
                                {section.description}z
                            </p>
                            <Link href={"#"}
                            className={cn(buttonVariants({variant: "link"}) , "p-0 has-[>svg]:px-0 cursor-target underline px-0 text-xs md:text-sm")}
                            >
                           <span                         
                           className=" underline-offset-2  underline"
                           >
                           Pelajari Lebih Lanjut
                            </span>  
             
                            <ArrowUpRight/>
                     
                            </Link>
                        </div>
                    </div>
                )
            }
            )}
        </div>
   
    </section>
  );
};
