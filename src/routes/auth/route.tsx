import { AuthLayout } from "@/components/templates/layouts/auth/auth-general-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const AuthLayoutComponent = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const Route = createFileRoute("/auth")({
  component: AuthLayoutComponent,
});
