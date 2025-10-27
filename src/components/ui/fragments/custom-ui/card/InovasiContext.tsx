"use client"

import React, { createContext, useContext, useState } from "react"

type InovasiContextType = {
  kategoriAktif: string
  setKategoriAktif: (kategori: string) => void
}

const InovasiContext = createContext<InovasiContextType | undefined>(undefined)

export function InovasiProvider({ children }: { children: React.ReactNode }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua")

  return (
    <InovasiContext.Provider value={{ kategoriAktif, setKategoriAktif }}>
      {children}
    </InovasiContext.Provider>
  )
}

export function useInovasi() {
  const context = useContext(InovasiContext)
  if (!context) {
    throw new Error("useInovasi harus digunakan di dalam <InovasiProvider>")
  }
  return context
}

export default InovasiContext
