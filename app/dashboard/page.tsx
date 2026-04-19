import { DashboardGrid } from "@/components/site/dashboard-grid";

export default function DashboardPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        نسخة منظمة قابلة للتوسعة والنشر على Vercel.
      </p>
      <DashboardGrid />
    </main>
  );
}
