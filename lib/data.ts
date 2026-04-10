import { prisma } from "@/lib/prisma";

export async function getSiteData() {
  const [settings, categories] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "site" } }),
    prisma.category.findMany({
      where: { inMenu: true },
      orderBy: { order: "asc" }
    })
  ]);

  return { settings, categories };
}

export async function getHomeData() {
  const [recentPosts, featuredPosts] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 8
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", featured: true },
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      take: 3
    })
  ]);

  return { recentPosts, featuredPosts };
}
