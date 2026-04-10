import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [posts, categories, users, subscribers] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.user.count(),
    prisma.subscriber.count()
  ]);

  const cards = [
    { title: "المقالات", value: posts },
    { title: "الأقسام", value: categories },
    { title: "المستخدمون", value: users },
    { title: "المشتركون", value: subscribers }
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">لوحة الأدمن</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-slate-500">{card.title}</p>
            <p className="mt-3 text-3xl font-bold text-brand-800">{card.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
