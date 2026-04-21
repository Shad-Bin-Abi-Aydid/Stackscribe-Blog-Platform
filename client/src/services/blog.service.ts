import { env } from "@/env";
import { BlogData } from "@/types";
import { error } from "console";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

// define the type
interface GetBlogsParams {
  isFeatured?: boolean;
  search?: string;
  page?: string;
  limit?: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}


export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blogPosts"] };

      const res = await fetch(url.toString(), config);

      // This is the same as the upper two line. this is the same thing and worked same as well
      // const res = await fetch(url.toString(), {
      //   next:{
      //     tags:["blogPosts"]
      //   }
      // });

      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // get data by Id
  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // Create Blog Post
  createBlogPost: async (blogData: BlogData) => {
    try {
      // send the data in the backend post API_URL
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();
      if(data.error){
        return {data:null, error: data.error || "Error: Post not Created"}
      }

      return {data:data, error:null};
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
