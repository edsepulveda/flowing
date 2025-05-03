import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { NavMain } from "@/components/molecules/sidebar/main-nav";
import { navItems } from "@/lib/nav-items";
import { NavUser } from "@/components/molecules/sidebar/nav-footer";
import type { User } from "@/lib/types/user";
import { Layers2 } from "lucide-react";
import { GradientText } from "@/components/atoms/ui/gradient-text";
import { useUser } from "@/context/user-context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              variant="subtle"
              className="data-[state=open]:bg-sidebar-accent data-[slot=sidebar-menu-button]:!p-1.5 [&>svg]:size-auto"
            >
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden bg-rust-400 text-rust-100">
                  <SidebarLogo />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <GradientText
                    className="text-lg font-semibold"
                    text="Data Flow"
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0 mt-3 pt-3 border-t border-t-neutral-200 dark:border-t-neutral-800">
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={"Loading..."}>
          <NavUser user={user} />
        </React.Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarLogo() {
  return <Layers2 className="size-5" />;
}
