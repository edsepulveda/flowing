import { createFileRoute } from "@tanstack/react-router";
import { AuthCommonLayout } from "@/components/templates/layouts/auth/auth-common-layout";
import { LoginForm } from "@/components/molecules/forms/auth/login-form";
import { Text } from "@/components/atoms/ui/typography";
import { Separator } from "@/components/atoms/ui/separator";
import { Button } from "@/components/atoms/ui/button";
import { GitHubIcon, GoogleIcon } from "@/components/atoms/ui/icons";

const LoginPage = () => {
  return (
    <AuthCommonLayout
      heading="Welcome Back"
      subheading="Enter your email and password to access"
    >
      <div className="flex flex-col gap-5">
        <LoginForm />

        <div className="w-full flex items-center justify-center overflow-hidden">
          <Separator />
          <span className="text-sm px-2">OR</span>
          <Separator />
        </div>

        <div className="mb-2.5 flex items-center justify-center-safe gap-6">
          <Button variant="outline" size="lg">
            <GoogleIcon className="me-2.5" />
            Sign in With Google
          </Button>
          <Button variant="outline" size="lg">
            <GitHubIcon className="me-2.5" />
            Sign in With Github
          </Button>
        </div>
      </div>
    </AuthCommonLayout>
  );
};

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
