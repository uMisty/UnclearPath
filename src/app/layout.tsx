import type { Metadata } from "next";
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

// 动态生成元数据
export async function generateMetadata(): Promise<Metadata> {
  // 简化版本，使用默认中文配置
  // 在实际应用中可以根据用户语言偏好动态选择
  const defaultTitle = "个人主页 - uMisty";
  const defaultDescription = "一个优雅的个人主页，展示你的数字名片";

  return {
    title: defaultTitle,
    description: defaultDescription,
  };
}

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
        {children}
      </body>
    </html>
  );
}
