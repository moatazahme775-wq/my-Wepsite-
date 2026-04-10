"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "تعذر الاشتراك");
      return;
    }
    toast.success("تم الاشتراك في القائمة البريدية بنجاح");
    setEmail("");
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold">اشترك في القائمة البريدية</h3>
      <p className="mb-4 text-sm text-slate-600">سيصلك كل جديد المدونة مباشرة إلى بريدك الإلكتروني.</p>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          required
          className="h-12 flex-1 rounded-2xl border border-slate-200 px-4 outline-none ring-brand-500 focus:ring-2"
          placeholder="أدخل بريدك الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={loading}
          className="h-12 rounded-2xl bg-brand-700 px-6 text-white disabled:opacity-70"
        >
          {loading ? "جارٍ الإرسال..." : "اشترك الآن"}
        </button>
      </div>
    </form>
  );
}
