import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getInovasiBySlug, 
  getAllSlugs, 
  formatCurrency, 
  formatNumber, 
  formatDate 
} from '@/lib/inovation';
import { Metadata } from 'next';
import InovasiDetailUI from '@/components/ui/fragments/custom-ui/block/detail-block-page-inovation';

// Generate static params untuk semua inovasi (ISR/SSG)
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate dynamic metadata untuk SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const inovasi = getInovasiBySlug(params.slug);
  
  if (!inovasi) {
    return {
      title: 'Inovasi Tidak Ditemukan',
    };
  }

  return {
    title: `${inovasi.judul} | SatuSuara`,
    description: inovasi.ringkasanPendek,
    openGraph: {
      title: inovasi.judul,
      description: inovasi.ringkasanPendek,
      images: [inovasi.media[0].url],
    },
  };
}

export default async function InovasiDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const inovasi = getInovasiBySlug(params.slug);

  // Jika tidak ditemukan, tampilkan 404
  if (!inovasi) {
    notFound();
  }

  return (
    <InovasiDetailUI inovasi={inovasi} />
  );
}