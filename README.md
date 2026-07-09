# 🤖 Gadget Cerdas — Presentasi Interaktif untuk Anak SD

Website presentasi interaktif untuk sosialisasi **"Penggunaan Gadget yang Sehat dan Bijak"** kepada siswa kelas 4 SD. Dirancang seperti permainan edukasi — bukan slide PowerPoint — lengkap dengan maskot, game show kelas, quiz berbintang, dan animasi di setiap halaman.

Ditemani **Bimo si Robot Pintar** 🤖, siswa diajak menjelajah 10 halaman petualangan belajar.

## ✨ Fitur

- 🎬 **10 halaman** dengan identitas visual & layout yang berbeda-beda
- 🤖 **Maskot animasi** (SVG orisinal) yang menyapa, memberi tips, dan merayakan keberhasilan
- 📰 **Slide kisah nyata** — kliping berita asli dengan nuansa tenang & reflektif (peduli, bukan menakut-nakuti)
- 🎮 **Game show "Bijak atau Tidak?"** — 10 situasi, papan skor kelas, confetti
- 🏆 **Quiz berbintang** — 5 soal, progress bar, boleh mencoba lagi, tanpa mempermalukan siswa
- 🔊 **Efek suara lembut** disintesis via Web Audio API (bebas hak cipta) + tombol mute
- 🎊 Confetti, sparkle, balon, pelangi, dan micro-interaction di semua komponen
- ⌨️ **Navigasi keyboard** (←/→, PageUp/Down, Home/End) + tombol layar penuh
- ♿ Aksesibel: aria-label, target klik ≥ 44px, kontras baik, hormat `prefers-reduced-motion`

## 🛠️ Teknologi

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Ikon | Lucide React |
| Efek | canvas-confetti |
| Font | Baloo 2, Nunito, Poppins (next/font) |
| Ilustrasi | SVG orisinal buatan sendiri |

## 🚀 Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000), tekan **F** / tombol layar penuh, dan mulai presentasi. Optimal untuk proyektor 1920×1080 & 1366×768.

## 📁 Struktur Proyek

```
app/                      # Layout, halaman, design token global
components/
  presentation/           # Shell presentasi: transisi, navigasi, HUD
  slides/                 # 10 halaman presentasi
  mascot/                 # Bimo si Robot Pintar + speech bubble
  illustrations/          # SVG orisinal: karakter, gadget, alam, adegan
  backgrounds/            # Blob, sparkle, doodle animasi
  ui/                     # Tombol, kartu, judul reusable
hooks/                    # useSound, useFullscreen, useKeyboardNav
lib/
  data/                   # Seluruh konten materi (terpisah dari tampilan)
types/                    # Kontrak TypeScript
```

## 🎓 Alur Presentasi (±45–60 menit)

1. 🌈 Pembuka — 2. 🙋 Ice breaking — 3. 📱 Apa itu gadget? — 4. ✨ Manfaat —
5. 💛 Dampak berlebihan — 6. 📰 Kisah nyata — 7. 📜 5 Aturan emas —
8. 🎮 Game "Bijak atau Tidak?" — 9. 🏆 Quiz — 10. 🎉 Penutup
