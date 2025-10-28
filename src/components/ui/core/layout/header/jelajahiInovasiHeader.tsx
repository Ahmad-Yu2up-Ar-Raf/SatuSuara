'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowLeft, Box, Brush, Camera, ChevronLeft, ChevronRight, ExternalLink, ImageIcon, Loader2Icon, LucideIcon, PaletteIcon, WandSparklesIcon, X } from 'lucide-react';


import Link from 'next/link';

import VerticalCutReveal from '@/components/ui/fragments/custom-ui/animate-ui/vertical-cut-reveal';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/fragments/shadcn-ui/button';



const HeaderInovasi = ({ totalIdeas, totalVotes }: { totalIdeas: number, totalVotes: number }) => {





  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [delay, setDelay] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
      setDelay(false);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }

    }
  });
  return (
    <div className=' container px-5'>
      <nav


        className='z-50    top-0 bg-background/95 backdrop-blur   flex items-center   '>

        <Link href="/" className={cn(buttonVariants({ variant: "link" }), '  flex   has-[>svg]:px-0   w-fit py-2 md:flex  text-base items-center gap-1 px-0  group transition-colors')}>
          <ArrowLeft className=" size-5  group-hover:-translate-x-1  group-hover:transform transition-all ease-out duration-300" />
          <span className=''>Back </span>
        </Link>
      </nav>
      <div className=" m-auto mb-3   flex flex-col gap-y-6.5 md:mt-3  ">

        <header className=" w-full  md:items-center flex-col md:flex-row flex justify-between m-auto">
          <h1
            className="xl:text-[7rem] lg:text-8xl md:text-7xl text-7xl text-accent-foreground pt-4 lg:-space-y-10 -space-y-4"

          >
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.05}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Daftar
            </VerticalCutReveal>
            <VerticalCutReveal
              splitBy="characters"
              staggerDuration={0.05}
              containerClassName="lg:pl-32 md:pl-16 pl-6 leading-[140%]"
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Inovasi*
            </VerticalCutReveal>
          </h1>
          <div className="sm:w-96 space-y-1.5 sm:pt-0 pt-4">
            <p className="text-smfont-semibold text-end">
            Satu suara Anda, satu langkah lebih dekat menuju inovasi yang berdampak
            </p>
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              reverse={true}
              wordLevelClassName="text-xs  text-muted-foreground lg:text-base text-justify"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 30,
                delay: 0,
              }}
            >
              Platform voting & showcase inovasi anak bangsa — temukan ide, dukung lewat vote, dan bantu mewujudkannya.
            </VerticalCutReveal>
          </div>

        </header>


      </div>
    </div>
  );
}


export default HeaderInovasi