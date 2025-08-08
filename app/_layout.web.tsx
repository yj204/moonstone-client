import { DarkTheme, LightTheme } from "@/constants/Theme";

import { useFonts } from "expo-font";

import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import "react-native-reanimated";

import { DrawerProvider } from "@/hooks/useDrawer";
import { PaperProvider } from "react-native-paper";

import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { useMaterialTheme } from "@/hooks/useThemeColor";

export default function RootLayout() {
  // const { colorScheme } = useColorScheme();
  // const theme = useMaterialTheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [active, setActive] = useState("album");

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <DrawerProvider>
          <Drawer
            screenOptions={{
              headerShown: true,
              drawerStyle: { backgroundColor: theme.colors.background },
            }}
            initialRouteName="(album)"
            drawerContent={(props) => {
              const contentsProps = { ...props, active };
              return <CustomDrawerContent {...contentsProps} />;
            }}
          >
            <Drawer.Screen name="(album)" options={{ title: "앨범 홈" }} />
            <Drawer.Screen name="history" options={{ title: "history" }} />
          </Drawer>
        </DrawerProvider>
      </ThemeProvider>
    </PaperProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "index", // 자동 등록 방지
};
