"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/fragments/shadcn-ui/table"
import MediaItem from "@/components/ui/fragments/custom-ui/media/MediaItem";
import inovations from "@/config/data/Inovations.json";
import { Inovasi, inovasiSchema } from "@/schemas/inovasi.schema";
import animationData from "@/config/assets/animations/Winner Trophy Emoji.json";
import { useLottie } from "lottie-react";
import { Badge } from "../../shadcn-ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../shadcn-ui/avatar";
import { useInitials } from "@/hooks/use-initials";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/lib/utils/getCategory";
import { ArrowLeft, Tag } from "lucide-react";
import { batasiHuruf } from "@/hooks/use-worldMax";
import { Button, buttonVariants } from "../../shadcn-ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Leaderboard() {
  const validData = inovations.map((item) => {
    // Truncate ringkasanPendek if it's too long
    if (item.ringkasanPendek && item.ringkasanPendek.length > 120) {
      item.ringkasanPendek = item.ringkasanPendek.substring(0, 117) + '...';
    }
    
    const result = inovasiSchema.safeParse(item);
    if (!result.success) {
      console.log('Invalid item:', item.judul, result.error);
      return null;
    }
    return item;
  }).filter(item => item !== null);

  console.log('Total valid items:', validData.length);
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);
  const [HoveredTableColom, setHoveredTableColom] = useState<number | null>(null);
  const [category, setCategory] = useState("all");


  // === FILTER & SORT ===
  const categoryFiltered =
    category === "all"
      ? validData
      : validData.filter((item) => item.kategori === category);

  const searched = categoryFiltered.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => b.totalVote - a.totalVote);
  const topThree = sorted.slice(0, 3);
  const others = sorted.slice(3);
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const getInitial = useInitials()

  const style = { width: "100%", height: "100%", margin: "auto" }; // atur sesuai kebutuhan
  const { View } = useLottie(lottieOptions, style);
  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-6 py-4 flex flex-col items-center">
      <section className=" pt-9 relative w-full h-full md:min-h-lvh content-start">
  <nav className='z-50 top-0  absolute bg-background/95 backdrop-blur flex items-center justify-between'>
        <Link  
      href={"/"}
          className={cn(
            buttonVariants({ variant: "link" }),
            'flex has-[>svg]:px-0  text-xs md:text-sm w-fit py-2 md:flex items-center gap-2 px-0 group transition-colors'
          )}
        >
          <ArrowLeft className="size-4 md:size-5 group-hover:-translate-x-1 group-hover:transform transition-all ease-out duration-300" />
          <span>Kembali</span>
        </Link>
      </nav>
      {/* === HEADER === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pb-3 border-b gap-4 flex flex-col relative mb-8 md:mb-10">
            <div className="   m-auto  md:w-40 md:h-35   w-27 h-40 ">
              {  View}
              </div> 
              <header className="">

        <h1 className="text-2xl sm:text-4xl  font-bold text-gray-800">
         Leaderboard Inovasi
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Lihat peringkat inovasi digital terbaik di Indonesia
        </p>
              </header>
      </motion.div>

      {/* === FILTER SECTION === */}
 

      {/* === PODIUM === */}
      {topThree.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-1.5 sm:gap-6 items-end mb-12 sm:mb-16 w-full  sm:max-w-4xl">
          {topThree.map((item, index) => {
            const rank = index + 1;
            const isFirst = rank === 1;
            const orderClasses =
              rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3";

            return (
              <motion.a
                onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
                key={item.id}
              href={`/jelajahi-inovasi/${item.slug}`}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300 }}
            
                className={cn(`relative  transition-all duration-300 ease-out flex flex-col items-center cursor-pointer ${orderClasses}` ,
    !isFirst && "  translate-y-2.5",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",

                )}>
                  
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  className={cn(`rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white/60 backdrop-blur-lg 
                              w-full md:max-w-[280px]
                              ${
                                isFirst
                                  ? "h-48 sm:h-64 md:h-72"
                                  : "h-40 sm:h-56 md:h-64"
                              } 
                              flex items-center justify-center` , 
                          
                              )}>
                  <MediaItem
                    webViewLink={item.media[0]?.url}
                    className="w-full cursor-target h-full object-cover"
                  />
                </motion.div>

                <Badge 
                  className={`absolute -top-4 px-4 py-1 text-xs sm:text-sm font-bold text-white rounded-full shadow-md ${
                    isFirst
                      ? "bg-yellow-400"
                      : rank === 2
                      ? "bg-gray-400"
                      : "bg-amber-700"
                  }`}>
                  #{rank}
                </Badge>

                <p className="mt-3 font-medium  text-center text-sm tracking-tighter sm:text-sm md:text-base">
                  {item.judul.split(' - ')[0]}
                </p>
                <p className="text-[10px] text-muted-foreground  sm:text-xs ">
                  {item.totalVote.toLocaleString()} suara
                </p>
                
              </motion.a>
            );
          })}
        </motion.div>
      )}
      </section>

      {/* === TABLE SECTION === */}

           <main className="overflow-hidden w-full rounded-xl border">

      <Table className="">
        <TableCaption className=" sr-only">A list of your recent inovasis.</TableCaption>
        <TableHeader className="bg-accent/15   [&_th]:text-sm [&_th]:bg-accent/15">
          <TableRow>
            <TableHead className="">   
              No
            </TableHead>
            {others.length >= 1 && (
              <>
            <TableHead className=" ">Inovasi</TableHead>
                    <TableHead>Suara</TableHead>
            <TableHead className=" ">Pencipta</TableHead>
            <TableHead className=" ">Organisasi</TableHead>
            {/* <TableHead className=" ">Price</TableHead> */}

          
            <TableHead>Kategori</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead>Avg Rating</TableHead> */}
            {/* <TableHead>Product Di Pinjam</TableHead> */}
            {/* <TableHead>Stock</TableHead>
            <TableHead>Sold</TableHead> */}
      
  
            {/* <TableHead className="">action</TableHead> */}
              </>
            )
              
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {others.length > 0 ?  others.slice(0,10).map((inovasi , index) =>{ 
    const titleSingkat = batasiHuruf(inovasi.judul.split(' - ')[0], 15); 
    const titlePenciptaSingkat = batasiHuruf(inovasi.pembuat.nama, 15); 
    const titleOrganisasiSingkat = batasiHuruf(inovasi.pembuat.organisasi, 15); 
                   const rank = index + 4;

      //  const status = inovasi.status as ProductStatus
      //  const category = inovasi.category as CategoryProductsStatus
      //  const IconStatus = getProductStatusIcon(status );
      //  const IconProduct = getCategoryIcon(category );

          // const price = inovasi.price_formatted
          return(
   
            <TableRow 
                   onMouseEnter={() => setHoveredTableColom(index)}
    onMouseLeave={() => setHoveredTableColom(null)}
            key={inovasi.id} className={cn(" transition-all duration-300 ease-out cursor-target",

                     HoveredTableColom !== null && HoveredTableColom !== index && "blur-sm scale-[0.98]",
            )}>
              {/* <TableCell className="font-medium sticky right-0 ">
                 <Checkbox
                checked={selectedIds.includes(inovasi.id!)}
                        onCheckedChange={() => HandleSelect(inovasi.id!)}
              aria-label="Select row"
              className="translate-y-0.5  mx-3   mr-4"
            /></TableCell> */}
             <TableCell className=" text-muted-foreground">  
           
         
          #{rank}
     
  
          
     </TableCell>
         <TableCell className="   w-50 overflow-hidden flex items-center gap-5" 
              
   
              > 
              
                 <Avatar className=" rounded-full  relative flex size-12 shrink-0 overflow-hidden">
                                          <AvatarImage src={`${inovasi?.media[0].url!}`} alt={inovasi.judul} />
                                          <AvatarFallback className="rounded-xl  bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                              {getInitial(inovasi.judul)}
                                          </AvatarFallback>
                                      </Avatar>
              <h3 className=" text-xs font-medium">
                {titleSingkat}
                </h3>
              </TableCell>
                 <TableCell className=" text-xs text-muted-foreground">{inovasi.totalVote.toLocaleString()}</TableCell>
                     <TableCell className=" text-xs text-muted-foreground">{titlePenciptaSingkat}</TableCell>
                     <TableCell className=" text-xs text-muted-foreground">{titleOrganisasiSingkat}</TableCell>
      <TableCell className="">  
                <Badge
          variant="outline"
          className={cn(
            'mb-1 text-[9px] md:text-xs font-semibold w-fit',
            categoryColors[inovasi.kategori] || 'bg-gray-100 text-gray-700'
          )}
        >
          <Tag className="mr-1 size-3 md:size-4" />
          {inovasi.kategori}
        </Badge>
  
          
     </TableCell>
     
     
         

  
            </TableRow>
         
      
          )}
        
        ) : (
                <TableRow>
                  <TableCell
                    colSpan={others.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
          )}
            
        </TableBody>
      
  
      </Table>
        </main>
 



      {/* === MODAL === */}

    </section>
  );
}
