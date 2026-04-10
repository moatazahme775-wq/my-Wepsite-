import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
});

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "كلمة المرور غير صحيحة")
});

export const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  inMenu: z.boolean().default(true),
  order: z.coerce.number().min(0).default(0)
});

export const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  excerpt: z.string().min(20),
  quote: z.string().optional(),
  coverImage: z.string().url().or(z.literal("")).optional(),
  content: z.string().min(20),
  categoryId: z.string().min(1),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export const newsletterSchema = z.object({
  email: z.string().email()
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  siteDescription: z.string().min(5),
  logoUrl: z.string().url().or(z.literal("")).optional(),
  facebookUrl: z.string().url().or(z.literal("")).optional(),
  xUrl: z.string().url().or(z.literal("")).optional(),
  instagramUrl: z.string().url().or(z.literal("")).optional(),
  youtubeUrl: z.string().url().or(z.literal("")).optional(),
  copyrightText: z.string().min(3),
  marqueeItems: z.string().min(3)
});
