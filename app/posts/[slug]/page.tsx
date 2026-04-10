import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt
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
    include: { author: true, category: true }
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-72 w-full md:h-96">
        <Image
          src={post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-6 p-6 md:p-10">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-800">
            {post.category.name}
          </span>
          <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
          <p className="text-lg text-slate-600">{post.excerpt}</p>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={post.author.image || "https://ui-avatars.com/api/?name=Author&background=f3f4f6"}
            alt={post.author.name || "كاتب"}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-slate-500">{new Date(post.publishedAt || post.createdAt).toLocaleDateString("ar-EG")}</p>
          </div>
        </div>

        {post.quote ? (
          <blockquote className="rounded-2xl border-r-4 border-brand-500 bg-brand-50 px-5 py-4 text-lg">
            {post.quote}
          </blockquote>
        ) : null}

        <div className="prose-ar max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </article>
  );
}
