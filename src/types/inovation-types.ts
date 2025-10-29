// Import the schema type
import { inovasiSchema, Inovasi } from '@/schemas/inovasi.schema';

// Re-export for convenience


// Component props interfaces (Indonesian names as requested)
export interface KomponenLeaderboardProps {
  judul?: string;
  subtitle?: string;
  maxItems?: number;
  fetchUrl?: string;
}

export interface KartuPeringkatProps {
  item: Inovasi;
  rank?: number;
  kompaks?: boolean;
  onVote?: (id: string) => Promise<void>;
  onAuthRequired?: () => void;
}

// Validation helper
export const validateInovasiData = (data: unknown): Inovasi => {
  return inovasiSchema.parse(data);
};

// Utility to map API data (future use)
export const mapApiToInovasi = (apiData: any): Inovasi => {
  return inovasiSchema.parse({
    id: apiData.id,
    slug: apiData.slug,
    judul: apiData.title || apiData.judul,
    ringkasanPendek: apiData.shortDescription || apiData.ringkasanPendek,
    gambarUrl: apiData.imageUrl || apiData.gambarUrl,
    pembuat: {
      id: apiData.creator?.id || apiData.pembuat?.id,
      nama: apiData.creator?.name || apiData.pembuat?.nama,
      avatarUrl: apiData.creator?.avatarUrl || apiData.pembuat?.avatarUrl,
    },
    totalVote: apiData.totalVotes || apiData.totalVote,
    dibuatPada: apiData.createdAt || apiData.dibuatPada,
    tag: apiData.tags || apiData.tag,
  });
};