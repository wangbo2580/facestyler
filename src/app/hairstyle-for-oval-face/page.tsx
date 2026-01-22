import { Metadata } from "next";
import { FaceShapePage } from "@/components/seo/FaceShapePage";
import { getHairstylesForFaceShape } from "@/lib/constants/hairstyles";

export const metadata: Metadata = {
  title: "Best Hairstyles for Oval Face Shape (2026 Guide)",
  description:
    "Discover the most flattering hairstyles for oval face shapes. Expert tips, celebrity inspiration, and 15+ recommended haircuts for your oval face.",
  keywords: [
    "hairstyle for oval face",
    "best haircut for oval face",
    "oval face hairstyles",
    "oval face shape haircut",
    "oval face women hairstyles",
  ],
  openGraph: {
    title: "Best Hairstyles for Oval Face Shape (2026 Guide)",
    description:
      "Discover the most flattering hairstyles for oval face shapes. Expert tips and 15+ recommended haircuts.",
  },
};

const FAQS = [
  {
    question: "What haircut is best for an oval face?",
    answer:
      "Oval faces are versatile and can pull off almost any hairstyle. Popular choices include long layers, blunt bobs, pixie cuts, and shoulder-length waves. The key is to maintain the natural balance of your face shape.",
  },
  {
    question: "Should oval faces have bangs?",
    answer:
      "Yes! Oval faces can rock most bang styles, from curtain bangs to side-swept or even blunt bangs. Just avoid very heavy, straight-across bangs that cover too much of your forehead, as this can throw off your balanced proportions.",
  },
  {
    question: "What hairstyles should oval faces avoid?",
    answer:
      "While oval faces are very versatile, you should avoid styles that add too much volume on the sides, which can make your face look rounder. Also, avoid covering your forehead entirely, as this is one of your best features.",
  },
  {
    question: "Is a bob haircut good for oval face?",
    answer:
      "Absolutely! Bobs are excellent for oval faces. Whether it's a classic chin-length bob, a longer lob, or an asymmetrical bob, this cut complements oval face shapes beautifully.",
  },
  {
    question: "What is the most attractive face shape?",
    answer:
      "While beauty is subjective, the oval face shape is often considered the 'ideal' face shape due to its balanced proportions. However, every face shape has its own unique beauty and flattering hairstyles.",
  },
];

export default function OvalFacePage() {
  const hairstyles = getHairstylesForFaceShape("oval", "female");

  return <FaceShapePage faceShape="oval" hairstyles={hairstyles} faqs={FAQS} />;
}
