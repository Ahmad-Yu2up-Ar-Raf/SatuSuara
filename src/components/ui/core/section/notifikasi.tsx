"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import confetti from "canvas-confetti";
import animationData from "@/config/assets/animations/Vote.json";
import { BlurFade } from "@/components/ui/fragments/custom-ui/animate-ui/blur-fade";
import { Progress } from "@/components/ui/fragments/shadcn-ui/progress";
import { Button } from "@/components/ui/fragments/shadcn-ui/button";
import { BentoCard } from "@/components/ui/fragments/custom-ui/card/BentoCard";
import { ChartArea } from "lucide-react";

interface Innovation {
  name: string;
  imageUrl?: string;
}

interface Props {
  selectedInnovation: Innovation;
}

export default function NotifikasiVote({ selectedInnovation }: Props) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // 🎬 Animasi Lottie
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100vh";
    body.style.position = "fixed";
    body.style.width = "100%";

    // 🎉 Confetti ringan, 2 detik
    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
    const confettiDuration = 2000; // 2 detik
    const confettiEnd = Date.now() + confettiDuration;

    const confettiFrame = () => {
      confetti({
        particleCount: 5, // lebih sedikit
        spread: 80,
        startVelocity: 50,
        gravity: 0.8,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors,
      });
      if (Date.now() < confettiEnd) requestAnimationFrame(confettiFrame);
    };
    confettiFrame();

    let val = 0;
    const progressInterval = setInterval(() => {
      val += 3;
      if (val >= 100) {
        val = 100;
        clearInterval(progressInterval);
        router.push("/leaderboard");
      }
      setProgress(val);
    }, 100);

    return () => {
      clearInterval(progressInterval);
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.height = "";
      body.style.position = "";
      body.style.width = "";
    };
  }, [router]);

  // Tombol share WhatsApp
  const shareVote = (innovation: Innovation) => {
    const text = `Aku baru saja vote inovasi "${innovation.name}"! 🌟`;
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      text + " " + url
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Tombol copy link
  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert("Link vote berhasil dicopy! Bagikan ke temanmu 😊");
  };

  return (
    <section className="fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center bg-background px-6 text-center overflow-hidden">
      {/* ✨ Floating Sparkle */}
      <motion.div
        className="absolute top-10 left-1/4 text-2xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: -100, opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
        🎉✨💡
      </motion.div>

      <div className="max-w-md w-full flex flex-col items-center justify-center space-y-4 relative z-10">
        {/* 🎉 Judul */}
        <BlurFade direction="up" delay={0.1}>
          <motion.h1
            className="text-2xl sm:text-3xl font-bold text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            Voting Berhasil!
          </motion.h1>
        </BlurFade>

        {/* BentoCard animatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="w-full">
          <BentoCard
            BadgeIcon={ChartArea}
            SubTitle="Terima Kasih"
            title="Suaramu Telah Tercatat ✅"
            descripcions="Partisipasimu membantu ide terbaik naik ke permukaan. Nantikan hasilnya di leaderboard!"
            borderBottom
            className="hover:scale-[1.01] transition-all duration-300 bg-card/60 backdrop-blur-md border border-muted">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                rotate: 0.5,
                transition: { duration: 0.3 },
              }}
              className="m-auto w-56 h-56 md:w-64 md:h-64 overflow-hidden rounded-xl">
              {View}
            </motion.div>
          </BentoCard>
        </motion.div>

        {/* Progress bar fun */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="w-full">
          <Progress
            value={progress}
            className="h-2 mt-2 bg-muted/40 relative overflow-hidden"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mengarahkan ke leaderboard...
          </p>
        </motion.div>

        {/* Tombol interaktif */}
        <Button
          variant="default"
          size="lg"
          className="w-full mt-2"
          onClick={() => router.push("/leaderboard")}>
          Pergi ke Leaderboard Sekarang
        </Button>

        <div className="flex gap-2 w-full mt-2">
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => shareVote(selectedInnovation)}>
            Bagikan Vote WA
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => copyLink()}>
            Copy Link
          </Button>
        </div>
      </div>
    </section>
  );
}
