"use client"

import React from "react"


import { LucideIcon, SparklesIcon } from "lucide-react"

import { Badge } from "../../shadcn-ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn-ui/card"

export interface BentoProps {
  title: string,
  SubTitle: string,
  descripcions: string,
  className?: string
  BadgeIcon?: LucideIcon
  children: React.ReactNode
  borderBottom?: boolean
   contentClassName?: string
}

interface componentProps {
  bentoItem: BentoProps
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
 
}

import { cn } from "@/lib/utils"

export const BentoCard: React.FC<componentProps> = ({
  bentoItem,
  index,
  hovered,
  setHovered,
}) => {
  const delay = 0.25
  const title = bentoItem.title
  const SubTitle = bentoItem.SubTitle
  const descripcions = bentoItem.SubTitle
  const className = bentoItem.className
  const BadgeIcon = bentoItem.BadgeIcon || SparklesIcon
  const children = bentoItem.children
  const borderBottom = bentoItem.borderBottom

  return (
    <>

      <Card
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        key={title}
        className={cn("mx-auto cursor-target content-center w-full  p-2   border border-black/5  shadow-sm ", borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]",
          hovered !== null && hovered !== index && "lg:blur-sm lg:scale-[0.98]",
          className)}>
        <CardContent className={cn("relative mx-auto flex px-4 w-full flex-col  border border-black/5 bg-neutral-800/5 py-5  h-full  overflow-hidden shadow-sm md:items-start gap-4  md:gap-8  ",
          borderBottom ? "rounded-[20px] md:rounded-b-[40px]" : "rounded-[20px] md:rounded-t-[40px]"

        )}>




          <CardHeader className="flex md:px-2  gap-1 px-0 flex-col w-full justify-center pb-2  pt-0  ">

            <Badge
              variant="outline"

              className="  mb-1  text-[9px]"
            >
              <BadgeIcon className="fill-secondary stroke-1 md:size-6 text-neutral-800" />{" "}
              {SubTitle}
            </Badge>
            <CardTitle className=" md:text-xl  text-lg   line-clamp-1 opacity-85 font-bold tracking-tighter">
              <span>
                {title}
              </span>
            </CardTitle>
            <CardDescription className=" line-clamp-2 text-muted-foreground text-xs">
              <span>
                {descripcions}
              </span>
            </CardDescription>

          </CardHeader>

          <div className="flex w-full h-full content-center relative items-center md:max-h-40 p-0 justify-center gap-4">
          <div className={cn(bentoItem.contentClassName , "  ")}>

            {children}
          </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

