import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";

// Force Node.js runtime for Prisma compatibility
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    
    const status = request.nextUrl.searchParams.get("status");
    const postId = request.nextUrl.searchParams.get("postId");
    
    const where: any = {};
    if (status) where.status = status;
    if (postId) where.postId = postId;
    
    const comments = await prisma.comment.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, email: true } },
        post: { select: { id: true, title: true, slug: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر جلب التعليقات" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 400 });
    }
    
    const comment = await prisma.comment.update({
      where: { id },
      data: { status }
    });
    
    return NextResponse.json(comment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر تحديث التعليق" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "المعرّف مطلوب" }, { status: 400 });
    }
    
    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر حذف التعليق" }, { status: 500 });
  }
}
