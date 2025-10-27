"use client"

import React, { useState } from "react"
import { InovasiProvider } from "@/components/ui/fragments/custom-ui/card/InovasiContext"
import SidebarKategori from "@/components/ui/fragments/custom-ui/card/SidebarKategori"
import InovasiCardList from "@/components/ui/fragments/custom-ui/card/InovasiCard"
import { Button } from "@/components/ui/fragments/shadcn-ui/button"
import { Menu, Lightbulb } from "lucide-react" // ✅ pakai icon lucide-react

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <InovasiProvider>
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 ">
        {/* === SIDEBAR (LEFT) === */}
        <SidebarKategori sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* === MAIN CONTENT (RIGHT) === */}
        <div className="flex-1 flex flex-col">
          {/* HEADER */}
          <header className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700  dark:bg-gray-800 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" /> {/* 💡 diganti icon */}
              <h1 className="text-2xl sm:text-3xl font-bold">Jelajahi Inovasi Desa</h1>
            </div>

            {/* TOGGLE SIDEBAR (MOBILE) */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </header>

          {/* CARD LIST */}
          <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
            <InovasiCardList />
          </main>
        </div>
      </div>
    </InovasiProvider>
  )
}
