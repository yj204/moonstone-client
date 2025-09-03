import { useColorScheme, View, type ViewProps } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { useMaterialColor, useMaterialTheme } from "@/hooks/useMaterialColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof MD3Colors;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorName = "background",
  ...otherProps
}: ThemedViewProps) {
  
  const colors = useMaterialColor( colorName)
  
  return (
    <View
      // className=""
      style={[{ backgroundColor: colors.toString() }, style]}
      {...otherProps}
    />
  );
}
