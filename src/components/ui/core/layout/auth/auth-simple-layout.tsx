"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLottie } from "lottie-react";
import * as React from "react";
import { Logo, LogoDark, LogoWhiter } from "@/components/ui/fragments/svg/logo";
import animationData from "@/config/assets/animations/Phoenix.json";
import { useIsMobile } from "@/hooks/use-mobile";
type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  quote?: string;
  loading?: boolean;
  className?: string;
  numberOfIterations?: number;
  formType?: "login" | "register";
};

const AuthLayoutTemplate = ({
  formType,
  numberOfIterations,
  className,
  loading = false,
  title = `Selamat Datang`,
  quote = `Gagasmu bukan cuma wacana — jadikan aksi.`,
  description = `Perjalanan akan segera dimulai `,
  ...props
}: AuthLayoutProps) => {
  const formTypeLabel = formType == "register" ? "masuk" : "daftar";
  const formTypeLink = formType == "register" ? "masuk" : "daftar";
    
      const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
      const isMobile = useIsMobile()
     const style = { width:  "100%", height: "100%" , margin: "auto"  , }; // atur sesuai kebutuhan
  const { View } = useLottie(lottieOptions, style);
  return (
    <div className=" max-h-lvh h-lvh flex items-center justify-center overflow-hidden ">
      <div
        className={cn(
          "  w-full relative max-w-lg  overflow-hidden flex flex-col  lg:flex-row shadow-xl lg:max-w-none h-lvh",
          className
        )}>
        {/* <div className="w-full h-full z-2 absolute bg-linear-to-t from-transparent to-black"></div> */}
        {/* <div className="flex absolute z-2    h-full overflow-hidden backdrop-blur-2xl ">
          <div className="h-full z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30] opacity-30 overflow-hidden"></div>
          {Array.from({ length: numberOfIterations || 10 }, (_, index) => (
            <div
              key={index}
              className="h-full z-2 w-[4rem] bg-linear-90 from-[#ffffff00] via-[#000000] via-[69%] to-[#ffffff30]  opacity-30 overflow-hidden"></div>
          ))}
        </div>
        <div className="w-[15rem] h-[15rem] blur-2xl bg-primary absolute z-1 rounded-full bottom-0 animate-pulse pointer-events-none"></div>
        <div className="w-[8rem] h-[5rem] blur-2xl bg-background absolute z-1 rounded-full bottom-0 animate-pulse pointer-events-none"></div>
        <div className="w-[8rem] h-[5rem] blur-2xl bg-background absolute z-1 rounded-full bottom-0 animate-pulse pointer-events-none"></div>

        <div className="bg-black hidden lg:flex text-white p-8 lg:p-12 lg:w-1/2 relative  overflow-hidden">
          <h1 className="text-2xl max-w-md lg:text-3xl font-medium leading-tight z-10 tracking-tight relative">
            {quote}
          </h1>
        </div> */}

        <main
          className={cn(
            "p-8 lg:w-1/2 justify-center items-center  lg:m-auto h-full content-center relative bg-background z-[100] text-secondary-foreground overflow-visible "
          )}>
          <div className=" justify-center  max-w-sm flex m-auto flex-col h-full">
            <div className="flex text-center flex-col   items-left mb-7">
             
             <div className="  m-auto  w-50 h-42 ">
              {  View}
              </div> 

              <div className={cn("relative sr-only  hidden lg:inline-flex mb-6 md:ml-0 m-auto")}>
                <LogoWhiter className="absolute top-0 size-12 opacity-100 transition-transform ease-in-out duration-500 dark:opacity-0" />
                <LogoDark className="size-12 opacity-0 transition-transform ease-in-out duration-500 dark:opacity-100" />
              </div>
          

              <h2 className=" text-xl lg:text-2xl mt-6 mb-2 font-medium  tracking-tight">
                {title}
              </h2>
              <p className=" line-clamp-1 text-xs lg:text-sm opacity-80">{description}</p>
            </div>

            {/* Form content area */}
            {props.children}

            {formType && (
              <div className="text-center  mt-2 text-muted-foreground text-sm">
                {formType == "register"
                  ? `Sudah punya akun? `
                  : "belum punya akun? "}
                <Link
                  aria-disabled={loading}
                  tabIndex={!loading ? -1 : undefined}
                  href={`/${formTypeLink}`}
                  className={cn(
                    "text-secondary-foreground capitalize font-medium underline",
                    loading
                      ? "pointer-events-none cursor-none text-foreground/50"
                      : ""
                  )}>
                  {formTypeLabel}
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayoutTemplate;
