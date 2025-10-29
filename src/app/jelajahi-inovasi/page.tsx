"use client";

import React from "react";
import { InovasiProvider } from "@/components/ui/fragments/custom-ui/card/InovasiContext";
import InovasiCardList from "@/components/ui/fragments/custom-ui/card/InovasiCard";
import { Lightbulb } from "lucide-react";
import HeaderMassonary from "@/components/ui/core/layout/header/jelajahiInovasiHeader";
import InovasiBlock from "@/components/ui/fragments/custom-ui/block/InovasiBlock";

export default function Page() {
  return (
    <InovasiProvider>
 <div
   
   className=" mx-auto   container max-w-7xl space-y-4  pt-5 ">

    
    

       {/* HEADER */}



        {/* FILTER + CARD LIST */}

          <InovasiBlock />

      </div>
    </InovasiProvider>
  );
}
