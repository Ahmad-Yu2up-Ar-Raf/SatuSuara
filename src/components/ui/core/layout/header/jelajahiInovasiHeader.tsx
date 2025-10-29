'use client'
import React, { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowLeft, PlusCircle, Search, Upload } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/fragments/shadcn-ui/button';
import { Input } from '@/components/ui/fragments/shadcn-ui/input';
import VerticalCutReveal from '@/components/ui/fragments/custom-ui/animate-ui/vertical-cut-reveal';

interface HeaderInovasiProps {
  totalIdeas: number;
  totalVotes: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeaderInovasi = ({ totalIdeas, totalVotes, searchQuery, onSearchChange }: HeaderInovasiProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [delay, setDelay] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
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
    <div className=' space-y-3 md:space-y-1 container px-5 '>
      <nav className='z-50 top-0 bg-background/95 backdrop-blur flex items-center justify-between'>
        <Link 
          href="/" 
          className={cn(
            buttonVariants({ variant: "link" }), 
            'flex has-[>svg]:px-0 w-fit py-2 md:flex text-base items-center gap-1 px-0 group transition-colors'
          )}
        >
          <ArrowLeft className="size-5 group-hover:-translate-x-1 group-hover:transform transition-all ease-out duration-300" />
          <span>Kembali</span>
        </Link>
      </nav>
      <div className="  flex flex-col md:gap-4  md:justify-between gap-6">
  <header className="w-full md:items-center flex-col md:flex-row flex justify-between m-auto">
  <h1
    className="xl:text-[6rem] lg:leading-30 lg:text-8xl md:text-7xl text-7xl pt-4 lg:-space-y-10 -space-y-6"
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
      Suara
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
    <p className="text-sm font-semibold text-end">
      Ruang Ide Anak Bangsa
    </p>

    <VerticalCutReveal
      splitBy="words"
      staggerDuration={0.1}
      staggerFrom="first"
      reverse={true}
      wordLevelClassName="text-xs text-muted-foreground lg:text-base text-justify"
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 30,
        delay: 0,
      }}
    >
      Jelajahi karya kreatif generasi muda, dukung gagasan berdampak, dan bantu membangun masa depan.
    </VerticalCutReveal>
  </div>
</header>

    <div className="w-full md:flex  items-center justify-between gap-4 ">
        <div className="relative w-full md:max-w-md">
          <Input
            type="text"
            placeholder="Cari inovasi..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search />}
            clearable
            onClear={() => onSearchChange('')}
            size="lg"
            className="w-full"
          />
        </div>
        
        {/* Stats */}
       <Link href={"/dashboard"} className={cn(buttonVariants({ variant: "default" }), ' m-auto md:mr-0 text-sm  mt-3 w-full md:max-w-3xs ')}>
            Daftarkan Inovasi
            <PlusCircle/>
       </Link>
      </div>
      </div>
           
      {/* Search Section */}
  
    </div>
  );
}

export default HeaderInovasi;