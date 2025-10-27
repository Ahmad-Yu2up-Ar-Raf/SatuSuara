"use client";

import React from "react";
import { motion } from "framer-motion";

import MediaItem from "@/components/ui/fragments/custom-ui/media/MediaItem"; // pastiin path-nya bener

const leaderboardData = [
  {
    id: 1,
    name: "Inovasi Air Bersih Desa",
    votes: 980,
    image:
      "https://images.unsplash.com/photo-1599719500062-67e093c79e4d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sistem Sampah Pintar",
    votes: 870,
    image:
      "https://images.unsplash.com/photo-1616734191324-5201d79d5b68?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Pertanian Digital Terpadu",
    votes: 760,
    image:
      "https://images.unsplash.com/photo-1581092334663-1e7a2b1a3c4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Bank Sampah Sekolah",
    votes: 540,
    image:
      "https://images.unsplash.com/photo-1611224885990-ab7363d1cf7b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Energi Surya Mini",
    votes: 480,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Leaderboard() {
  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <section className="container mx-auto px-6 py-16 flex flex-col items-center">
      {/* title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-[#3b2f2f]">
        Leaderboard Inovasi
      </motion.h1>

      {/* ranking*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-center items-end gap-6 mb-14">
        {topThree.map((item, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const heightClass = isFirst ? "h-64" : rank === 2 ? "h-56" : "h-48";

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className={`relative flex flex-col items-center ${heightClass} w-48 md:w-56`}>
              <div
                className={`rounded-2xl overflow-hidden shadow-xl border border-[#d9cbb5] bg-[#fff9f3] w-full h-4/5 flex items-center justify-center`}>
                <MediaItem
                  webViewLink={item.image}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* badge */}
              <div
                className={`absolute -top-4 ${
                  isFirst
                    ? "bg-yellow-400"
                    : rank === 2
                    ? "bg-gray-400"
                    : "bg-amber-600"
                } text-white font-bold rounded-full px-4 py-1 text-sm shadow-lg`}>
                #{rank}
              </div>

              {/* NAME + VOTES */}
              <p className="mt-4 font-semibold text-center text-[#3b2f2f]">
                {item.name}
              </p>
              <p className="text-sm text-gray-600">{item.votes} suara</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/*rangking 4 kebawah*/}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl bg-[#fff9f3] rounded-2xl shadow-md overflow-hidden border border-[#e4d6c1]">
        <table className="w-full text-left">
          <thead className="bg-[#f5eee4] text-[#4a3c2f]">
            <tr>
              <th className="py-3 px-4">Ranking</th>
              <th className="py-3 px-4">Inovasi</th>
              <th className="py-3 px-4 text-right">Jumlah Suara</th>
            </tr>
          </thead>
          <tbody>
            {others.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-[#e9e0d2] hover:bg-[#fcf7f1] transition-colors">
                <td className="py-3 px-4 font-medium text-gray-700">
                  #{index + 4}
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <MediaItem
                      webViewLink={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-800">{item.name}</span>
                </td>
                <td className="py-3 px-4 text-right text-gray-600 font-semibold">
                  {item.votes}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
