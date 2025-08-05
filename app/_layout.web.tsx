import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useNavigation } from "expo-router";
import "react-native-reanimated";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const navigation = useNavigation();
  const [active, setActive] = useState("home");

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer>
        <Drawer.Screen
          name="(album)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Album",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="feeding" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        />
        {/* <Drawer.Screen
          name="+not-found" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "User",
            title: "overview",
            drawerItemStyle: { display: 'none' },
          }}
        /> */}
      </Drawer>
    </ThemeProvider>
  );
}

export const unstable_settings = {
  initialRouteName: 'index', // 자동 등록 방지
};