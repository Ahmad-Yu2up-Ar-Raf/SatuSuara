"use client"


import React, { useState } from 'react'



import {
  Carousel,

  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/fragments/shadcn-ui/carousel";
import { cn } from '@/lib/utils';


import InovasiCard from './card/InovasiCard';
import type { Inovasi } from "@/schemas/inovasi.schema";
import inovationsData from "@/config/data/Inovations.json";
import { Badge } from '@/components/ui/fragments/shadcn-ui/badge';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/fragments/shadcn-ui/button';

import { ChevronRight } from 'lucide-react';


import Autoplay from "embla-carousel-autoplay"




type componentsProps = {
  title?: string
  label?: string
  href?: string
  linkLabel?: string

  tag?: string

  
  data?: Inovasi[]
}


function InovasiCarousel({ linkLabel = "Lebih lanjut", data = inovationsData as Inovasi[], title = "Inovasi Terbaik", ...props }: componentsProps) {


  const dataCut = title != "Inovasi Terbaik" ? 10 : 5
  const dataCutFirst = title != "Inovasi Terbaik" ? 6 : 0
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className=' container overflow-x-hidden  lg:overflow-x-visible  space-y-10 '>

      <header className='  px-4    flex-row flex justify-between items-end'>
        <h1 className=' pr-3 text-2xl md:text-3xl lg:text-4xl lg:items-center  flex-col gap-1 lg:gap-1 flex lg:flex-row  font-bold'>
          {title}
          {props.label && (

            <Badge className=' ml-3 bg-primary text-primary-foreground  font-bold  rounded-xl dark:text-white   scale-110 -rotate-2 lg:-rotate-6 text-lg md:text-xl' >
              {props.label}
            </Badge>
          )}
        </h1>
        {props.href && (

          <Link
            className={cn(
              buttonVariants({ variant: "secondary" })
              , '  has-[>svg]:py-0 text-[10px] sm:text-xs px-3 py-0 text-black dark:text-white')}
            href={props.href}
          >
            {linkLabel}
            <ChevronRight  className=' size-3'/>
          </Link>
        )}
      </header>


      <Carousel
      className=''
 plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
        opts={{
          align: "start",
          breakpoints: {
            "(max-width: 768px)": {
              dragFree: true,
            },
          },
        }}
      >
        <CarouselContent className="mx-4 relative cursor-grab overflow-y-visible  2xl:mr-[max(0rem,calc(50vw-700px))]">
          {data.slice(dataCutFirst, dataCut).map((inovasi: Inovasi, i: number) => {

            return (
              <CarouselItem
                key={i}
                className={cn(" w-fit  shrink-0",

                  i > 0 ? 'pl-3' : 'pl-0',
                )}
              >
                <InovasiCard index={i}
                  hovered={hovered}
                  setHovered={setHovered}
                  key={inovasi.id}
                  inovasi={inovasi}

                  className=" w-fit" />
              </CarouselItem>
            )
          }

          )}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


    </section>
  )
}

export default InovasiCarousel




