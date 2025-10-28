"use client";

import React from "react";
import { motion } from "framer-motion";
import MediaItem from "@/components/ui/fragments/custom-ui/media/MediaItem";

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
  // urutan podium (biar #1 di tengah)
  const topThree = [leaderboardData[1], leaderboardData[0], leaderboardData[2]];
  const others = leaderboardData.slice(3);

  return (
    <section className="container mx-auto px-6 py-16 flex flex-col items-center">
      {/* === TITLE === */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-center mb-10 text-[#3b2f2f]">
        Leaderboard Inovasi
      </motion.h1>

      {/* === TOP 3 PODIUM (FIX MOBILE LAYOUT) === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full flex justify-center mb-14">
        <div className="grid grid-cols-3 gap-3 items-end max-w-md w-full">
          {topThree.map((item, index) => {
            const rank = index === 1 ? 1 : index === 0 ? 2 : 3;
            const isFirst = rank === 1;

            const height =
              rank === 1
                ? "h-40 sm:h-54"
                : rank === 2
                ? "h-36 sm:h-48"
                : "h-32 sm:h-44";

            const lift =
              rank === 1
                ? "-translate-y-2 sm:-translate-y-3"
                : "translate-y-1 sm:translate-y-2";

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className={`relative flex flex-col items-center ${lift}`}>
                <div
                  className={`rounded-xl overflow-hidden shadow-lg border border-[#d9cbb5] bg-[#fff9f3] w-full ${height} flex items-center justify-center`}>
                  <MediaItem
                    webViewLink={item.image}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Badge */}
                <div
                  className={`absolute -top-3 ${
                    isFirst
                      ? "bg-yellow-400"
                      : rank === 2
                      ? "bg-gray-400"
                      : "bg-amber-600"
                  } text-white font-bold rounded-full px-3 py-1 text-xs shadow-lg`}>
                  #{rank}
                </div>

                <p className="mt-2 font-semibold text-center text-[#3b2f2f] text-xs sm:text-sm">
                  {item.name}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  {item.votes} suara
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* === RANK 4+ === */}
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
                  <div className="w-12 h-12 rounded-lg overflow-hidden md:w-10 md:h-10">
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
