import { PrismaClient, Role, PostStatus, CommentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { name: "معتز العلقمي", role: Role.admin },
    create: {
      email: "admin@example.com",
      name: "معتز العلقمي",
      role: Role.admin
    }
  });

  const category = await prisma.category.upsert({
    where: { slug: "tech" },
    update: {},
    create: {
      name: "تقنية",
      slug: "tech",
      description: "تقنيات، تطوير، ومقالات عملية."
    }
  });

  const tag = await prisma.tag.upsert({
    where: { slug: "nextjs" },
    update: {},
    create: { name: "Next.js", slug: "nextjs" }
  });

  const post = await prisma.post.upsert({
    where: { slug: "welcome-to-mouaz-blog" },
    update: {},
    create: {
      title: "مرحبًا بك في مدونة معتز العلقمي",
      slug: "welcome-to-mouaz-blog",
      excerpt: "نسخة منظمة ومهيأة للنشر على Vercel.",
      content: "<p>هذا أول مقال تجريبي في المدونة بعد مراجعة الهيكل وإصلاحه.</p>",
      status: PostStatus.published,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category.id,
      seoTitle: "مدونة معتز العلقمي",
      seoDescription: "مدونة عربية حديثة"
    }
  });

  await prisma.postTag.createMany({
    data: [{ postId: post.id, tagId: tag.id }],
    skipDuplicates: true
  });

  await prisma.comment.create({
    data: {
      content: "تعليق تجريبي جاهز للمراجعة.",
      status: CommentStatus.pending,
      postId: post.id,
      name: "زائر"
    }
  });

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: {},
    create: {
      key: "site",
      value: {
        siteName: "معتز العلقمي",
        siteDescription: "مدونة عربية احترافية",
        copyrightText: "جميع الحقوق محفوظة لدى معتز العلقمي",
        socialLinks: {
          x: "https://x.com",
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com"
        }
      },
      updatedById: admin.id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
