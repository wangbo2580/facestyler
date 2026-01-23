import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaceShapePageContent } from "@/components/seo/FaceShapePageContent";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";
import { generateFaceShapeMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.faceShapes.heart" });
  const tShapes = await getTranslations({ locale, namespace: "faceShapes.heart" });

  return generateFaceShapeMetadata(locale, "heart", tShapes("name"), {
    title: t("title"),
    description: t("description"),
  });
}

export default async function HeartFacePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hairstyles = getHairstylesForFaceShape("heart", "female");

  return <FaceShapePageContent faceShape="heart" hairstyles={hairstyles} />;
}
