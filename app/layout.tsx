import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 保持原有的字体配置，确保网页美观
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. 基础 SEO 配置
  title: "Yue Zheng | 郑悦 | PhD in Multimodal AI",
  description: "Personal website of Yue Zheng (郑悦), a PhD student at University of Southampton specializing in Multimodal AI and Inclusive Design.",
  
  // 2. 图标全家桶配置 (解决标签页图标不换的问题)
  icons: {
    icon: [
      { url: '/favicon.ico' }, 
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }, 
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  // 3. PWA 配置文件
  manifest: '/site.webmanifest',
}; // <--- 这里的括号之前可能漏掉了

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 将字体变量注入 body */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}