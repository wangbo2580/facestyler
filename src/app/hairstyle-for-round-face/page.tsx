import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Round Face Shape (2026 Guide)",
  description:
    "Find the most flattering hairstyles for round face shapes. Slimming haircuts, expert styling tips, and 15+ recommended looks for round faces.",
  keywords: [
    "hairstyle for round face",
    "haircut for round face",
    "round face hairstyles",
    "slimming haircut round face",
    "round face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Round Face Shape (2026 Guide)",
    description:
      "Find the most flattering hairstyles for round face shapes. Slimming haircuts and 15+ recommended looks.",
  },
};

const FAQS = [
  {
    question: "What haircut makes a round face look thinner?",
    answer:
      "Hairstyles that add height at the crown and length to the face work best. Long layers, side-parted styles, and angular bobs help create the illusion of a slimmer, more elongated face.",
  },
  {
    question: "Should round faces avoid bangs?",
    answer:
      "Not necessarily! Round faces should avoid heavy, straight-across bangs, but side-swept bangs, curtain bangs, and wispy fringe can be very flattering as they add angles to soften the roundness.",
  },
  {
    question: "Is short hair good for round faces?",
    answer:
      "Short hair can work for round faces if styled correctly. Avoid chin-length bobs that emphasize width. Instead, opt for pixie cuts with volume at the crown or asymmetrical short cuts that add angles.",
  },
  {
    question: "What face shape is round?",
    answer:
      "A round face shape has similar width and length measurements, with full cheeks and a soft, curved jawline. The face appears circular with no sharp angles, and the cheekbones are typically the widest part of the face.",
  },
  {
    question: "How can I slim my round face with hairstyle?",
    answer:
      "Focus on creating vertical lines and angles. Use side parts instead of center parts, add height at the crown, choose long layers that elongate the face, and avoid styles that add width at the cheeks.",
  },
];

export default function RoundFacePage() {
  const hairstyles = getHairstylesForFaceShape("round", "female");

  return <FaceShapePage faceShape="round" hairstyles={hairstyles} faqs={FAQS} />;
}
