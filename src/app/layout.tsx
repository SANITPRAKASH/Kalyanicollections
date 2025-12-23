import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Kalyani Collections - Authentic Indian Wear Boutique",
  description: "Discover our beautiful collection of sarees, lehengas, kurtas, and more. Your trusted boutique for authentic Indian wear for special occasions.",
  keywords: "Indian wear, sarees, lehengas, kurtas, boutique, fashion, traditional wear",
  authors: [{ name: "Kalyani Collections" }],
  openGraph: {
    title: "Kalyani Collections - Authentic Indian Wear Boutique",
    description: "Discover our beautiful collection of sarees, lehengas, kurtas, and more.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}