import { FAB, Menu, Portal } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import FeedingIcon from "@/assets/icon/feeding.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { usePaperTheme } from "@/theme/paperTheme";
const FeedingFAB = () => {
  const [state, setState] = useState({ open: false });
  // const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const tabBarHeight = Platform.OS === "web" ? 0 : useBottomTabBarHeight();
  const theme = usePaperTheme();
  const { open } = state;
  return (
    <Portal>
      <View className="absolute bottom-2 right-2">
        <FAB.Group
          icon="plus"
          open={open}
          visible
          onStateChange={setState}
          onPress={() => setMenuVisible((v) => !v)}
          style={{
            position: "absolute",
            right: 16,
            bottom: tabBarHeight + 5,
          }}
          actions={[
            {
              icon: ({ color, size }) => {
                console.log(" color ", color);
                return (
                  <FeedingIcon
                    color={color}
                    width={size}
                    height={size}
                    // fill={color}
                  />
                );
              },
              color: theme.colors.onPrimaryContainer,
              label: "Feeding",
              onPress: () => console.log("Pressed add"),
            },
          ]}
        />
      </View>
    </Portal>
  );
};

export default FeedingFAB;
