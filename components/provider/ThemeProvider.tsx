import React, {
  PropsWithChildren,
  useEffect,
  createContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LightThemeCSSVars, DarkThemeCSSVars } from "@/constants/Theme";

type NativewindContextType = {
  cssVars?: any;
  colorScheme?: any;
  theme?: ThemeMode;
};
export type ThemeMode = "light" | "dark" | "system";
export const ThemeContext = createContext<NativewindContextType>({});
export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>("system");
  const cssVars = useMemo(() => {
    return colorScheme === "dark" ? DarkThemeCSSVars : LightThemeCSSVars;
  }, [colorScheme]);

  // useEffect(() => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, String(value));
    });

    // Keep data-theme in sync for any CSS that targets it
    root.setAttribute("data-theme", colorScheme === "dark" ? "dark" : "light");
  } else {
    console.log("document is undefined");
  }

  // }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ cssVars, colorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
