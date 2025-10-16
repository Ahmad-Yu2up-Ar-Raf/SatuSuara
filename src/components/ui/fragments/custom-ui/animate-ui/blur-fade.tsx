"use client";

import React, { useRef } from "react";
import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
} from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y?: number; x?: number; opacity?: number; filter?: string };
    visible: { y?: number; x?: number; opacity?: number; filter?: string };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  show?: boolean;
  initial?: "hidden" | ""
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  initial ="hidden",
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  show = true,
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });

  // Visible hanya jika parent ingin show **dan** (tidak memaksa inView OR sudah inView)
  const isVisible = show && (!inView || inViewResult);

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          ref={ref}
          initial={initial}
          animate="visible"
          exit="hidden"
          variants={combinedVariants}
          transition={{
            delay: 0.04 + delay,
            duration,
            ease: "easeOut",
          }}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
