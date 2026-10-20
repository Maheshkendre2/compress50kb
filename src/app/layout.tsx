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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://compress50kb.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Compress50KB — Free, Private Image & PDF Compressor",
    template: "%s | Compress50KB",
  },
  description:
    "Free, private image & PDF compressor for online forms. Compress photo to 50KB, signature under 20KB, and free PDF compressor with zero server uploads.",
  keywords: [
    "Compress photo to 50KB",
    "Signature under 20KB",
    "Free PDF compressor",
    "free client-side pdf compressor",
    "ssc photo resizer",
    "upsc signature resizer",
    "compress image to 20kb",
    "browser-image-compression",
    "pdf-lib",
  ],
  authors: [{ name: "Compress50KB" }],
  creator: "Compress50KB",
  publisher: "Compress50KB",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Compress50KB — Free, Private Image & PDF Compressor",
    description:
      "Compress photo to 50KB, signature under 20KB, and free PDF compressor. 100% in-browser, zero server uploads.",
    url: siteUrl,
    siteName: "Compress50KB",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress50KB — Free, Private Image & PDF Compressor",
    description:
      "Compress photo to 50KB, signature under 20KB, and free PDF compressor. 100% in-browser, zero server uploads.",
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
      <head>
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="Compress50KB"
          href="/opensearch.xml"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
