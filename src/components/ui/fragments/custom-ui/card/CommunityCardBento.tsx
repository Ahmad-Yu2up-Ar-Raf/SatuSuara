import React from 'react'
import { BentoCard } from './BentoCard'
import animationData from "@/config/assets/animations/Global Network.json";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLottie } from 'lottie-react';

function CommunityCard() {
     const lottieOptions = {
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        };
        const isMobile = useIsMobile()
    const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
    const { View } = useLottie(lottieOptions, style);
  return (

      
     <div className="  m-auto  w-90 h-full  ">
              {  View}
              </div> 

  )
}

export default CommunityCard
