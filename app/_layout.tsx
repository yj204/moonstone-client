import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { Tabs } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { usePaperTheme } from "../theme/paperTheme";
import { MaterialIcons } from "@expo/vector-icons";
export default function RootLayout() {
  const theme = usePaperTheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs>
          <Tabs.Screen
            name="(album)"
            options={{
              title: "앨범",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="album" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="feeding"
            options={{
              title: "수유",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="history" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
