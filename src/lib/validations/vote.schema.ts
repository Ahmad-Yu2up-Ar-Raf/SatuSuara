import { z } from "zod";

/**
 * Schema validasi untuk vote payload
 * MENDUKUNG: UUID v4 ATAU slug (kebab-case)
 */
export const votePayloadSchema = z.object({
  // Terima UUID atau slug
  inovasiId: z.union([
    z.string().uuid({
      message: "Format UUID tidak valid",
    }),
    z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Format slug tidak valid (harus kebab-case)",
    }),
  ]).refine((val) => val.length > 0, {
    message: "ID inovasi tidak boleh kosong",
  }),
  
  inovasiTitle: z.string().min(1).optional(),
  timestamp: z.number().default(() => Date.now()),
});

/**
 * Schema untuk storage vote data
 */
export const voteStorageSchema = z.object({
  userId: z.string().optional(),
  votes: z.array(
    z.object({
      inovasiId: z.union([
        z.string().uuid(),
        z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      ]),
      inovasiTitle: z.string().optional(),
      votedAt: z.number(),
    })
  ),
  version: z.literal(1),
});

// TypeScript types
export type VotePayload = z.infer<typeof votePayloadSchema>;
export type VoteStorage = z.infer<typeof voteStorageSchema>;
export type VoteItem = VoteStorage["votes"][number];

/**
 * Helper untuk validasi vote payload dengan safeParse
 * TIDAK throw error, return object dengan status
 */
export function validateVotePayload(data: unknown): {
  success: boolean;
  data?: VotePayload;
  error?: string;
  receivedValue?: any;
} {
  try {
    const result = votePayloadSchema.safeParse(data);
    
    if (result.success) {
      return { 
        success: true, 
        data: result.data 
      };
    } else {
      // Extract error message
      const firstError = result.error;
      console.error('❌ VALIDATION ERROR:', {
        received: data,
        errors: result.error,
      });
      
      return {
        success: false,
        error: firstError?.message || "Data tidak valid",
        receivedValue: data,
      };
    }
  } catch (error) {
    console.error('❌ VALIDATION EXCEPTION:', error);
    return { 
      success: false, 
      error: "Terjadi kesalahan saat validasi",
      receivedValue: data,
    };
  }
}

/**
 * Utility: Check apakah string adalah UUID v4
 */
export function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Utility: Check apakah string adalah slug valid
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}