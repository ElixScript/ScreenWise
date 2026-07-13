import type { Metadata } from "next";
import { Baloo_2, Nunito, Poppins } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gadget Cerdas — Belajar Bijak Menggunakan Gadget",
  description:
    "Presentasi interaktif untuk siswa SD: penggunaan gadget yang sehat dan bijak, bersama Kosmo si penjelajah angkasa!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${baloo.variable} ${nunito.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
