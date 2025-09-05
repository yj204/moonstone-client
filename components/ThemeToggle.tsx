import { usePaperTheme } from "@/theme/paperTheme";
import { useColorScheme as useNWColorScheme } from "nativewind";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function ThemeToggle() {
  
  const { colorScheme, toggleColorScheme } = useNWColorScheme();
  const theme = usePaperTheme()

  
  const getThemeIcon = () => {
    return colorScheme === "dark" ? "🌙" : "☀️";
  };

  const getThemeLabel = () => {
    return theme.dark ? "Dark" : "Light";
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
        onPress={toggleColorScheme}
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
