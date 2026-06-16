import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Robson Marcolino — Fullstack Developer",
  description:
    "Portfólio de Robson Marcolino — Desenvolvedor Fullstack. Construindo aplicações robustas do backend ao frontend com código limpo e arquitetura escalável.",
  keywords: [
    "Robson Marcolino",
    "Fullstack Developer",
    "React",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Robson Marcolino" }],
  openGraph: {
    title: "Robson Marcolino — Fullstack Developer",
    description:
      "Portfólio de Robson Marcolino — Desenvolvedor Fullstack. Construindo aplicações robustas do backend ao frontend.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
