import DashboardLayout from "@/components/templates/layouts/dashboard-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutDashboardIcon } from "lucide-react";

const DashboardComponent = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
  loader: () => ({
    crumb: "Dashboard",
    Logo: () => <LayoutDashboardIcon className="w-4 h-4 me-1.5" />
  })
});
