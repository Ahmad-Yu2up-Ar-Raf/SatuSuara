"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InovasiBlock from "@/components/ui/fragments/custom-ui/block/InovasiBlock";
import Neslatter from "@/components/ui/core/section/Neslatter";

export default function Page() {
  const searchParams = useSearchParams();
  const kategoriFromUrl = searchParams.get("kategori");

  return (
    <>
    
    <div className="mx-auto container max-w-7xl space-y-4 pt-5">
      <InovasiBlock initialKategori={kategoriFromUrl || "Semua"} />
       <Neslatter/>
    </div>
    </>
  );
}
