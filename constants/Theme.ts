import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
import merge from "deepmerge";
import { vars } from "nativewind";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Material3 색상을 CSS 변수로 변환하는 함수
function createCSSVars(colors: MD3Colors) {
  console.log("create css vars", colors);
  return {
    "--md-sys-color-primary": colors.primary,
    "--md-sys-color-on-primary": colors.onPrimary,
    "--md-sys-color-primary-container": colors.primaryContainer,
    "--md-sys-color-on-primary-container": colors.onPrimaryContainer,
    "--md-sys-color-secondary": colors.secondary,
    "--md-sys-color-on-secondary": colors.onSecondary,
    "--md-sys-color-secondary-container": colors.secondaryContainer,
    "--md-sys-color-on-secondary-container": colors.onSecondaryContainer,
    "--md-sys-color-tertiary": colors.tertiary,
    "--md-sys-color-on-tertiary": colors.onTertiary,
    "--md-sys-color-tertiary-container": colors.tertiaryContainer,
    "--md-sys-color-on-tertiary-container": colors.onTertiaryContainer,
    "--md-sys-color-error": colors.error,
    "--md-sys-color-on-error": colors.onError,
    "--md-sys-color-error-container": colors.errorContainer,
    "--md-sys-color-on-error-container": colors.onErrorContainer,
    "--md-sys-color-background": colors.background,
    "--md-sys-color-on-background": colors.onBackground,
    "--md-sys-color-surface": colors.surface,
    "--md-sys-color-on-surface": colors.onSurface,
    "--md-sys-color-surface-variant": colors.surfaceVariant,
    "--md-sys-color-on-surface-variant": colors.onSurfaceVariant,
    "--md-sys-color-outline": colors.outline,
    "--md-sys-color-outline-variant": colors.outlineVariant,
    "--md-sys-color-shadow": colors.shadow,
    "--md-sys-color-scrim": colors.scrim,
    "--md-sys-color-inverse-surface": colors.inverseSurface,
    "--md-sys-color-inverse-on-surface": colors.inverseOnSurface,
    "--md-sys-color-inverse-primary": colors.inversePrimary,
  };
}

const CombinedDarkTheme = merge(
  MD3DarkTheme,
  merge(DarkTheme, {
    colors: {
      ...PaperDarkTheme.colors,
      primary: "#ADC6FF",
      surfaceTint: "#ADC6FF",
      onPrimary: "#112F60",
      primaryContainer: "#2B4678",
      onPrimaryContainer: "#D8E2FF",
      secondary: "#ACC7FF",
      onSecondary: "#0F2F60",
      secondaryContainer: "#2A4678",
      onSecondaryContainer: "#D7E2FF",
      tertiary: "#97CCF9",
      onTertiary: "#003450",
      tertiaryContainer: "#024B71",
      onTertiaryContainer: "#CBE6FF",
      error: "#FFB4AB",
      onError: "#690005",
      errorContainer: "#93000A",
      onErrorContainer: "#FFDAD6",
      background: "#111318",
      onBackground: "#E2E2E9",
      surface: "#111318",
      onSurface: "#E2E2E9",
      surfaceVariant: "#44474F",
      onSurfaceVariant: "#C4C6D0",
      outline: "#8E9099",
      outlineVariant: "#44474F",
      shadow: "#000000",
      scrim: "#000000",
      inverseSurface: "#E2E2E9",
      inverseOnSurface: "#2F3036",
      inversePrimary: "#445E91",
      primaryFixed: "#D8E2FF",
      onPrimaryFixed: "#001A41",
      primaryFixedDim: "#ADC6FF",
      onPrimaryFixedVariant: "#2B4678",
      secondaryFixed: "#D7E2FF",
      onSecondaryFixed: "#001A40",
      secondaryFixedDim: "#ACC7FF",
      onSecondaryFixedVariant: "#2A4678",
      tertiaryFixed: "#CBE6FF",
      onTertiaryFixed: "#001E30",
      tertiaryFixedDim: "#97CCF9",
      onTertiaryFixedVariant: "#024B71",
      surfaceDim: "#111318",
      surfaceBright: "#37393E",
      surfaceContainerLowest: "#0C0E13",
      surfaceContainerLow: "#1A1B20",
      surfaceContainer: "#1E1F25",
      surfaceContainerHigh: "#282A2F",
      surfaceContainerHighest: "#33353A",
    } as MD3Colors,
  })
);

