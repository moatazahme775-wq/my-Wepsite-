import { PrismaClient, Role, PostStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "mtzallqmy@gmail.com";
  const passwordHash = await bcrypt.hash("Admin@123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "معتز العلقمي",
      passwordHash,
      role: Role.ADMIN,
      bio: "كاتب ومدوّن عربي يهتم بالأدب والمعرفة والصحة والتقنية.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
    }
  });

  const categories = [
    "المقالات العامة",
    "المقالات الأدبية",
    "عالم الطب والصيدلة",
    "صحتك تهمنا",
    "مراجعات كتب",
    "ذكاء اصطناعي ومعلومات"
  ];

  for (const [index, name] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: slugify(name, { lower: true, locale: "ar", strict: true }) },
      update: { order: index + 1, inMenu: true },
      create: {
        name,
        slug: slugify(name, { lower: true, locale: "ar", strict: true }),
        order: index + 1,
        inMenu: true,
        description: `قسم ${name}`
      }
    });
  }

  const category = await prisma.category.findFirstOrThrow({
    where: { name: "المقالات العامة" }
  });

  await prisma.post.upsert({
    where: { slug: "ahlan-bik-fi-modawanat-motaz" },
    update: {},
    create: {
      title: "أهلًا بك في مدونة معتز العلقمي",
      slug: "ahlan-bik-fi-modawanat-motaz",
      excerpt: "هذه أول مقالة تجريبية تعرض لك شكل البطاقات والمحتوى العربي داخل الواجهة.",
      quote: "المدونة الناجحة لا تكتفي بالمحتوى الجيد، بل تقدمه بتجربة قراءة جميلة.",
      coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
      content: `
        <h2>بداية موفقة</h2>
        <p>تم إعداد هذا المشروع كنقطة انطلاق احترافية لمدونة عربية حديثة تعتمد على Next.js وPrisma وAuth.js.</p>
        <blockquote>يمكنك تعديل هذه المقالة أو إنشاء مقالات جديدة من لوحة التحكم.</blockquote>
        <p>الواجهة متجاوبة، والقوائم قابلة للإدارة، ونظام الأدوار يسمح لك بتعيين محررين وكتّاب بسهولة.</p>
      `,
      status: PostStatus.PUBLISHED,
      featured: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category.id,
      seoTitle: "أهلًا بك في مدونة معتز العلقمي",
      seoDescription: "مقالة افتتاحية لمدونة عربية احترافية."
    }
  });

  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      siteName: "معتز العلقمي",
      siteDescription: "مدونة عربية احترافية في الأدب والصحة والتقنية والثقافة.",
      facebookUrl: "https://facebook.com/",
      xUrl: "https://x.com/",
      instagramUrl: "https://instagram.com/",
      youtubeUrl: "https://youtube.com/",
      copyrightText: "© معتز العلقمي - جميع الحقوق محفوظة"
    }
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
