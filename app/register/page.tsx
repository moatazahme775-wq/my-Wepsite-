"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "تعذر إنشاء الحساب");
      return;
    }

    toast.success("تم إنشاء الحساب، يمكنك تسجيل الدخول الآن");
    window.location.href = "/login";
  }

  return (
    <section className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-3xl font-bold">إنشاء حساب</h1>
      <form action={onSubmit} className="space-y-4">
        <input name="name" required placeholder="الاسم" className="h-12 w-full rounded-2xl border px-4" />
        <input name="email" type="email" required placeholder="البريد الإلكتروني" className="h-12 w-full rounded-2xl border px-4" />
        <input name="password" type="password" required placeholder="كلمة المرور" className="h-12 w-full rounded-2xl border px-4" />
        <button disabled={loading} className="h-12 w-full rounded-2xl bg-brand-700 text-white">
          {loading ? "جارٍ الإنشاء..." : "إنشاء الحساب"}
        </button>
      </form>
    </section>
  );
}
