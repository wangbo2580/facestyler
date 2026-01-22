import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Heart Face Shape (2026 Guide)",
  description:
    "Find flattering hairstyles for heart-shaped faces. Balance a wider forehead with expert styling tips and 15+ recommended haircuts.",
  keywords: [
    "hairstyle for heart face",
    "heart face shape haircut",
    "heart shaped face hairstyles",
    "inverted triangle face hairstyle",
    "heart face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Heart Face Shape (2026 Guide)",
    description:
      "Find flattering hairstyles for heart-shaped faces. 15+ recommended haircuts.",
  },
};

const FAQS = [
  {
    question: "What hairstyle suits a heart-shaped face?",
    answer:
      "Styles that add width at the jawline work best, such as chin-length bobs, shoulder-length cuts with waves at the bottom, and side-swept bangs that minimize forehead width.",
  },
  {
    question: "Should heart faces have bangs?",
    answer:
      "Yes! Side-swept bangs and curtain bangs are excellent for heart faces as they help balance a wider forehead. Avoid heavy, straight-across bangs that can make the forehead appear even wider.",
  },
  {
    question: "Is short hair good for heart-shaped faces?",
    answer:
      "Short hair can be flattering if it adds fullness around the chin area. Chin-length bobs and textured pixie cuts with side-swept fringe work well for heart-shaped faces.",
  },
  {
    question: "How do I know if I have a heart face shape?",
    answer:
      "A heart face shape features a wider forehead that tapers down to a narrow, sometimes pointed chin. Cheekbones are typically high and prominent, and the overall shape resembles an inverted triangle or heart.",
  },
  {
    question: "What haircuts should heart faces avoid?",
    answer:
      "Avoid styles that add volume at the crown or forehead, as this emphasizes the width at the top. Also avoid very short cuts that expose the chin too much or slicked-back styles.",
  },
];

export default function HeartFacePage() {
  const hairstyles = getHairstylesForFaceShape("heart", "female");

  return <FaceShapePage faceShape="heart" hairstyles={hairstyles} faqs={FAQS} />;
}
