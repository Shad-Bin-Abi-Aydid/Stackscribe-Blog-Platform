import MyBlogCard from "@/components/modules/dashboard/MyBlogCard";
import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { userServices } from "@/services/user.services";
import { BlogPost } from "@/types";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyBlogPage() {
  const { data, error } = await userServices.getSession();

  //   if there have no session or login user
  if (error || !data) redirect("/login");

  const authorId = data!.user.id;

  const response = await blogService.getBlogPosts({ authorId });

  const posts: BlogPost[] = response?.data?.data || [];

  //   if user haven't any post
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30">
          <PenLine className="h-9 w-9 text-indigo-400 dark:text-indigo-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
          No posts yet
        </h2>
        <p className="mb-8 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          You have not published anything yet. Start writing your first blog
          post and share your thoughts with the world.
        </p>
        <Link
          href="/dashboard/create-blog"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
        >
          <PenLine className="h-4 w-4" />
          Write your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((item) => (
        <MyBlogCard post={item} key={item.id}></MyBlogCard>
      ))}
    </div>
  );
}
