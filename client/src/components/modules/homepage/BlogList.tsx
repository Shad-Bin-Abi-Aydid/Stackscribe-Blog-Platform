import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import BlogCard from "./BlogCard";
import BlogListMessage from "./BlogListMessage";

export default async function BlogList() {
  const { data, error } = await blogService.getBlogPosts(
    { limit: "9" },
    { revalidate: 10 },
  );

  const posts: BlogPost[] = data?.data ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {error ? (
        <BlogListMessage text="Couldn't load articles right now. Please try again in a moment." />
      ) : posts.length === 0 ? (
        <BlogListMessage text="No articles published yet — check back soon." />
      ) : (
        posts.map((post: BlogPost) => <BlogCard key={post.id} post={post} />)
      )}
    </div>
  );
}
