"use client";

import { motion } from "framer-motion";

const team = [
  { name: "Rafi Hakim", role: "President" },
  { name: "Sinta Ayu", role: "Vice President" },
  { name: "Fajar Naufal", role: "Election Director" },
  { name: "Zahra Putri", role: "IT Specialist" },
];

export default function About() {
  return (
    <section className="py-20 px-6 bg-[var(--card)] text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
        About <span className="text-[var(--primary)]">iVotex</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 max-w-2xl mx-auto text-[var(--muted-foreground)]">
        iVotex is a digital voting platform designed to ensure transparency,
        speed, and accuracy in every election process.
      </motion.p>

      {/* Team cards */}
      <div className="grid md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
        {team.map((person, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--background)] rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-xl">
              {person.name[0]}
            </div>
            <h3 className="mt-4 font-semibold text-[var(--foreground)]">
              {person.name}
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm">
              {person.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
