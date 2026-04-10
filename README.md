# مدونة معتز العلقمي - مشروع Next.js 15

مدونة عربية احترافية مبنية باستخدام:

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js (Credentials)
- Tiptap Editor

## المزايا

- واجهة عربية RTL ومتجاوبة
- صفحة رئيسية تعرض أحدث المقالات
- بطاقات مقالات بصور واسم الكاتب واقتباس مميز
- صفحات للأقسام والمقالة الكاملة
- لوحة إدارة للمقالات والأقسام والمستخدمين والإعدادات
- نظام صلاحيات: `ADMIN`, `EDITOR`, `AUTHOR`, `SUBSCRIBER`
- أول مستخدم يسجل بالبريد `mtzallqmy@gmail.com` يُمنح `ADMIN`
- قائمة بريدية Newsletter
- محرر Tiptap يدعم:
  - تنسيق النص
  - الألوان
  - المحاذاة
  - الصور
  - الجداول
- SEO أساسي
- جاهز للنشر على Vercel

## هيكل المجلدات

```text
motaz-blog/
├─ app/
│  ├─ api/
│  │  ├─ auth/[...nextauth]/route.ts
│  │  ├─ register/route.ts
│  │  ├─ newsletter/route.ts
│  │  └─ admin/
│  │     ├─ posts/route.ts
│  │     ├─ categories/route.ts
│  │     ├─ users/route.ts
│  │     └─ settings/route.ts
│  ├─ admin/
│  ├─ posts/[slug]/
│  ├─ category/[slug]/
│  ├─ about/
│  ├─ contact/
│  ├─ login/
│  ├─ register/
│  ├─ profile/
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ admin/post-form.tsx
│  ├─ editor/tiptap-editor.tsx
│  ├─ footer.tsx
│  ├─ header.tsx
│  ├─ mobile-menu.tsx
│  ├─ newsletter-form.tsx
│  ├─ post-card.tsx
│  └─ right-sidebar.tsx
├─ lib/
│  ├─ data.ts
│  ├─ prisma.ts
│  ├─ session.ts
│  ├─ utils.ts
│  └─ validators.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ types/
│  ├─ next-auth.d.ts
│  └─ site.ts
├─ auth.ts
├─ middleware.ts
├─ next.config.ts
├─ tailwind.config.ts
└─ .env.example
```

## أوامر التثبيت

```bash
npx create-next-app@latest motaz-blog --ts --tailwind --eslint --app
cd motaz-blog

# انسخ ملفات المشروع الحالية إلى نفس المجلد
npm install
cp .env.example .env
```

## إعداد البيئة

حرّر ملف `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
AUTH_SECRET="ضع_قيمة_عشوائية_قوية"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_EMAIL="mtzallqmy@gmail.com"
```

## إعداد قاعدة البيانات

```bash
npx prisma db push
npm run seed
```

## التشغيل المحلي

```bash
npm run dev
```

ثم افتح:

```text
http://localhost:3000
```

### بيانات الأدمن المبدئية بعد Seed

- البريد: `mtzallqmy@gmail.com`
- كلمة المرور: `Admin@123456`

> غيّر كلمة المرور بعد أول تشغيل.

## النشر على Vercel

1. ارفع المشروع إلى GitHub
2. أنشئ مشروعًا جديدًا في Vercel
3. اربطه بالمستودع
4. أضف متغيرات البيئة:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - `ADMIN_EMAIL`
5. نفّذ النشر

### قاعدة بيانات مجانية

#### Neon
- أنشئ مشروعًا مجانيًا في Neon
- انسخ `DATABASE_URL`
- اربطها مع Vercel

#### Supabase
- أنشئ مشروعًا مجانيًا
- استخدم رابط PostgreSQL في `DATABASE_URL`

## ملاحظات مهمة للإنتاج

- يفضّل إضافة رفع صور حقيقي عبر Cloudinary أو Supabase Storage بدل روابط الصور فقط
- يفضّل إضافة بريد فعلي للنشرة البريدية عبر Resend أو MailerLite
- أضف حماية CSRF إضافية، Rate Limit، وسياسة كلمات مرور أقوى
- يمكن توسيع البحث الداخلي والتعليقات وRSS لاحقًا

## لماذا هذا مناسب لـ Vercel وNeon؟

Next.js App Router يدعم Route Handlers داخل `app`, وAuth.js v5 يوصي بملف `auth.ts` مركزي، وNeon يوفر تكاملًا مباشرًا مع Vercel وقاعدة بيانات PostgreSQL Serverless. citeturn613917search0turn613917search1turn613917search3turn613917search11
