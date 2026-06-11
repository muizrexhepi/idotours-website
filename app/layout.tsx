import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import TranslationProvider from "@/components/providers/TranslationProvider";
import ClientProviders from "@/components/providers/client-providers";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar/Navbar";
import CookieConsent from "@/components/CookieConsent";
 
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-roboto",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.idotours.com.mk"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Ido Tours | Digital Bus Booking",
    template: "%s | Ido Tours",
  },
  description:
    "Book direct bus tickets with Ido Tours. Secure, reliable, and comfortable travel across Europe and the Balkans.",
  keywords: [
    "Ido Tours",
    "Ido Tours online booking",
    "book bus tickets Balkans online",
    "bus Germany to North Macedonia",
    "bus Switzerland to Kosovo",
    "cheap bus tickets to Albania",
    "Balkan bus booking",
    "Diaspora travel Europe",
  ],
  authors: [{ name: "Ido Tours Team" }],
  creator: "Ido Tours",
  publisher: "Ido Tours",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.idotours.com.mk",
    siteName: "Ido Tours",
    title: "Ido Tours - Bridging the Balkans and Europe",
    description:
      "Verified operators and digital tickets for your journey. Your trip starts here with Ido Tours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ido Tours Digital Bus Booking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ido Tours | Digital Travel",
    description: "Fast and secure bus booking from Europe to the Balkans.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with your actual Ido Tours Google Analytics Measurement ID
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  /**
   * GEO/SEO Strategy: Structured Data Graph
   * This helps AI models understand the relationship between your tech team,
   * your company, and the region you serve.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.idotours.com.mk#organization",
        name: "Ido Tours",
        url: "https://www.idotours.com.mk",
        logo: "https://www.idotours.com.mk/assets/images/logo.png",
        image: "https://www.idotours.com.mk/assets/images/hero-bus.jpg",
        priceRange: "$$",
        telephone: "+38900000000", // TODO: Update with actual phone number
        email: "contact@idotours.com.mk",
        address: {
          "@type": "PostalAddress",
          streetAddress: "", // TODO: Add specific street if available
          addressLocality: "North Macedonia",
          postalCode: "",
          addressCountry: "MK",
        },
        areaServed: [
          { "@type": "Country", name: "North Macedonia" },
          { "@type": "Country", name: "Kosovo" },
          { "@type": "Country", name: "Albania" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Austria" },
        ],
        sameAs: [
          "https://www.facebook.com/idotours",
          "https://www.instagram.com/idotours",
          "https://www.linkedin.com/company/idotours",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.idotours.com.mk#website",
        url: "https://www.idotours.com.mk",
        name: "Ido Tours",
        description: "Travel platform for Balkan bus routes.",
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.idotours.com.mk/search?from={departure_city}&to={arrival_city}",
          "query-input": "required name=departure_city",
        },
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Toaster />
        <TranslationProvider>
          <ClientProviders>
            <Navbar className="paddingX max-w-6xl py-4 mx-auto" />
            <main className="min-h-[80vh] flex flex-col">{children}</main>
            <CookieConsent />
            <Analytics />
          </ClientProviders>
        </TranslationProvider>
      </body>
    </html>
  );
}
