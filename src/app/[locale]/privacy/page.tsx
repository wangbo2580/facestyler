import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateStaticMetadata } from "@/lib/metadata";
import PrivacyPageClient from "./PrivacyPageClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });

  return generateStaticMetadata(locale, "privacy", {
    title: t("title"),
    description: t("description"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyPageClient />;
}
