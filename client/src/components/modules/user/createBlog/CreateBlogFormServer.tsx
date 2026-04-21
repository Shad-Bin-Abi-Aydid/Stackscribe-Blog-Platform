import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

const API_URL = env.API_URL;

export default function CreateBlogFormServer() {
  // create a server function or server Action
  const createBlog = async (formData: FormData) => {
    "use server";

    // make the data in json format
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };

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

    if (res.ok) {
    //   revalidateTag("blogPosts");
      updateTag("blogPosts") ; // use either one of them worked same but it's worked immediately
    }
    console.log(res);
  };
  return (
    // Create shadcn form, we write the form this is not copy from the shadcn
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>You can write your blog here</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Blog Title"
                required
              ></Input>
            </Field>
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your blog"
                required
              ></Textarea>
            </Field>
            <Field>
              <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
              <Input id="tags" name="tags" placeholder="nextjs, web"></Input>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="blog-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
