import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";
import Footer from "@/src/components/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[100vw]`}
      >
        <NavBar/>

        {children}

        <a href={'/contact'} className={'fixed btn btn-accent rounded-sm btn-xl right-28 bottom-16'}>Plan een afspraak</a>

        <Footer/>
      </body>
    </html>
  );
}
