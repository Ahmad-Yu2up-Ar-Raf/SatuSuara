"use client"

import React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shadcn-ui/card"
import { Button } from "../../shadcn-ui/button"

// --- Tipe data inovasi
type Inovasi = {
  id: number
  title: string
  description: string
  creator: string
  image: string
}

// --- Data dummy
const inovasiData: Inovasi[] = [
  {
    id: 1,
    title: "Digitalisasi UMKM Desa",
    description:
      "Platform online untuk membantu UMKM desa menjual produk ke pasar nasional.",
    creator: "Rina Setiawan",
    image: "https://source.unsplash.com/400x200/?village,market",
  },
  {
    id: 2,
    title: "Aplikasi Layanan Desa Pintar",
    description:
      "Aplikasi berbasis web untuk pelayanan administrasi warga secara online.",
    creator: "Budi Santoso",
    image: "https://source.unsplash.com/400x200/?village,app",
  },
  {
    id: 3,
    title: "Sistem Irigasi Otomatis",
    description:
      "Sensor otomatis untuk mengatur aliran air di sawah berdasarkan cuaca.",
    creator: "Dewi Rahmawati",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  },
]

// --- Komponen card
function InovasiCard({ inovasi }: { inovasi: Inovasi }) {
  const handleDetail = () => {
    // Contoh nanti diarahkan ke halaman detail
    alert(`Lihat detail inovasi: ${inovasi.title}`)
    // atau gunakan router.push(`/inovasi/${inovasi.id}`)
  }

  return (
    <Card className="w-full sm:w-80 shadow-lg hover:shadow-xl transition-all">
      <Image
        width={500}
        height={300}
        src={inovasi.image}
        alt={inovasi.title}
        className="h-40 w-full object-cover rounded-t-xl"
      />
      <CardHeader>
        <CardTitle>{inovasi.title}</CardTitle>
        <CardDescription>{inovasi.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Pembuat: <span className="font-medium">{inovasi.creator}</span>
        </p>
        <div className="flex justify-end">
          <Button onClick={handleDetail}>Detail</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Halaman utama
export default function JelajahiInovasiDesa() {
  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Jelajahi Inovasi Desa
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {inovasiData.map((inovasi) => (
          <InovasiCard key={inovasi.id} inovasi={inovasi} />
        ))}
      </div>
    </div>
  )
}
