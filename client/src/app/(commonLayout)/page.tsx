import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogPosts(
    {
      // isFeatured:true,
      search: "",
    },
    {
      // cache:"no-store",
      revalidate: 10,
    },
  );

  // Parallel Data fetching

  // those are fetching in sequentially
  // const featuredPosts = await blogService.getBlogPosts({ isFeatured: true });
  // const posts = await blogService.getBlogPosts(
  //   { limit: "3" },
  //   { revalidate: 10 },
  // );

  // Now make them parallel fetching
  // const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
  // const postsPromise = blogService.getBlogPosts(
  //   { limit: "3" },
  //   { revalidate: 10 },
  // );

  // const [featuredPosts,posts] = await Promise.all([featuredPostsPromise, postsPromise]);

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-6">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
