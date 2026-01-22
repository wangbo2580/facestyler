import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FaceStyler - Find the Best Hairstyle for Your Face Shape",
    template: "%s | FaceStyler",
  },
  description:
    "Upload your photo and let AI detect your face shape. Get personalized hairstyle recommendations instantly. Free, no signup required.",
  keywords: [
    "face shape",
    "hairstyle",
    "haircut",
    "face shape analyzer",
    "best hairstyle for face shape",
    "hairstyle recommendations",
    "AI face detection",
  ],
  authors: [{ name: "FaceStyler" }],
  creator: "FaceStyler",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://facestyler.com",
    siteName: "FaceStyler",
    title: "FaceStyler - Find Your Perfect Hairstyle",
    description:
      "AI-powered face shape detection with personalized hairstyle recommendations. Free, no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FaceStyler - Find Your Perfect Hairstyle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FaceStyler - Find Your Perfect Hairstyle",
    description:
      "AI-powered face shape detection with personalized hairstyle recommendations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
