"use client";

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/fragments/shadcn-ui/button';
import { ArrowLeft, ArrowRight, Check, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useLottie } from 'lottie-react';
import animationData from '@/config/assets/animations/Check okey done.json';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../shadcn-ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';


interface SuccessNotificationProps {
  type: 'vote' | 'donation';
  title: string;
  description: string;
  amount?: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export default function SuccessNotification({
  type,
  title,
  description,
  amount,
  primaryAction,
  secondaryAction
}: SuccessNotificationProps) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [copiedOk, setCopiedOk] = useState<boolean | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY = useRef<number>(0);

  const { View } = useLottie({
    animationData,
    loop: false,
    autoplay: true,
    style: { width: "100%", height: "100%" , margin: "auto"  , },
  });

  useEffect(() => {
    // Lock scroll
    scrollY.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.width = '100%';

    // Confetti effect
    const colors = ["#06b6d4", "#34d399", "#f59e0b", "#ef4444", "#7c3aed"];
    const particleCount = window.innerWidth > 768 ? 18 : 7;
    const dur = 1200;
    const end = Date.now() + dur;
    
    const run = () => {
      confetti({
        particleCount,
        spread: 70,
        gravity: 0.6,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(run);
    };
    run();

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, []);

  const shareContent = () => {
    const text = type === 'vote' 
      ? `Saya baru saja mendukung inovasi di SatuSuara!`
      : `Saya baru saja berdonasi untuk mendukung inovasi di SatuSuara!`;
    
    const wa = `https://wa.me/?text=${encodeURIComponent(
      text + " " + window.location.href
    )}`;
    window.open(wa, "_blank");
  };
  const delay = 0.25;
  return (
    <section className="relative max-h-lvh h-lvh flex items-center justify-center overflow-hidden">
      <Card
        className="relative max-w-xl border-0 bg-background  shadow-none  w-full overflow-hidden flex flex-col  lg:flex-row lg:max-w-none h-lvh"
    
      >
        <CardContent className=' bg-background p-0 w-full h-full flex flex-col justify-center items-center gap-10  '>
            <CardHeader className=' relative w-full text-center'>
               <div  className="flex  m-auto max-w-[18em] w-full h-full content-center relative items-center  max-h-[6em] p-0 justify-center gap-4">
                        {View}
                        </div>  
                <CardTitle className='  w-full font-bold text-xl'>
                
       {title}
       
                </CardTitle>
                <CardDescription  className=' w-full h-full'>
                  
       {description}

         
                </CardDescription>
            </CardHeader>
            <CardFooter>

            <CardAction className='  md:flex items-center gap-4 md:space-y-0 space-y-3 w-full'>
<Link href={"/jelajahi-inovasi"} className={cn(buttonVariants({ variant: "secondary" ,  }), "w-full md:w-fit  text-xs")}>
                    <ArrowLeft className="ml-2 size-4" />
                    Jelajahi Inovasi
                </Link>
                <Link href={"/leaderboard"} className={cn(buttonVariants({ variant: "default" }) , 
                "w-full md:w-fit  text-xs "
            )}>
                    Lihat Peringkat
                    <ArrowRight className="ml-2 size-4" />
                </Link>
                
                </CardAction>
            </CardFooter>
            </CardContent>
        {/* Left: Info & Buttons */}
    

        {/* Right: Animation */}
       
      </Card>
    </section>
  );
}