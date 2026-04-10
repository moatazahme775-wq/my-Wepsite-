import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-bold">حسابي</h1>
      <div className="space-y-2 text-slate-700">
        <p><strong>الاسم:</strong> {session.user.name}</p>
        <p><strong>البريد:</strong> {session.user.email}</p>
        <p><strong>الدور:</strong> {session.user.role}</p>
      </div>
    </section>
  );
}
