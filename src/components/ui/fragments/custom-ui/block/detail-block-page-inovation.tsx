"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "../../shadcn-ui/button"
import { Card } from "../../shadcn-ui/card"
import { Badge } from "../../shadcn-ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "../../shadcn-ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../shadcn-ui/dialog"
import { Input } from "../../shadcn-ui/input"

import { AspectRatio } from "../../shadcn-ui/aspect-ratio"
import {
  ThumbsUp,
  Award,
  Share2,
  Bookmark,
  ArrowLeft,
  Users,
  Leaf,
  Banknote,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
  Sparkles,
  TrendingUp,
  ChevronRight,
  InfoIcon,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import MediaItem from "../media/MediaItem"

// Types
interface Media {
  kind: "image" | "lottie"
  url: string
  caption?: string
  license?: string
  source?: string
}

interface Pembuat {
  id: string
  nama: string
  peran?: string
  organisasi?: string
  avatarUrl?: string
}

interface Lokasi {
  provinsi?: string
  kabupatenKota?: string
}

interface ImpactMetrics {
  beneficiaries?: number
  co2SavedKg?: number
  fundsRaisedIdr?: number
  jobsCreated?: number
}

interface Sumber {
  type: "article" | "paper" | "repo" | "video" | "official"
  title?: string
  url: string
  publishedAt?: string
}

interface Inovasi {
  id: string
  slug: string
  judul: string
  ringkasanPendek: string
  deskripsi: string
  media: Media[]
  pembuat: Pembuat
  kategori: string
  subKategori?: string
  tag: string[]
  lokasi?: Lokasi
  dibuatPada: string
  diupdatePada?: string
  totalVote: number
  status: "draft" | "published" | "archived"
  impactMetrics?: ImpactMetrics
  sumber: Sumber[]
  confidence: "verified" | "reported" | "unverified"
  license?: string
}

// Mock Data
const mockInovasi: Inovasi = {
  id: "1a7c3d2e-0a5f-4b9c-8e4d-6f7a8b0c9d1e",
  slug: "genose-c19-deteksi-covid",
  judul: "GeNose C19 - Alat Deteksi Covid-19 Berbasis AI",
  ringkasanPendek: "Alat skrining Covid-19 non-invasif melalui hembusan napas menggunakan sensor gas dan kecerdasan buatan.",
  deskripsi: "GeNose C19 adalah inovasi terobosan dari Universitas Gadjah Mada yang mampu mendeteksi Covid-19 melalui hembusan napas dalam waktu kurang dari 2 menit. Alat ini menggunakan teknologi sensor gas yang dikombinasikan dengan algoritma machine learning untuk menganalisis pola napas pasien.\n\nDengan tingkat akurasi yang tinggi, GeNose telah digunakan di berbagai bandara, stasiun, dan fasilitas umum di Indonesia, menyediakan solusi skrining massal yang lebih cepat, murah, dan nyaman dibanding metode PCR atau rapid test konvensional.\n\nInovasi ini tidak hanya membantu dalam penanganan pandemi, tetapi juga membuka peluang untuk deteksi penyakit lainnya melalui analisis napas di masa depan.",
  media: [
    {
      kind: "image",
      url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200",
      caption: "Tim peneliti UGM dengan alat GeNose C19",
      license: "Unsplash",
      source: "UGM Official"
    }
  ],
  pembuat: {
    id: "9d1e4c7a-6f8b-4a5c-9e2d-3b0c1a7f6e8d",
    nama: "Tim Peneliti UGM",
    peran: "Inisiator dan Pengembang Utama",
    organisasi: "Universitas Gadjah Mada (UGM)",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lambang_UGM.svg/1200px-Lambang_UGM.svg.png"
  },
  kategori: "Kesehatan",
  subKategori: "Diagnostik & AI",
  tag: ["Covid-19", "diagnostik", "AI", "pernapasan", "UGM"],
  lokasi: {
    provinsi: "DI Yogyakarta",
    kabupatenKota: "Sleman"
  },
  dibuatPada: "2020-03-01T08:00:00Z",
  diupdatePada: "2021-06-15T10:30:00Z",
  totalVote: 45000,
  status: "published",
  impactMetrics: {
    beneficiaries: 10000000,
    co2SavedKg: 50000,
    fundsRaisedIdr: 50000000000
  },
  sumber: [
    {
      type: "official",
      title: "Situs Resmi GeNose UGM",
      url: "https://genose.ugm.ac.id/"
    },
    {
      type: "article",
      title: "GeNose C19 UGM Siap Diproduksi Massal",
      url: "https://kompas.id/baca/humaniora/2021/01/15/genose-c19-ugm-siap-diproduksi-massal/"
    }
  ],
  confidence: "verified"
}

// Helper Functions
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

// Components
// function StatCounter({ 
//   icon, 
//   value, 
//   label, 
//   suffix = "", 
//   delay = 0 
// }: { 
//   icon: React.ReactNode
//   value: number
//   label: string
//   suffix?: string
//   delay?: number
// }) {
//   const countRef = useRef(null)
//   const isInView = useInView(countRef, { once: false })
//   const [hasAnimated, setHasAnimated] = useState(false)

//   const springValue = useSpring(0, {
//     stiffness: 50,
//     damping: 10,
//   })

//   useEffect(() => {
//     if (isInView && !hasAnimated) {
//       springValue.set(value)
//       setHasAnimated(true)
//     } else if (!isInView && hasAnimated) {
//       springValue.set(0)
//       setHasAnimated(false)
//     }
//   }, [isInView, value, springValue, hasAnimated])

//   const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

//   return (
//     <div
//       className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
//       variants={{
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: { duration: 0.6, delay },
//         },
//       }}
//       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//     >
//       <div
//         className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/10 transition-colors duration-300"
//         whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
//       >
//         {icon}
//       </div>
//       <div ref={countRef} className="text-3xl font-bold text-foreground flex items-center">
//         <span>{displayValue}</span>
//         <span>{suffix}</span>
//       </div>
//       <p className="text-muted-foreground text-sm mt-1">{label}</p>
//       <div className="w-10 h-0.5 bg-primary mt-3 group-hover:w-16 transition-all duration-300" />
//     </div>
//   )
// }

// function DonateDialog({ 
//   inovasi, 
//   isOpen, 
//   onClose, 
//   onDonate, 
//   isLoading 
// }: { 
//   inovasi: Inovasi
//   isOpen: boolean
//   onClose: () => void
//   onDonate: (amount: number) => Promise<void>
//   isLoading?: boolean
// }) {
//   const [amount, setAmount] = useState<number>(0)
//   const amounts = [10000, 25000, 50000, 100000, 250000]

//   return (
//     <Dialog open={isOpen} onOpenChange={() => onClose()}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Dukung Inovasi Ini</DialogTitle>
//           <DialogDescription>
//             Pilih nominal donasi untuk mendukung &quot;{inovasi.judul}&quot;
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid grid-cols-3 gap-2 my-4">
//           {amounts.map((amt) => (
//             <Button
//               key={amt}
//               variant={amount === amt ? "default" : "outline"}
//               className="w-full"
//               onClick={() => setAmount(amt)}
//             >
//               {formatCurrency(amt)}
//             </Button>
//           ))}
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="custom-amount" className="text-sm">
//             Atau masukkan nominal lain:
//           </label>
//           <Input
//             id="custom-amount"
//             type="number"
//             min="1000"
//             step="1000"
//             value={amount || ''}
//             onChange={(e) => setAmount(Number(e.target.value))}
//             placeholder="Rp"
//           />
//         </div>

//         <DialogFooter className="mt-4">
//           <Button variant="outline" onClick={onClose}>
//             Batal
//           </Button>
//           <Button 
//             onClick={() => onDonate(amount)}
//             disabled={amount < 1000 || isLoading}
//           >
//             {isLoading ? 'Memproses...' : 'Donasi Sekarang'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

export default function InovasiDetailPage({ inovasi = mockInovasi }: { inovasi?: Inovasi }) {
  const [showDonateDialog, setShowDonateDialog] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [isDonating, setIsDonating] = useState(false)
  const [localVoteCount, setLocalVoteCount] = useState(inovasi.totalVote)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

 

 


  const handleVote = async () => {
    setIsVoting(true)
    try {
      // Optimistic update
      setLocalVoteCount(prev => prev + 1)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // TODO: Call actual API
      // const response = await fetch(`/api/inovasi/${inovasi.id}/vote`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: null })
      // })
      
      alert('Terima kasih, suara Anda tercatat!')
    } catch (error) {
      // Revert on error
      setLocalVoteCount(prev => prev - 1)
      alert('Terjadi kesalahan, silakan coba lagi')
    } finally {
      setIsVoting(false)
    }
  }

  const handleDonate = async (amount: number) => {
    setIsDonating(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // TODO: Call actual API
      // const response = await fetch(`/api/inovasi/${inovasi.id}/donate`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amountIdr: amount, method: 'bank_transfer' })
      // })
      
      alert(`Terima kasih atas donasi ${formatCurrency(amount)}!`)
      setShowDonateDialog(false)
    } catch (error) {
      alert('Terjadi kesalahan, silakan coba lagi')
    } finally {
      setIsDonating(false)
    }
  }

  const confidenceColor = {
    verified: 'bg-green-500/10 text-green-700 dark:text-green-400',
    reported: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    unverified: 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
  }

  const confidenceLabel = {
    verified: 'Terverifikasi',
    reported: 'Dilaporkan',
    unverified: 'Belum Terverifikasi'
  }

  return (
    <div className="space-y-3   md:space-y-1 container px-5">
      {/* Back Button */}
    <nav className='z-50  pt-5 top-0 bg-background/95 backdrop-blur flex items-center justify-between'>
        <Link 
          href="/" 
          className={cn(
            buttonVariants({ variant: "link" }), 
            'flex has-[>svg]:px-0 w-fit py-2 md:flex text-base items-center gap-1 px-0 group transition-colors'
          )}
        >
          <ArrowLeft className="size-5 group-hover:-translate-x-1 group-hover:transform transition-all ease-out duration-300" />
          <span>Kembali</span>
        </Link>
      </nav>
      {/* Hero Section */}
      <section
     
        className={cn(
          "relative justify-center flex min-h-lvh content-center w-full flex-col overflow-hidden bg-background text-foreground md:flex-row",
      
        )}
   

      >
        {/* Left Side: Content */}
        <div className="flex w-full px-2 flex-col justify-between ">
            {/* Top Section: Logo & Main Content */}
            <div>
                <header className="mb-5" >
           
                        <div className="flex items-start">
                           <Avatar className="size-12">
                  {inovasi.pembuat.avatarUrl && (
                    <AvatarImage src={inovasi.pembuat.avatarUrl} alt={inovasi.pembuat.nama} />
                  )}
                  <AvatarFallback>{inovasi.pembuat.nama.charAt(0)}</AvatarFallback>
                </Avatar>
                            <div>
                                {<p className="text-sm font-bold text-foreground">{inovasi.pembuat.nama}</p>}
                                {<p className="text-xs tracking-wider text-muted-foreground">{inovasi.pembuat.organisasi}</p>}
                            </div>
                        </div>
              
                </header>

                <main >
                    <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl" >
                    {inovasi.judul}
                    </h1>
                    <div className="my-6 h-1 w-20 bg-primary" ></div>
                    <p className="mb-8 max-w-md line-clamp-3 text-base text-muted-foreground" >
                       {inovasi.deskripsi}
                    </p>
                    <Link href={"#"} className="text-lg font-bold tracking-widest text-primary transition-colors hover:text-primary/80" >
                     Donasi
                    </Link>
                </main>
            </div>

            {/* Bottom Section: Footer Info */}
            <footer className="mt-12 w-full" >
                <div className="grid grid-cols-1 gap-6 text-xs text-muted-foreground sm:grid-cols-3">
                    <div className="flex items-center">
                        <MapPin type="website" />
                        <span>{inovasi.lokasi?.kabupatenKota}</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="phone" />
                        <span>sdasd</span>
                    </div>
                    <div className="flex items-center">
                        <InfoIcon type="address" />
                        <span>asdasda</span>
                    </div>
                </div>
            </footer>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        {/* <div 
          className="w-full sr-only min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
        </div> */}
      </section>

      {/* Main Content */}
      {/* <section className="max-w-7xl mx-auto px-4 py-16 space-y-16">
       
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Deskripsi Lengkap
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {inovasi.deskripsi.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        </div>

      
        {inovasi.impactMetrics && (
          <div
            ref={statsRef}
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                Dampak & Metrik
              </h2>
              <p className="text-muted-foreground">Kontribusi nyata untuk Indonesia</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {inovasi.impactMetrics.beneficiaries && (
                <StatCounter
                  icon={<Users className="w-6 h-6" />}
                  value={inovasi.impactMetrics.beneficiaries}
                  label="Penerima Manfaat"
                  suffix="+"
                  delay={0}
                />
              )}
              {inovasi.impactMetrics.co2SavedKg && (
                <StatCounter
                  icon={<Leaf className="w-6 h-6" />}
                  value={inovasi.impactMetrics.co2SavedKg}
                  label="CO2 Terselamatkan (kg)"
                  delay={0.1}
                />
              )}
              {inovasi.impactMetrics.fundsRaisedIdr && (
                <StatCounter
                  icon={<Banknote className="w-6 h-6" />}
                  value={inovasi.impactMetrics.fundsRaisedIdr / 1000000}
                  label="Dana Terkumpul (Juta)"
                  suffix="M"
                  delay={0.2}
                />
              )}
              {inovasi.impactMetrics.jobsCreated && (
                <StatCounter
                  icon={<Briefcase className="w-6 h-6" />}
                  value={inovasi.impactMetrics.jobsCreated}
                  label="Lapangan Kerja"
                  suffix="+"
                  delay={0.3}
                />
              )}
            </div>
          </div>
        )}

      
        {inovasi.tag.length > 0 && (
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {inovasi.tag.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        )}

   
        {inovasi.sumber.length > 0 && (
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Sumber & Referensi</h3>
              <div className="space-y-3">
                {inovasi.sumber.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        {src.type}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                          {src.title || src.url}
                          <ExternalLink className="w-4 h-4" />
                        </p>
                        {src.publishedAt && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(src.publishedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        )}

 
        <div
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Tertarik dengan inovasi ini?</h3>
            <p className="opacity-90">Mari dukung bersama untuk Indonesia yang lebih baik.</p>
          </div>
          <Button 
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={() => setShowDonateDialog(true)}
          >
            Mulai Mendukung
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </section> */}

      {/* Donate Dialog */}
      {/* <DonateDialog
        inovasi={inovasi}
        isOpen={showDonateDialog}
        onClose={() => setShowDonateDialog(false)}
        onDonate={handleDonate}
        isLoading={isDonating}
      /> */}
    </div>
  )
}

