import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const posts = q
    ? await prisma.post.findMany({
        where: {
          status: "published",
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } }
          ]
        },
        orderBy: { publishedAt: "desc" },
        take: 20
      })
    : [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold">البحث</h1>
      <form className="mt-6" action="/search">
        <input
          name="q"
          defaultValue={q}
          placeholder="ابحث في المقالات"
          className="w-full rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </form>

      <div className="mt-8 grid gap-4">
        {q && posts.length === 0 && (
          <p className="text-zinc-600 dark:text-zinc-300">لا توجد نتائج.</p>
        )}

        {posts.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.slug}`}
            className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
