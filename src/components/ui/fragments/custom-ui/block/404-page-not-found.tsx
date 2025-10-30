"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../shadcn-ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLottie } from "lottie-react";
import animationData from "@/config/assets/animations/404 Error Page.json";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../shadcn-ui/card";


export function NotFoundPage() {
          const lottieOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          };
          const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
       const { View } = useLottie(lottieOptions, style);
  return (
    <section className="container   h-lvh flex flex-col items-center justify-center  ">
      <Card className=" mx-auto bg-background border-0 shadow-none w-full">
        <CardContent className=" w-full   h-full flex flex-col gap-5 md:gap-10  justify-center">
   
          
            <CardHeader className=" max-w-sm md:max-w-lg w-full m-auto   gap-4 px-6 py-0 text-center">
  <div className="  m-auto  sm:w-80 w-[60dvw] h-42 ">
              {  View}
              </div> 
              <CardTitle className="text-2xl  md:text-3xl   tracking-tighter ">
              Sepertinya kamu tersesat
              </CardTitle>
              <CardDescription className=" md:text-base  text-muted-foreground ">
                Halaman yang Anda cari tidak tersedia!
              </CardDescription>
            </CardHeader>
            <CardFooter>

    <CardAction className=" w-full flex h-full  max-w-xs m-auto  justify-center ">

              <Link
      
                href={"/"}
                className={cn(
                    buttonVariants({variant: "default"})
                    ," mx-auto w-full text-sm")}
              >
                <ArrowLeft/>
               Kembali ke beranda
              </Link>
    </CardAction>
            </CardFooter>
     
        </CardContent>
      </Card>
    </section>
  );
}
