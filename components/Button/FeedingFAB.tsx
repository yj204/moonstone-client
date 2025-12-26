import { FAB, Portal } from "react-native-paper";
import { useState } from "react";
import FeedingIcon from "@/assets/icon/feeding.svg";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { usePaperTheme } from "@/theme/paperTheme";

type FeedingFABProps = {
  onOpenForm: () => void;
  onOpenDiaperForm: () => void;
};

const FeedingFAB = ({ onOpenForm, onOpenDiaperForm }: FeedingFABProps) => {
  const [state, setState] = useState({ open: false });

  const tabBarHeight = Platform.OS === "web" ? 0 : useBottomTabBarHeight();
  const theme = usePaperTheme();
  const { open } = state;

  const handleFeedingPress = () => {
    onOpenForm();
    setState({ open: false });
  };

  const handleDiaperPress = () => {
    onOpenDiaperForm();
    setState({ open: false });
  };

  return (
    <Portal>
      <FAB.Group
        icon="plus"
        open={open}
        visible
        onStateChange={setState}
        onPress={() => {}}
        style={{
          position: "absolute",
          right: 16,
          bottom: tabBarHeight + 16,
        }}
        actions={[
          {
            icon: ({ color, size }) => {
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
            label: "수유",
            onPress: handleFeedingPress,
          },
          {
            icon: "emoticon-poop",
            color: theme.colors.onPrimaryContainer,
            label: "배변",
            onPress: handleDiaperPress,
          },
        ]}
      />
    </Portal>
  );
};

export default FeedingFAB;
