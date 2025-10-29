"use client";

import React from "react";
import { Button } from "../../shadcn-ui/button";
import { useInovasi } from "./InovasiContext";
import { X } from "lucide-react";
import { ScrollArea } from "../../shadcn-ui/scroll-area";

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

export default function SidebarKategori({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const { kategoriAktif, setKategoriAktif } = useInovasi();
  const primary = "#63493f";

  return (
    <>
      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          z-40 flex flex-col border-r  dark:bg-gray-800 transition-transform duration-300
          fixed top-0 left-0 h-lvh w-72 md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER MOBILE */}
        <div className="flex justify-between items-center p-4 border-b md:hidden">
          <h2 className="text-xl font-semibold">Kategori Inovasi</h2>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* HEADER DESKTOP */}
        <h2 className="text-xl font-semibold mb-4 hidden md:block px-4 pt-6">Kategori Inovasi</h2>

        {/* LIST KATEGORI SCROLLABLE */}
        <ScrollArea className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {kategoriList.map((kategori) => (
              <li key={kategori}>
                <Button
                  variant="ghost"
                  style={{
                    backgroundColor: kategoriAktif === kategori ? primary : "transparent",
                    color: kategoriAktif === kategori ? "white" : "inherit",
                  }}
                  className={`w-full justify-start text-left rounded-lg px-3 py-2 text-sm transition-all duration-200
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    ${kategoriAktif === kategori ? "shadow-md" : ""}`}
                  onClick={() => {
                    setKategoriAktif(kategori);
                    setSidebarOpen(false);
                  }}
                >
                  {kategori}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>
    </>
  );
}
