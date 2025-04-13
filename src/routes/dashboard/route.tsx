import DashboardLayout from "@/components/templates/layouts/dashboard-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const DashboardComponent = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export const Route = createFileRoute("/dashboard")({
  component: DashboardComponent,
});
