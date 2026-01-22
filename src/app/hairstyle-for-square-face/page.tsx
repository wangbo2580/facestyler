import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Square Face Shape (2026 Guide)",
  description:
    "Discover hairstyles that soften and flatter square face shapes. Expert tips on balancing angular features with 15+ recommended haircuts.",
  keywords: [
    "hairstyle for square face",
    "best haircut for square face",
    "square face hairstyles",
    "square jawline haircut",
    "square face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Square Face Shape (2026 Guide)",
    description:
      "Discover hairstyles that soften and flatter square face shapes. 15+ recommended haircuts.",
  },
};

const FAQS = [
  {
    question: "What hairstyle suits a square face shape?",
    answer:
      "Soft, layered styles work best for square faces. Waves, curls, and textured cuts help soften angular features. Side-parted styles and long layers are particularly flattering for square jawlines.",
  },
  {
    question: "Should square faces avoid straight hair?",
    answer:
      "Straight hair can work, but it's best to add some movement or layers to soften the angular features. Avoid blunt, one-length cuts that can emphasize the strong jawline.",
  },
  {
    question: "Are bangs good for square faces?",
    answer:
      "Yes, but choose softer styles like side-swept bangs, curtain bangs, or wispy fringe. Avoid heavy, straight-across bangs that can make the face appear boxier.",
  },
  {
    question: "What haircut softens a square jawline?",
    answer:
      "Layered cuts, soft waves, and styles with volume at the crown help balance a strong jaw. Face-framing layers and textured ends also help create a softer overall appearance.",
  },
  {
    question: "Is a bob flattering for square faces?",
    answer:
      "A textured or layered bob can be very flattering. Avoid blunt bobs at jaw length; instead, opt for a longer bob (lob) or a bob with soft layers and texture to minimize the angular appearance.",
  },
];

export default function SquareFacePage() {
  const hairstyles = getHairstylesForFaceShape("square", "female");

  return (
    <FaceShapePage faceShape="square" hairstyles={hairstyles} faqs={FAQS} />
  );
}
