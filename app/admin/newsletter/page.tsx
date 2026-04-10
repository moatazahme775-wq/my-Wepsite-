import { prisma } from "@/lib/prisma";

export default async function NewsletterPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-bold">القائمة البريدية</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {subscribers.map((subscriber) => (
          <div key={subscriber.id} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold">{subscriber.email}</p>
            <p className="mt-1 text-sm text-slate-500">{new Date(subscriber.createdAt).toLocaleDateString("ar-EG")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
