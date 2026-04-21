import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import React from "react";

export default function HistoryTable({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Featured</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block border-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{item.views}</TableCell>
              <TableCell>{item.isFeatured}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
