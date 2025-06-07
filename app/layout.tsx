import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "ArcaneAcademy",
  description: "Empowering education with AI-based grading, blockchain security, and modern academic management.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-black text-gray-200 min-h-screen relative overflow-x-hidden`}
      >
        <CustomCursor />
        {/* Background Layer for Consistency */}
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-10 animate-particle pointer-events-none"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black animate-slow-pulse pointer-events-none"></div>
        
        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}