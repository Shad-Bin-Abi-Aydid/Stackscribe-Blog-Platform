import Link from "next/link";
import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group h-full overflow-hidden border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 shadow-sm hover:shadow-md hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 pb-2">
      <div className="relative h-56 w-full overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-300 dark:text-indigo-600">
            No Image
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {post.title}
        </CardTitle>
      </CardHeader>

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
  );
}
