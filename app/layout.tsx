import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { getSiteData } from "@/lib/data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"]
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { settings } = await getSiteData();
    return {
      title: settings?.siteName ?? "معتز العلقمي",
      description: settings?.siteDescription ?? "مدونة عربية احترافية",
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    };
  } catch (error) {
    // Fallback during build time when DATABASE_URL is not available
    return {
      title: "معتز العلقمي",
      description: "مدونة عربية احترافية",
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
    };
  }
}

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  let siteData: Awaited<ReturnType<typeof getSiteData>> = { settings: null, categories: [] };
  
  try {
    siteData = await getSiteData();
  } catch (error) {
    // Fallback during build time when DATABASE_URL is not available
    console.warn("Failed to fetch site data:", error);
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <Header siteData={siteData} />
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-6">{children}</main>
        <Footer settings={siteData.settings} />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
