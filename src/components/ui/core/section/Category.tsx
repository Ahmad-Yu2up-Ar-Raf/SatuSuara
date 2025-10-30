"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/fragments/shadcn-ui/carousel";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/fragments/shadcn-ui/badge';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from '@/components/ui/fragments/shadcn-ui/button';
import { OptionItem } from '@/types';
import { CategoryInovationOptions } from "@/config/enums/CategoryInovationStatus";
import CategoryCard from "../../fragments/custom-ui/card/CategoryCard";
import { useCallback } from "react";

interface CategoryCarouselProps {
  title?: string;
  label?: string;
  href?: string;
  linkLabel?: string;
}

function CategoryCarousel({ 
  linkLabel = "Lebih lanjut",
  title = "Kategori Inovasi",
  ...props 
}: CategoryCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = useCallback((category: string) => {
    // Redirect ke halaman jelajahi-inovasi dengan filter kategori
    router.push(`/jelajahi-inovasi?kategori=${encodeURIComponent(category)}`);
  }, [router]);

  

  return (
    <section  className='  container  space-y-7'> 

    <header className='  px-4   flex-row flex justify-between items-end'>
      <h1 className=' text-2xl md:text-3xl lg:items-center  flex-col gap-1 lg:gap-1 flex lg:flex-row  font-bold'>
        {title}
        {props.label && (

        <Badge className=' ml-3  font-bold    scale-110 -rotate-2 lg:-rotate-6 text-lg md:text-xl' >
         {props.label}
        </Badge>
        )}
      </h1>
      {props.href && (

      <Link
      className={cn( 
        buttonVariants({variant : "secondary"})
        , '  text-xs p-3' )}
      href={props.href}
      >
      {linkLabel}
      </Link>
      )}
    </header>
     
      <Carousel
          className=' lg:sr-only'
          opts={{
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          
           <CarouselContent className="mx-4 w-full relative cursor-grab overflow-y-visible  2xl:mr-[max(0rem,calc(50vw-700px))]">
            {CategoryInovationOptions.slice(0,5).map((item: OptionItem, i: number) => (
               <CarouselItem
                              key={i}
                              className={cn(" w-full max-w-[210px] relative z-40 md:max-w-[300px]  shrink-0",
              
                                i > 0 ? 'pl-3' : 'pl-0',
                              )}
                            >
                <div onClick={() => handleCategoryClick(item.value)} className=" w-full">
                  <CategoryCard 
                    CategoryData={item} 
                    className="min-h-[8em]  w-full cursor-pointer transition-transform hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="px-4">
          <div className="sr-only lg:not-sr-only grid grid-cols-5 gap-1.5">
            {CategoryInovationOptions.slice(0,5).map((item: OptionItem, i: number) => (
              <div 
                key={i}
                onClick={() => handleCategoryClick(item.value)}
                className="cursor-pointer"
              >
                <CategoryCard 
                  CategoryData={item} 
                  className="min-h-[9.7em] transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>


    </section>
  )
}

export default CategoryCarousel




