"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Button } from "../../shadcn-ui/button";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/fragments/shadcn-ui/carousel";
import { cn } from "@/lib/utils";
import InovasiCard from "../card/InovasiCard";
import type { Inovasi } from "@/schemas/inovasi.schema";
import inovationsData from "@/config/data/Inovations.json";
import HeaderInovasi from "@/components/ui/core/layout/header/jelajahiInovasiHeader";
import { useIsMobile } from "@/hooks/use-mobile";
const primary = "#63493f";
const kategoriList = [
  "Semua",
  "Kesehatan",
  "Pendidikan",
  "Lingkungan",
  "Pangan",
  "Energi",
  "Transportasi",
  "Agrikultur",
  "Ekonomi Kreatif",
  "Sosial",
  "Teknologi",
  "Keamanan",
];

interface InovasiBlockProps {
  initialKategori?: string;
}

export default function InovasiBlock({ initialKategori = "Semua" }: InovasiBlockProps) {
  const [kategoriAktif, setKategoriAktif] = useState(initialKategori);
  const [page, setPage] = useState(1);

  // Effect untuk mengupdate kategori ketika initialKategori berubah
  useEffect(() => {
    setKategoriAktif(initialKategori);
    setPage(1); // Reset page ketika kategori berubah
  }, [initialKategori]);
  const [showTop, setShowTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 9;

  const allInovations = inovationsData as Inovasi[];
  const totalVotes = allInovations.reduce((sum, i) => sum + i.totalVote, 0);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".inovasi-card",
      { scale: 0.9, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, [page, kategoriAktif, searchQuery]);

  // Filter and search logic with useMemo for optimization
  const filteredData = useMemo(() => {
    let data = allInovations;

    // Filter by category
    if (kategoriAktif !== "Semua") {
      data = data.filter((i) => i.kategori === kategoriAktif);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (i) =>
          i.judul.toLowerCase().includes(query) ||
          i.deskripsi.toLowerCase().includes(query) ||
          i.kategori.toLowerCase().includes(query) ||
          i.pembuat.nama.toLowerCase().includes(query)
      );
    }

    return data;
  }, [allInovations, kategoriAktif, searchQuery]);

  // Sort by votes (descending)
  const sortedData = useMemo(() => 
    [...filteredData].sort((a, b) => b.totalVote - a.totalVote),
    [filteredData]
  );

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filter or search changes
  useEffect(() => {
    setPage(1);
  }, [kategoriAktif, searchQuery]);

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

  const handleCardClick = (inovasi: Inovasi) => {
    console.log("Clicked inovasi:", inovasi.slug);
    // Router.push(`/inovasi/${inovasi.slug}`);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleResetFilter = () => {
    setKategoriAktif("Semua");
    setSearchQuery("");
    setPage(1);
  };
  const isMobile = useIsMobile()
  return (
    <>
      <HeaderInovasi 
        totalIdeas={allInovations.length} 
        totalVotes={totalVotes}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <section className="py-1 w-full container sm:p-2 flex-1">
        <div className="space-y-5">
          {/* Category Filter Carousel */}
          <Carousel
            className="overflow-hidden"
            opts={{
              align: "start",
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="mx-4 relative cursor-grab">
              {kategoriList.map((kat, i) => (
                <CarouselItem
                  key={i}
                  className={cn("w-fit", i > 0 ? "pl-4" : "pl-0")}
                >
                  <Button
                    variant={kategoriAktif === kat ? "default" : "outline"}
                    style={{
                      backgroundColor: kategoriAktif === kat ? primary : undefined,
                      color: kategoriAktif === kat ? "white" : undefined,
                    }}
                    onClick={() => setKategoriAktif(kat)}
                  >
                    {kat}
                    <span className="ml-2 text-xs opacity-70">
                      ({kat === "Semua"
                        ? allInovations.length
                        : allInovations.filter((i) => i.kategori === kat).length
                      })
                    </span>
                  </Button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Current Filter Info */}
          <div className="flex items-center justify-between px-4">
            <p className="text-sm text-muted-foreground">
              Menampilkan <span className="font-semibold text-foreground">{paginatedData.length}</span> dari{" "}
              <span className="font-semibold text-foreground">{filteredData.length}</span> inovasi
              {searchQuery && (
                <span className="ml-1">
                  untuk "<span className="font-semibold text-foreground">{searchQuery}</span>"
                </span>
              )}
            </p>
            {(kategoriAktif !== "Semua" || searchQuery) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResetFilter}
                className="text-primary rounded-2xl"
              >
                Reset Semua
              </Button>
            )}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid gap-7 md:gap-3 px-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full auto-rows-fr"
          >
            {paginatedData.length > 0 ? (
              paginatedData.map((inovasi, i) => (
                <InovasiCard
                  index={i}
                  hovered={hovered}
                  setHovered={setHovered}
                  key={inovasi.id}
                  inovasi={inovasi}
                  onClick={handleCardClick}
                  className="inovasi-card"
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] animate-fadeIn">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg text-center mb-2">
                  {searchQuery 
                    ? `Tidak ada inovasi yang cocok dengan "${searchQuery}"`
                    : "Belum ada inovasi di kategori ini"
                  }
                </p>
                <p className="text-gray-400 text-sm">
                  {searchQuery 
                    ? "Coba kata kunci lain"
                    : "Coba kategori lain atau reset filter"
                  }
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && totalPages > 1 && (
            <div className="flex gap-4 items-center justify-between mt-8">
              <Button
                variant="ghost"
                disabled={page === 1}
                onClick={handlePrev}
                style={{ borderColor: primary, color: primary }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>

              <div className="flex gap-2 items-center">
                {!isMobile && Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <Button
                      key={i}
                      variant={page === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => {
                        setPage(pageNum);
                        setTimeout(scrollToGridTop, 0);
                      }}
                      style={{
                        backgroundColor: page === pageNum ? primary : undefined,
                        color: page === pageNum ? "white" : primary,
                        borderColor: primary,
                      }}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                disabled={page === totalPages}
                onClick={handleNext}
                style={{ borderColor: primary, color: primary }}
              >
                Selanjutnya
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Back to Top */}
        
        </div>
      </section>
    </>
  );
}