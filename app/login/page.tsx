"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      toast.error("بيانات الدخول غير صحيحة");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-3xl font-bold">تسجيل الدخول</h1>
      <form action={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="البريد الإلكتروني" className="h-12 w-full rounded-2xl border px-4" />
        <input name="password" type="password" required placeholder="كلمة المرور" className="h-12 w-full rounded-2xl border px-4" />
        <button disabled={loading} className="h-12 w-full rounded-2xl bg-brand-700 text-white">
          {loading ? "جارٍ الدخول..." : "دخول"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        ليس لديك حساب؟ <Link href="/register" className="font-semibold text-brand-700">إنشاء حساب</Link>
      </p>
    </section>
  );
}
