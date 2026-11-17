import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plant Finder",
  description: "Search plants and explore care, propagation and harvest details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="siteHeader">
          <div className="siteHeaderInner">
            <Link href="/" className="brand">
              <span className="brandMark" aria-hidden="true">🌿</span>
              Plant Finder
            </Link>
            <span className="siteHeaderTag">React · TypeScript · Next.js</span>
          </div>
        </header>
        <div className="pageShell">{children}</div>
      </body>
    </html>
  );
}
