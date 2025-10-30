"use client"



import { AppleSvg } from '../../fragments/svg/icon-brand-logo'
import MediaItem from '../../fragments/custom-ui/media/MediaItem'
import { SvgPlayStoreComponent } from '../../fragments/svg/icon-brand-logo'
import Link from 'next/link'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/fragments/shadcn-ui/card'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../../fragments/shadcn-ui/button'
import { ArrowRight } from 'lucide-react'
import { useOnboardingStore } from '@/hooks/use-store-signup'







type componentsProps = {
title?: string
label?: string
href?: string
linkLabel?: string


}


function AppSponsor() {

         const name = useOnboardingStore((state) => state.name);
         

  return (
    <section  className='  container   sm:px-10 px-5   space-y-7'> 
   <Card className=" rounded-xl pt-6 pb-12  space-y-4  px-7 sm:px-8 bg-primary/20 sm:py-12 h-full w-full">



    <CardContent className="p-0 space-y-8 sm:space-y-4 text-center">
      <div className="max-h-[19em] rounded-xl sm:sr-only overflow-hidden">
        <MediaItem 
          webViewLink='https://koro.imgix.net/media/10/21/17/1741705996/2025_03_KoRo_App_HP_EN.png?w=400&auto=format,compress&fit=max&cs=srgb' 
          className='min-h-[20.1em] transition-all duration-300 ease-out justify-center items-center max-w-xs m-auto w-full'
        />
      </div>
      <CardHeader className='max-w-md m-auto p-0'>
        <CardTitle className='tracking-tighter text-2xl font-extrabold'>
  
            Dukung Inovasi di Manapun

        </CardTitle>
        <CardDescription className='font-medium md:text-base text-xs'>
          Temukan, dukung, dan pantau perkembangan inovasi anak bangsa melalui aplikasi SatuSuara
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col md:flex-row max-w-lg m-auto mt-5 gap-2 items-center justify-center p-0">
      
             <CardAction className=' md:w-fit w-full'>
        <Link 
            href="/jelajahi-inovasi" 
            className={cn(buttonVariants({ variant : "default"}) ,"group lg:order-2 rounded-xl w-full overflow-hidden  md:w-fit  relative ")}
            aria-label="Download di App Store"
          >
         Jelahi Inovasi <ArrowRight/>
          </Link>
        </CardAction>
          <CardAction className='  md:w-fit w-full'>
          <Link 
                 href={name ? "/dashboard" : "/masuk"} 
            className={cn(buttonVariants({ variant : "outline"}) ,"group lg:order-1 rounded-xl overflow-hidden w-full md:w-fit  relative ")}
            aria-label="Download di App Store"
          >
        Ciptakan Inovasi  <ArrowRight/>
          </Link>
        </CardAction>
     
      </CardFooter>

    </CardContent>
   </Card>
   
    </section>
  )
}

export default AppSponsor




