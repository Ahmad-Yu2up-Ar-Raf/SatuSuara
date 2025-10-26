import React from 'react'
import { BentoCard } from './BentoCard'
import animationData from "@/config/assets/animations/Designer.json";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLottie } from 'lottie-react';

function BerkaryaBentoCard({  className} : { className?: string}) {
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
     <BentoCard   title="Ruang Berkarya"
  SubTitle="Bagikan ide & karya inovatifmu"
  descripcions="Ciptakan, unggah, dan bagikan inovasimu agar bisa dikenal dan didukung komunitas."
   borderBottom className={className}>
 
      
     <div className="  m-auto  w-full h-full ">
              {  View}
              </div> 

 {/* <BounceCards
   className="custom-bounceCards "
   images={inovations}
   containerWidth={500}
   containerHeight={150}
   animationDelay={1}
   animationStagger={0.08}
   easeType="elastic.out(1, 0.5)"
   transformStyles={transformStyles}
   enableHover={true}
 />
         */}
         
     </BentoCard>
  )
}

export default BerkaryaBentoCard
