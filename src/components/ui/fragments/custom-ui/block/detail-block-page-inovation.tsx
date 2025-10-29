"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DonateDialog } from "./DonateDialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogPortal,
  AlertDialogBackdrop,
  AlertDialogClose,
  type AlertDialogFlipDirection,
} from '@/components/ui/fragments/shadcn-ui/alert-dialog';

import {
  Button,
  buttonVariants,
} from "@/components/ui/fragments/shadcn-ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/fragments/shadcn-ui/card";
import { Badge } from "@/components/ui/fragments/shadcn-ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/fragments/shadcn-ui/avatar";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  ThumbsUp,
  HeartHandshake,
  X,
} from "lucide-react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import NotificationSuccess from "@/components/ui/fragments/custom-ui/block/notifikasi";
import { batasiHuruf, batasiKata } from "@/hooks/use-worldMax";
import MediaItem from "../media/MediaItem";
import { useOnboardingStore } from "@/hooks/use-store-signup";
import { useRouter } from "next/navigation";
import { useVote } from "@/hooks/use-vote";
import { InovasiTestimonials } from "./stagger-testimonial";
import { testimonialInovasiDummy } from "@/config/data/tetimonial";

// ==================================================
// TYPES
// ==================================================
interface Media {
  kind: "image" | "lottie";
  url: string;
}

interface Pembuat {
  nama: string;
  organisasi?: string;
  avatarUrl?: string;
}

interface Sumber {
  type: string;
  title?: string;
  url: string;
  publishedAt?: string;
}

interface Inovasi {
  id: string;
  slug: string;
  judul: string;
  ringkasanPendek: string;
  deskripsi: string;
  media: Media[];
  pembuat: Pembuat;
  kategori: string;
  tag: string[];
  totalVote: number;
  sumber: Sumber[];
}

// ==================================================
// HELPER FUNCTIONS
// ==================================================
const formatNumber = (num: number): string =>
  new Intl.NumberFormat("id-ID").format(num);

