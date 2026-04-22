import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import BlogCard from "./BlogCard";

export default async function BlogList() {
  const { data } = await blogService.getBlogPosts(
    { limit: "9" },
    { revalidate: 10 },
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
