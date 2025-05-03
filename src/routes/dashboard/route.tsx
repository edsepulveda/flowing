import DashboardLayout from "@/components/templates/layouts/dashboard-layout";
import { validateToken } from "@/services/auth/mutations";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";
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
  beforeLoad: async ({ context }) => {
    const token = Cookies.get("accessToken");

    const data = await context.queryClient
      .ensureQueryData({
        queryKey: ["validate", token],
        queryFn: validateToken,
      })
      .catch(() => {
        console.warn(`Token of this user is expired...`);

        throw redirect({
          to: "/auth/login",
        });
      });

    if (!data.valid) {
      throw redirect({ to: "/auth/login" });
    }
  },
  loader: () => ({
    crumb: "Dashboard",
    Logo: () => <LayoutDashboardIcon className="w-4 h-4 me-1.5" />,
  }),
});
