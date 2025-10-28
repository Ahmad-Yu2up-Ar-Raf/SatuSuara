import React from 'react';
import { ArrowRight, Star, Tag, MapPin, Calendar } from 'lucide-react';
import { Badge } from '../../shadcn-ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../shadcn-ui/card';
import { Button, buttonVariants } from '../../shadcn-ui/button';
import MediaItem from '../media/MediaItem';
import type { Inovasi } from '@/schemas/inovasi.schema';
import { cn } from '@/lib/utils';
import { useInitials } from '@/hooks/use-initials';
import Link from 'next/link';

interface InovasiCardProps {
  inovasi: Inovasi;
  className?: string;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  onClick?: (inovasi: Inovasi) => void;
}

function InovasiCard({ inovasi, className, onClick  ,  index,
  hovered,
  setHovered,}: InovasiCardProps) {
  // Get primary image
  const primaryImage = inovasi.media.find((m) => m.kind === 'image')?.url;

  // Format date
  const createdDate = new Date(inovasi.dibuatPada).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
  });

  // Kategori color mapping
  const categoryColors: Record<string, string> = {
    'Kesehatan': 'bg-red-100 text-red-700 border-red-200',
    'Pendidikan': 'bg-blue-100 text-blue-700 border-blue-200',
    'Lingkungan': 'bg-green-100 text-green-700 border-green-200',
    'Pangan': 'bg-orange-100 text-orange-700 border-orange-200',
    'Energi': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Transportasi': 'bg-purple-100 text-purple-700 border-purple-200',
    'Agrikultur': 'bg-lime-100 text-lime-700 border-lime-200',
    'Ekonomi Kreatif': 'bg-pink-100 text-pink-700 border-pink-200',
    'Sosial': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Teknologi': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Keamanan': 'bg-slate-100 text-slate-700 border-slate-200',
  };
  const initial = useInitials()
  return (
    <Card
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative cursor-target w-full  m-auto px-1 py-3 md:px-4 md:py-7  shadow-none  border  rounded-2xl',
        'transform transition-all duration-300 hover:scale-105 hover:rotate-1',
        ' overflow-hidden hover:shadow-2xl flex flex-col h-full',
        'cursor-pointer',
           hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        className
      )}
      style={{ willChange: 'transform' }}
      onClick={() => onClick?.(inovasi)}
    >
      <CardContent className="p-4.5 gap-8 flex flex-col flex-1">
        {/* Category Badge */}
  

        {/* Header */}
        <CardHeader className="p-0 space-y-1 md:space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tighter md:leading-8 line-clamp-2">
            {inovasi.judul}
          </CardTitle>

          <CardDescription className="text-muted-foreground text-xs line-clamp-2 ">
            {inovasi.ringkasanPendek}
          </CardDescription>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="size-3" />
              <span>{inovasi.lokasi.provinsi || 'Indonesia'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>{createdDate}</span>
            </div>
          </div>
        </CardHeader>

        {/* Image */}
        {primaryImage && (
          <div className=" aspect-video w-full rounded-xl overflow-hidden">
            <MediaItem
              webViewLink={primaryImage}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        {/* Creator Info */}
        <div className="space-y-4">
          <div className=" flex w-full justify-between">

            <div className="flex  w-full items-start  justify-between gap-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold">
                {initial(inovasi.pembuat.nama)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{inovasi.pembuat.nama}</p>
                {inovasi.pembuat.organisasi && (
                  <p className="text-muted-foreground text-[10px] truncate">
                    {inovasi.pembuat.organisasi}
                  </p>
                )}
              </div>
            </div>
            <Badge variant="outline" className="text-accent-foreground text-[10px] w-fit border-0 p-0">
              <Star className="size-4 fill-primary text-primary mr-1" />
              <span className="font-semibold ">{inovasi.totalVote.toLocaleString('id-ID')}</span>
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {inovasi.tag.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-medium"
              >
                #{tag}
              </span>
            ))}
            {inovasi.tag.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px]">
                +{inovasi.tag.length - 3}
              </span>
            )}
          </div>


        </div>

        {/* Footer */}
        <CardFooter className="flex border-t py-3 items-center justify-between p-0 mt-auto">
          <Link
            href={"#"}
            className={cn(buttonVariants({ variant: "default" }), "hover:opacity-90 transition-transform w-full hover:scale-105 text-xs md:text-sm")}

          >Beri Dukungan <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Link>


        </CardFooter>
      </CardContent>

     
    </Card>
  );
}

export default InovasiCard;