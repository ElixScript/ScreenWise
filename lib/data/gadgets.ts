import type { GadgetItem } from "@/types/content";

export const GADGET_DEFINITION =
  "Gadget adalah alat elektronik yang membantu kita belajar, berkomunikasi, dan mencari informasi.";

export const GADGET_ITEMS: GadgetItem[] = [
  {
    id: "smartphone",
    name: "Smartphone",
    description: "Telepon pintar untuk menelepon, mengirim pesan, dan belajar.",
    funFact: "Smartphone bisa menyimpan ribuan buku di dalamnya!",
    accent: "blue",
  },
  {
    id: "laptop",
    name: "Laptop",
    description: "Komputer yang bisa dibawa ke mana-mana untuk mengetik dan belajar.",
    funFact: "Laptop pertama beratnya hampir 11 kg, seberat ember penuh air!",
    accent: "purple",
  },
  {
    id: "smartwatch",
    name: "Smartwatch",
    description: "Jam tangan pintar yang bisa menghitung langkah kaki kita.",
    funFact: "Smartwatch tahu kalau kamu sedang lari atau berjalan, lho!",
    accent: "green",
  },
  {
    id: "tablet",
    name: "Tablet",
    description: "Layar besar yang mudah disentuh untuk membaca dan menggambar.",
    funFact: "Banyak pelukis hebat sekarang menggambar di tablet!",
    accent: "orange",
  },
];
