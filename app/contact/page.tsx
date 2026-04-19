export const metadata = {
  title: "اتصل بنا"
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">اتصل بنا</h1>
      <form action="/api/contact" method="POST" className="mt-8 grid gap-4">
        <input name="name" placeholder="الاسم" className="rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900" required />
        <input name="email" type="email" placeholder="البريد الإلكتروني" className="rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900" required />
        <input name="subject" placeholder="الموضوع" className="rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900" required />
        <textarea name="message" placeholder="رسالتك" className="min-h-40 rounded-2xl border border-zinc-300 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900" required />
        <button className="rounded-full bg-zinc-900 px-5 py-3 text-white dark:bg-white dark:text-zinc-900">
          إرسال
        </button>
      </form>
    </main>
  );
}
