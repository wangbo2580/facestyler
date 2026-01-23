"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tShapes = useTranslations("faceShapes");

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">{t("brand")}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("brandDesc")}
            </p>
          </div>

          {/* Face Shapes */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("faceShapesTitle")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/hairstyle-for-oval-face" className="hover:text-foreground transition-colors">
                  {tShapes("oval.name")}
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-round-face" className="hover:text-foreground transition-colors">
                  {tShapes("round.name")}
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-square-face" className="hover:text-foreground transition-colors">
                  {tShapes("square.name")}
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-heart-face" className="hover:text-foreground transition-colors">
                  {tShapes("heart.name")}
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-oblong-face" className="hover:text-foreground transition-colors">
                  {tShapes("oblong.name")}
                </Link>
              </li>
              <li>
                <Link href="/hairstyle-for-diamond-face" className="hover:text-foreground transition-colors">
                  {tShapes("diamond.name")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("resourcesTitle")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t("connectTitle")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("connectDesc")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>{tCommon("copyright", { year: new Date().getFullYear() })}</p>
          <p className="mt-2">{tCommon("privacyNote")}</p>
        </div>
      </div>
    </footer>
  );
}
