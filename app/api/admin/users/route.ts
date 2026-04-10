import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const id = String(formData.get("id"));
    const role = String(formData.get("role")) as Role;

    await prisma.user.update({
      where: { id },
      data: { role }
    });

    return NextResponse.redirect(new URL("/admin/users", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر تحديث الدور" }, { status: 500 });
  }
}
