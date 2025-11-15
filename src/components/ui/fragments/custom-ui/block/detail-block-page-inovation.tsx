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

import { cn } from "@/lib/utils";

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
     

  
    </div>
           {/* <div className="flex container px-5  mt-20 w-full  h-full min-h-lvh justify-center items-center">
       <InovasiTestimonials 
        testimonials={testimonialInovasiDummy}
        title="Apa Kata Mereka"
        description="Testimoni nyata dari petani dan pengguna yang merasakan dampak positif inovasi sistem irigasi pintar"
        maxDisplayed={6}
      />
    </div> */}
    </>
  );
}


