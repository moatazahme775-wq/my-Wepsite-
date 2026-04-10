import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/post-card";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: "PUBLISHED" },
        include: { author: true, category: true },
        orderBy: { publishedAt: "desc" }
      }
    }
  });

  if (!category) notFound();

  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="mt-2 text-slate-600">{category.description}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
