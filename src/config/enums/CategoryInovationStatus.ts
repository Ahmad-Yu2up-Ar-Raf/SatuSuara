import { OptionItem } from "@/types";
import {
  LucideIcon,
  Heart,
  GraduationCap,
  Leaf,
  Apple,
  Zap,
  Car,
  Wheat,
  PaintBucket,
  Users,
  Cpu,
  Shield,
} from "lucide-react";

// 🏷️ Enum Type untuk kategori inovasi
export enum CategoryInovationStatus {
  Kesehatan = "Kesehatan",
  Pendidikan = "Pendidikan",
  Lingkungan = "Lingkungan",
  Pangan = "Pangan",
  Energi = "Energi",
  Transportasi = "Transportasi",
  Agrikultur = "Agrikultur",
  EkonomiKreatif = "Ekonomi Kreatif",
  Sosial = "Sosial",
  Teknologi = "Teknologi",
  Keamanan = "Keamanan",
}

// 🧩 Options terstruktur untuk UI
export const CategoryInovationOptions: OptionItem[] = [
  {
    value: CategoryInovationStatus.Kesehatan,
    label: "Kesehatan",
    icon: Heart,
    subLabel: "Inovasi Kesehatan",
    description: "Solusi inovatif untuk meningkatkan kualitas kesehatan masyarakat.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Pendidikan,
    label: "Pendidikan",
    icon: GraduationCap,
    subLabel: "Inovasi Pendidikan",
    description: "Metode dan teknologi baru dalam dunia pendidikan.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Lingkungan,
    label: "Lingkungan",
    icon: Leaf,
    subLabel: "Inovasi Lingkungan",
    description: "Solusi untuk menjaga dan melestarikan lingkungan.",
    image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Pangan,
    label: "Pangan",
    icon: Apple,
    subLabel: "Inovasi Pangan",
    description: "Inovasi dalam produksi dan pengolahan pangan.",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Energi,
    label: "Energi",
    icon: Zap,
    subLabel: "Inovasi Energi",
    description: "Solusi energi terbarukan dan efisiensi energi.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Transportasi,
    label: "Transportasi",
    icon: Car,
    subLabel: "Inovasi Transportasi",
    description: "Solusi transportasi modern dan berkelanjutan.",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Agrikultur,
    label: "Agrikultur",
    icon: Wheat,
    subLabel: "Inovasi Pertanian",
    description: "Teknologi dan metode modern dalam pertanian.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.EkonomiKreatif,
    label: "Ekonomi Kreatif",
    icon: PaintBucket,
    subLabel: "Inovasi Ekonomi Kreatif",
    description: "Kreativitas dalam pengembangan ekonomi.",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Sosial,
    label: "Sosial",
    icon: Users,
    subLabel: "Inovasi Sosial",
    description: "Solusi untuk permasalahan sosial masyarakat.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Teknologi,
    label: "Teknologi",
    icon: Cpu,
    subLabel: "Inovasi Teknologi",
    description: "Pengembangan teknologi untuk masa depan.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    value: CategoryInovationStatus.Keamanan,
    label: "Keamanan",
    icon: Shield,
    subLabel: "Inovasi Keamanan",
    description: "Solusi untuk meningkatkan keamanan dan keselamatan.",
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?auto=format&fit=crop&w=1200&q=80",
  },
];

// Untuk memudahkan akses nilai-nilai kategori
export const CategoryInovationValues = CategoryInovationOptions.map(
  (item) => item.value
);