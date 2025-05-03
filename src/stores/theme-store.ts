import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeEditorState {
  currentMode: "light" | "dark";
}

interface ThemeStore {
  themeState: ThemeEditorState;
  themeCheckpoint: ThemeEditorState | null;
}

interface ThemeStoreActions {
  setThemeState: (state: ThemeEditorState) => void;
  saveThemeCheckpoint: () => void;
  restoreThemeCheckpoint: () => void;
}

const initialState: ThemeEditorState = {
  currentMode:
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
};

export const useThemeChanger = create<ThemeStore & ThemeStoreActions>()(
  persist(
    (set, get) => ({
      themeState: initialState,
      themeCheckpoint: null,
      setThemeState(state) {
        set({ themeState: state });
      },
      saveThemeCheckpoint() {
        set({ themeCheckpoint: get().themeState });
      },
      restoreThemeCheckpoint: () => {
        const checkpoint = get().themeCheckpoint;
        if (checkpoint) {
          set({ themeState: checkpoint });
        } else {
          console.warn("No theme checkpoint available to restore to.");
        }
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
