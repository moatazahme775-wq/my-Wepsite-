import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "site" } });

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-2xl font-bold">إعدادات الموقع</h1>
      <form action="/api/admin/settings" method="post" className="grid gap-4 md:grid-cols-2">
        <input name="siteName" defaultValue={settings?.siteName} className="h-12 rounded-2xl border px-4" placeholder="اسم الموقع" />
        <input name="logoUrl" defaultValue={settings?.logoUrl || ""} className="h-12 rounded-2xl border px-4" placeholder="رابط الشعار" />
        <textarea name="siteDescription" defaultValue={settings?.siteDescription} className="min-h-28 rounded-2xl border px-4 py-3 md:col-span-2" placeholder="وصف الموقع" />
        <input name="facebookUrl" defaultValue={settings?.facebookUrl || ""} className="h-12 rounded-2xl border px-4" placeholder="Facebook URL" />
        <input name="xUrl" defaultValue={settings?.xUrl || ""} className="h-12 rounded-2xl border px-4" placeholder="X URL" />
        <input name="instagramUrl" defaultValue={settings?.instagramUrl || ""} className="h-12 rounded-2xl border px-4" placeholder="Instagram URL" />
        <input name="youtubeUrl" defaultValue={settings?.youtubeUrl || ""} className="h-12 rounded-2xl border px-4" placeholder="YouTube URL" />
        <input name="copyrightText" defaultValue={settings?.copyrightText} className="h-12 rounded-2xl border px-4 md:col-span-2" placeholder="حقوق الطبع" />
        <textarea
          name="marqueeItems"
          defaultValue={(settings?.marqueeItems || []).join("، ")}
          className="min-h-28 rounded-2xl border px-4 py-3 md:col-span-2"
          placeholder="أدخل العناصر مفصولة بفواصل عربية أو إنجليزية"
        />
        <button className="rounded-2xl bg-brand-700 px-6 py-3 text-white md:col-span-2">حفظ الإعدادات</button>
      </form>
    </section>
  );
}
