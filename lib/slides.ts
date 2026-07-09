export interface SlideMeta {
  id: string;
  title: string;
  emoji: string;
}

/** Urutan resmi 10 halaman presentasi. */
export const SLIDES: SlideMeta[] = [
  { id: "opening", title: "Pembuka", emoji: "🌈" },
  { id: "ice-breaking", title: "Kenalan Dulu", emoji: "🙋" },
  { id: "apa-itu-gadget", title: "Apa itu Gadget?", emoji: "📱" },
  { id: "manfaat", title: "Manfaat Gadget", emoji: "✨" },
  { id: "dampak", title: "Dampak Berlebihan", emoji: "💛" },
  { id: "kisah-nyata", title: "Kisah Nyata", emoji: "📰" },
  { id: "aturan", title: "5 Aturan Emas", emoji: "📜" },
  { id: "game", title: "Bijak atau Tidak?", emoji: "🎮" },
  { id: "quiz", title: "Quiz Seru", emoji: "🏆" },
  { id: "penutup", title: "Terima Kasih", emoji: "🎉" },
];

export const TOTAL_SLIDES = SLIDES.length;
