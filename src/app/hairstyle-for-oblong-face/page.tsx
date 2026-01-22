import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Oblong (Long) Face Shape (2026 Guide)",
  description:
    "Discover hairstyles that add width and balance to oblong face shapes. Expert tips and 15+ recommended haircuts for long faces.",
  keywords: [
    "hairstyle for oblong face",
    "long face haircut",
    "oblong face hairstyles",
    "hairstyle for long face",
    "oblong face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Oblong Face Shape (2026 Guide)",
    description:
      "Discover hairstyles that add width and balance to oblong face shapes. 15+ recommended haircuts.",
  },
};

const FAQS = [
  {
    question: "What hairstyle suits an oblong face?",
    answer:
      "Styles that add width and volume to the sides work best. Consider shoulder-length cuts, layered bobs, and styles with bangs that help shorten the appearance of the face.",
  },
  {
    question: "Should oblong faces have bangs?",
    answer:
      "Yes! Bangs are excellent for oblong faces as they help shorten the appearance of the face. Full bangs, side-swept bangs, and curtain bangs all work well.",
  },
  {
    question: "What hairstyles should oblong faces avoid?",
    answer:
      "Avoid very long, straight styles that add more length to the face. Also avoid styles with excessive volume at the crown, which can make the face appear even longer.",
  },
  {
    question: "Is a bob good for an oblong face?",
    answer:
      "Yes! Bobs are excellent for oblong faces, especially when cut at chin or shoulder length with added volume at the sides. Avoid very long bobs that can elongate the face further.",
  },
  {
    question: "How can I make my long face look shorter?",
    answer:
      "Add width at the sides with layers or waves, wear bangs to shorten the visible length of your face, and avoid very long styles. Shoulder-length cuts with volume tend to be most flattering.",
  },
];

export default function OblongFacePage() {
  const hairstyles = getHairstylesForFaceShape("oblong", "female");

  return (
    <FaceShapePage faceShape="oblong" hairstyles={hairstyles} faqs={FAQS} />
  );
}
