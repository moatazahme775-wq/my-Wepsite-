import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { arabicSlug } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const order = Number(formData.get("order") || 0);
    const inMenu = formData.get("inMenu") === "on";

    await prisma.category.create({
      data: {
        name,
        slug: arabicSlug(name),
        description,
        order,
        inMenu
      }
    });

    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر إنشاء القسم" }, { status: 500 });
  }
}
