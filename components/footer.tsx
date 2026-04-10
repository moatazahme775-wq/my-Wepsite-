import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer({
  settings
}: {
  settings: {
    siteName?: string;
    facebookUrl?: string | null;
    xUrl?: string | null;
    instagramUrl?: string | null;
    youtubeUrl?: string | null;
    copyrightText?: string;
  } | null;
}) {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{settings?.siteName ?? "معتز العلقمي"}</h3>
          <p className="mt-2 text-sm text-slate-600">
            مدونة عربية احترافية تجمع بين الأدب والصحة والمعرفة والتقنية.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">روابط سريعة</h4>
          <div className="space-y-2 text-sm text-slate-600">
            <Link href="/">الرئيسية</Link><br />
            <Link href="/about">من نحن</Link><br />
            <Link href="/contact">تواصل</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">تابعنا</h4>
          <div className="flex gap-3">
            {settings?.facebookUrl ? <Link href={settings.facebookUrl}><Facebook /></Link> : null}
            {settings?.xUrl ? <Link href={settings.xUrl}>X</Link> : null}
            {settings?.instagramUrl ? <Link href={settings.instagramUrl}><Instagram /></Link> : null}
            {settings?.youtubeUrl ? <Link href={settings.youtubeUrl}><Youtube /></Link> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-sm text-slate-500">
        {settings?.copyrightText ?? "© جميع الحقوق محفوظة"}
      </div>
    </footer>
  );
}
