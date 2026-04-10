"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import type { Category, Post } from "@prisma/client";
import { toast } from "sonner";

type PostWithNullable = Partial<Post>;

export function PostForm({
  categories,
  post
}: {
  categories: Category[];
  post?: PostWithNullable;
}) {
  const router = useRouter();
  const [content, setContent] = useState(post?.content || "<p>ابدأ بكتابة المقال هنا...</p>");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const payload = {
      id: post?.id,
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      quote: formData.get("quote"),
      coverImage: formData.get("coverImage"),
      categoryId: formData.get("categoryId"),
      status: formData.get("status"),
      featured: formData.get("featured") === "on",
      seoTitle: formData.get("seoTitle"),
      seoDescription: formData.get("seoDescription"),
      content
    };

    const res = await fetch("/api/admin/posts", {
      method: post?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "تعذر حفظ المقال");
      return;
    }

    toast.success("تم حفظ المقال بنجاح");
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form action={submit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <input name="title" defaultValue={post?.title} placeholder="عنوان المقال" className="h-12 rounded-2xl border px-4" required />
        <input name="coverImage" defaultValue={post?.coverImage || ""} placeholder="رابط صورة المقال" className="h-12 rounded-2xl border px-4" />
        <input name="quote" defaultValue={post?.quote || ""} placeholder="اقتباس مميز قصير" className="h-12 rounded-2xl border px-4 md:col-span-2" />
        <textarea name="excerpt" defaultValue={post?.excerpt} placeholder="ملخص قصير" className="min-h-28 rounded-2xl border px-4 py-3 md:col-span-2" required />
        <select name="categoryId" defaultValue={post?.categoryId} className="h-12 rounded-2xl border px-4" required>
          <option value="">اختر القسم</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <select name="status" defaultValue={post?.status || "DRAFT"} className="h-12 rounded-2xl border px-4">
          <option value="DRAFT">مسودة</option>
          <option value="PUBLISHED">منشور</option>
          <option value="ARCHIVED">مؤرشف</option>
        </select>
        <input name="seoTitle" defaultValue={post?.seoTitle || ""} placeholder="عنوان SEO" className="h-12 rounded-2xl border px-4" />
        <input name="seoDescription" defaultValue={post?.seoDescription || ""} placeholder="وصف SEO" className="h-12 rounded-2xl border px-4" />
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="featured" defaultChecked={post?.featured || false} />
        <span>مقال مميز في الواجهة الرئيسية</span>
      </label>

      <TiptapEditor value={content} onChange={setContent} />

      <button disabled={loading} className="rounded-2xl bg-brand-700 px-6 py-3 text-white">
        {loading ? "جارٍ الحفظ..." : "حفظ المقال"}
      </button>
    </form>
  );
}
