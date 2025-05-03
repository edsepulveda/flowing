import type { Theme } from "@/context/theme-context";
import type { ThemeEditorState } from "@/stores/theme-store";

const updateThemeClass = (root: HTMLElement, mode: Theme) => {
  if (mode === "light") {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
};

export const applyTheme = (themeState: ThemeEditorState, root: HTMLElement) => {
  const { currentMode } = themeState;

  if (!root) return;

  updateThemeClass(root, currentMode);
};
