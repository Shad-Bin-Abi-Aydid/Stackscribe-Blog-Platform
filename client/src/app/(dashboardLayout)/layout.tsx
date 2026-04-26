export const dynamic = "force-dynamic";

import { DashboardAuthGuard } from "@/components/layout/dashboard-auth-guard";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardAuthGuard admin={admin} user={user} />
    </SidebarProvider>
  );
}