// ==================================================
// MAIN COMPONENT
// ==================================================
export default function InovasiDetailUI({ inovasi }: { inovasi: Inovasi }) {
   const [isVoting, setIsVoting] = useState(false);
  const name = useOnboardingStore((state) => state.name);
  const router = useRouter();

  const { vote, hasVoted, isLoading, isAuthenticated } = useVote({
    onSuccess: () => {
      router.push("/sukses");
    },
    redirectToLogin: true,
  });

  const alreadyVoted = hasVoted(inovasi.id);

  // ✅ HANDLER VOTE yang aman
  const handleVote = async () => {
    // 🔍 DEBUG: Log sebelum vote
    console.log('🎯 HANDLE VOTE CLICKED');
    console.log('  inovasi.id:', inovasi.id);
    console.log('  inovasi.slug:', inovasi.slug);
    console.log('  inovasi.judul:', inovasi.judul);
    
    // ⚠️ PASTIKAN passing ID, BUKAN SLUG!
    await vote(inovasi.id, inovasi.judul); // ✅ CORRECT
    // await vote(inovasi.slug, inovasi.judul); // ❌ WRONG!
  };


  const handleDonate = () => {
    alert("Fitur donasi coming soon 💸");
  };
    const namaSingkat = batasiKata(inovasi.pembuat.nama, 3); 
    const organisasiSingkat = batasiKata(inovasi.pembuat.organisasi!, 15); 
  return (
    <>
    <div className="container  py-7 px-5 space-y-7">
      {/* Tombol Kembali */}
       <nav className='z-50 top-0   relative bg-background/95 backdrop-blur flex items-center justify-between'>
        <Link  
      href={"/jelajahi-inovasi"}
          className={cn(
            buttonVariants({ variant: "link" }),
            'flex has-[>svg]:px-0  text-sm w-fit py-2 md:flex items-center gap-2 px-0 group transition-colors'
          )}
        >
          <ArrowLeft className="size-5 group-hover:-translate-x-1 group-hover:transform transition-all ease-out duration-300" />
          <span>Kembali</span>
        </Link>
      </nav>

      {/* Header Section and hero dont dont anything here this is re */}
      <section className=" min-h-lvh   space-y-6">
          <div className=" max-w-xl h-full content-center space-y-6">

      <div className="md:flex-row gap-8 items-center">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 md:size-12">
            {inovasi.pembuat.avatarUrl && (
              <AvatarImage src={inovasi.pembuat.avatarUrl} alt="Logo" />
            )}
            <AvatarFallback>{inovasi.pembuat.nama.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold">{namaSingkat}</p>
            {inovasi.pembuat.organisasi && (
              <p className="text-xs text-muted-foreground">
                {organisasiSingkat}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Judul & Deskripsi Singkat */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-5xl font-bold">{inovasi.judul}</h1>
        <div className="my-6 h-1 w-36 bg-primary rounded-full"></div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
          {inovasi.ringkasanPendek}
        </p>

        {/* Tombol Voting & Donasi */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
<AlertDialog>
  <AlertDialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
    <ThumbsUp className="w-4 h-4" />
    Vote Sekarang
  </AlertDialogTrigger>

  <AlertDialogPortal>
    <AlertDialogBackdrop className="fixed inset-0 backdrop-blur-xl z-50 bg-black/80" />
    <AlertDialogPopup
      from={"bottom"}
      className="sm:max-w-md max-w-sm w-full fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 border space-y-7 rounded-2xl bg-background p-6"
    >
      <AlertDialogHeader className="  text-center space-y-3">
        <AlertDialogTitle className="text-lg font-bold">
          Konfirmasi Suara
        </AlertDialogTitle>
        <AlertDialogDescription className="text-xs">
          Apakah kamu yakin ingin mendukung inovasi ini? Suaramu akan tercatat dan
          membantu meningkatkan peluang proyek untuk mendapatkan dukungan lebih lanjut.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-4 flex  flex-col justify-end gap-2">
        <AlertDialogClose className="bg-accent cursor-target rounded-2xl text-accent-foreground px-4 py-2 text-sm">
          Batal
        </AlertDialogClose>
        <AlertDialogClose
          onClick={handleVote}
          className="bg-primary cursor-target rounded-2xl text-primary-foreground px-4 py-2 text-sm"
          aria-label="Konfirmasi suara"
        >
          Konfirmasi Suara
        </AlertDialogClose>
      </AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialogPortal>
</AlertDialog>

          <DonateDialog 
            inovasi={inovasi}
            onSuccess={(txId) => {
              router.push(`/sukses?tx=${txId}`);
            }}
          />
        </div>
          
  
        {/* <p className="text-sm text-muted-foreground mt-2">
          Total Vote:{" "}
          <span className="font-bold">{formatNumber(localVoteCount)}</span>
          </p> */}
      </div>
          </div>
          <div className="outline-2 p-2    rounded-2xl ">
    
                <MediaItem className="rounded-2xl md:min-h-[30em] min-h-[20em]  relative overflow-hidden  h-full w-full " webViewLink={inovasi.media[0].url}/>
          </div>
      </section>

      {/* Content Section using Bento Grid */}
      <div className="grid gap-6 md:grid-cols-12 mt-12">
        {/* Left Column - Media & Description */}
        <div className="md:col-span-7 space-y-6">
          {/* Media Gallery */}
          <Card className="overflow-hidden sr-only bg-accent/5">
            <div className="relative aspect-video">
              <MediaItem 
                className="rounded-t-xl object-cover w-full h-full" 
                webViewLink={inovasi.media[0].url}
                data-testid="media-carousel"
              />
            </div>
            {inovasi.media.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {inovasi.media.map((media, idx) => (
                  <div 
                    key={idx}
                    className="relative w-20 aspect-video flex-shrink-0 rounded-md overflow-hidden border cursor-pointer hover:ring-2 ring-primary transition-all"
                  >
                    <MediaItem 
                      className="object-cover w-full h-full"
                      webViewLink={media.url}
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Description Card */}
          <Card className="p-6">
            <CardHeader className="space-y-4 px-0 pt-0">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="rounded-full">
                  {inovasi.kategori}
                </Badge>
              </div>
              <h2 className="text-xl font-semibold">Deskripsi Lengkap</h2>
            </CardHeader>
            <CardContent className="px-0">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="leading-relaxed text-muted-foreground">
                  {inovasi.deskripsi}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {inovasi.tag.length > 0 && (
            <Card className="p-6">
              <h3 className="text-sm font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {inovasi.tag.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="rounded-full px-3">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Actions & Info */}
        <div className="md:col-span-5 space-y-6">
          {/* Vote & Stats Card */}
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Dukungan</p>
                <p className="text-3xl font-bold" role="status" aria-live="polite">
                  {formatNumber(inovasi.totalVote)}
                </p>
              </div>

      
            </div>
          </Card>

          {/* Creator Info Card */}
          <Card className="p-6 sr-only">
            <div className="flex items-center gap-4">
              <Avatar className="size-12 ring-2 ring-primary/20">
                {inovasi.pembuat.avatarUrl && (
                  <AvatarImage src={inovasi.pembuat.avatarUrl} alt={inovasi.pembuat.nama} />
                )}
                <AvatarFallback>{inovasi.pembuat.nama.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{namaSingkat}</p>
                {inovasi.pembuat.organisasi && (
                  <p className="text-sm text-muted-foreground">{organisasiSingkat}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Sources Card */}
          {inovasi.sumber.length > 0 && (
            <Card className="p-6">
              <h3 className="text-sm font-medium mb-4">Sumber & Referensi</h3>
              <div className="space-y-3">
                {inovasi.sumber.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {src.title || new URL(src.url).hostname}
                      </p>
                      {src.publishedAt && (
                        <p className="text-xs text-muted-foreground">
                          {new Date(src.publishedAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

  
    </div>
           <div className="flex container px-5  mt-20 w-full  h-full min-h-lvh justify-center items-center">
       <InovasiTestimonials 
        testimonials={testimonialInovasiDummy}
        title="Apa Kata Mereka"
        description="Testimoni nyata dari petani dan pengguna yang merasakan dampak positif inovasi sistem irigasi pintar"
        maxDisplayed={6}
      />
    </div>
    </>
  );
}


