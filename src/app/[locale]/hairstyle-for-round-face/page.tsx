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
  const t = await getTranslations({ locale, namespace: "metadata.faceShapes.round" });
  const tShapes = await getTranslations({ locale, namespace: "faceShapes.round" });

  return generateFaceShapeMetadata(locale, "round", tShapes("name"), {
    title: t("title"),
    description: t("description"),
  });
}

export default async function RoundFacePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hairstyles = getHairstylesForFaceShape("round", "female");

  return <FaceShapePageContent faceShape="round" hairstyles={hairstyles} />;
}
