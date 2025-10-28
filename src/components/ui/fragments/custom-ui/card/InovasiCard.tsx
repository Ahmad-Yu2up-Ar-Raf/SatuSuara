"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader } from "../../shadcn-ui/card";
import { Button } from "../../shadcn-ui/button";
import MediaItem from "../media/MediaItem";
import { ArrowLeft, ArrowRight, ArrowUp, Tag, ThumbsUp } from "lucide-react";
import { Badge } from "../../shadcn-ui/badge";

const primary = "#63493f";
const secondary = "#ffdfb1";

const kategoriList = [
  "Semua",
  "Pertanian (Agriculture)",
  "Peternakan",
  "Perikanan",
  "Perdagangan (UMKM)",
  "Pariwisata Desa",
  "Kerajinan / Industri Rumah Tangga",
  "Perkebunan",
  "Jasa & Teknologi (Desa Digital)",
];

const inovasiData = [
  {
    id: 1,
    title: "Digitalisasi UMKM Desa",
    description: "Platform untuk membantu UMKM desa menjual produk ke pasar nasional.",
    creator: "Rina Setiawan",
    image:
      "https://plus.unsplash.com/premium_photo-1682091805203-9013cef2ad1e?auto=format&fit=crop&q=60&w=600",
    kategori: "Perdagangan (UMKM)",
    votes: 123,
  },
  {
    id: 2,
    title: "Aplikasi Layanan Desa Pintar",
    description: "Pelayanan administrasi warga secara online.",
    creator: "Budi Santoso",
    image:
      "https://images.unsplash.com/photo-1548345680-f5475ea5df84?fm=jpg&q=60&w=600",
    kategori: "Jasa & Teknologi (Desa Digital)",
    votes: 98,
  },
  {
    id: 3,
    title: "Sistem Irigasi Otomatis",
    description: "Sensor otomatis untuk sawah berdasarkan cuaca.",
    creator: "Dewi Rahmawati",
    image:
      "https://plus.unsplash.com/premium_photo-1661884090131-77a0a87acd06?auto=format&fit=crop&q=80&w=1171",
    kategori: "Pertanian (Agriculture)",
    votes: 210,
  },
  {
    id: 4,
    title: "Pakan Ternak Fermentasi",
    description: "Meningkatkan kualitas pakan ternak menggunakan fermentasi alami.",
    creator: "Andi Saputra",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=60&w=600",
    kategori: "Peternakan",
    votes: 77,
  },
  {
    id: 5,
    title: "Wisata Edukasi Sawah",
    description: "Desa wisata berbasis edukasi pertanian.",
    creator: "Siti Aminah",
    image:
      "https://images.unsplash.com/photo-1558199141-391e097568f1?auto=format&fit=crop&q=60&w=600",
    kategori: "Pariwisata Desa",
    votes: 164,
  },
  {
    id: 6,
    title: "Kerajinan Bambu Inovatif",
    description: "Produk kerajinan ramah lingkungan dari bambu lokal.",
    creator: "Joko Prabowo",
    image:
      "https://images.unsplash.com/photo-1588854437230-1c7f1e84d3e7?auto=format&fit=crop&q=60&w=600",
    kategori: "Kerajinan / Industri Rumah Tangga",
    votes: 82,
  },
  // === Tambahan baru di bawah ini ===
  {
    id: 7,
    title: "Kopi Organik Perkebunan Rakyat",
    description: "Inovasi pengolahan kopi organik hasil perkebunan rakyat lokal.",
    creator: "Tono Wibisono",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=60&w=600",
    kategori: "Perkebunan",
    votes: 134,
  },
  {
    id: 8,
    title: "Budidaya Lele dengan Sistem Bioflok",
    description: "Teknologi bioflok untuk meningkatkan efisiensi budidaya lele desa.",
    creator: "Fitri Handayani",
    image:
      "https://images.unsplash.com/photo-1612538497638-05b3a12ab8be?auto=format&fit=crop&q=60&w=600",
    kategori: "Perikanan",
    votes: 96,
  },
  {
    id: 9,
    title: "Desa Wisata Ekologi",
    description: "Program wisata berbasis kelestarian alam dan edukasi lingkungan.",
    creator: "Agus Riyanto",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=60&w=600",
    kategori: "Pariwisata Desa",
    votes: 188,
  },
  {
    id: 10,
    title: "Sistem Informasi Pertanian Cerdas",
    description: "Platform digital untuk prediksi cuaca dan harga hasil tani.",
    creator: "Laila Karimah",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07a?auto=format&fit=crop&q=60&w=600",
    kategori: "Jasa & Teknologi (Desa Digital)",
    votes: 201,
  },
  {
    id: 11,
    title: "Pupuk Organik dari Limbah Ternak",
    description: "Pengolahan limbah peternakan menjadi pupuk ramah lingkungan.",
    creator: "Rizal Maulana",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=60&w=600",
    kategori: "Peternakan",
    votes: 109,
  },
  {
    id: 12,
    title: "Anyaman Pandan Kreatif",
    description: "Produk anyaman pandan modern yang punya nilai jual tinggi.",
    creator: "Yuni Kartika",
    image:
      "https://images.unsplash.com/photo-1588854337231-4e4e4a7c7b3a?auto=format&fit=crop&q=60&w=600",
    kategori: "Kerajinan / Industri Rumah Tangga",
    votes: 87,
  },
  {
    id: 13,
    title: "Layanan Drone Mapping Lahan",
    description: "Pemetaan lahan desa menggunakan drone untuk efisiensi pertanian.",
    creator: "Deni Arifin",
    image:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&q=60&w=600",
    kategori: "Jasa & Teknologi (Desa Digital)",
    votes: 145,
  },
  {
    id: 14,
    title: "Toko Online Hasil Perkebunan",
    description: "Marketplace khusus produk hasil perkebunan lokal.",
    creator: "Mega Lestari",
    image:
      "https://images.unsplash.com/photo-1590080875831-4a3b6b47ee39?auto=format&fit=crop&q=60&w=600",
    kategori: "Perdagangan (UMKM)",
    votes: 172,
  },
]
;

