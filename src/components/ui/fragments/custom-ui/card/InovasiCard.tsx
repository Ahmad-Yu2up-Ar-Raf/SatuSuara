"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card } from "../../shadcn-ui/card"
import { Button } from "../../shadcn-ui/button"
import MediaItem from "../media/MediaItem"
import { useInovasi } from "./InovasiContext"
import { ArrowLeft, ArrowRight, ArrowUp, Tag } from "lucide-react"

const primary = "#63493f"
const secondary = "#ffdfb1"

const inovasiData = [
  {
    id: 1,
    title: "Digitalisasi UMKM Desa",
    description:
      "Platform untuk membantu UMKM desa menjual produk ke pasar nasional.",
    creator: "Rina Setiawan",
    image:
      "https://plus.unsplash.com/premium_photo-1682091805203-9013cef2ad1e?auto=format&fit=crop&q=60&w=600",
    kategori: "Perdagangan (UMKM)",
  },
  {
    id: 2,
    title: "Aplikasi Layanan Desa Pintar",
    description: "Pelayanan administrasi warga secara online.",
    creator: "Budi Santoso",
    image:
      "https://images.unsplash.com/photo-1548345680-f5475ea5df84?fm=jpg&q=60&w=600",
    kategori: "Jasa & Teknologi (Desa Digital)",
  },
  {
    id: 3,
    title: "Sistem Irigasi Otomatis",
    description: "Sensor otomatis untuk sawah berdasarkan cuaca.",
    creator: "Dewi Rahmawati",
    image:
      "https://plus.unsplash.com/premium_photo-1661884090131-77a0a87acd06?auto=format&fit=crop&q=80&w=1171",
    kategori: "Pertanian (Agriculture)",
  },
  {
    id: 4,
    title: "Pakan Ternak Fermentasi",
    description:
      "Meningkatkan kualitas pakan ternak menggunakan fermentasi alami.",
    creator: "Andi Saputra",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=60&w=600",
    kategori: "Peternakan",
  },
  {
    id: 5,
    title: "Wisata Edukasi Sawah",
    description: "Desa wisata berbasis edukasi pertanian.",
    creator: "Siti Aminah",
    image:
      "https://images.unsplash.com/photo-1558199141-391e097568f1?auto=format&fit=crop&q=60&w=600",
    kategori: "Pariwisata Desa",
  },
  {
    id: 6,
    title: "Kerajinan Bambu Inovatif",
    description: "Produk kerajinan ramah lingkungan dari bambu lokal.",
    creator: "Joko Prabowo",
    image:
      "https://images.unsplash.com/photo-1588854437230-1c7f1e84d3e7?auto=format&fit=crop&q=60&w=600",
    kategori: "Kerajinan / Industri Rumah Tangga",
  },
  {
    id: 7,
    title: "Sistem Air Bersih Otomatis",
    description: "Teknologi pemurnian air sungai menjadi air layak konsumsi.",
    creator: "Dian Pertiwi",
    image:
      "https://images.unsplash.com/photo-1603384633451-9ed2d3d5a5f8?auto=format&fit=crop&q=60&w=600",
    kategori: "Lingkungan",
  },
  {
    id: 8,
    title: "Desa Wisata Digital",
    description: "Promosi wisata desa melalui aplikasi digital.",
    creator: "Bagas Ramadhan",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=60&w=600",
    kategori: "Pariwisata Desa",
  },
  {
    id: 9,
    title: "Pupuk Organik Inovatif",
    description: "Pembuatan pupuk alami dari limbah rumah tangga.",
    creator: "Ratna Sari",
    image:
      "https://images.unsplash.com/photo-1556767576-b3b9d3ac9b58?auto=format&fit=crop&q=60&w=600",
    kategori: "Pertanian (Agriculture)",
  },
]

export default function InovasiCardList() {
  const { kategoriAktif } = useInovasi()
  const [page, setPage] = useState(1)
  const [showTop, setShowTop] = useState(false)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredData =
    kategoriAktif === "Semua"
      ? inovasiData
      : inovasiData.filter((i) => i.kategori === kategoriAktif)

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Fungsi scroll langsung ke atas grid
  const scrollToGridTop = () => {
    if (gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo(0, top)
    }
  }

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages))
    setTimeout(scrollToGridTop, 0)
  }

  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1))
    setTimeout(scrollToGridTop, 0)
  }

  const handleScrollTop = () => window.scrollTo(0, 0)

  return (
    <section className="py-20 w-full">
      <div className="container flex flex-col items-center gap-16">
        {/* === GRID === */}
        <div ref={gridRef} className="grid gap-y-14 sm:grid-cols-12 sm:gap-y-16 md:gap-y-20">
          {paginatedData.map((post, i) => (
            <div
              key={post.id}
              className="relative sm:col-span-12 lg:col-span-10 lg:col-start-2 group opacity-0"
              style={{
                animation: `fadeUp 0.6s ease ${i * 0.1}s forwards`,
              }}
            >
              {/* Glow border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:shadow-[0_0_25px_rgba(99,73,63,0.25)] transition-all duration-500"></div>

              <Card className="relative border-0 bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.01]">
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-6 md:items-center">
                  {/* TEKS */}
                  <div className="sm:col-span-5 p-6 md:p-8">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-gray-500">
                      <Tag className="w-3 h-3" color={primary} />
                      <span>{post.kategori}</span>
                    </div>

                    <h3
                      className="text-xl font-semibold md:text-2xl lg:text-3xl"
                      style={{ color: primary }}
                    >
                      {post.title}
                    </h3>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {post.description}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      Pembuat: <span className="font-medium">{post.creator}</span>
                    </p>

                    <div className="mt-6">
                      <Button
                        style={{
                          backgroundColor: primary,
                          color: "white",
                          borderRadius: "8px",
                        }}
                        className="hover:opacity-90 transition-transform hover:scale-105"
                        onClick={() => alert(`Lihat detail: ${post.title}`)}
                      >
                        Lihat Detail
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* GAMBAR */}
                  <div className="order-first sm:order-last sm:col-span-5">
                    <div
                      className="aspect-[16/9] overflow-hidden rounded-2xl border transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ borderColor: secondary }}
                    >
                      <MediaItem
                        webViewLink={post.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* === PAGINATION === */}
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={handlePrev}
            style={{ borderColor: primary, color: primary }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>

          <span className="text-sm font-medium text-gray-600">
            Halaman {page} dari {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={handleNext}
            style={{ borderColor: primary, color: primary }}
          >
            Selanjutnya
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* === BACK TO TOP === */}
        {showTop && (
          <Button
            onClick={handleScrollTop}
            className="fixed bottom-6 right-6 rounded-full p-3 shadow-lg transition-all"
            style={{ backgroundColor: primary, color: secondary }}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* === ANIMATION CSS === */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
