import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <section className="space-y-5 rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة المقالات</h1>
        <Link href="/admin/posts/new" className="rounded-2xl bg-brand-700 px-4 py-2 text-white">
          مقال جديد
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b text-right">
              <th className="p-3">العنوان</th>
              <th className="p-3">القسم</th>
              <th className="p-3">الكاتب</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.category.name}</td>
                <td className="p-3">{post.author.name}</td>
                <td className="p-3">{post.status}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/posts/${post.id}/edit`} className="rounded-xl bg-slate-100 px-3 py-2">
                      تعديل
                    </Link>
                    <form action={`/api/admin/posts?id=${post.id}`} method="post">
                      <input type="hidden" name="_method" value="DELETE" />
                      <button formAction={`/api/admin/posts?id=${post.id}`} className="rounded-xl bg-red-50 px-3 py-2 text-red-700">
                        حذف
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
