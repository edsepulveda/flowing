import * as React from "react";
import { ContrastIcon } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { Button } from "../atoms/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    // Use the current theme to determine next theme
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="group/toggle size-8"
      onClick={toggleTheme}
    >
      <ContrastIcon />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}