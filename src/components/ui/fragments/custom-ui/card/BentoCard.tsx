"use client"

import React from "react"


import { LucideIcon, SparklesIcon } from "lucide-react"

import { Badge } from "../../shadcn-ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn-ui/card"

interface CarouselProps {
  title: string,
  SubTitle: string,
  descripcions: string,
  className?: string
  BadgeIcon?: LucideIcon
  children : React.ReactNode
  borderBottom ? : boolean
}



import { cn } from "@/lib/utils"
import { TextAnimate } from "../animate-ui/text-animate"
import { BlurFade } from "../animate-ui/blur-fade"
export const BentoCard: React.FC<CarouselProps> = ({
  children,
  title,
  SubTitle,
  borderBottom = false,
  BadgeIcon = SparklesIcon,
  descripcions,
  className,
}) => {
 const delay = 0.25
  return (
    <>

      <Card 
      key={title}
      className={cn("mx-auto cursor-target content-center w-full  p-2   border border-black/5  shadow-sm ", borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]" ,className)}>
        <CardContent className={cn("relative mx-auto flex px-4 w-full flex-col  border border-black/5 bg-neutral-800/5 py-5  h-full  overflow-hidden shadow-sm md:items-start gap-4  md:gap-8  ",
borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]"

        )}>
    
       

 
          <CardHeader className="flex md:px-2  px-0 flex-col w-full justify-center pb-2  pt-0  ">
     
          <Badge
            variant="outline"
            
            className="  mb-1  text-[9px]"
          >
            <BadgeIcon className="fill-secondary stroke-1 md:size-6 text-neutral-800" />{" "}
            {SubTitle}
          </Badge>
                <CardTitle className=" md:text-xl  text-lg   opacity-85 font-bold tracking-tighter">
          <TextAnimate as={"span"} delay={ delay }>
          {title}
            </TextAnimate>   
                </CardTitle>
             <CardDescription className=" line-clamp-2 text-muted-foreground text-[10px] sm:text-xs">
             <TextAnimate as={"span"} delay={ delay  * 2}>
             {descripcions}
              </TextAnimate> 
              </CardDescription>
         
          </CardHeader>
      
          <BlurFade delay={title != "Lihat Yang Lagi Naik Daun 🌿" ? delay * 3 : 0} inView className="flex w-full h-full content-center relative items-center justify-center gap-4">
         
{children}
          </BlurFade>
        </CardContent>
      </Card>
    </>
  )
}

