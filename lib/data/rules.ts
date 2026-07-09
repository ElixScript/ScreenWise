import type { RuleItem } from "@/types/content";

export const RULES_BANNER =
  "Ingat! Gadget boleh digunakan, tetapi belajar, bermain bersama teman, membantu orang tua, dan beristirahat tetap lebih penting.";

export const RULE_ITEMS: RuleItem[] = [
  {
    id: "batasi-waktu",
    number: 1,
    title: "Batasi Waktu Penggunaan Gadget",
    explanation:
      "Gunakan gadget maksimal 1–2 jam setiap hari di luar keperluan belajar, sesuai aturan orang tua.",
    accent: "blue",
  },
  {
    id: "tempat-terang",
    number: 2,
    title: "Gunakan di Tempat yang Terang",
    explanation:
      "Bermain gadget di tempat gelap membuat mata cepat lelah. Nyalakan lampu atau duduk dekat jendela.",
    accent: "yellow",
  },
  {
    id: "istirahatkan-mata",
    number: 3,
    title: "Istirahatkan Mata",
    explanation:
      "Setiap 20 menit melihat layar, istirahatkan mata 20 detik dengan melihat benda yang jauh.",
    accent: "green",
  },
  {
    id: "konten-aman",
    number: 4,
    title: "Pilih Konten yang Aman",
    explanation:
      "Tonton video edukasi dan mainkan game yang sesuai usia. Jauhi konten untuk orang dewasa.",
    accent: "purple",
  },
  {
    id: "didampingi",
    number: 5,
    title: "Didampingi Orang Tua",
    explanation:
      "Gunakan gadget di dekat Ayah dan Ibu, supaya bisa bertanya jika menemukan hal yang aneh.",
    accent: "orange",
  },
];
