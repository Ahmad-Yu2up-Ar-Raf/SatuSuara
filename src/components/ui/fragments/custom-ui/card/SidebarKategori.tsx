"use client"

import React from "react"
import { Button } from "../../shadcn-ui/button"
import { useInovasi } from "./InovasiContext"
import { X } from "lucide-react"

const kategoriList = [
  "Semua",
  "Pertanian (Agriculture)",
  "Peternakan",
  "Perikanan",
  "Perdagangan (UMKM)",
  "Pariwisata Desa",
  "Kerajinan",
  "Perkebunan",
  "Jasa & Teknologi (Desa Digital)",
]

export default function SidebarKategori({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const { kategoriAktif, setKategoriAktif } = useInovasi()

  return (
    <>
      {/* BACKDROP (MOBILE MODE) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full md:h-auto transform md:translate-x-0 transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        w-72 md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col`}
      >
        {/* CLOSE BUTTON (MOBILE) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-semibold">Kategori Inovasi</h2>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* TITLE (DESKTOP) */}
        <h2 className="text-xl font-semibold mb-4 hidden md:block">Kategori Inovasi</h2>

        {/* KATEGORI LIST */}
        <ul className="space-y-2 overflow-y-auto flex-1 no-scrollbar">
          {kategoriList.map((kategori) => (
            <li key={kategori}>
              <Button
                variant={kategoriAktif === kategori ? "default" : "outline"}
                className="w-full justify-start text-left whitespace-normal break-words text-sm"
                onClick={() => {
                  setKategoriAktif(kategori)
                  setSidebarOpen(false)
                }}
              >
                {kategori}
              </Button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
