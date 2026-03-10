import type { Metadata } from "next";
import { Anton, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";
import Footer from "@/src/components/Footer";
import React from "react";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mental Motion",
  description: "Student peer support center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light-custom" style={{ colorScheme: "light" }}>
      <body
        className={`${nunito.className} ${anton.variable} ${nunito.variable} ${geistMono.variable} antialiased max-w-[100vw]`}
      >
        {children}
      </body>
    </html>
  );
}
