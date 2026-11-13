import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Abishek J — Senior Software Engineer",
  description:
    "Portfolio of Abishek J, a senior software engineer in Chennai building AI agents, full-stack products and mobile apps, and an AWS Certified Solutions Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="is-loading">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans bg-ink text-paper antialiased`}
      >
        <SmoothScroll />
        <Preloader />
        <Cursor />
        <Navbar />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
