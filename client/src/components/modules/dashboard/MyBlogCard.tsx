"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, MessageCircle, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";
import { deleteBlog } from "@/actions/blog.action";

export default function MyBlogCard({ post }: { post: BlogPost }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteBlog(post.id as string);
    setIsDeleting(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="group h-full overflow-hidden border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 shadow-sm hover:shadow-md hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 pb-2">
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-300 dark:text-indigo-600 text-sm">
              No Image
            </div>
          )}

          {/* Action buttons overlay */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <Link
              href={`/dashboard/edit-blog/${post.id}`}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-indigo-950 shadow-md text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-indigo-950 shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-2 text-lg font-bold text-slate-800 dark:text-slate-100 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {post.title}
          </CardTitle>
        </CardHeader>

        {/* Content & Tags */}
        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
            {post.content}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={index}
                  className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/60 dark:text-indigo-300 dark:hover:bg-indigo-900 border-none"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex items-center justify-between border-t border-indigo-50 dark:border-indigo-900/50 p-4">
          <div className="flex items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {post._count?.comments || 0}
            </span>
            {post.isFeatured && (
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-400 border-none text-xs">
                Featured
              </Badge>
            )}
          </div>

          <Link
            href={`/blogs/${post.id}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Read More &rarr;
          </Link>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isDeleting && setIsModalOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <TriangleAlert className="h-7 w-7 text-red-500" />
            </div>

            {/* Text */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Delete this post?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  &ldquo;{post.title}&rdquo;
                </span>{" "}
                will be permanently deleted. This action cannot be undone.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {/* cancel button */}
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              
              {/* delete button */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
