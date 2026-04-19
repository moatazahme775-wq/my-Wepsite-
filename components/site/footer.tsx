import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">معتز العلقمي</h3>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            مدونة عربية حديثة مهيأة للنشر على Vercel وقاعدة بيانات Neon.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">روابط مهمة</h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <Link href="/privacy">الخصوصية</Link>
            <Link href="/terms">الشروط</Link>
            <Link href="/rss">RSS</Link>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">النشرة البريدية</h3>
          <form action="/api/newsletter/subscribe" method="POST" className="mt-3 flex flex-col gap-3">
            <input
              name="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              required
            />
            <button className="rounded-full bg-zinc-900 px-4 py-3 text-sm text-white dark:bg-white dark:text-zinc-900">
              اشترك
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 py-4 text-center text-sm text-zinc-500 dark:border-zinc-800">
        جميع الحقوق محفوظة لدى معتز العلقمي
      </div>
    </footer>
  );
}
