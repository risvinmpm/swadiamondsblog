import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Define fonts using next/font/google
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

// Optional: include font CSS variables globally
// These can be used in your CSS like: font-family: var(--font-inter);

export const metadata: Metadata = {
  title: "Swadiamonds",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
