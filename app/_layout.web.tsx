import { useFonts } from "expo-font";

import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState, useMemo } from "react";
import "react-native-reanimated";
import { DrawerProvider } from "@/hooks/useDrawer";
import { Icon, PaperProvider } from "react-native-paper";
import { useMaterialTheme } from "@/hooks/useMaterialColor";
import { useColorScheme } from "react-native";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { getPaperTheme } from "@/theme/paperTheme";

export default function RootLayout() {
  // const { colorScheme } = useColorScheme();
  const system = useColorScheme();
  const [override, setOverride] = useState<"light" | "dark" | null>(null);

  const colorScheme = override ?? system ?? "light";
  const isDark = colorScheme === "dark";
  const nativeWindColorScheme = useNativeWindColorScheme();
  // keep NativeWind in sync
  useEffect(() => {
    nativeWindColorScheme.setColorScheme(colorScheme);
  }, [colorScheme]);

  const [active, setActive] = useState("album");
  const paperTheme = getPaperTheme();
  return (
    <PaperProvider theme={paperTheme}>
      <DrawerProvider>
        <Drawer
          screenOptions={{
            headerTintColor: paperTheme.colors.onSurface,
            headerShown: true,
            headerLeftContainerStyle: {
              backgroundColor: paperTheme.colors.background,
            },
            headerStyle: { backgroundColor: paperTheme.colors.background },
            headerTitleStyle: { color: paperTheme.colors.onSurface },
            drawerStyle: { backgroundColor: paperTheme.colors.background },
          }}
          initialRouteName="(album)"
          drawerContent={(props) => {
            const contentsProps = { ...props, active };

            return <CustomDrawerContent {...contentsProps} />;
          }}
        >
          <Drawer.Screen name="(album)" options={{ title: "앨범 홈" }} />
          <Drawer.Screen name="feeding" options={{ title: "Feeding" }} />
        </Drawer>
      </DrawerProvider>
    </PaperProvider>
  );
}

export const unstable_settings = {
  initialRouteName: "index", // 자동 등록 방지
};
