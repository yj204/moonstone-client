/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// import { DarkTheme, LightTheme } from "@/constants/Theme";

import { usePaperTheme } from "@/theme/paperTheme";
import { useColorScheme as useNWColorScheme } from "nativewind";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
export { useTheme as useMaterialTheme } from "react-native-paper";




// Material3 테마에서 특정 색상을 가져오는 훅
export function useMaterialColor(
  colorName: keyof MD3Colors
) {
  const { colorScheme} = useNWColorScheme();
  const theme = usePaperTheme(colorScheme==="dark")
  return theme.colors[colorName] ;
 
}
