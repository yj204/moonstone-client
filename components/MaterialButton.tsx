import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useMaterialTheme } from '@/hooks/useThemeColor';

interface MaterialButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error';
  disabled?: boolean;
  style?: any;
}

export function MaterialButton({
  title,
  onPress,
  variant = 'filled',
  color = 'primary',
  disabled = false,
  style,
}: MaterialButtonProps) {
  const theme = useMaterialTheme();
  
  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.colors.outline,
        borderWidth: 1,
      };
    }

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: theme.colors[color],
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: theme.colors[color],
          borderWidth: 1,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: 14,
      fontWeight: '500' as const,
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: theme.colors.onSurfaceVariant,
      };
    }

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          color: theme.colors[`on${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof typeof theme.colors] as string,
        };
      case 'outlined':
      case 'text':
        return {
          ...baseStyle,
          color: theme.colors[color],
        };
      default:
        return {
          ...baseStyle,
          color: theme.colors.onSurface,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
} 