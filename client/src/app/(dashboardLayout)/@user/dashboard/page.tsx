import { blogService } from "@/services/blog.service";
import { userServices } from "@/services/user.services";
import { BlogPost } from "@/types";
import { Eye, FileText, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const { data, error } = await userServices.getSession();
  if (error || !data) redirect("/login");

  const authorId = data.user.id;
  const response = await blogService.getBlogPosts({ authorId });
  const posts: BlogPost[] = response?.data?.data || [];

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalComments = posts.reduce(
    (sum, p) => sum + (p._count?.comments || 0),
    0,
  );
  const featuredCount = posts.filter((p) => p.isFeatured).length;

  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      icon: FileText,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
    },
    {
      label: "Total Views",
      value: totalViews,
      icon: Eye,
      color: "text-sky-600 dark:text-sky-400",
      bg: "bg-sky-50 dark:bg-sky-900/30",
    },
    {
      label: "Total Comments",
      value: totalComments,
      icon: MessageCircle,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-900/30",
    },
    {
      label: "Featured Posts",
      value: featuredCount,
      icon: Star,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Welcome back, {data.user.name} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here&apos;s an overview of your blog activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${stat.bg}`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/create-blog"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Write a Post
          </Link>
          <Link
            href="/dashboard/my-blogs"
            className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 dark:border-indigo-800 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
          >
            <Eye className="h-4 w-4" />
            View My Blogs
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Recent Posts
          </h2>
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 divide-y divide-indigo-50 dark:divide-indigo-900/50 overflow-hidden">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-xs">
                  {post.title}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {post._count?.comments || 0}
                  </span>
                  <Link
                    href={`/blogs/${post.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
