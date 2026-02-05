import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. 保持原有的现代字体配置
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yue Zheng | 郑悦 | PhD in Multimodal AI",
  description: "Personal website of Yue Zheng (郑悦), a PhD student at University of Southampton. Researching Multimodal Information Retrieval and Inclusive Information Access.",
  keywords: ["Yue Zheng", "郑悦", "Southampton University", "PhD Computer Science", "Multimodal AI", "Information Retrieval", "Inclusive Design", "Eye-tracking AI"],
  
  // 3. 图标配置 (通过添加 ?v=2 强制浏览器刷新缓存)
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' }, 
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2' }, 
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png?v=2',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png?v=2',
      },
    ],
  },
  
  // 4. PWA 配置文件
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}