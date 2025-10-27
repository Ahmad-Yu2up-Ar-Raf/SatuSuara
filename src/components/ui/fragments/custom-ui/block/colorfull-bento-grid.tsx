import { cn } from "@/lib/utils";
import { useState } from "react";

import { ChartArea, Gift, SparkleIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn-ui/card";
import { Badge } from "../../shadcn-ui/badge";
import {InovasiPopulerCard} from "../card/InovasiPopuleCardr";

import { InovasiRingkas } from '@/schemas/inovasi.schema'
import inovations from '@/config/data/Inovations.json'
import { BentoCard } from "../card/BentoCard";
import VisualReportCard from "../card/VisualReport";
import CommunityCard from "../card/CommunityCardBento";
import VotingCard from "../card/VotingCard";
import BerkaryaBentoCard from "../card/BerkaryaBentoCard";
import { TextAnimate } from "../animate-ui/text-animate";
export const ColorfullBento = () => {

const inovationsData = inovations.slice(0,4) as InovasiRingkas[]

  return (
    <Card id='free-tools' className='w-full max-w-7xl m-auto  gap-10 py-10 rounded-2xl  px-5 content-center'>


        <CardHeader className='flex px-2  flex-col md:flex-row items-end justify-between w-full'>
          <div className='flex flex-col   w-full items-start justify-start gap-5 '>
          <Badge
        
            
            
          >
            <SparkleIcon className="fill-primary-foreground stroke-1 md:size-6 text-neutral-800" />{" "}
             terbuka untuk semua
          </Badge>
            
            <div className='flex flex-col md:flex-row gap-5 md:items-end w-full md:justify-between '>
              <CardTitle className="relative text-2xl md:text-5xl font-sans font-semibold  text-balance  tracking-tighter max-w-xl text-left leading-[1.1em] space-x-6 text-base-content">
                <TextAnimate as={"span"}>
                   SatuSuara — Bagikan & Dukung Inovasi  
                </TextAnimate> 
          <Gift className="inline-flex text-primary fill-primary/10 rotate-12" size={50} strokeWidth={2} />
                </CardTitle>
              <CardDescription className='max-w-sm line-clamp-2  text-xs text-muted-foreground'>  
                <TextAnimate as={"span"}>
                Platform voting & showcase untuk ide anak bangsa — submit ide, kumpulkan dukungan, dan wujudkan solusi.
                  </TextAnimate></CardDescription>
           </div>

            <div className=' text-xs md::text-base  hidden md:flex flex-row text-primary gap-2 md:gap-6 items-start md:justify-center'>
              <p className='whitespace-nowrap font-medium'>+1,000 Downloads</p>
              <p className=' whitespace-nowrap font-medium'>Rated 5/5 by 100 Founders</p> 
            </div>
          </div>
        </CardHeader>
          <CardContent className="grid  grid-cols-1 p-0 md:grid-cols-3 md:items-start md:justify-start gap-4 ">
          
        
         
         
  <VisualReportCard/>
            <VotingCard/>
<CommunityCard   className=" h-full"/>
<BerkaryaBentoCard   className=" h-full"/>
  <InovasiPopulerCard
  
            inovations={inovationsData}
            className="h-full hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out  "
            />
  
            
     
          </CardContent>
      </Card>
  );
};

