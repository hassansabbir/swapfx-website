import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwapFX - Smart Currency Exchange",
  description: "Swap currencies directly with people worldwide. Faster, cheaper, and transparent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-100 selection:text-cyan-900`}
      >
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 px-4 pb-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
