import React, { useRef } from 'react'
import { BentoCard } from './BentoCard'
import { ChartArea } from 'lucide-react';
import { motion, useInView } from "framer-motion"

function VisualReportCard() {
  // Ref untuk track visibility
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { 
    once: true, // Animasi cuma jalan sekali
    amount: 0.3 // Trigger ketika 30% component visible
  });

  const barVariants = {
    hidden: { scaleY: 0, originY: 1 },
    visible: (i: number) => ({
      scaleY: 1,
      transition: {
        delay: 0.4 + i * 0.1, // Delay relatif dari visibility, bukan hardcoded
        duration: 0.8,
        ease: "easeOut" as const, // Fix: Cast as const untuk type safety
      },
    }),
  };

  return (
  
      <motion.svg
        ref={chartRef}
        width="552"
        height="225"
        viewBox="0 0 552 225"
        className="w-fit sm:relative sm:pt-0 absolute h-72 pt-35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Grid lines */}
        {[224, 163, 106, 50, 230].map((y, i) => (
          <motion.path
            key={i}
            d={`M0 ${y}H552`}
            stroke="oklch(0.6180 0.0778 65.5444)"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 12 } : { pathLength: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
          />
        ))}

        {/* Bar chart */}
        {[
          {
            d: "M19 2.00001C19 0.895436 19.8954 0 21 0H29C30.1046 0 31 0.895431 31 2V224H19V2.00001Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M283 2.00001C283 0.895436 283.895 0 285 0H292C293.105 0 294 2V224H283V2.00001Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M46 93C46 91.8954 46.8954 91 48 91H55C56.1046 91 57 91.8954 57 93V224H46V93Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M309 93C309 91.8954 309.895 91 311 91H319C320.105 91 321 91.8954 321 93V224H309V93Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M72 25C72 23.8954 72.8954 23 74 23H82C83.1046 23 84 23.8954 84 25V224H72V25Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M336 25C336 23.8954 336.895 23 338 23H345C346.105 23 347 23.8954 347 25V224H336V25Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M98 132C98 130.895 98.8954 130 100 130H108C109.105 130 110 130.895 110 132V224H98V132Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M362 132C362 130.895 362.895 130 364 130H371C372.105 130 373 130.895 373 132V224H362V132Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M125 203C125 201.895 125.895 201 127 201H134C135.105 201 136 201.895 136 203V224H125V203Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M388 203C388 201.895 388.895 201 390 201H398C399.105 201 400 201.895 400 203V224H388V203Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M151 9C151 7.89543 151.895 7 153 7H161C162.105 7 163 7.89543 163 9V224H151V9Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M415 9C415 7.89543 415.895 7 417 7H424C425.105 7 426 7.89543 426 9V224H415V9Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M178 165C178 163.895 178.895 163 180 163H187C188.105 163 189 163.895 189 165V224H178V165Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M441 165C441 163.895 441.895 163 443 163H451C452.105 163 453 163.895 453 165V224H441V165Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M204 55C204 53.8954 204.895 53 206 53H213C214.105 53 215 53.8954 215 55V224H204V55Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M467 55C467 53.8954 467.895 53 469 53H477C478.105 53 479 53.8954 479 55V224H467V55Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M230 84C230 82.8954 230.895 82 232 82H240C241.105 82 242 82.8954 242 84V224H230V84Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M494 84C494 82.8954 494.895 82 496 82H503C504.105 82 505 82.8954 505 84V224H494V84Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M257 42C257 40.8954 257.895 40 259 40H266C267.105 40 268 40.8954 268 42V224H257V42Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
          {
            d: "M520 42C520 40.8954 520.895 40 522 40H530C531.105 40 532 40.8954 532 42V224H520V42Z",
            fill: "oklch(0.6180 0.0778 65.5444)",
          },
        ].map((bar, i) => (
          <motion.path
            key={i}
            d={bar.d}
            fill={bar.fill}
            variants={barVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i}
          />
        ))}
      </motion.svg>
 
  )
}

export default VisualReportCard