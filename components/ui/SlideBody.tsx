"use client";

import type { ReactNode } from "react";

interface SlideBodyProps {
  children: ReactNode;
  /** Kelas tambahan untuk lapisan konten (mis. `gap-6`). */
  className?: string;
}

/**
 * Kerangka isi slide.
 *
 * Konten dipusatkan secara vertikal SELAMA masih muat di layar. Ketika konten
 * lebih tinggi daripada layar (mis. proyektor 1366×768 atau jendela pendek),
 * lapisan ini otomatis dapat digulir — bukan terpotong seperti pada pola
 * `flex justify-center` + `overflow-hidden`.
 *
 * Rahasianya: pembungkus luar yang menggulir (`overflow-y-auto`) berisi
 * lapisan `min-h-full`. Saat konten lebih pendek, `min-h-full` mengisi layar
 * sehingga `justify-center` memusatkannya. Saat konten lebih tinggi, lapisan
 * tumbuh melebihi layar sehingga seluruh isi tetap terlihat dan bisa digulir.
 *
 * Latar dekoratif diletakkan DI LUAR komponen ini (tetap diam, tidak ikut
 * menggulir).
 */
export default function SlideBody({ children, className = "" }: SlideBodyProps) {
  return (
    <div className="relative z-10 h-full w-full overflow-y-auto overflow-x-hidden">
      <div
        className={`flex min-h-full w-full flex-col items-center justify-center px-6 pb-24 pt-14 md:px-12 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
