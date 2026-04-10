export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-bold">تواصل معنا</h1>
      <form className="grid gap-4">
        <input className="h-12 rounded-2xl border px-4" placeholder="الاسم" />
        <input className="h-12 rounded-2xl border px-4" type="email" placeholder="البريد الإلكتروني" />
        <textarea className="min-h-40 rounded-2xl border px-4 py-3" placeholder="رسالتك" />
        <button className="w-fit rounded-2xl bg-brand-700 px-6 py-3 text-white">إرسال</button>
      </form>
    </section>
  );
}
