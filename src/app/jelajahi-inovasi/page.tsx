"use client";

import React from "react";
import { InovasiProvider } from "@/components/ui/fragments/custom-ui/card/InovasiContext";
import InovasiCardList from "@/components/ui/fragments/custom-ui/card/InovasiCard";
import { Lightbulb } from "lucide-react";

export default function Page() {
  return (
    <InovasiProvider>
      <div className="min-h-screen">
       {/* HEADER */}
<header
  className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 
  flex items-center sticky justify-center top-0 z-20 
  pt-6 sm:pt-20 pb-4 sm:pb-1"
>
 <div className="flex items-center sm:gap-6 justify-center text-center">
  <Lightbulb className="w-20 h-20 text-yellow-500" />
  <h1 className="text-6xl sm:text-7xl font-bold leading-tight">
    Jelajahi Inovasi Desa
  </h1>
</div>

</header>


        {/* FILTER + CARD LIST */}
        <main className="p-4 sm:p-2 flex-1">
          <InovasiCardList />
        </main>
      </div>
    </InovasiProvider>
  );
}
