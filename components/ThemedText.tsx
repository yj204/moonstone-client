import { Text, type TextProps } from "react-native";
import { cssInterop } from "nativewind";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

import { useMaterialColor } from "@/hooks/useMaterialColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  title?: string;
  colorName?: keyof MD3Colors;
  className?: string;
};

export function ThemedText({
  style,
  title,
  lightColor,
  darkColor,
  colorName = "onSurface",
  ...otherProps
}: ThemedTextProps) {
  const color = useMaterialColor(colorName);

  return (
    <Text
      style={[{ color: color.toString() as string }, style]}
      {...otherProps}
    />
  );
}

cssInterop(ThemedText, {
  className: {
    target: "style",
  },
});
