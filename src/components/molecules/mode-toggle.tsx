import { SunDim, MoonStar } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import type { MouseEvent } from "react";
import { Tooltip } from "../atoms/ui/tooltip";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export function ModeToggle() {
  const { toggleTheme, theme } = useTheme();

  const handleThemeChange = (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const { clientX, clientY } = event;

    toggleTheme({ x: clientX, y: clientY });
  };

  return (
    <div className="px-2">
      <Tooltip content="Toggle Theme">
        <SwitchPrimitive.Root
          checked={theme === "dark"}
          onClick={handleThemeChange}
          className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-input transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=unchecked]:bg-input"
        >
          <SwitchPrimitive.Thumb className="pointer-events-none h-5 w-5 rounded-full bg-popover shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 flex items-center justify-center">
            {theme === "dark" ? (
              <MoonStar className="size-4" />
            ) : (
              <SunDim className="size-4" />
            )}
          </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
      </Tooltip>
    </div>
  );
}
