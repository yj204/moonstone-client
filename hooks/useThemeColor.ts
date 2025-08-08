/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeContext } from "@/components/provider/ThemeProvider";
import { LightTheme, DarkTheme } from "@/constants/Theme";
import { useColorScheme } from "@/hooks/useColorScheme";

import { useContext } from "react";

export function useMaterialTheme() {
  const { theme, cssVars, colorScheme } = useContext(ThemeContext);
  // const { colorScheme } = useColorScheme();
  // return colorScheme === "dark" ? DarkTheme : LightTheme;
  return theme;
}

// Material3 테마에서 특정 색상을 가져오는 훅
export function useMaterialColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof LightTheme.colors
) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const colorFromProps = colorScheme === "dark" ? props.dark : props.light;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme.colors[colorName];
  }
}
