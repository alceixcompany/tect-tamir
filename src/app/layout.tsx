import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: '--font-space',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "iPhone Tamir Atölyesi | Profesyonel iPhone Anakart Onarımı",
  description: "iPhone anakart tamiri, veri kurtarma ve mikro lehimleme uzmanlığı. Çip seviyesinde profesyonel onarım hizmetleri.",
  keywords: [
    "iphone tamir",
    "iphone anakart tamiri",
    "iphone veri kurtarma",
    "mikro lehimleme",
    "apple teknik servis",
    "iphone çip tamiri"
  ].join(", "),
  authors: [{ name: "iPhone Tamir Atölyesi" }],
  creator: "iPhone Tamir Atölyesi",
  publisher: "iPhone Tamir Atölyesi",
  robots: "index, follow",
  icons: {
    icon: "/iphonetamiratolyesi_icon.png",
    apple: "/iphonetamiratolyesi_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-on-background`}>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WMRRXTMT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