const CombinedLightTheme = merge(
  MD3LightTheme,
  merge(LightTheme, {
    colors: {
      ...PaperLightTheme.colors,
      primary: "#445E91",
      surfaceTint: "#445E91",
      onPrimary: "#FFFFFF",
      primaryContainer: "#D8E2FF",
      onPrimaryContainer: "#2B4678",
      secondary: "#435E91",
      onSecondary: "#FFFFFF",
      secondaryContainer: "#D7E2FF",
      onSecondaryContainer: "#2A4678",
      tertiary: "#2A638A",
      onTertiary: "#FFFFFF",
      tertiaryContainer: "#CBE6FF",
      onTertiaryContainer: "#024B71",
      error: "#BA1A1A",
      onError: "#FFFFFF",
      errorContainer: "#FFDAD6",
      onErrorContainer: "#93000A",
      background: "#F9F9FF",
      onBackground: "#1A1B20",
      surface: "#F9F9FF",
      onSurface: "#1A1B20",
      surfaceVariant: "#E1E2EC",
      onSurfaceVariant: "#44474F",
      outline: "#75777F",
      outlineVariant: "#C4C6D0",
      shadow: "#000000",
      scrim: "#000000",
      inverseSurface: "#2F3036",
      inverseOnSurface: "#F0F0F7",
      inversePrimary: "#ADC6FF",
      primaryFixed: "#D8E2FF",
      onPrimaryFixed: "#001A41",
      primaryFixedDim: "#ADC6FF",
      onPrimaryFixedVariant: "#2B4678",
      secondaryFixed: "#D7E2FF",
      onSecondaryFixed: "#001A40",
      secondaryFixedDim: "#ACC7FF",
      onSecondaryFixedVariant: "#2A4678",
      tertiaryFixed: "#CBE6FF",
      onTertiaryFixed: "#001E30",
      tertiaryFixedDim: "#97CCF9",
      onTertiaryFixedVariant: "#024B71",
      surfaceDim: "#D9D9E0",
      surfaceBright: "#F9F9FF",
      surfaceContainerLowest: "#FFFFFF",
      surfaceContainerLow: "#F3F3FA",
      surfaceContainer: "#EEEDF4",
      surfaceContainerHigh: "#E8E7EE",
      surfaceContainerHighest: "#E2E2E9",
    } as MD3Colors,
  })
);

// NativeWind CSS 변수 생성
export const LightThemeCSSVars = createCSSVars(CombinedLightTheme.colors);
export const DarkThemeCSSVars = createCSSVars(CombinedDarkTheme.colors);

// NativeWind용 테마 객체
export const NativeWindTheme = {
  light: {
    ...LightThemeCSSVars,
    // 기본 색상들도 추가
    text: CombinedLightTheme.colors.onSurface,
    background: CombinedLightTheme.colors.background,
    tint: CombinedLightTheme.colors.primary,
    icon: CombinedLightTheme.colors.onSurfaceVariant,
    tabIconDefault: CombinedLightTheme.colors.onSurfaceVariant,
    tabIconSelected: CombinedLightTheme.colors.primary,
  },
  dark: {
    ...DarkThemeCSSVars,
    // 기본 색상들도 추가
    text: CombinedDarkTheme.colors.onSurface,
    background: CombinedDarkTheme.colors.background,
    tint: CombinedDarkTheme.colors.primary,
    icon: CombinedDarkTheme.colors.onSurfaceVariant,
    tabIconDefault: CombinedDarkTheme.colors.onSurfaceVariant,
    tabIconSelected: CombinedDarkTheme.colors.primary,
  },
};

export { CombinedLightTheme as LightTheme, CombinedDarkTheme as DarkTheme };
