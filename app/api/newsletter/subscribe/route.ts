import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(async () => {
      const form = await req.formData();
      return Object.fromEntries(form.entries());
    });

    const data = newsletterSchema.parse(body);

    await prisma.newsletterSubscriber.upsert({
      where: { email: data.email },
      update: {
        name: data.name ?? undefined,
        status: "active"
      },
      create: {
        email: data.email,
        name: data.name
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "بيانات غير صالحة" }, { status: 400 });
  }
}
