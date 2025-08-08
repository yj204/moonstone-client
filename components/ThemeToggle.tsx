import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useMaterialTheme } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  setGlobalThemeMode,
  getGlobalThemeMode,
} from "@/hooks/useColorScheme.web";

export function ThemeToggle() {
  const theme = useMaterialTheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  const currentThemeMode = getGlobalThemeMode();

  const toggleTheme = () => {
    let newMode: "light" | "dark" | "system";

    // if (currentThemeMode === 'system') {
    //   newMode = colorScheme === 'dark' ? 'light' : 'dark';
    // } else if (currentThemeMode === 'dark') {
    //   newMode = 'light';
    // } else {
    //   newMode = 'dark';
    // }
    if (colorScheme === "dark") newMode = "light";
    else newMode = "dark";
    setColorScheme(newMode);
    console.log("Theme changed to:", newMode);
  };

  const getThemeIcon = () => {
    // if (currentThemeMode === 'system') {
    return colorScheme === "dark" ? "🌙" : "☀️";
    // }
    // return currentThemeMode === 'dark' ? '🌙' : '☀️';
  };

  const getThemeLabel = () => {
    if (currentThemeMode === "system") {
      return `System (${colorScheme})`;
    }
    return currentThemeMode === "dark" ? "Dark" : "Light";
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: theme.colors.onSurface }]}>
          Theme
        </Text>
        <Text
          style={[styles.subLabel, { color: theme.colors.onSurfaceVariant }]}
        >
          {getThemeLabel()}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.toggle,
          {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.outline,
          },
        ]}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Text style={[styles.toggleText, { color: theme.colors.onPrimary }]}>
          {getThemeIcon()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  subLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  toggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  toggleText: {
    fontSize: 18,
  },
});
