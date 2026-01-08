import type { Metadata } from "next";
import { Space_Grotesk, Archivo_Black } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BUSINESS_INFO, SEO_KEYWORDS } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivoBlack = Archivo_Black({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS_INFO.website),
  title: {
    default: `${BUSINESS_INFO.name} | Brooklyn's Premier Phone Repair Shop`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: `Expert mobile phone repair, battery replacement, and premium accessories in Brooklyn, NY. 5-star rated service at ${BUSINESS_INFO.fullAddress}. Same-day repairs available. Call ${BUSINESS_INFO.phone}`,
  keywords: SEO_KEYWORDS,
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS_INFO.website,
    title: `${BUSINESS_INFO.name} | Brooklyn's Premier Phone Repair Shop`,
    description: `Expert mobile phone repair, battery replacement, and premium accessories in Brooklyn, NY. 5-star rated service. Same-day repairs available.`,
    siteName: BUSINESS_INFO.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_INFO.name} - Phone Repair in Brooklyn`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_INFO.name} | Brooklyn's Premier Phone Repair Shop`,
    description: `Expert mobile phone repair in Brooklyn, NY. 5-star rated service. Same-day repairs available.`,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: BUSINESS_INFO.website,
  },
};

// JSON-LD Schema for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_INFO.website,
  name: BUSINESS_INFO.name,
  description: "Expert mobile phone repair, battery replacement, and premium accessories in Brooklyn, NY.",
  url: BUSINESS_INFO.website,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_INFO.address,
    addressLocality: BUSINESS_INFO.city,
    addressRegion: BUSINESS_INFO.state,
    postalCode: BUSINESS_INFO.zipCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.6769,
    longitude: -73.8658,
  },
  image: `${BUSINESS_INFO.website}/og-image.jpg`,
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS_INFO.googleRating,
    reviewCount: BUSINESS_INFO.googleReviewCount,
    bestRating: 5,
    worstRating: 1,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "20:00",
    }
  ],
  sameAs: [
    `https://facebook.com/${BUSINESS_INFO.facebook}`,
    `https://instagram.com/${BUSINESS_INFO.instagram.replace("@", "")}`,
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Phone Repair Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Screen Repair",
          description: "Same-day screen replacement for all major phone brands",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Battery Replacement",
          description: "Battery replacement with OEM-quality parts",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD600" />
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="Brooklyn" />
        <meta name="geo.position" content="40.6769;-73.8658" />
        <meta name="ICBM" content="40.6769, -73.8658" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        spaceGrotesk.variable,
        archivoBlack.variable,
        "font-sans bg-background text-foreground antialiased overflow-x-hidden"
      )}>
        {children}
      </body>
    </html>
  );
}
