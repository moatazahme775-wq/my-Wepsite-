import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });

  return (
    <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">إدارة الأقسام</h1>

      <form action="/api/admin/categories" method="post" className="grid gap-4 rounded-3xl border border-slate-200 p-4 md:grid-cols-2">
        <input name="name" placeholder="اسم القسم" className="h-12 rounded-2xl border px-4" required />
        <input name="description" placeholder="الوصف" className="h-12 rounded-2xl border px-4" />
        <input name="order" type="number" min={0} defaultValue={0} className="h-12 rounded-2xl border px-4" />
        <label className="flex items-center gap-2 rounded-2xl border px-4">
          <input type="checkbox" name="inMenu" defaultChecked />
          <span>إظهاره في القائمة</span>
        </label>
        <button className="rounded-2xl bg-brand-700 px-6 py-3 text-white md:col-span-2">إضافة قسم</button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead><tr className="border-b"><th className="p-3 text-right">الاسم</th><th className="p-3 text-right">الوصف</th><th className="p-3 text-right">الترتيب</th></tr></thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="p-3">{category.name}</td>
                <td className="p-3">{category.description}</td>
                <td className="p-3">{category.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
