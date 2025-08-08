import { PropsWithChildren, useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Drawer, Avatar, Text } from "react-native-paper";
import { View } from "react-native";
import { Link } from "expo-router";
import { useDrawer } from "@/hooks/useDrawer";
import { ThemedView } from "./ThemedView";
import { useMaterialTheme } from "@/hooks/useThemeColor";
import { ThemeToggle } from "./ThemeToggle";

export function CustomDrawerContent(
  props: PropsWithChildren<
    DrawerContentComponentProps & {
      active?: string;
    }
  >
) {
  const { activeItem, setActiveItem } = useDrawer();
  const { colors } = useMaterialTheme();
  return (
    <DrawerContentScrollView {...props}>
      <ThemedView className="p-4 items-center">
        <Avatar.Text size={64} label="CJ" />
        <Text className="text-lg font-semibold mt-2"> username </Text>
        {/* <Text className="text-sm text-neutral-500"> username </Text> */}
      </ThemedView>

      <Drawer.Section title="Navigation" className="mt-4" style={{backgroundColor:colors.background }}>
        <Link href="/" asChild>
          <Drawer.Item
            
            label="Album"
            icon="home"
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

      <Drawer.Section title="Settings" className="mt-4" style={{backgroundColor:colors.background }}>
        <ThemeToggle />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}
