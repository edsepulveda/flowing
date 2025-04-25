import { createFileRoute } from "@tanstack/react-router";
import { AuthCommonLayout } from "@/components/templates/layouts/auth/auth-common-layout";
import { LoginForm } from "@/components/molecules/forms/auth/login-form";
import { Text } from "@/components/atoms/ui/typography";

const LoginPage = () => {
  return (
    <AuthCommonLayout
      heading="Welcome Back"
      subheading="Enter your email and password to access"
    >
      <div className="flex flex-col gap-5">
        <LoginForm />
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-500" />
          </div>
          <div className="relative flex justify-center text-sm">
            <Text as="span" className="px-2 text-sm bg-studio text-foreground">
              Or Login With
            </Text>
          </div>
        </div>
      </div>
    </AuthCommonLayout>
  );
};

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
