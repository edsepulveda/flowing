import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import appCss from "@/styles.css?url";
import { queryClient } from "@/lib/react-query";
import { ThemeProvider } from "@/context/theme-context";
import { TooltipProvider } from "@/components/atoms/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/react";

const RootComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <NuqsAdapter>
            <main className="bg-background overscroll-none font-sans antialiased">
              <Outlet />
            </main>
          </NuqsAdapter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
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
