import Image from "next/image";
import Link from "next/link";
import type { Post, User, Category } from "@prisma/client";

type PostCardProps = {
  post: Post & { author: User; category: Category };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-56 w-full">
        <Image
          src={post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-4 p-5">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          {post.category.name}
        </span>
        <h3 className="line-clamp-2 text-xl font-bold">{post.title}</h3>
        <p className="line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>
        {post.quote ? (
          <blockquote className="rounded-2xl border-r-4 border-brand-500 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {post.quote}
          </blockquote>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.image || "https://ui-avatars.com/api/?name=Author&background=f3f4f6"}
              alt={post.author.name || "كاتب"}
              width={42}
              height={42}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{post.author.name}</p>
              <p className="text-xs text-slate-500">كاتب</p>
            </div>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white"
          >
            اقرأ المزيد
          </Link>
        </div>
      </div>
    </article>
  );
}
