export interface SlideProps {
  /** Pindah ke halaman berikutnya (dipakai tombol CTA dalam slide). */
  onNext: () => void;
  /** Apakah slide ini sedang aktif ditampilkan. */
  isActive: boolean;
}
