"use server";

import { blogService } from "@/services/blog.service";
import { BlogData } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

// create Blog Post
export const createBlogPost = async (data: BlogData) => {
  const res = await blogService.createBlogPost(data);

  // here we can do the cache revalidation
  updateTag("blogPosts");
  return res;
};

// delete Blog Post
export const deleteBlog = async (id: string) => {
  const res = await blogService.deleteBlogPost(id);

  // here we can do the cache revalidation, for that it will
  // delete instantly from the ui
  updateTag("blogPosts");

  return res;
};

// update Blog Post
export const updateBlogPost = async (id: string, data: BlogData) => {
  const res = await blogService.updateBlogPost(id, data);
  updateTag("blogPosts");

  return res;
};
