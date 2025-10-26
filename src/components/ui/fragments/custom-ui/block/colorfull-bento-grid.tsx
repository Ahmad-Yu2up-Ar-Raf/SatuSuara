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
                <span>
                   SatuSuara — Bagikan & Dukung Inovasi  
                </span> 
          <Gift className="inline-flex text-primary fill-primary/10 rotate-12" size={50} strokeWidth={2} />
                </CardTitle>
              <CardDescription className='max-w-sm line-clamp-2  text-xs text-muted-foreground'>   Platform voting & showcase untuk ide anak bangsa — submit ide, kumpulkan dukungan, dan wujudkan solusi.</CardDescription>
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
  
            
               {/* <BentoCard
               
               borderBottom
               BadgeIcon={ChartArea} title="Data inovasi dengan suara terbanyak" SubTitle="Inovasi Unggulan" descripcions="Lihat proyek teratas dengan suara terbanyak — dukung ide yang menurutmu paling berdampak."  className="h-[330px] md:col-span-2  hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out  ">
       <motion.svg
            width="552"
            height="225"
            viewBox="0 0 552 225"
            className="w-fit h-72 pt-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            {[224, 163, 106, 50 , 230].map((y, i) => (
              <motion.path
                key={i}
                d={`M0 ${y}H552`}
                stroke="#dbdbdb"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.6 + i * 0.1, duration: 0.8 }}
              />
            ))}

            {[
              {
                d: "M19 2.00001C19 0.895436 19.8954 0 21 0H29C30.1046 0 31 0.895431 31 2V224H19V2.00001Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M283 2.00001C283 0.895436 283.895 0 285 0H292C293.105 0 294 0.895431 294 2V224H283V2.00001Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M46 93C46 91.8954 46.8954 91 48 91H55C56.1046 91 57 91.8954 57 93V224H46V93Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M309 93C309 91.8954 309.895 91 311 91H319C320.105 91 321 91.8954 321 93V224H309V93Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M72 25C72 23.8954 72.8954 23 74 23H82C83.1046 23 84 23.8954 84 25V224H72V25Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M336 25C336 23.8954 336.895 23 338 23H345C346.105 23 347 23.8954 347 25V224H336V25Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M98 132C98 130.895 98.8954 130 100 130H108C109.105 130 110 130.895 110 132V224H98V132Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M362 132C362 130.895 362.895 130 364 130H371C372.105 130 373 130.895 373 132V224H362V132Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M125 203C125 201.895 125.895 201 127 201H134C135.105 201 136 201.895 136 203V224H125V203Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M388 203C388 201.895 388.895 201 390 201H398C399.105 201 400 201.895 400 203V224H388V203Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M151 9C151 7.89543 151.895 7 153 7H161C162.105 7 163 7.89543 163 9V224H151V9Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M415 9C415 7.89543 415.895 7 417 7H424C425.105 7 426 7.89543 426 9V224H415V9Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M178 165C178 163.895 178.895 163 180 163H187C188.105 163 189 163.895 189 165V224H178V165Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M441 165C441 163.895 441.895 163 443 163H451C452.105 163 453 163.895 453 165V224H441V165Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M204 55C204 53.8954 204.895 53 206 53H213C214.105 53 215 53.8954 215 55V224H204V55Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M467 55C467 53.8954 467.895 53 469 53H477C478.105 53 479 53.8954 479 55V224H467V55Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M230 84C230 82.8954 230.895 82 232 82H240C241.105 82 242 82.8954 242 84V224H230V84Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M494 84C494 82.8954 494.895 82 496 82H503C504.105 82 505 82.8954 505 84V224H494V84Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M257 42C257 40.8954 257.895 40 259 40H266C267.105 40 268 40.8954 268 42V224H257V42Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
              {
                d: "M520 42C520 40.8954 520.895 40 522 40H530C531.105 40 532 40.8954 532 42V224H520V42Z",
                fill: "oklch(0.6180 0.0778 65.5444)",
              },
            ].map((bar, i) => (
              <motion.path
                key={i}
                d={bar.d}
                fill={bar.fill}
                variants={barVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              />
            ))}
          </motion.svg>
            </BentoCard> */}
         
          </CardContent>
      </Card>
  );
};

