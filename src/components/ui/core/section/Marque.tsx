import React from 'react'

import { useIsMobile } from '@/hooks/use-mobile'

function Marque() {
  const isMobile = useIsMobile()

  return (
    <section        className="relative     mb-20  md:mb-26 w-full content-center">

        <div className='w-[120dvw] absolute top-0    right-0   -rotate-7  md:-rotate-3 bg-secondary text-primary text-xl py-2  inline-flex flex-nowrap overflow-hidden '>
              {Array.from({ length: 2 }, (_, i: number) => (
        <ul  key={i.toString()}  className='flex items-center justify-center md:justify-start  [&_li]:mx-3.5 [&_img]:max-w-none animate-infinite-scroll'>
      {Array.from({ length: 8 }, (_, j: number) => {


   const contentType : number = j % 4;

return(
          <li 
          key={j.toString()}
          className=" w-full  "
          >
            {contentType === 0 ? (
                    <h6 className="text-xl lg:text-[2dvw]   uppercase  tracking-[-0.05em] font-bold flex items-center gap-x-4">creative <span> works</span></h6>  
                ) : (
                     <h6 className="text-xl  lg:text-[2dvw]   uppercase tracking-[-0.05em] font-bold flex items-center gap-x-4">experience<span> projects</span></h6>  
                ) 
                
                
                }
          </li>

)
})}
        </ul>
             ))}
      </div>
        <div className='w-[120dvw] absolute top-0 right-0  rotate-7  md:rotate-3 bg-primary text-primary-foreground text-5xl py-2  inline-flex flex-nowrap overflow-hidden '>
              {Array.from({ length: 2 }, (_, i: number) => (
        <ul  key={i.toString()}  className='flex items-center justify-center md:justify-start  [&_li]:mx-3.5 [&_img]:max-w-none animate-infinite-scroll'>
      {Array.from({ length: 8 }, (_, j: number) => {


   const contentType : number = j % 4;

return(
          <li 
          key={j.toString()}
          className=" w-full  "
          >
            {contentType === 0 ? (
                    <h6 className="text-xl lg:text-[2dvw]   uppercase  tracking-[-0.05em] font-bold flex items-center gap-x-4">creative <span> works</span></h6>  
                ) : (
                     <h6 className="text-xl  lg:text-[2dvw]   uppercase tracking-[-0.05em] font-bold flex items-center gap-x-4">experience<span> projects</span></h6>  
                ) 
                
                
                }
          </li>

)
})}
        </ul>
             ))}
      </div>
   
    </section>

  )



}

export default Marque


