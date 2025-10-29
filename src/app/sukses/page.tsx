"use client";

import { useSearchParams } from "next/navigation";
import SuccessNotification from "@/components/ui/fragments/custom-ui/block/SuccessNotification";

export default function NotificationPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const amount = searchParams.get("amount");
  const txId = searchParams.get("tx");

  // Handle donation success
  if (type === "donation") {
    const formattedAmount = amount ? new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount)) : undefined;

    return (
      <main className="flex justify-center items-center min-h-lvh  px-4 sm:px-6">
        <SuccessNotification
          type="donation"
          title="Donasi Berhasil!"
          description="Terima kasih atas dukungan Anda. Donasi Anda akan membantu mengembangkan inovasi ini."
          amount={formattedAmount}
          primaryAction={{
            label: "Lihat Dashboard",
            href: "/dashboard"
          }}
          secondaryAction={{
            label: "Jelajahi Inovasi Lain",
            href: "/jelajahi-inovasi"
          }}
        />
      </main>
    );
  }

  // Handle vote success (default)
  return (
    <main className="flex justify-center items-center min-h-lvh px-4 sm:px-6">
      <SuccessNotification
        type="vote"
        title="Voting Berhasil!"
        description="Terima kasih, suara kamu sudah tercatat. Tunggu pengumuman leaderboard."
        primaryAction={{
          label: "Lihat Dashboard",
          href: "/dashboard"
        }}
        secondaryAction={{
          label: "Jelajahi Inovasi Lain",
          href: "/jelajahi-inovasi"
        }}
      />
    </main>
  );
}
