"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLottie } from "lottie-react";
import confetti from "canvas-confetti";
import animationData from "@/config/assets/animations/Vote.json";
import { BlurFade } from "@/components/ui/fragments/custom-ui/animate-ui/blur-fade";
import { Progress } from "@/components/ui/fragments/shadcn-ui/progress";
import { Card, CardContent } from "@/components/ui/fragments/shadcn-ui/card";
import { Button } from "@/components/ui/fragments/shadcn-ui/button";

export default function NotifikasiVote() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const { View } = useLottie({
    animationData,
    loop: false,
    autoplay: true,
    style: {
      width: "100%",
      maxWidth: 250,
      height: "auto",
      margin: "0 auto",
    },
  });

  // 🔹 Efek Confetti + Nonaktif Scroll + Progress animasi
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100vh";
    body.style.position = "fixed";
    body.style.width = "100%";

    // 🎉 Efek confetti
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        spread: 80,
        startVelocity: 40,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // ⏳ Progress naik pelan
    let progressValue = 0;
    const progressTimer = setInterval(() => {
      progressValue += 2.5;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(progressTimer);
        router.push("/leaderboard");
      }
      setProgress(progressValue);
    }, 100);

    return () => {
      clearInterval(progressTimer);
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.height = "";
      body.style.position = "";
      body.style.width = "";
    };
  }, [router]);

  return (
    <section className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-background">
      <div className="max-w-md w-full flex flex-col items-center justify-center space-y-6 px-6 text-center">
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

        {/* 🪄 Animasi */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center w-full">
          {View}
        </motion.div>

        {/* 🗳️ Kartu Ringkasan (animated card) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="w-full">
          <Card className="shadow-lg border border-muted bg-card/70 backdrop-blur-md">
            <CardContent className="p-4 space-y-2">
              <h2 className="font-semibold text-lg text-foreground">
                Suaramu telah tercatat ✅
              </h2>
              <p className="text-sm text-muted-foreground">
                Terima kasih telah berpartisipasi dalam pemilihan ini. Hasil
                sementara dapat dilihat pada halaman leaderboard.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 📊 Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full">
          <Progress value={progress} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Mengarahkan ke leaderboard...
          </p>
        </motion.div>

        {/* 🔘 Tombol Manual */}
        <Button
          variant="default"
          size="lg"
          className="w-full mt-3"
          onClick={() => router.push("/leaderboard")}>
          Pergi ke Leaderboard Sekarang
        </Button>
      </div>
    </section>
  );
}
