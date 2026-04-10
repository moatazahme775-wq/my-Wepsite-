import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

// Force Node.js runtime for Prisma compatibility
export const runtime = "nodejs";

const commentSchema = z.object({
  content: z.string().min(1, "التعليق مطلوب").max(5000, "التعليق طويل جداً"),
  postId: z.string().min(1, "معرّف المقال مطلوب")
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "يجب تسجيل الدخول أولاً" }, { status: 401 });
    }
    
    const body = await request.json();
    const parsed = commentSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: parsed.data.postId }
    });
    
    if (!post) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }
    
    const comment = await prisma.comment.create({
      data: {
        content: parsed.data.content,
        postId: parsed.data.postId,
        authorId: session.user.id,
        status: "pending" // Comments require approval by default
      },
      include: {
        author: { select: { id: true, name: true, image: true } }
      }
    });
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر إضافة التعليق" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const postId = request.nextUrl.searchParams.get("postId");
    
    if (!postId) {
      return NextResponse.json({ error: "معرّف المقال مطلوب" }, { status: 400 });
    }
    
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        status: "approved" // Only show approved comments to public
      },
      include: {
        author: { select: { id: true, name: true, image: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر جلب التعليقات" }, { status: 500 });
  }
}
