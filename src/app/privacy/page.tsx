import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "FaceStyler Privacy Policy - Learn how we protect your privacy and handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 2026
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground">
              At FaceStyler, we take your privacy seriously. This Privacy Policy
              explains how we handle information when you use our face shape
              detection and hairstyle recommendation service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Photo Processing - Your Privacy is Protected
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
              <p className="text-green-800 font-medium">
                Key Privacy Feature: All photo processing happens entirely in
                your web browser. Your photos are NEVER uploaded to our servers.
              </p>
            </div>
            <p className="text-muted-foreground">
              When you upload a photo or take a selfie using FaceStyler:
            </p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              <li>
                The image is processed using AI technology that runs locally in
                your browser
              </li>
              <li>
                No image data is transmitted over the internet to our servers
              </li>
              <li>
                Once you close or refresh the page, the image is immediately
                discarded from memory
              </li>
              <li>We cannot access, view, or store your photos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">
              Analytics Data (Anonymous)
            </h3>
            <p className="text-muted-foreground mb-4">
              We use Google Analytics to understand how people use our service.
              This includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Pages visited and time spent on pages</li>
              <li>
                Device type, browser, and operating system (non-identifying)
              </li>
              <li>General geographic location (country/city level)</li>
              <li>How you found our website (referral source)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This data is anonymous and cannot be used to identify you
              personally.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Information We Do NOT Collect
            </h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Photos or images of any kind</li>
              <li>Facial recognition data or biometric information</li>
              <li>Personal identification information</li>
              <li>Email addresses (we don&apos;t have accounts or sign-up)</li>
              <li>Payment information (the service is free)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies for analytics purposes through Google Analytics.
              These cookies help us understand how visitors interact with our
              website. You can disable cookies in your browser settings if you
              prefer not to be tracked.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                <strong>Google Analytics:</strong> For anonymous usage analytics
              </li>
              <li>
                <strong>Google AdSense:</strong> For displaying advertisements
              </li>
              <li>
                <strong>Vercel:</strong> For hosting our website
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              These services have their own privacy policies that govern how
              they handle data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Advertising</h2>
            <p className="text-muted-foreground">
              We display advertisements through Google AdSense. These ads may
              use cookies to show you relevant content based on your browsing
              history across different websites. You can opt out of personalized
              advertising by visiting Google&apos;s Ad Settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              FaceStyler is not intended for children under 13 years of age. We
              do not knowingly collect any information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
