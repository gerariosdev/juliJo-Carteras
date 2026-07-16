import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JuliJo Carteras | Marroquinería Artesanal",
    template: "%s | JuliJo Carteras",
  },
  description:
    "Carteras y accesorios de cuero artesanales. Marroquinería premium hecha a mano en Argentina.",
  keywords: [
    "carteras",
    "cuero",
    "marroquinería",
    "artesanal",
    "accesorios",
    "argentina",
  ],
  openGraph: {
    title: "JuliJo Carteras | Marroquinería Artesanal",
    description:
      "Carteras y accesorios de cuero artesanales. Marroquinería premium hecha a mano en Argentina.",
    type: "website",
    locale: "es_AR",
    siteName: "JuliJo Carteras",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
