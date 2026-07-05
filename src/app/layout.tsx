import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Hand Betting Game",
  description: "Mahjong tabanlı yüksek/düşük bahis oyunu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-felt font-body`}>
        {children}
      </body>
    </html>
  );
}