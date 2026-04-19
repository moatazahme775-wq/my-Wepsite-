import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || ""
  };
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
      postTags: { include: { tag: true } },
      comments: {
        where: { status: "approved", replyToId: null },
        include: { replies: true }
      }
    }
  });

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm text-brand-700 dark:text-brand-300">
        {post.category?.name ?? "عام"}
      </p>
      <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
      {post.excerpt ? (
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
      ) : null}

      <article
        className="prose prose-zinc mt-8 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">التعليقات</h2>
        <div className="mt-6 space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
              <p className="font-medium">{comment.name ?? "زائر"}</p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">{comment.content}</p>
            </div>
          ))}
          {post.comments.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-300">لا توجد تعليقات معتمدة بعد.</p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
