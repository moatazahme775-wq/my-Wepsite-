import { getHomeData, getSiteData } from "@/lib/data";
import { PostCard } from "@/components/post-card";
import { RightSidebar } from "@/components/right-sidebar";
import { NewsletterForm } from "@/components/newsletter-form";

export default async function HomePage() {
  let recentPosts: any[] = [];
  let featuredPosts: any[] = [];
  let categories: any[] = [];

  try {
    const [homeData, siteData] = await Promise.all([
      getHomeData(),
      getSiteData()
    ]);
    recentPosts = homeData.recentPosts;
    featuredPosts = homeData.featuredPosts;
    categories = siteData.categories;
  } catch (error) {
    // Fallback during build time when DATABASE_URL is not available
    console.warn("Failed to fetch home data:", error);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
      <div className="hidden lg:block">
        <RightSidebar categories={categories} />
      </div>

      <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <div key={post.id} className="md:col-span-1">
              <PostCard post={post} />
            </div>
          ))}
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">أحدث المقالات</h2>
            <span className="text-sm text-slate-500">تصفح آخر ما تم نشره</span>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <NewsletterForm />
      </div>
    </div>
  );
}
