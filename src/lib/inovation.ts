import { Inovasi } from '@/schemas/inovasi.schema';
import inovationsData from "@/config/data/Inovations.json";
/**
 * Get all innovations
 */
export function getAllInovasi(): Inovasi[] {
  return inovationsData as Inovasi[];
}

/**
 * Get innovation by slug
 */
export function getInovasiBySlug(slug: string): Inovasi | undefined {
  const data = inovationsData as unknown as Inovasi[];
  console.log('Searching for slug:', slug);
  console.log('Available slugs:', data.map(item => item.slug));
  const found = data.find(inovasi => inovasi.slug === slug);
  console.log('Found inovasi:', found ? 'yes' : 'no');
  return found;
}

/**
 * Get all slugs for static generation
 */
export function getAllSlugs(): string[] {
  return inovationsData.map((inovasi) => inovasi.slug);
}

/**
 * Format currency to IDR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with thousand separator
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}