import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Countrdle 🌍",
  description: "Country guessing trivia aimed to practice your geographic skills.",
  applicationName: "Countrdle",
  authors: [{ name: "Matěj Kotrba", url: "https://github.com/matej-kotrba" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-600 to-orange-700 grid h-screen grid-rows-[1fr_auto]`}
      >
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
