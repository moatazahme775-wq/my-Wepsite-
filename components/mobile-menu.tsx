"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Category } from "@prisma/client";

export function MobileMenu({ categories }: { categories: Category[] }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-xl border border-slate-200 p-2 lg:hidden">
        <Menu className="h-5 w-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-80 bg-white p-5 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold">القائمة</Dialog.Title>
            <Dialog.Close className="rounded-full bg-slate-100 p-2">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <nav className="space-y-3">
            <Link href="/" className="block rounded-xl bg-slate-50 px-4 py-3">الرئيسية</Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="block rounded-xl bg-slate-50 px-4 py-3">
                {category.name}
              </Link>
            ))}
            <Link href="/admin" className="block rounded-xl bg-brand-50 px-4 py-3 text-brand-800">قسم الأدمن</Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
