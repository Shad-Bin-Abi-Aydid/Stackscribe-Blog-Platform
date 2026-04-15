"use client";
import { getBlogs } from "@/actions/blog.action";
import React, { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{ message: string } | null>(null);

  console.log(data);
  console.log(error);

  useEffect(() => {
    // call a EFI function
    (async () => {
      const { data, error } = await getBlogs();

      setData(data);
      setError(error);
    })();
  }, []);

  return <div>This is About Page</div>;
}
