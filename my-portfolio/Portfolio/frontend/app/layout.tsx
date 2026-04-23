import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import EngagementModals from "@/components/EngagementModals";
import { SocialBar } from "@/components/SocialBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ganesh Zambare - Portfolio",
  description: "AI & Data Engineering Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <Navbar />
        <SocialBar />
        <EngagementModals />
        {children}
      </body>
    </html>
  );
}
