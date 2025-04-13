import { Separator } from "@/components/atoms/ui/separator";
import { SidebarTrigger } from "@/components/atoms/ui/sidebar";
import { DynamicBreadcrumbs } from "@/components/molecules/dynamic-breadcrumps";
import { ModeToggle } from "@/components/molecules/mode-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-b-neutral-200 dark:border-b-neutral-700 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumbs />
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
