import React from 'react';
import { ArrowRight, Star, Tag, MapPin, Calendar, ThumbsUp } from 'lucide-react';
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
import { batasiHuruf, batasiKata } from '@/hooks/use-worldMax';
import { categoryColors } from '@/lib/utils/getCategory';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn-ui/avatar';

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


  // Kategori color mapping

  const initial = useInitials()
    const teksSingkat = batasiHuruf(inovasi.pembuat.organisasi!, 10); 
    const titleSingkat = batasiHuruf(inovasi.pembuat.nama!, 15); 
  return (
    <Card
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative   cursor-target w-full  m-auto  md:px-4 md:py-4  shadow-none  border  rounded-2xl',
        'transform transition-all duration-300 hover:scale-105 hover:rotate-1 ',
        "mx-auto cursor-target content-center w-full  p-3   border border-black/5  shadow-sm  rounded-[30px]",
        ' overflow-hidden hover:shadow-2xl flex flex-col h-full',
        'cursor-pointer',
           hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        className
      )}
      style={{ willChange: 'transform' }}
      onClick={() => onClick?.(inovasi)}
    >
      <CardContent className=" rounded-[30px] content-center justify-center gap-6 flex flex-col flex-1 relative mx-auto  px-5 w-full   border border-black/5 bg-neutral-800/5 py-3 md:py-7  h-full  overflow-hidden shadow-sm md:items-start   ">
        {/* Category Badge */}
  


        {/* Header */}
        <CardHeader className="p-0 w-full max-w-[15em] gap-2.5">
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
          <CardTitle className="text-lg w-full  leading-6 font-bold tracking-tighter md:leading-6 line-clamp-2">
            {inovasi.judul}
          </CardTitle>

          <CardDescription className="text-muted-foreground text-xs line-clamp-2 ">
            {inovasi.ringkasanPendek}
          </CardDescription>

          {/* Meta Info */}
          {/* <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="size-3" />
              <span>{inovasi.lokasi.provinsi || 'Indonesia'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>{createdDate}</span>
            </div>
          </div> */}
        </CardHeader>

        {/* Image */}
        {primaryImage && (
          <div className="  h-40 w-full rounded-xl overflow-hidden">
            <MediaItem
              webViewLink={primaryImage}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}

        {/* Creator Info */}
        <div className="space-y-4 w-full">
          <div className="  gap-20  flex w-full justify-between">

            <div className="flex  gap-3  w-full items-start  justify-between   text-xs">
              <Avatar className="">
                  {inovasi.pembuat.avatarUrl && (
                    <AvatarImage src={inovasi.pembuat.avatarUrl} alt={inovasi.pembuat.nama} />
                  )}
                  <AvatarFallback>{inovasi.pembuat.nama.charAt(0)}</AvatarFallback>
                </Avatar>
              <div className="flex-1">
                <p className="font-medium truncate">{titleSingkat}</p>
                {inovasi.pembuat.organisasi && (
                  <p className="text-muted-foreground text-[10px] truncate">
                    {teksSingkat}
                  </p>
                )}
              </div>
            </div>
            <Badge variant="outline" className="text-accent-foreground text-[10px] w-fit border-0 p-0">
              <ThumbsUp className="size-4 fill-primary text-primary mr-1" />
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
        <CardFooter className="flex mt-0  w-full border-t py-1 items-center justify-between  px-0 ">
          <Link
            href={"/jelajahi-inovasi/" + inovasi.slug}
            className={cn(buttonVariants({ variant: "default" }), "hover:opacity-90 transition-transform w-full hover:scale-105 text-xs ")}

          >Beri Dukungan <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Link>


        </CardFooter>
      </CardContent>

     
    </Card>
  );
}

export default InovasiCard;