import type { PropsWithChildren } from "react";



export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex flex-col h-screen w-screen"
    >
      <div
        className="flex flex-1 w-full overflow-y-hidden"
      >
        <div className="grow h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}