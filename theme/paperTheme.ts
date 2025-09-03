import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import MaterialTheme from "../material-theme.json";
const fontConfig = configureFonts({ config: {} }); // wire custom fonts here if you have them
import { useColorScheme as useNWColorScheme } from "nativewind";
const light: MD3Theme = {
  ...MD3LightTheme,
  fonts: fontConfig,
  colors: {
    ...MD3LightTheme.colors,
    ...MaterialTheme.schemes.light,
  },
};

const dark: MD3Theme = {
  ...MD3DarkTheme,
  fonts: fontConfig,
  colors: {
    ...MD3DarkTheme.colors,
    ...MaterialTheme.schemes.dark,
  },
};

export const getPaperTheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNWColorScheme();
  return colorScheme === "dark" ? dark : light;
};
