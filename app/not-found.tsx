import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300">الصفحة غير موجودة.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-zinc-900 px-5 py-3 text-white dark:bg-white dark:text-zinc-900"
        >
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
