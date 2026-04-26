import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types";
import { Role } from "@/constants/roles";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];

  switch (user.role) {
    case Role.admin:
      routes = adminRoutes;
      break;
    case Role.user:
      routes = userRoutes;
      break;
    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarNav items={item.items} />
            </SidebarGroupContent>
            <div className="mt-2 px-2">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
