"use server";

import { blogService } from "@/services/blog.service";
import { BlogData } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async () =>{

    return await blogService.getBlogPosts();
}

// create Blog Post
export const createBlogPost = async (data:BlogData)=>{
    const res = await blogService.createBlogPost(data);

    // here we can do the cache revalidation
    updateTag("blogPosts");
    return res;
}