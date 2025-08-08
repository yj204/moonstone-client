import { ThemedView } from "@/components/ThemedView";
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

export default function FeedingScreen(props: PropsWithChildren<any>) {
  return (
    <ThemedView>
      <Text> this is feeding screen </Text>
    </ThemedView>
  );
}
