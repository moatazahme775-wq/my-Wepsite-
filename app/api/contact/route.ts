import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(async () => {
      const form = await req.formData();
      return Object.fromEntries(form.entries());
    });

    const data = contactSchema.parse(body);

    await prisma.contactMessage.create({ data });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "بيانات غير صالحة" }, { status: 400 });
  }
}
