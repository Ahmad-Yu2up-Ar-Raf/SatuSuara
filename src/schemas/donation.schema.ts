import { z } from "zod";

export const donationSchema = z.object({
  amountIdr: z
    .number()
    .min(10000, "Minimal donasi Rp 10.000")
    .max(100000000, "Maksimal donasi Rp 100.000.000"),
  paymentMethod: z.enum(["bank_transfer", "ewallet", "credit_card"]),
  donor: z
    .object({
      name: z.string().min(2, "Nama minimal 2 karakter").optional(),
      email: z.string().email("Format email tidak valid").optional(),
    })
    .optional(),
  inovasiId: z.string(),
});

export type DonationPayload = z.infer<typeof donationSchema>;

// Preset amounts for quick selection
export const DONATION_PRESETS = [20000, 50000, 100000, 250000] as const;