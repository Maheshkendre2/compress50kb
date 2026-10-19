import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shrinkpure.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShrinkPure — Pure Client-Side Image & PDF Compressor",
    template: "%s | ShrinkPure",
  },
  description:
    "Compress images (.jpg, .jpeg, .png) and PDFs entirely inside your browser. Quick presets for Under 20 KB, Under 50 KB, Under 100 KB, with Indian Exam presets (SSC 200x230, Signature 140x60). 100% Private & Secure — Zero server uploads.",
  keywords: [
    "compress photo to 50kb",
    "signature under 20kb",
    "free client-side pdf compressor",
    "ssc photo resizer",
    "upsc signature resizer",
    "compress image to 20kb",
    "compress image to 50kb",
    "browser-image-compression",
    "pdf-lib",
  ],
  authors: [{ name: "ShrinkPure" }],
  creator: "ShrinkPure",
  publisher: "ShrinkPure",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ShrinkPure — Pure Client-Side Image & PDF Compressor",
    description:
      "Compress photos to 50KB, signatures to 20KB, and PDFs under 100KB with zero server uploads. 100% private in-browser tool.",
    url: siteUrl,
    siteName: "ShrinkPure",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShrinkPure — Free Client-Side Image & PDF Compressor",
    description:
      "Instant in-browser image and PDF compression. Under 20KB, Under 50KB, and SSC/UPSC exam presets. Zero server uploads.",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
