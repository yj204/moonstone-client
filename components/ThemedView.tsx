import { View, type ViewProps } from "react-native";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { useMaterialColor, useMaterialTheme } from "@/hooks/useThemeColor";

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
  const { colors } = useMaterialTheme();

  return (
    <View
      style={[{ backgroundColor: colors.surface as string }, style]}
      {...otherProps}
    />
  );
}