export default function ColorfullInovasiCardList() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [page, setPage] = useState(1);
  const [showTop, setShowTop] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Hanya animasi fade-in dan scale, tidak ganggu transform hover
    gsap.fromTo(
      ".colorfull-card",
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, [page, kategoriAktif]);

  const filteredData =
    kategoriAktif === "Semua"
      ? inovasiData
      : inovasiData.filter((i) => i.kategori === kategoriAktif);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const scrollToGridTop = () => {
    if (gridRef.current) {
      const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages));
    setTimeout(scrollToGridTop, 0);
  };
  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 1));
    setTimeout(scrollToGridTop, 0);
  };
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="py-2 w-full">
      <div className="container flex flex-col items-center gap-8">
        {/* FILTER */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {kategoriList.map((kat) => (
            <Button
              key={kat}
              variant={kategoriAktif === kat ? "default" : "outline"}
              style={{
                backgroundColor: kategoriAktif === kat ? primary : undefined,
                color: kategoriAktif === kat ? "white" : undefined,
              }}
              onClick={() => {
                setKategoriAktif(kat);
                setPage(1);
              }}
            >
              {kat}
            </Button>
          ))}
        </div>

        {/* GRID */}
       <div ref={gridRef} className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full auto-rows-fr">
  {paginatedData.length > 0 ? (
    paginatedData.map((post) => (
      <Card
        key={post.id}
        className="colorfull-card relative border-0  dark:bg-gray-800 shadow-md rounded-2xl overflow-visible transform transition-transform duration-300 hover:scale-105 hover:rotate-3 hover:shadow-2xl flex flex-col h-full"
        style={{ willChange: "transform" }}
      >
        <CardHeader className="p-4 flex flex-col gap-3 flex-grow">
          <Badge
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: secondary, color: primary }}
          >
            <Tag className="w-3 h-3" /> {post.kategori}
          </Badge>
          <h3 className="text-xl md:text-2xl font-semibold" style={{ color: primary }}>
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 flex-grow">{post.description}</p>
          <p className="text-sm text-gray-500">
            Pembuat: <span className="font-medium">{post.creator}</span>
          </p>
        </CardHeader>

        <CardContent className="p-0 flex flex-col flex-1">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <MediaItem
              webViewLink={post.image}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-between p-4 mt-auto">
            <Button
              style={{ backgroundColor: primary, color: "white", borderRadius: "8px" }}
              className="hover:opacity-90 transition-transform hover:scale-105"
              onClick={() => alert(`Lihat detail: ${post.title}`)}
            >
              Lihat Detail <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <ThumbsUp className="w-4 h-4" /> {post.votes} voting
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  ) : (
    <div className="col-span-full flex justify-center items-center min-h-[300px] animate-fadeIn">
      <p className="text-gray-500 text-lg text-center">
        Wah sepertinya belum ada ide di kategori ini 
      </p>
    </div>
  )}
</div>


        {/* PAGINATION */}
        {filteredData.length > 0 && (
          <div className="flex gap-4 items-center mt-6">
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
        )}

        {/* BACK TO TOP */}
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
    </section>
  );
}
