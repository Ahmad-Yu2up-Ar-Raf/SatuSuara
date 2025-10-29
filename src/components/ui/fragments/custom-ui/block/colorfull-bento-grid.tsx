

import { ChartArea, Gift, SparkleIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn-ui/card";
import { Badge } from "../../shadcn-ui/badge";
import { InovasiPopulerCard } from "../card/InovasiPopuleCardr";

import type { Inovasi } from "@/schemas/inovasi.schema";



import VisualReportCard from "../card/VisualReport";
import CommunityCard from "../card/CommunityCardBento";
import VotingCard from "../card/VotingCard";
import BerkaryaBentoCard from "../card/BerkaryaBentoCard";
import { TextAnimate } from "../animate-ui/text-animate";
import { BentoCard, BentoProps } from '../card/BentoCard';
import { useState } from 'react';


const bentoData: BentoProps[] = [
  {
    BadgeIcon: ChartArea,
    title: "Peringkat Visual 📊",
    SubTitle: "Inovasi Unggulan",
    descripcions: "Lihat proyek teratas dengan suara terbanyak – dukung ide yang menurutmu paling berdampak.",
    contentClassName: "  w-full h-full flex items-emd justify-end",
    className: "h-[360px] md:col-span-2  hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out  ",
    children: <VisualReportCard />,
  },

  {
    SubTitle: "Inovasi Terpopuler",
    className: "h-full hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out", descripcions: "Lihat inovasi yang paling banyak dibicarakan komunitas.",
    title: "Lihat Yang Lagi Naik Daun 🌿",
    children: <InovasiPopulerCard />,
  },
  {

    title: "Komunitas SatuSuara",
    SubTitle: "Kolaborasi, masukan, & dukungan",
    descripcions: "Bergabung, beri masukan, dan dukung ide yang menurutmu paling berdampak.",
    borderBottom: true,
    children: <CommunityCard />,
    className: " hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out h-full",
  },
  {
    title: "Ruang Berkarya",
    SubTitle: "Bagikan ide & karya inovatifmu",
    descripcions: "Ciptakan, unggah, dan bagikan inovasimu agar bisa dikenal dan didukung komunitas.",
    borderBottom: true,
    contentClassName: " scale-80 ",
    children: <BerkaryaBentoCard />,
    className: " hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1 transition-all duration-200 ease-in-out h-full",
  },
  {
    BadgeIcon: ChartArea,
    SubTitle: "Dapat Dukungan",
    borderBottom: true,
    children: <VotingCard />,
    descripcions: "Berikan suara — bantu ide lokal menjadi solusi nyata.",
    title: "kumpulkan dukungan publik",
    className: "h-full  md:gap-0 hover:scale-101 hover:shadow-[-6px_6px_32px_8px_rgba(192,192,192,0.2)] hover:rotate-1  transition-all duration-200 ease-in-out  "
  }
]
export const ColorfullBento = () => {

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Card id='free-tools' className='w-full max-w-[70em] m-auto  gap-10  py-10 rounded-4xl  px-5 content-center'>


      <CardHeader className='flex px-2   flex-col md:flex-row items-end justify-between w-full'>
        <div className='flex flex-col  text-[10px]  w-full items-start justify-start gap-5 '>
          <Badge



          >
            <SparkleIcon className="fill-primary-foreground stroke-1 md:size-6 text-neutral-800" />{" "}
            terbuka untuk semua
          </Badge>

          <div className='flex flex-col md:flex-row gap-5 md:items-end w-full md:justify-between '>
            <CardTitle className="relative text-2xl lg:text-5xl font-sans font-semibold  text-balance  tracking-tighter max-w-xl text-left leading-[1.1em] space-x-3 md:space-x-6 text-base-content">

              <TextAnimate as={"span"}>
                SatuSuara — Bagikan & Dukung Inovasi
              </TextAnimate>
              <Gift className="inline-flex text-primary md:size-10 size-5 fill-primary/10 rotate-12" strokeWidth={2} />
            </CardTitle>
            <CardDescription className='max-w-sm line-clamp-2  text-xs text-muted-foreground'>
              <TextAnimate as={"span"}>
                Platform voting & showcase untuk ide anak bangsa — submit ide, kumpulkan dukungan, dan wujudkan solusi.
              </TextAnimate></CardDescription>
          </div>

          <div className=' text-xs md::text-base  hidden md:flex flex-row text-primary gap-2 md:gap-6 items-start md:justify-center'>
            <p className="whitespace-nowrap font-medium">+1.200 Ide</p>
            <p className="whitespace-nowrap font-medium">18.450 Dukungan</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid  grid-cols-1 p-0 md:grid-cols-3 md:items-start md:justify-start gap-4 ">


        {bentoData.map((bentoItem, i) => (


          <BentoCard
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            bentoItem={bentoItem} key={i} />
        )
        )}







      </CardContent>
    </Card>
  );
};

