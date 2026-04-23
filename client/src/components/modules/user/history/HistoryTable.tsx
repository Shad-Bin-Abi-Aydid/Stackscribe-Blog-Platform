import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";
import { Eye, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 text-sm text-slate-400 dark:text-slate-500">
        No posts found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-indigo-950/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-indigo-50/60 dark:bg-indigo-900/20 hover:bg-indigo-50/60">
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Title
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Tags
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Views
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Comments
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Featured
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((item) => (
            <TableRow
              key={item.id}
              className="border-indigo-50 dark:border-indigo-900/50 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10"
            >
              <TableCell className="font-medium text-slate-700 dark:text-slate-300 max-w-[200px] truncate">
                {item.title}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags?.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 border-none"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {item.tags && item.tags.length > 2 && (
                    <span className="text-xs text-slate-400">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <Eye className="h-3.5 w-3.5" />
                  {item.views}
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {item._count?.comments || 0}
                </span>
              </TableCell>
              <TableCell>
                {item.isFeatured ? (
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-none text-xs">
                    Featured
                  </Badge>
                ) : (
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    —
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Link
                  href={`/blogs/${item.id}`}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
