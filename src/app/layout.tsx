import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "ShrinkPure — Pure Client-Side Image & PDF Compressor",
  description:
    "Compress images (.jpg, .jpeg, .png) and PDFs entirely inside your browser. Quick presets for Under 20 KB, Under 50 KB, Under 100 KB, with custom quality controls. 100% Private & Secure — Zero server uploads.",
  keywords: [
    "client-side image compression",
    "pdf compression",
    "under 20 kb compressor",
    "under 50 kb image compressor",
    "private pdf compressor",
    "browser-image-compression",
    "pdf-lib",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
