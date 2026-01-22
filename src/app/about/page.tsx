import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Shield, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about FaceStyler - the AI-powered face shape detection tool that helps you find your perfect hairstyle. Free, private, and easy to use.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About FaceStyler
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re on a mission to help everyone find hairstyles that make
            them look and feel their best.
          </p>
        </div>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Finding the right hairstyle can be frustrating. Many people don&apos;t
              know their face shape, and even if they do, finding hairstyles
              that actually flatter their features requires hours of research.
            </p>
            <p className="mt-4">
              That&apos;s why we created FaceStyler - a free, easy-to-use tool that
              uses AI to detect your face shape and instantly recommend
              hairstyles that will look great on you. No sign-up required, no
              hidden fees, and complete privacy.
            </p>
            <p className="mt-4">
              Our goal is simple: help you walk into a salon with confidence,
              knowing exactly what style will flatter your unique features.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Why Choose FaceStyler?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Detection</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes 468 facial landmarks to accurately
                determine your face shape in seconds.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                Your photos are processed entirely in your browser. They&apos;re
                never uploaded to our servers or stored anywhere.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Curated Recommendations</h3>
              <p className="text-muted-foreground">
                Each face shape has 15+ handpicked hairstyles, complete with
                styling tips and maintenance guidance.
              </p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Completely Free</h3>
              <p className="text-muted-foreground">
                No subscriptions, no hidden fees, no premium features. FaceStyler
                is and will always be free to use.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">Upload or Take a Photo</h3>
                <p className="text-muted-foreground">
                  Upload a clear photo of your face or use your camera to take a
                  selfie directly in the app.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">AI Analyzes Your Face Shape</h3>
                <p className="text-muted-foreground">
                  Our AI processes your photo locally in your browser, analyzing
                  facial proportions to determine your face shape.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold">Get Personalized Recommendations</h3>
                <p className="text-muted-foreground">
                  Browse hairstyles curated specifically for your face shape,
                  filter by style and length, and save your favorites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Find Your Style?</h2>
          <p className="text-muted-foreground mb-8">
            It takes less than a minute to discover your perfect hairstyle.
          </p>
          <Button size="xl" asChild>
            <Link href="/">Try FaceStyler Now</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
