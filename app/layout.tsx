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

// app/layout.tsx
export const metadata = {
  // 建议这样写：名字用中英双语，身份用英文（显得国际化）
  title: "Yue Zheng | 郑悦 | PhD in Multimodal AI", 
  description: "Personal website of Yue Zheng (郑悦), a PhD student at University of Southampton specializing in Multimodal AI and Inclusive Design.",
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
        {children}
      </body>
    </html>
  );
}
