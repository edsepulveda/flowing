import { SidebarInset, SidebarProvider } from "@/components/atoms/ui/sidebar";
import { SiteHeader } from "@/components/organism/header/site-header";
import { AppSidebar } from "@/components/organism/sidebar/app-sidebar";
import useCookie from "@/hooks/use-cookie";
import type { ReactNode } from "@tanstack/react-router";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarState] = useCookie("sidebar_state", "false");

  return (
    <SidebarProvider
      defaultOpen={sidebarState === "true"}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-1 px-4 lg:gap-2 lg:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
