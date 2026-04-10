import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (exists) {
      return NextResponse.json({ error: "البريد مستخدم بالفعل" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const isAdminEmail = parsed.data.email.toLowerCase() === (process.env.ADMIN_EMAIL || "mtzallqmy@gmail.com").toLowerCase();

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: isAdminEmail ? Role.ADMIN : Role.SUBSCRIBER
      }
    });

    return NextResponse.json({ ok: true, userId: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ غير متوقع" }, { status: 500 });
  }
}
