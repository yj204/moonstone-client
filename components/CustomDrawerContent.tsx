import { useDrawer } from "@/hooks/useDrawer";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Link } from "expo-router";
import { PropsWithChildren, useMemo } from "react";
import { Avatar, Drawer, Text } from "react-native-paper";
import { ThemedView } from "./ThemedView";
import { View } from "react-native";

import { ThemeToggle } from "./ThemeToggle";
import { ThemedText } from "./ThemedText";
import { useMaterialColor, useMaterialTheme } from "@/hooks/useMaterialColor";
import { getPaperTheme } from "@/theme/paperTheme";

export function CustomDrawerContent(
  props: PropsWithChildren<
    DrawerContentComponentProps & {
      active?: string;
    }
  >,
) {
  const { activeItem, setActiveItem } = useDrawer();
  const color = useMaterialColor("surface");

  const theme = getPaperTheme()
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: color.toString() }}
      {...props}
    >
      <ThemedView>
        <View className="items-center p-4">
          <Avatar.Text size={64} label="CJ" />
          <ThemedText className="mt-2 text-lg font-semibold">
            {" "}
            username{" "}
          </ThemedText>
        </View>

        <Drawer.Section title="Navigation" className="background mt-4">
          <Link href="/" asChild>
            <Drawer.Item
              label="Album"
              icon="home"
              theme={{
                colors: {
                  secondaryContainer: theme.colors.secondaryContainer,
                  onSurfaceVariant: theme.colors.onSurface,
                },
              }}
              active={activeItem === "album"}
              onPress={() => setActiveItem("album")}
            />
          </Link>
          <Link href="/history" asChild>
            <Drawer.Item
              label="Feeding"
              icon="cog"
              active={activeItem === "feeding"}
              onPress={() => setActiveItem("feeding")}
            />
          </Link>
        </Drawer.Section>

        <Drawer.Section title="Settings" className="background mt-4">
          <ThemeToggle />
        </Drawer.Section>
      </ThemedView>
    </DrawerContentScrollView>
  );
}
