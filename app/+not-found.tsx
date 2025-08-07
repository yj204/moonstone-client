import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DrawerNavigationOptions } from "@react-navigation/drawer";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{  title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export const options :DrawerNavigationOptions= {
  drawerLabel: '404', // 있어도 안 보여요
  drawerItemStyle: { display: 'none' },
};