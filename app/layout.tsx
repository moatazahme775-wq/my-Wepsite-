import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/seo";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ar_SA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.variable}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
