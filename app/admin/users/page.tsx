import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-bold">إدارة المستخدمين</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">البريد</th>
              <th className="p-3 text-right">الدور</th>
              <th className="p-3 text-right">تغيير الدور</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <form action="/api/admin/users" method="post" className="flex gap-2">
                    <input type="hidden" name="id" value={user.id} />
                    <select name="role" defaultValue={user.role} className="h-10 rounded-xl border px-3">
                      <option value="ADMIN">ADMIN</option>
                      <option value="EDITOR">EDITOR</option>
                      <option value="AUTHOR">AUTHOR</option>
                      <option value="SUBSCRIBER">SUBSCRIBER</option>
                    </select>
                    <button className="rounded-xl bg-slate-100 px-4">حفظ</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
