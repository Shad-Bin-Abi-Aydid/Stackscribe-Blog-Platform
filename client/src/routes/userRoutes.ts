import { Route } from "@/types";

export const userRoutes : Route[] = [
    {
      title: "Blog Management",
      items: [
        {
          title: " < Back",
          url: "/",

        },
        {
          title: "Create Blog",
          url: "/dashboard/create-blog",
        },
        {
          title: "History",
          url: "/dashboard/history",
        }
      ],
    },
]