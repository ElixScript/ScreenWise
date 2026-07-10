# 🤖 Gadget Cerdas — Presentasi Interaktif untuk Anak SD

Website presentasi interaktif untuk sosialisasi **"Penggunaan Gadget yang Sehat dan Bijak"** kepada siswa kelas 4 SD — dikemas dengan pendekatan **Game UI premium**: aurora mesh background, glassmorphism, neon glow, kartu 3D tilt, dan HUD level ala game modern. Bukan PowerPoint, bukan website anak TK.

Ditemani **Bimo si Robot Pintar** 🤖, siswa menjelajah 10 level petualangan belajar.

## ✨ Fitur

- 🎮 **Game UI premium** — deep navy + aurora mesh gradient, glass panel, glow, partikel melayang, animated gradient border
- 🗺️ **HUD level map** — navigasi bawah bergaya peta level game dengan node bernomor & centang progres
- 🎬 **10 level** dengan nuansa aurora & layout yang berbeda-beda, transisi sinematik (blur/zoom/slide)
- 🤖 **Maskot hover-bot** (SVG orisinal) dengan visor neon, energy core, dan pose dinamis
- 🃏 **Kartu 3D tilt** yang miring mengikuti kursor + micro-interaction di semua komponen
- 📰 **Slide kisah nyata** — kliping berita asli dengan nuansa sinematik serius (peduli, bukan menakut-nakuti)
- ⚔️ **Arena "Bijak atau Tidak?"** — 10 ronde, HUD skor kelas, tombol neon, confetti
- 🏆 **Quiz berbintang** — 5 soal, progress bar gradient, boleh mencoba lagi, tanpa mempermalukan siswa
- 🔊 **Efek suara lembut** disintesis via Web Audio API (bebas hak cipta) + tombol mute
- ⌨️ **Navigasi keyboard** (←/→, PageUp/Down, Home/End) + tombol layar penuh
- ♿ Aksesibel: aria-label, target klik ≥ 44px, kontras tinggi, hormat `prefers-reduced-motion`

## 🛠️ Teknologi

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 (design token: neon, glow, glass) |
| Animasi | Framer Motion (tilt 3D, spring, cinematic transition) |
| Ikon | Lucide React |
| Efek | canvas-confetti, Web Audio API |
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
