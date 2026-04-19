import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json([]);
  }

  const posts = await prisma.post.findMany({
    where: {
      status: "published",
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } }
      ]
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
    select: { id: true, title: true, slug: true, excerpt: true }
  });

  return NextResponse.json(posts);
}
