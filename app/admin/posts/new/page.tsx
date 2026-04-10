import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/post-form";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-bold">مقال جديد</h1>
      <PostForm categories={categories} />
    </section>
  );
}
