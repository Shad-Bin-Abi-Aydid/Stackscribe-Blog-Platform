import { Route } from "@/types";

export const userRoutes : Route[] = [
    {
      title: "Blog Management",
      items: [
{
          title: "Create Blog",
          url: "/dashboard/create-blog",
        },
        {
          title: "My Blogs",
          url: "/dashboard/my-blogs",

        },
        {
          title: "History",
          url: "/dashboard/history",
        }
      ],
    },
]