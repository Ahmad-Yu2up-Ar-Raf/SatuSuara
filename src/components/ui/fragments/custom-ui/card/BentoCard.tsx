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
export const BentoCard: React.FC<CarouselProps> = ({
  children,
  title,
  SubTitle,
  borderBottom = false,
  BadgeIcon = SparklesIcon,
  descripcions,
  className,
}) => {
 
  return (
    <>

      <Card className={cn("mx-auto content-center w-full  p-2   border border-black/5  shadow-sm ", borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]" ,className)}>
        <CardContent className={cn("relative mx-auto flex w-full flex-col  border border-black/5 bg-neutral-800/5 py-6  h-full  overflow-hidden shadow-sm md:items-start gap-4  ",
borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]"

        )}>
    

          <Badge
            variant="outline"
            
            className="absolute  text-accent-foreground  gap-3 left-4 top-4.5 rounded-[14px] border border-black/10 text-[10px] md:text-xs font-medium  md:left-6"
          >
            <BadgeIcon className="fill-primary stroke-1 md:size-6 text-neutral-800" />{" "}
            {SubTitle}
          </Badge>
          <CardHeader className="flex  px-0 flex-col w-full justify-center pb-2  pt-7  ">
            <div className="flex gap-1 md:gap-2">
              <div className=" space-y-3">
                <CardTitle className=" text-xl   opacity-85 font-bold tracking-tighter">
                {title}
                </CardTitle>
             <CardDescription className=" text-muted-foreground text-xs">{descripcions}</CardDescription>
              </div>
            </div>
          </CardHeader>
      
          <div className="flex w-full relative items-center justify-center gap-4">
         
{children}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

