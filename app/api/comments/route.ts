import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { commentSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(async () => {
      const form = await req.formData();
      return Object.fromEntries(form.entries());
    });

    const data = commentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        postId: data.postId,
        content: data.content,
        replyToId: data.replyToId,
        name: data.name,
        email: data.email
      }
    });

    return NextResponse.json({ ok: true, comment });
  } catch {
    return NextResponse.json({ ok: false, error: "تعذر حفظ التعليق" }, { status: 400 });
  }
}
