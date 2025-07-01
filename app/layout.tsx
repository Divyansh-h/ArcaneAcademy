import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "ArcaneAcademy - Smart Education Platform",
  description: "AI-powered grading, assignment management, and secure rechecking with blockchain technology.",
  keywords: "education, grading, blockchain, AI, assignments, academic management",
  authors: [{ name: "ArcaneAcademy Team" }],
  robots: "index, follow",
  openGraph: {
    title: "ArcaneAcademy - Smart Education Platform",
    description: "AI-powered grading, assignment management, and secure rechecking with blockchain technology.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcaneAcademy - Smart Education Platform",
    description: "AI-powered grading, assignment management, and secure rechecking with blockchain technology.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} antialiased bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 min-h-screen relative overflow-x-hidden`}
      >
        {/* Background Layer for Consistency */}
        <div className="fixed inset-0 opacity-5 animate-particle noise-bg pointer-events-none"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-200/50 animate-slow-pulse pointer-events-none"></div>
        
        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}