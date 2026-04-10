import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR") {
    redirect("/");
  }

  const [postsCount, categoriesCount, usersCount, commentsCount, subscribersCount] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.user.count(),
    prisma.comment.count(),
    prisma.subscriber.count()
  ]);

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { author: true, category: true }
  });

  const pendingComments = await prisma.comment.count({
    where: { status: "pending" }
  });

  const stats = [
    { label: "المقالات", value: postsCount, href: "/admin/posts", color: "bg-blue-500" },
    { label: "الأقسام", value: categoriesCount, href: "/admin/categories", color: "bg-green-500" },
    { label: "المستخدمون", value: usersCount, href: "/admin/users", color: "bg-purple-500" },
    { label: "التعليقات المعلقة", value: pendingComments, href: "/admin/comments", color: "bg-orange-500" },
    { label: "المشتركون", value: subscribersCount, href: "/admin/newsletter", color: "bg-pink-500" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-slate-600 mt-2">مرحباً بك، {session.user.name || session.user.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
              <span className="text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">أحدث المقالات</h2>
          <Link href="/admin/posts/new" className="text-blue-600 hover:underline text-sm">
            إضافة مقال جديد
          </Link>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                <div>
                  <h3 className="font-semibold text-sm">{post.title}</h3>
                  <p className="text-xs text-slate-600">
                    {post.author.name} • {post.category.name} • {new Date(post.createdAt).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  post.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {post.status === "PUBLISHED" ? "منشور" : "مسودة"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-center py-8">لا توجد مقالات بعد</p>
        )}
      </div>
    </div>
  );
}
