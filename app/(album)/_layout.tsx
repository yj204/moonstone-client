import { Stack, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export const screenOptions = {
  title: "Album",
};

export default function AlbumLayout() {
  const navigation = useNavigation();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(album)" options={{ headerShown: false }} />
    </Stack>
  );
}
