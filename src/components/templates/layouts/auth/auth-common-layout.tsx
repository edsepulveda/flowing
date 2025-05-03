import { H1, H2 } from "@/components/atoms/ui/typography";
import SmoothWorkflowAnimation from "@/components/molecules/auth-visual";
import { Layers2 } from "lucide-react";
import type { PropsWithChildren } from "react";

type AuthCommonProps = {
  heading: string;
  subheading: string;
};

export const AuthCommonLayout = ({
  heading,
  subheading,
  children,
}: PropsWithChildren<AuthCommonProps>) => {
  return (
    <>
      <div className="relative flex flex-col bg-light-bg-300 dark:bg-dark-bg-300 h-screen">
        <div className="absolute top-11 w-full px-8 mx-auto sm:px-6 lg:px-8">
          <nav className="relative flex items-center grow shrink-0 lg:grow-0">
            <div className="flex items-center w-full md:w-auto">
              <div className="flex flex-row items-center gap-x-4">
                <Layers2 className="size-6" />
                <span className="text-2xl font-semibold">Data Flow</span>
              </div>
            </div>
          </nav>
        </div>

        <div className="h-screen flex items-center justify-center">
          <main className="w-full h-full grid lg:grid-cols-2 p-4">
            <div className="max-w-sm md:max-w-md m-auto w-full">
              <div className="mb-10 text-center space-y-2">
                <H1 className="mt-4 text-5xl font-bold" tracking="tight">
                  {heading}
                </H1>
                <H2
                  variant="accent"
                  size="sm"
                  weight="normal"
                  className="text-muted-foreground"
                >
                  {subheading}
                </H2>
              </div>

              {children}
            </div>
            <div className="bg-muted hidden lg:block rounded-lg">
              <SmoothWorkflowAnimation />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
