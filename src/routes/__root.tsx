import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import appCss from "@/styles.css?url";
import { ThemeProvider } from "@/context/theme-context";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "@/components/atoms/ui/toast";
import { ReactFlowProvider } from "@xyflow/react";

interface RootRouteContext {
  queryClient: QueryClient;
}

const RootComponent = () => {
  return (
    <ReactFlowProvider>
      <NuqsAdapter>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light">
            <main className="bg-background overscroll-none font-sans antialiased">
              <Outlet />
              <Toaster richColors />
            </main>
          </ThemeProvider>
        </TooltipProvider>
      </NuqsAdapter>
    </ReactFlowProvider>
  );
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
      {
        title: "Flowing App",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
});
