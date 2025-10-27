import { z } from 'zod';

const inovasiSchema = z.object({
  name: z.string(),
  summary: z.string().max(120),
  description: z.string(),
  date: z.string(),             // tanggal peluncuran/publikasi (YYYY-MM-DD)
  votes: z.number(),
  creator: z.object({
    name: z.string(),
    organization: z.string().optional(),
  }),
  imageUrl: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});

export type InovasiRingkas = z.infer<typeof inovasiSchema>;