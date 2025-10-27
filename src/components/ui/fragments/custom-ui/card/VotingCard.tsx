import React from 'react'
import { BentoCard } from './BentoCard'
import { ChartArea, Play } from 'lucide-react';
import {  motion } from "framer-motion"
import animationData from "@/config/assets/animations/Vote.json";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLottie } from 'lottie-react';
function VotingCardBento() {
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
     <BentoCard BadgeIcon={ChartArea}SubTitle="Dapat Dukungan"  borderBottom  descripcions="Berikan suara — bantu ide lokal menjadi solusi nyata." title="kumpulkan dukungan publik" className="h-full  hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1  transition-all duration-200 ease-in-out  ">
  <div className=" scale-150  m-auto  w-60 h-30 ">
              {  View}
              </div> 
             </BentoCard>
  )
}

export default VotingCardBento

