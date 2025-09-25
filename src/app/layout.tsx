"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { LoadingScreen } from "../components";
import { LanguageProvider } from "../i18n/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <html lang="zh">
      <head>
        <title>个人主页 - uMisty</title>
        <meta
          name="description"
          content="一个优雅的个人主页，展示你的数字名片"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
          <div
            className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          >
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
