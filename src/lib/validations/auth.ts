import { UserOccupationValue } from "@/config/enums/Ocupassion";
import * as z from "zod";

/**
 * Schema validasi untuk autentikasi (login & register)
 * Pesan error disediakan dalam Bahasa Indonesia
 */

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi." })
    .email({ message: "Format email tidak valid." }),
  password: z.string().min(8, { message: "Kata sandi minimal 8 karakter." }),
  remember_token: z.boolean().optional(),
});

export const registerCreateSchema = z
  .object({
    name: z.string().min(4, { message: "Nama harus terdiri dari minimal 4 karakter." }),
    email: z
      .string()
      .min(1, { message: "Email wajib diisi." })
      .email({ message: "Format email tidak valid." }),
    password: z.string().min(8, { message: "Kata sandi minimal 8 karakter." }),
    password_confirmation: z.string().min(8, { message: "Konfirmasi kata sandi minimal 8 karakter." }),
    phone: z.string().min(2, { message: "Nomor telepon wajib diisi." }),
    country: z.string().min(2, { message: "Negara wajib diisi." }),
    province: z.string().min(2, { message: "Provinsi wajib diisi." }),
    occupasion: z.enum(UserOccupationValue).optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["password_confirmation"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerCreateSchema>;
