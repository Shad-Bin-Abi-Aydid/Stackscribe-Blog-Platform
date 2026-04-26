import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";

// dynamicParams = true allows pages not in generateStaticParams to render on demand
export const dynamicParams = true;

// Returning [] skips pre-rendering at build time; pages are rendered on request instead
export async function generateStaticParams() {
  return [];
}

// Disabled — was crashing at build time when Next.js tried to pre-render all blog pages
// export const dynamic = "force-dynamic";
// export async function generateStaticParams() {
//   try {
//     const response = await blogService.getBlogPosts();
//     const posts = response?.data?.data || [];
//     return posts.map((blog: BlogPost) => ({ id: blog.id }));
//   } catch (error) {
//     return [];
//   }
// }

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);
  const post: BlogPost = data;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-muted-foreground">
        Blog post not found.
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="relative w-full h-72 rounded-xl overflow-hidden mb-8">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Tags */}
      {post?.tags?.length ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      ) : null}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight mb-4">{post.title}</h1>

      {/* Meta */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b pb-6">
        <span className="flex items-center gap-1.5">
          <Eye className="h-4 w-4" />
          {post.views} views
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" />
          {post._count?.comments ?? 0} comments
        </span>
        {post.isFeatured && (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
        {post.content}
      </div>
    </article>
  );
}
