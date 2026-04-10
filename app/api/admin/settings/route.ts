import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();

    const marqueeText = String(formData.get("marqueeItems") || "");
    const marqueeItems = marqueeText
      .split(/[،,]/)
      .map((item) => item.trim())
      .filter(Boolean);

    await prisma.siteSetting.upsert({
      where: { id: "site" },
      update: {
        siteName: String(formData.get("siteName") || "معتز العلقمي"),
        siteDescription: String(formData.get("siteDescription") || ""),
        logoUrl: String(formData.get("logoUrl") || "") || null,
        facebookUrl: String(formData.get("facebookUrl") || "") || null,
        xUrl: String(formData.get("xUrl") || "") || null,
        instagramUrl: String(formData.get("instagramUrl") || "") || null,
        youtubeUrl: String(formData.get("youtubeUrl") || "") || null,
        copyrightText: String(formData.get("copyrightText") || ""),
        marqueeItems
      },
      create: {
        id: "site",
        siteName: String(formData.get("siteName") || "معتز العلقمي"),
        siteDescription: String(formData.get("siteDescription") || ""),
        logoUrl: String(formData.get("logoUrl") || "") || null,
        facebookUrl: String(formData.get("facebookUrl") || "") || null,
        xUrl: String(formData.get("xUrl") || "") || null,
        instagramUrl: String(formData.get("instagramUrl") || "") || null,
        youtubeUrl: String(formData.get("youtubeUrl") || "") || null,
        copyrightText: String(formData.get("copyrightText") || ""),
        marqueeItems
      }
    });

    return NextResponse.redirect(new URL("/admin/settings", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر حفظ الإعدادات" }, { status: 500 });
  }
}
