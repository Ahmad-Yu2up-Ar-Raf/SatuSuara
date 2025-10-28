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

  <div className=" scale-150  m-auto  md:w-40 md:h-20  md:scale-400 w-60 h-30 ">
              {  View}
              </div> 
       
  )
}

export default VotingCardBento

