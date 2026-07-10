"use client";

import { useEffect, useState } from "react";

/**
 * Bernilai `false` saat render server & render klien pertama, lalu `true`
 * setelah komponen ter-mount. Dipakai untuk menunda elemen dekoratif yang
 * memakai nilai acak/presisi tinggi agar tidak memicu hydration mismatch.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
