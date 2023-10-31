"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Nav } from "./_components/Nav";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

import localFont from "next/font/local";

export const pangchang = localFont({
  src: "../public/Panchang/Panchang-Variable.woff2",
  display: "swap",
  variable: "--font-pangchang",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* PWA config */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="DAOBox PWA" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/icons/iconmain-512x512.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <body className={inter.className}>
        <Providers>
          <Nav />
          <div id="background-image" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
