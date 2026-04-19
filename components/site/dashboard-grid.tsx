import Link from "next/link";

export function DashboardGrid() {
  const items = [
    ["المقالات", "/dashboard/posts"],
    ["التصنيفات", "/dashboard/categories"],
    ["الوسوم", "/dashboard/tags"],
    ["التعليقات", "/dashboard/comments"],
    ["الصفحات", "/dashboard/pages"],
    ["الوسائط", "/dashboard/media"],
    ["النشرة", "/dashboard/newsletter"],
    ["الرسائل", "/dashboard/messages"],
    ["المستخدمون", "/dashboard/users"],
    ["الإعدادات", "/dashboard/settings"],
    ["القوائم", "/dashboard/menus"]
  ];

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
