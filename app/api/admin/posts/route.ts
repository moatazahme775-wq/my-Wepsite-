import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { arabicSlug } from "@/lib/utils";
import { postSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const slug = arabicSlug(parsed.data.title);
    const post = await prisma.post.create({
      data: {
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        quote: parsed.data.quote,
        coverImage: parsed.data.coverImage || null,
        content: parsed.data.content,
        categoryId: parsed.data.categoryId,
        status: parsed.data.status,
        featured: parsed.data.featured,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
        authorId: session.user.id,
        publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر إنشاء المقال" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success || !body.id) {
      return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 });
    }

    const slug = arabicSlug(parsed.data.title);
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: parsed.data.title,
        slug,
        excerpt: parsed.data.excerpt,
        quote: parsed.data.quote,
        coverImage: parsed.data.coverImage || null,
        content: parsed.data.content,
        categoryId: parsed.data.categoryId,
        status: parsed.data.status,
        featured: parsed.data.featured,
        seoTitle: parsed.data.seoTitle,
        seoDescription: parsed.data.seoDescription,
        publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر تحديث المقال" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "المعرّف مطلوب" }, { status: 400 });

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "تعذر حذف المقال" }, { status: 500 });
  }
}
