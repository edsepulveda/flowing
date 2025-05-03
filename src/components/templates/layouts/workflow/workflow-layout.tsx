import { GradientText } from "@/components/atoms/ui/gradient-text";
import { Separator } from "@/components/atoms/ui/separator";
import { ModeToggle } from "@/components/molecules/mode-toggle";
import WorkflowTopbar from "@/components/molecules/workflows/top-bar";
import { SidebarLogo } from "@/components/organism/sidebar/app-sidebar";
import { Route } from "@/routes/editor/$workflowId";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export default function WorkflowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = Route.useLoaderData();

  console.log("Catch from Dashboard", data);

  return (
    <motion.div
      className="h-screen w-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-12 border-b flex items-center px-4 bg-background"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
      >
        <div className="flex w-full items-center gap-1 px-2 lg:gap-6 justify-between">
          <div className="flex flex-row items-center">
            <Link
              to="/dashboard/workflows"
              className="flex flex-row items-center"
            >
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
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="ml-2.5 text-lg font-medium">Workflow Editor</h1>
          </div>
          <ModeToggle />
        </div>
      </motion.div>

      <div>
        <WorkflowTopbar title={data.name} description={data.description} />
      </div>
      <motion.div
        className="flex-1 relative"
        initial={{ scale: 0.98, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
