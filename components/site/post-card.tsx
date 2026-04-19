import Link from "next/link";
import type { Category, Post, User } from "@prisma/client";

type PostCardProps = {
  post: Post & {
    category: Category | null;
    author: User;
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <p className="text-sm text-brand-700 dark:text-brand-300">
        {post.category?.name ?? "عام"}
      </p>
      <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
      <div className="mt-4 text-sm text-zinc-500">
        الكاتب: {post.author.name ?? "مستخدم"}
      </div>
      <Link
        href={`/posts/${post.slug}`}
        className="mt-5 inline-block text-sm font-medium text-brand-700 dark:text-brand-300"
      >
        اقرأ المزيد
      </Link>
    </article>
  );
}
