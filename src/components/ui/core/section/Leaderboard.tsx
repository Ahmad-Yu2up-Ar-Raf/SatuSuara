"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/fragments/shadcn-ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/fragments/shadcn-ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/fragments/shadcn-ui/dialog";
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge";
import MediaItem from "@/components/ui/fragments/custom-ui/media/MediaItem";
import inovations from "@/config/data/Inovations.json";
import { inovasiSchema } from "@/schemas/inovasi.schema";

export default function Leaderboard() {
  const validData = inovations.filter(
    (item: any) => inovasiSchema.safeParse(item).success
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<any | null>(null);

  const categoryFiltered =
    category === "all"
      ? validData
      : validData.filter((item) => item.category === category);

  const sorted = [...categoryFiltered].sort((a, b) => b.votes - a.votes);
  const topThree = sorted.slice(0, 3);
  const others = sorted.slice(3);

  const filtered = others.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container mx-auto px-5 sm:px-6 py-10 md:py-16 flex flex-col items-center">
      {/* === HEADER === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
          🏆 Leaderboard Inovasi
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Lihat peringkat inovasi digital terbaik di Indonesia
        </p>
      </motion.div>

      {/* === FILTERS === */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 sm:mb-14 w-full max-w-3xl">
        <Input
          placeholder="Cari inovasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 shadow-sm focus:ring-2 focus:ring-blue-300 transition text-sm md:text-base"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px] shadow-sm">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">🌐 Semua Kategori</SelectItem>
            {[...new Set(validData.map((i) => i.category))].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* === TOP 3 (tetap seperti semula) === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-3 sm:gap-6 items-end mb-14 sm:mb-20 max-w-full sm:max-w-4xl">
        {topThree.map((item, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const orderClasses =
            rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3";

          return (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative flex flex-col items-center ${orderClasses}`}>
              <div
                className={`rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white/60 backdrop-blur-lg 
                            w-full max-w-[110px] sm:max-w-[220px] md:max-w-[250px]
                            ${
                              isFirst
                                ? "h-44 sm:h-64 md:h-72"
                                : "h-36 sm:h-52 md:h-60"
                            } 
                            flex items-center justify-center`}>
                <MediaItem
                  webViewLink={item.imageUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className={`absolute -top-4 px-4 py-1 text-xs sm:text-sm font-bold text-white rounded-full shadow-md ${
                  isFirst
                    ? "bg-yellow-400"
                    : rank === 2
                    ? "bg-gray-400"
                    : "bg-amber-700"
                }`}>
                #{rank}
              </div>

              <p className="mt-3 font-semibold text-gray-800 text-center text-xs sm:text-sm md:text-base">
                {item.name}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-500">
                {item.votes.toLocaleString()} suara
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* === TABLE (diperlebar & diberi padding aman di mobile) === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full max-w-[95%] sm:max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl 
                   shadow-lg overflow-hidden border border-gray-200 px-2 sm:px-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-3 px-3 sm:px-4 w-[70px] sm:w-[90px]">
                  Ranking
                </th>
                <th className="py-3 px-3 sm:px-4">Inovasi</th>
                <th className="py-3 px-3 sm:px-4 text-right w-[90px] sm:w-[120px]">
                  Suara
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="border-t hover:bg-blue-50/40 transition cursor-pointer"
                  onClick={() => setSelected(item)}>
                  <td className="py-3 px-3 font-medium text-gray-700">
                    #{index + 4}
                  </td>
                  <td className="py-3 px-3 flex items-center gap-3 min-w-[150px] sm:min-w-[220px]">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shadow-sm shrink-0">
                      <MediaItem
                        webViewLink={item.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-gray-800 font-medium block truncate max-w-[100px] sm:max-w-none">
                        {item.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="mt-1 text-[10px] sm:text-xs bg-gray-100">
                        {item.category}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right text-gray-700 font-semibold whitespace-nowrap">
                    {item.votes.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* === MODAL === */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-[90vw] sm:max-w-lg rounded-xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center sm:text-left">
                  {selected.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden shadow">
                  <MediaItem
                    webViewLink={selected.imageUrl}
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {selected.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-500 text-center sm:text-left">
                  Dibuat oleh: <b>{selected.creator.name}</b> (
                  {selected.creator.organization || "Independen"})
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
