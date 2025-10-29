"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  buttonVariants,
} from "@/components/ui/fragments/shadcn-ui/button";
import { Card } from "@/components/ui/fragments/shadcn-ui/card";
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
import NotificationSuccess from "@/components/ui/core/section/notifikasi";

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
  const [localVoteCount, setLocalVoteCount] = useState(inovasi.totalVote);
  const [showNotifikasi, setShowNotifikasi] = useState(false);

  const handleVote = async () => {
    if (isVoting) return;
    setIsVoting(true);
    setLocalVoteCount((v) => v + 1);
    setShowNotifikasi(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsVoting(false);
  };

  const handleDonate = () => {
    alert("Fitur donasi coming soon 💸");
  };

  return (
    <div className="container py-10 px-5 space-y-10">
      {/* Tombol Kembali */}
      <Link
        href="/jelajahi-inovasi"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-2 w-fit group"
        )}>
        <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-all" />
        Kembali
      </Link>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 md:size-12">
            {inovasi.pembuat.avatarUrl && (
              <AvatarImage src={inovasi.pembuat.avatarUrl} alt="Logo" />
            )}
            <AvatarFallback>{inovasi.pembuat.nama.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold">{inovasi.pembuat.nama}</p>
            {inovasi.pembuat.organisasi && (
              <p className="text-xs text-muted-foreground">
                {inovasi.pembuat.organisasi}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Judul & Deskripsi Singkat */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">{inovasi.judul}</h1>
        <div className="my-6 h-1 w-36 bg-primary rounded-full"></div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {inovasi.ringkasanPendek}
        </p>

        {/* Tombol Voting & Donasi */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            className="flex items-center gap-2"
            onClick={handleVote}
            disabled={isVoting}>
            <ThumbsUp className="w-4 h-4" />
            {isVoting ? "Memproses..." : "Vote Sekarang"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
            onClick={handleDonate}>
            <HeartHandshake className="w-4 h-4" />
            Donasi
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Total Vote:{" "}
          <span className="font-bold">{formatNumber(localVoteCount)}</span>
        </p>
      </div>

      {/* Deskripsi Lengkap */}
      <Card className="p-6 space-y-3">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> Deskripsi Lengkap
        </h2>
        <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
          {inovasi.deskripsi}
        </p>
      </Card>

      {/* Tags */}
      {inovasi.tag.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {inovasi.tag.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Sumber */}
      {inovasi.sumber.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-3">Sumber & Referensi</h3>
          <div className="space-y-3">
            {inovasi.sumber.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group hover:text-primary">
                <ExternalLink className="w-4 h-4" />
                <span>{src.title || src.url}</span>
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Popup Vote Sukses */}
      {showNotifikasi && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 max-w-sm w-[90%] text-center">
            <button
              onClick={() => setShowNotifikasi(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <NotificationSuccess
              onClose={() => setShowNotifikasi(false)}
              message="Terima kasih, suara Anda telah tercatat!"
            />
          </div>
        </div>
      )}
    </div>
  );
}
