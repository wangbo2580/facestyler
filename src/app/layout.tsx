import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FaceStyler - Find the Best Hairstyle for Your Face Shape",
    template: "%s | FaceStyler",
  },
  description:
    "Upload your photo and let AI detect your face shape. Get personalized hairstyle recommendations instantly. Free, no signup required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
