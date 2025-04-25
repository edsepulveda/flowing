import { AnimatedGridPattern } from "@/components/atoms/ui/animated-grid-pattern";
import { H1, H2, Paragraph } from "@/components/atoms/ui/typography";
import { ModeToggle } from "@/components/molecules/mode-toggle";
import { cn } from "@/lib/utils";
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

        <div className="flex flex-1 h-full">
          <main className="flex flex-col items-center flex-1 flex-shrink-0 basis-1/5 px-5 pt-16">
            <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
              <div className="mb-10 text-center">
                <H1 className="mt-8 mb-5 text-4xl lg:text-5xl font-semibold">
                  {heading}
                </H1>
                <H2 variant="accent" size="sm" weight="normal">
                  {subheading}
                </H2>
              </div>

              {children}
            </div>
          </main>

          <div className="hidden xl:flex flex-1 flex-shrink-1 basis-0 items-center justify-center p-8">
            <aside className="relative bg-metallic-blue-100 dark:bg-dark-bg-200 text-white rounded-2xl w-full h-[920px] flex flex-col items-center justify-center p-10 shadow-xl overflow-hidden">
              <AnimatedGridPattern
                className={cn(
                  "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                  "inset-y-0 inset-x-[-20%] h-[200%] skew-y-12"
                )}
                width={30}
                height={30}
                numSquares={40}
                maxOpacity={0.15}
                duration={5}
              />
              <div className="absolute top-6 right-8">
                <ModeToggle />
              </div>
              <div className="z-10 flex flex-col items-center">
                <H2 className="text-3xl font-bold mb-4 text-center">
                  Effortlessly manage your time
                </H2>
                <Paragraph size="lg" className="mb-8" variant="secondary">
                  Log in to access your dashboard and manage your workflows.
                </Paragraph>

                <div className="mt-8 grid grid-cols-3 gap-x-6 w-full">
                  <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                    <div className="rounded-full bg-indigo-500/30 p-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">AI Integration</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                    <div className="rounded-full bg-blue-500/30 p-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 3H15M3 6.2C3 5.0799 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V7M21 11V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V11M10.5 13.5H13.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Cloud Storage</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                    <div className="rounded-full bg-emerald-500/30 p-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z"
                          fill="currentColor"
                        />
                        <path
                          d="M13 18C13 16.8954 12.1046 16 11 16H9C7.89543 16 7 16.8954 7 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M17 18C17 16.8954 16.1046 16 15 16H14.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Team Access</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
