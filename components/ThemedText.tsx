import { Text, type TextProps } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

import { useMaterialColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  title?: string,
  colorName?: keyof MD3Colors;
};

export function ThemedText({ 
  style, 
  title,
  lightColor, 
  darkColor, 
  colorName = 'onSurface',
  ...otherProps 
}: ThemedTextProps) {
  const color = useMaterialColor(
    { light: lightColor, dark: darkColor }, 
    colorName
  );

  return <Text style={[{ color: color as string }, style]} {...otherProps} />;
}
