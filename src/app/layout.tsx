import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // PENTING: Pastikan import ini ada!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI & Big Data Studio",
  description: "Dashboard for AI Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Kita tambahkan bg-white di sini agar mode terang lebih bersih */}
      <body className={`${inter.className} bg-white text-gray-900`}>{children}</body>
    </html>
  );
}