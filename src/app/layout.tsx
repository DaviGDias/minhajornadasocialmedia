import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minha Jornada Social Media — Do zero à profissão",
  description:
    "Mentoria on-line com 4 encontros 100% ao vivo para você se tornar Social Media profissional. Aprenda estratégias, prospecção de clientes e posicionamento digital com quem vive a profissão há mais de 4 anos.",
  icons: {
    icon: [
      { url: "/globe.svg", type: "image/svg+xml" },
    ],
    shortcut: "/globe.svg",
    apple: "/globe.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
