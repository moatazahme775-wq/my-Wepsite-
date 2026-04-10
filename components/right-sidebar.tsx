import Link from "next/link";
import type { Category } from "@prisma/client";

export function RightSidebar({
  categories,
  compact = false
}: {
  categories: Category[];
  compact?: boolean;
}) {
  return (
    <aside className={compact ? "w-[280px]" : "w-full"}>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">الأقسام</h3>
        <nav className="space-y-2 text-sm">
          <Link href="/" className="block rounded-xl px-4 py-3 transition hover:bg-slate-50">
            الرئيسية
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="block rounded-xl px-4 py-3 transition hover:bg-slate-50">
              {category.name}
            </Link>
          ))}
          <Link href="/admin" className="block rounded-xl bg-brand-50 px-4 py-3 text-brand-800 transition hover:bg-brand-100">
            قسم الأدمن
          </Link>
        </nav>
      </div>
    </aside>
  );
}
