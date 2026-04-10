import Link from "next/link";
import { Search, Shield, UserCircle2 } from "lucide-react";
import { auth } from "@/auth";
import { MobileMenu } from "@/components/mobile-menu";
import { RightSidebar } from "@/components/right-sidebar";
import { SiteData } from "@/types/site";

export async function Header({ siteData }: { siteData: SiteData }) {
  const session = await auth();
  const marquee = siteData.settings?.marqueeItems ?? ["أدبي", "علمية", "ثقافية", "صحية", "متنوعة"];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-hidden px-4 py-2 text-sm">
          <span className="shrink-0 font-semibold">أقسام متحركة</span>
          <div className="relative w-full overflow-hidden">
            <div className="flex min-w-max animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap">
              {[...marquee, ...marquee].map((item, index) => (
                <span key={`${item}-${index}`} className="opacity-95">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <MobileMenu categories={siteData.categories} />
          <Link href="/" className="text-2xl font-bold text-brand-900">
            {siteData.settings?.siteName ?? "معتز العلقمي"}
          </Link>
        </div>

        <div className="hidden lg:block">
          <RightSidebar categories={siteData.categories} compact />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/about" className="hidden text-sm text-slate-600 hover:text-brand-700 md:inline">
            من نحن
          </Link>
          <Link href="/contact" className="hidden text-sm text-slate-600 hover:text-brand-700 md:inline">
            تواصل
          </Link>
          <Search className="h-5 w-5 text-slate-500" />
          {session?.user ? (
            <Link href={session.user.role === "ADMIN" ? "/admin" : "/profile"} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm">
              {session.user.role === "ADMIN" ? <Shield className="h-4 w-4" /> : <UserCircle2 className="h-4 w-4" />}
              {session.user.name}
            </Link>
          ) : (
            <Link href="/login" className="rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white">
              تسجيل الدخول
            </Link>
          )}
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(50%); } }`}</style>
    </header>
  );
}
