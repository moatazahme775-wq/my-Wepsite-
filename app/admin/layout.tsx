import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "EDITOR" && session.user.role !== "AUTHOR") {
    redirect("/");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px,1fr]">
      <aside className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">لوحة التحكم</h2>
        <nav className="space-y-2 text-sm">
          <Link href="/admin" className="block rounded-xl px-4 py-3 hover:bg-slate-50">الرئيسية</Link>
          <Link href="/admin/posts" className="block rounded-xl px-4 py-3 hover:bg-slate-50">المقالات</Link>
          <Link href="/admin/categories" className="block rounded-xl px-4 py-3 hover:bg-slate-50">الأقسام</Link>
          <Link href="/admin/users" className="block rounded-xl px-4 py-3 hover:bg-slate-50">المستخدمون</Link>
          <Link href="/admin/newsletter" className="block rounded-xl px-4 py-3 hover:bg-slate-50">القائمة البريدية</Link>
          <Link href="/admin/settings" className="block rounded-xl px-4 py-3 hover:bg-slate-50">الإعدادات</Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="mt-2 w-full rounded-xl bg-slate-100 px-4 py-3 text-right">تسجيل الخروج</button>
          </form>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
