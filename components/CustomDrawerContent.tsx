import { PropsWithChildren, useState } from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Drawer, Avatar, Text } from "react-native-paper";
import { View } from "react-native";
import { Link } from "expo-router";
import { useDrawer } from "@/hooks/useDrawer";

export function CustomDrawerContent(
  props: PropsWithChildren<
    DrawerContentComponentProps & {
      active?: string;
    }
  >
) {
  const { activeItem, setActiveItem } = useDrawer();
  return (
    <DrawerContentScrollView {...props}>
      <View className="p-4 items-center bg-white dark:bg-neutral-900">
        <Avatar.Text size={64} label="CJ" />
        <Text className="text-lg font-semibold mt-2"> username </Text>
        {/* <Text className="text-sm text-neutral-500"> username </Text> */}
      </View>

      <Drawer.Section title="Navigation" className="mt-4">
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
    </DrawerContentScrollView>
  );
}
