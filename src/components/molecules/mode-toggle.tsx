import { ContrastIcon } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { Button } from "../atoms/ui/button";
import type { MouseEvent } from "react";

export function ModeToggle() {
  const { toggleTheme } = useTheme();

  const handleThemeChange = (
    event: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const { clientX, clientY } = event;

    toggleTheme({ x: clientX, y: clientY });
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="group/toggle size-8"
      onClick={handleThemeChange}
    >
      <ContrastIcon />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
