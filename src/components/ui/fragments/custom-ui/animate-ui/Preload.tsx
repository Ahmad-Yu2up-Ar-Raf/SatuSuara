"use client";

import React, { useEffect, useState } from "react";
import animationData from "@/config/data/Logo-animation-preload.json";
import { useLottie } from "lottie-react";
import { BlurFade } from "./blur-fade";

export default function Preload() {
  const [show, setShow] = useState(true);

  // parameter animasi masuk di BlurFade (seconds)

  const duration = 0.4; // detik

  // Kita akan menunggu: enterDelay + duration + extraHold (detik) sebelum start exit
  const extraHold = 3; // beri sedikit waktu sebelum start fade-out
  useEffect(() => {
    const totalMs = ( duration + extraHold) * 1000;
    const t = setTimeout(() => setShow(false), totalMs);
    return () => clearTimeout(t);
  }, []);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(lottieOptions);

  return (
    <BlurFade 
    initial=""
     duration={duration}
        show={show}
    className="flex fixed inset-0 bg-background justify-center items-center pointer-events-none">
      <div

       
        className="md:scale-100 scale-130"
      >
        {View}
      </div>
    </BlurFade>
  );
}
