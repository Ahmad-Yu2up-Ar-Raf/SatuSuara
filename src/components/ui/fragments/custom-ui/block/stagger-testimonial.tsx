"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "../../shadcn-ui/button"
import { Card } from "../../shadcn-ui/card"
import { MessageCircle } from "lucide-react"

interface Testimonial {
  image: string
  name: string
  username: string
  text: string
  social?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
  title?: string
  description?: string
  maxDisplayed?: number
}

export function InovasiTestimonials({
  testimonials,
  className,
  title = "Apa Kata Mereka",
  description = "Dengarkan langsung dari masyarakat yang merasakan dampak positif inovasi ini",
  maxDisplayed = 6,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="flex flex-col gap-5 mb-8">
          <div className="flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h2 className="text-center text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <p className="text-center text-muted-foreground  mx-auto">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex justify-center items-start gap-5 flex-wrap",
            !showAll &&
              testimonials.length > maxDisplayed &&
              "max-h-[720px] overflow-hidden",
          )}
        >
          {testimonials
            .slice(0, showAll ? undefined : maxDisplayed)
            .map((testimonial, index) => (
              <Card
                key={index}
                className="w-full sm:w-80 h-auto p-5 relative bg-card border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col pl-4">
                    <span className="font-semibold text-base">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.username}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-foreground leading-relaxed text-sm">
                    "{testimonial.text}"
                  </p>
                </div>
              </Card>
            ))}
        </div>

        {testimonials.length > maxDisplayed && !showAll && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
              <Button 
                variant="default" 
                onClick={() => setShowAll(true)}
                className="shadow-lg"
              >
                Lihat Semua Komentar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================
// DATA DUMMY UNTUK KOMENTAR INOVASI
// ============================================

export const testimonialInovasiDummy: Testimonial[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    text: 'Inovasi ini benar-benar membantu menghemat waktu dan biaya irigasi. Hasil panen saya meningkat 35% sejak menggunakan sistem ini!',
    name: 'Budi Santoso',
    username: 'Petani - Subang',
  },
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
    text: 'Sangat praktis dan mudah digunakan. Saya bisa pantau kelembaban tanah dari smartphone. Teknologi yang tepat guna untuk petani Indonesia.',
    name: 'Ahmad Fauzi',
    username: 'Petani - Karawang',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    text: 'Sebagai penyuluh pertanian, saya merekomendasikan inovasi ini ke banyak petani. Dampaknya nyata dan berkelanjutan!',
    name: 'Siti Nurhaliza',
    username: 'Penyuluh Pertanian - Bandung',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    text: 'Konsep IoT-nya sederhana tapi efektif. Hemat air hingga 50% dan tanaman lebih sehat. Investasi yang sangat worth it!',
    name: 'Dedi Kurniawan',
    username: 'Petani Muda - Cianjur',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    text: 'Alhamdulillah, dengan sistem ini saya tidak perlu khawatir tanaman kekurangan air saat musim kemarau. Sistem otomatisnya sangat membantu.',
    name: 'Aminah Zahra',
    username: 'Petani - Purwakarta',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    text: 'Tim support-nya responsif dan membantu instalasi. Inovasi lokal yang berkualitas internasional!',
    name: 'Eko Prasetyo',
    username: 'Kelompok Tani - Sukabumi',
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    text: 'Saya sudah coba berbagai metode irigasi, tapi yang ini paling efisien. Data real-time-nya membantu saya ambil keputusan lebih baik.',
    name: 'Rina Wulandari',
    username: 'Agripreneur - Bogor',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    text: 'Harga terjangkau untuk teknologi sekelas ini. ROI-nya cepat karena hasil panen meningkat signifikan.',
    name: 'Hendra Gunawan',
    username: 'Petani - Indramayu',
  },
  {
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    text: 'Inovasi yang sangat dibutuhkan petani kecil seperti kami. Mudah dipahami dan tidak ribet maintenance-nya.',
    name: 'Dewi Lestari',
    username: 'Petani Organik - Garut',
  },
  {
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
    text: 'Sensor-sensornya akurat dan tahan cuaca ekstrem. Sudah setahun pakai belum ada masalah sama sekali.',
    name: 'Rizki Ramadhan',
    username: 'Teknisi Pertanian - Tasikmalaya',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    text: 'Dashboard monitoring-nya user-friendly. Bahkan orang tua saya yang gaptek bisa pakai dengan mudah.',
    name: 'Tia Permata',
    username: 'Mahasiswa Pertanian - Bandung',
  },
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    text: 'Inovasi ini bukan hanya soal teknologi, tapi juga edukasi ke petani tentang pertanian modern. Sangat inspiratif!',
    name: 'Fajar Maulana',
    username: 'Dinas Pertanian - Kab. Bandung',
  },
];

// ============================================
// CONTOH PENGGUNAAN
// ============================================

