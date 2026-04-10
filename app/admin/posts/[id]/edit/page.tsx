import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } })
  ]);

  if (!post) notFound();

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-bold">تعديل المقال</h1>
      <PostForm categories={categories} post={post} />
    </section>
  );
}
