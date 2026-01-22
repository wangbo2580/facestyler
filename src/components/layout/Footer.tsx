"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">FaceStyler</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered face shape detection with personalized hairstyle recommendations. Free, no signup required.
            </p>
          </div>

          {/* Face Shapes */}
          <div className="space-y-4">
            <h3 className="font-semibold">Face Shapes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/hairstyle-for-oval-face" className="hover:text-foreground transition-colors">
                  Oval Face
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-round-face" className="hover:text-foreground transition-colors">
                  Round Face
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-square-face" className="hover:text-foreground transition-colors">
                  Square Face
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-heart-face" className="hover:text-foreground transition-colors">
                  Heart Face
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-oblong-face" className="hover:text-foreground transition-colors">
                  Oblong Face
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-diamond-face" className="hover:text-foreground transition-colors">
                  Diamond Face
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <p className="text-sm text-muted-foreground">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FaceStyler. All rights reserved.</p>
          <p className="mt-2">Your photos are processed locally and never uploaded to our servers.</p>
        </div>
      </div>
    </footer>
  );
}
