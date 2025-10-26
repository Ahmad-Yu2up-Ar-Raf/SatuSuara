"use client"

import React from "react"


import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"

import { Badge } from "../../shadcn-ui/badge"
import { InovasiRingkas } from "@/schemas/inovasi.schema"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn-ui/card"

interface CarouselProps {
  inovations: InovasiRingkas[]
  className?: string
}

const transformStyles = [
  "rotate(5deg) translate(-100px)",
  "rotate(0deg) translate(-30px)",
  "rotate(-5deg) translate(40px)",
  "rotate(5deg) translate(96px)",
  "rotate(-5deg) translate(150px)"
];
import BounceCards from "./BounceCard"
import { cn } from "@/lib/utils"
import { BentoCard } from "./BentoCard"
export const InovasiPopulerCard: React.FC<CarouselProps> = ({
  inovations,
  className,
}) => {
 
  return (
    <BentoCard SubTitle="Inovasi Terpopuler"  className={className} descripcions="Lihat inovasi yang paling banyak dibicarakan komunitas." title="Yang Lagi Naik Daun 🌿">

     
         
<BounceCards
  className="custom-bounceCards "
  images={inovations}
  containerWidth={500}
  containerHeight={150}
  animationDelay={1}
  animationStagger={0.08}
  easeType="elastic.out(1, 0.5)"
  transformStyles={transformStyles}
  enableHover={true}
/>
       
        
    </BentoCard>
  )
}

    // <Card className={cn("mx-auto content-center w-full  p-0  md:p-2  rounded-[24px] border border-black/5  shadow-sm md:rounded-t-[44px]", className)}>
    //     <CardContent className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 py-6  overflow-hidden shadow-sm md:items-start gap-4 md:rounded-b-[20px] md:rounded-t-[40px] ">
    

    //       <Badge
    //         variant="outline"
            
    //         className="absolute   gap-3 left-4 top-4.5 rounded-[14px] border border-black/10 text-[10px] md:text-xs font-medium text-muted-foreground md:left-6"
    //       >
    //         <SparklesIcon className="fill-primary stroke-1 md:size-6 text-neutral-800" />{" "}
    //       
    //       </Badge>
    //       <CardHeader className="flex  px-0 flex-col w-full justify-center pb-2  pt-7  ">
    //         <div className="flex gap-1 md:gap-2">
    //           <div className=" space-y-3">
    //             <CardTitle className=" text-xl   opacity-85 font-bold tracking-tighter">
    //        
    //             </CardTitle>
    //          <CardDescription className=" text-muted-foreground text-xs"></CardDescription>
    //           </div>
    //         </div>
    //       </CardHeader>