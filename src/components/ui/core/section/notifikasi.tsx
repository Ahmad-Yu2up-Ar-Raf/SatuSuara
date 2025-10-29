"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLottie } from "lottie-react";
import confetti from "canvas-confetti";
import animationData from "@/config/assets/animations/Vote.json";
import { Button } from "@/components/ui/fragments/shadcn-ui/button";
import { Check, Share2, Link2, X } from "lucide-react";

interface Innovation {
  name: string;
  imageUrl?: string;
}

interface Props {
  selectedInnovation: Innovation;
}

export default function NotifikasiVote({ selectedInnovation }: Props) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [copiedOk, setCopiedOk] = useState<boolean | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollY = useRef<number>(0);

  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  });

  // --- Lock scroll while modal aktif ---
  useEffect(() => {
    scrollY.current = window.scrollY || window.pageYOffset || 0;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";

    const preventTouch = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouch, { passive: false });

    // Confetti
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
      document.removeEventListener("touchmove", preventTouch);
      html.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      window.scrollTo(0, scrollY.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, []);

  const openAnimatedCard = () => {
    setShowPopup(true);
    if (hideRef.current) clearTimeout(hideRef.current);
    hideRef.current = setTimeout(() => {
      setShowPopup(false);
      setCopiedOk(null);
    }, 5000);
  };

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedOk(true);
      confetti({ particleCount: 40, spread: 90, origin: { x: 0.5, y: 0.2 } });
      openAnimatedCard();
    } catch {
      setCopiedOk(false);
      openAnimatedCard();
    }
  };

  const shareWA = () => {
    const text = `Aku baru saja vote inovasi "${selectedInnovation.name}"!`;
    const wa = `https://wa.me/?text=${encodeURIComponent(
      text + " " + window.location.href
    )}`;
    window.open(wa, "_blank");
    setCopiedOk(null);
    openAnimatedCard();
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } },
    exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.22 } },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 700, damping: 22 },
    },
  };

  const checklist = [
    "Suaramu tercatat dengan aman",
    "Ajak teman supaya ide lebih kuat",
    "Pantau leaderboard untuk hasil",
  ];

  return (
    <section className="fixed inset-0 w-full h-[100dvh] flex items-center justify-center px-4 bg-background/70 backdrop-blur-sm z-50">
      {/* main card */}
      <motion.div
        className="w-full max-w-[92vw] md:max-w-5xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8"
        initial={{ opacity: 0, scale: 0.98, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}>
        {/* Left: Info & Buttons */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-3 md:gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-400/95 flex items-center justify-center shadow-md -mt-12">
            <Check size={24} color="white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center md:text-left">
            Voting Berhasil!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center md:text-left text-sm sm:text-base">
            Terima kasih, suara kamu sudah tercatat. Tunggu pengumuman
            leaderboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-3 md:mt-4 w-full">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="flex-1 flex items-center justify-center gap-2">
              Lihat Dashboard
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/leaderboard")}
              className="flex-1 flex items-center justify-center gap-2">
              Lihat leaderboard
            </Button>
          </div>

          {/* Copy link */}
          <div className="mt-4 w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="p-2 rounded-md bg-emerald-50 text-emerald-600">
                <Link2 size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  salin tautan
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Salin link voting untuk dibagikan
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={copyLink}
              className="mt-2 sm:mt-0">
              <Link2 size={14} />
            </Button>
          </div>
        </div>

        {/* Right: Lottie animation */}
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
            {View}
          </div>
        </div>
      </motion.div>

      {/* Animated small popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed left-1/2 -translate-x-1/2 top-20 md:top-24 z-60 w-[90vw] max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-4 md:p-6"
            role="dialog"
            aria-modal="false">
            <div className="flex flex-col items-center">
              <motion.div
                className="w-12 h-12 rounded-full bg-emerald-400/95 flex items-center justify-center mb-3 shadow"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [1.08, 0.96, 1], opacity: 1 }}
                transition={{ duration: 0.6, times: [0, 0.6, 1] }}>
                {copiedOk === true ? (
                  <Check size={18} color="white" />
                ) : (
                  <X size={18} color="white" />
                )}
              </motion.div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                {copiedOk === true
                  ? "Link berhasil disalin"
                  : copiedOk === false
                  ? "Gagal menyalin"
                  : "Informasi"}
              </h3>

              <motion.ul
                className="mt-4 w-full max-w-md text-left"
                variants={listVariants}
                initial="hidden"
                animate="show">
                {checklist.map((t, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 py-1"
                    variants={itemVariants}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={12} />
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {t}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full">
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1"
                  onClick={() => {
                    router.push("/leaderboard");
                    setShowPopup(false);
                  }}>
                  Lihat Leaderboard
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => {
                    shareWA();
                    setShowPopup(false);
                  }}>
                  <Share2 size={14} /> Bagikan
                </Button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setCopiedOk(null);
                  }}
                  className="mt-2 sm:mt-0 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  aria-label="Tutup">
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
