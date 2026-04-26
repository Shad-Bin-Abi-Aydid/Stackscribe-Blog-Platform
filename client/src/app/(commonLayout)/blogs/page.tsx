export const dynamic = "force-dynamic";

import BlogCardSkeleton from "@/components/modules/homepage/BlogCardSkeleton";
import BlogList from "@/components/modules/homepage/BlogList";
import React, { Suspense } from "react";
import { BlogListSkeleton } from "../page";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import PaginationControls from "@/components/ui/pagination-controls";
import { BlogPost } from "@/types";
import BlogCard from "@/components/modules/homepage/BlogCard";

export default async function BlogsPost({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const response = await blogService.getBlogPosts({ page, limit:"9" });

  const pagination = response?.data?.pagination || {
    limit: 9,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <section className="bg-white dark:bg-slate-950 py-16 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-center font-bold text-slate-800 dark:text-white mb-8">
            All Articles
          </h2>
          <Suspense fallback={<BlogListSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {response?.data?.data?.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <PaginationControls meta={pagination} />
        </Suspense>
        {/* dark mode only fade into footer */}
        <div className="pointer-events-none mt-16 h-16 bg-linear-to-b from-transparent to-transparent dark:to-indigo-950" />
      </section>
    </div>
  );
}
