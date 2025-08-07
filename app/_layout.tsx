import {
  
  ThemeProvider,
} from "@react-navigation/native";
import { DarkTheme, LightTheme } from "@/constants/Theme"
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import "../global.css"
import "react-native-reanimated";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }}
        />
      </Drawer> */}
       
      </GestureHandlerRootView>
    // </ThemeProvider>
  );
}

