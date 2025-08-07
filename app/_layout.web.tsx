import { DarkTheme, LightTheme } from "@/constants/Theme";

import { useFonts } from "expo-font";

import "react-native-reanimated";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { View, Text } from "react-native";

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { DrawerProvider } from "@/hooks/useDrawer";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // const navigation = useNavigation();
  const [active, setActive] = useState("album");

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={colorScheme === "dark" ? DarkTheme : LightTheme}>
      <DrawerProvider>
        <Drawer
          screenOptions={{
            headerShown: true,
          }}
          initialRouteName="(album)"
          drawerContent={(props) => {
            const contentsProps = { ...props, active };
            console.log("drawer content props", props);
            return <CustomDrawerContent {...contentsProps} />;
          }}
        >
          <Drawer.Screen name="(album)" options={{ title: "앨범 홈" }} />
          <Drawer.Screen name="history" options={{ title: "history" }} />

        </Drawer>
      </DrawerProvider>
    </PaperProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "index", // 자동 등록 방지
};
