"use client";

import { createBlogPost, updateBlogPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/types";
import { useForm } from "@tanstack/react-form";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.secure_url as string;
};

const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  tags: z.string(),
});

export function CreateBlogFormClient({
  initialData,
}: {
  initialData?: BlogPost;
}) {
  const router = useRouter();

  // for uploading the image
  const [thumbnail, setThumbnail] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
      tags: initialData?.tags?.join(",") ?? "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading(
        initialData ? "Updating..." : "Creating...",
      );

      const blogData = {
        title: value.title,
        content: value.content,
        tags: value.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
          thumbnail,
      };

      try {
        const res = initialData
          ? await updateBlogPost(initialData.id as string, blogData)
          : await createBlogPost(blogData);

        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }

        toast.success(initialData ? "Post Updated" : "Post Created", {
          id: toastId,
        });
        form.reset();
        router.push("/dashboard/my-blogs");
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Blog Post" : "Create a Blog Post"}
        </CardTitle>
        <CardDescription>
          Fill in the details below to publish your blog post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Blog Title"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write your blog"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="tags"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Tags (comma separated)
                    </FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="nextjs, web"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            {/* Thumbnail Image */}
            <Field>
              <FieldLabel>Thumbnail Image</FieldLabel>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const url = await uploadToCloudinary(file);
                    setThumbnail(url);
                  } catch {
                    toast.error("Image upload failed");
                  } finally {
                    setUploading(false);
                  }
                }}
              />
              {thumbnail ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-indigo-100 dark:border-indigo-900">
                  <Image
                    src={thumbnail}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnail("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl py-8 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="size-6 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus className="size-6" />
                      <span className="text-sm">Click to upload thumbnail</span>
                    </>
                  )}
                </button>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="blog-post" type="submit" className="w-full">
          {initialData ? "Save Changes" : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
