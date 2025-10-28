import { z } from 'zod';

/**
 * Zod Schema untuk validasi data inovasi
 * SatuSuara - Platform E-Voting & Showcase Inovasi Indonesia
 */

// Media schema
const mediaSchema = z.object({
  kind: z.enum(['image', 'lottie']),
  url: z.string().url(),
  caption: z.string().optional(),
  license: z.string().optional(),
  source: z.string().optional(),
});

// Creator/Pembuat schema
const pembuatSchema = z.object({
  id: z.string().uuid(),
  nama: z.string().min(1),
  peran: z.string().optional(),
  organisasi: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

// Location schema
const lokasiSchema = z.object({
  provinsi: z.string().optional(),
  kabupatenKota: z.string().optional(),
});

// Impact metrics schema
const impactMetricsSchema = z.object({
  beneficiaries: z.number().int().nonnegative().optional(),
  co2SavedKg: z.number().nonnegative().optional(),
  fundsRaisedIdr: z.number().nonnegative().optional(),
  jobsCreated: z.number().int().nonnegative().optional(),
}).optional();

// Source schema
const sumberSchema = z.object({
  type: z.enum(['article', 'paper', 'repo', 'video', 'official']),
  title: z.string().optional(),
  url: z.string().url(),
  publishedAt: z.string().optional(),
});

// Main innovation schema
export const inovasiSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be kebab-case'),
  judul: z.string().min(1).max(200),
  ringkasanPendek: z.string().min(10).max(120),
  deskripsi: z.string().min(50).max(2000),
  media: z.array(mediaSchema).min(1),
  pembuat: pembuatSchema,
  kategori: z.enum([
    'Kesehatan',
    'Pendidikan',
    'Lingkungan',
    'Pangan',
    'Energi',
    'Transportasi',
    'Agrikultur',
    'Ekonomi Kreatif',
    'Sosial',
    'Teknologi',
    'Keamanan'
  ]),
  subKategori: z.string().optional(),
  tag: z.array(z.string()).min(3).max(8),
  lokasi: lokasiSchema,
  dibuatPada: z.string().datetime(),
  diupdatePada: z.string().datetime().optional(),
  totalVote: z.number().int().nonnegative(),
  status: z.enum(['draft', 'published', 'archived']),
  impactMetrics: impactMetricsSchema,
  sumber: z.array(sumberSchema),
  confidence: z.enum(['verified', 'reported', 'unverified']),
  license: z.string().optional(),
}).refine(
  (data) => {
    if (data.diupdatePada) {
      return new Date(data.dibuatPada) <= new Date(data.diupdatePada);
    }
    return true;
  },
  {
    message: 'diupdatePada must be greater than or equal to dibuatPada',
    path: ['diupdatePada'],
  }
);

// TypeScript types
export type Media = z.infer<typeof mediaSchema>;
export type Pembuat = z.infer<typeof pembuatSchema>;
export type Lokasi = z.infer<typeof lokasiSchema>;
export type ImpactMetrics = z.infer<typeof impactMetricsSchema>;
export type Sumber = z.infer<typeof sumberSchema>;
export type Inovasi = z.infer<typeof inovasiSchema>;

// Helper type for array of innovations
export type InovasiList = Inovasi[];

// Export schema for validation
export default inovasiSchema;