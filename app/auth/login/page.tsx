import Link from "next/link";

export const metadata = {
  title: "تسجيل الدخول"
};

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">
          فعّل مزود OAuth واحدًا على الأقل في ملف البيئة، ثم استخدم أحد الأزرار التالية.
        </p>
        <div className="mt-8 grid gap-3">
          <Link
            href="/api/auth/signin/github?callbackUrl=/dashboard"
            className="rounded-full bg-zinc-900 px-5 py-3 text-center text-white dark:bg-white dark:text-zinc-900"
          >
            الدخول عبر GitHub
          </Link>
          <Link
            href="/api/auth/signin/google?callbackUrl=/dashboard"
            className="rounded-full border border-zinc-300 px-5 py-3 text-center dark:border-zinc-700"
          >
            الدخول عبر Google
          </Link>
        </div>
      </div>
    </main>
  );
}
