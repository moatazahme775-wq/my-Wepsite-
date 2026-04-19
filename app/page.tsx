import { prisma } from "@/lib/db";
import { PostCard } from "@/components/site/post-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 6,
    include: { category: true, author: true }
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-white">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-10 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <p className="mb-4 text-sm text-brand-700 dark:text-brand-400">معتز العلقمي</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            مدونة عربية حديثة وفاخرة
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
            نسخة مرتبة ومهيأة للنشر على Vercel، مع Prisma وNeon وCloudinary.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
