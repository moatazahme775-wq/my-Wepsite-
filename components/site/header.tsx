import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export function SiteHeader() {
  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/search", label: "البحث" },
    { href: "/contact", label: "اتصل بنا" },
    { href: "/dashboard", label: "التحكم" }
  ];

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-950 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
