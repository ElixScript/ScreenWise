import { BookOpen, PhoneCall, Video, Globe2 } from "lucide-react";
import type { BenefitItem } from "@/types/content";

export const BENEFIT_ITEMS: BenefitItem[] = [
  {
    id: "belajar",
    title: "Belajar",
    description: "Membaca buku digital dan berlatih soal jadi lebih mudah.",
    icon: BookOpen,
    accent: "blue",
  },
  {
    id: "menghubungi",
    title: "Menghubungi Orang Tua",
    description: "Bisa menelepon Ayah dan Ibu kapan saja saat dibutuhkan.",
    icon: PhoneCall,
    accent: "green",
  },
  {
    id: "video-edukasi",
    title: "Video Edukasi",
    description: "Menonton video sains, hewan, dan luar angkasa yang seru.",
    icon: Video,
    accent: "orange",
  },
  {
    id: "cari-informasi",
    title: "Mencari Informasi",
    description: "Menjelajah dunia dan menemukan jawaban rasa penasaranmu.",
    icon: Globe2,
    accent: "purple",
  },
];
