"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "../../fragments/shadcn-ui/button";
import Image from "next/image";
import { BlurFade } from "@/components/ui/fragments/custom-ui/animate-ui/blur-fade";
export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-primary/5 to-background">
      <BlurFade duration={0.6} show>
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Bangun Suara Digital Indonesia
        </h1>
        <p className="max-w-xl mx-auto text-muted-foreground mb-8">
          Platform e-Voting modern untuk membangun demokrasi digital yang lebih
          transparan, efisien, dan inklusif.
        </p>
        <Button className="px-6 py-3 text-lg">Mulai Sekarang</Button>
      </BlurFade>

      {/* Wave bawah */}
      <div className="w-full mt-16">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-primary/10">
          <path d="M0,224L48,224C96,224,192,224,288,213.3C384,203,480,181,576,170.7C672,160,768,160,864,181.3C960,203,1056,245,1152,229.3C1248,213,1344,139,1392,101.3L1440,64V320H0Z" />
        </svg>
      </div>
    </section>
  );
}

<section className="relative overflow-hidden bg-background text-foreground pt-24 pb-32">
  <div className="max-w-6xl mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-10 items-center">
    {/* Text Content */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
        <span className="text-primary">E-Vote Indonesia</span>
        <br />
        Sistem Voting Digital yang Aman & Transparan
      </h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Jadikan proses pemilihan lebih mudah, efisien, dan terpercaya. Dengan
        teknologi modern, setiap suara Anda tercatat dengan aman.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button className="px-6 py-3 text-base font-semibold rounded-lg shadow-sm bg-primary text-primary-foreground hover:opacity-90">
          Daftar Sebagai Pemilih
        </Button>
        <Button
          variant="outline"
          className="px-6 py-3 text-base font-semibold rounded-lg border border-border hover:bg-accent">
          Lihat Hasil Pemilihan
        </Button>
      </div>
    </motion.div>

    {/* Illustration */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex justify-center">
      <Image
        src="/illustrations/vote-secure.svg"
        alt="Ilustrasi Voting Aman"
        width={500}
        height={400}
        className="drop-shadow-lg"
      />
    </motion.div>
  </div>

  {/* Wave bawah */}
  <div className="absolute bottom-0 left-0 w-full">
    <svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-primary/10">
      <path d="M0,224L48,224C96,224,192,224,288,213.3C384,203,480,181,576,170.7C672,160,768,160,864,181.3C960,203,1056,245,1152,229.3C1248,213,1344,139,1392,101.3L1440,64V320H0Z" />
    </svg>
  </div>
</section>;
