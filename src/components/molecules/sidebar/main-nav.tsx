import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/atoms/ui/sidebar";
import { MenuIconButton } from "./menu-item-button";
import type { MenuItemProps } from "@/types/menu";
import { Link } from "@tanstack/react-router";

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon: MenuItemProps["icon"] }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.url}>
                {({ isActive }) => (
                  <MenuIconButton isSelected={isActive} icon={item.icon}>
                    {item.title}
                  </MenuIconButton>
                )}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
