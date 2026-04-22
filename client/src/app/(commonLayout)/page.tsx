import { Suspense } from "react";
import HeroSection from "@/components/layout/HeroSection";
import BlogList from "@/components/modules/homepage/BlogList";
import BlogCardSkeleton from "@/components/modules/homepage/BlogCardSkeleton";

function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
            Latest Articles
          </h2>
          <Suspense fallback={<BlogListSkeleton />}>
            <BlogList />
          </Suspense>
        </div>
        {/* dark mode only fade into footer */}
        <div className="pointer-events-none mt-16 h-16 bg-linear-to-b from-transparent to-transparent dark:to-indigo-950" />
      </section>
    </div>
  );
}
