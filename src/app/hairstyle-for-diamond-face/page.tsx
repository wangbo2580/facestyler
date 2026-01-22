import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Diamond Face Shape (2026 Guide)",
  description:
    "Find hairstyles that flatter diamond face shapes. Balance prominent cheekbones with expert tips and 15+ recommended haircuts.",
  keywords: [
    "hairstyle for diamond face",
    "diamond face shape haircut",
    "diamond face hairstyles",
    "high cheekbones haircut",
    "diamond face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Diamond Face Shape (2026 Guide)",
    description:
      "Find hairstyles that flatter diamond face shapes. 15+ recommended haircuts.",
  },
};

const FAQS = [
  {
    question: "What hairstyle suits a diamond face shape?",
    answer:
      "Styles that add width at the forehead and chin work best to balance prominent cheekbones. Side-swept bangs, chin-length bobs, and layers that frame the face are excellent choices.",
  },
  {
    question: "Should diamond faces have bangs?",
    answer:
      "Yes! Side-swept bangs and curtain bangs help add width at the forehead, balancing the wider cheekbones. Wispy fringe can also soften the angular features.",
  },
  {
    question: "What is a diamond face shape?",
    answer:
      "A diamond face shape features high, wide cheekbones with a narrow forehead and jawline. The face is widest at the cheekbones and tapers to points at the forehead and chin.",
  },
  {
    question: "Is short hair good for diamond faces?",
    answer:
      "Yes, if styled correctly. Chin-length bobs with volume at the chin area and pixie cuts with side-swept fringe can be very flattering for diamond faces.",
  },
  {
    question: "What hairstyles should diamond faces avoid?",
    answer:
      "Avoid slicked-back styles or any cuts that expose the full width of the cheekbones. Also avoid very short styles without any softness around the face, and center parts that emphasize the narrow forehead.",
  },
];

export default function DiamondFacePage() {
  const hairstyles = getHairstylesForFaceShape("diamond", "female");

  return (
    <FaceShapePage faceShape="diamond" hairstyles={hairstyles} faqs={FAQS} />
  );
}
